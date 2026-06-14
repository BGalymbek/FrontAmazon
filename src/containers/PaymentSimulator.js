import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const POLL_INTERVAL_MS = 2000;

function getApiRoot() {
  return (process.env.REACT_APP_API_ROOT || axios.defaults.baseURL || 'http://localhost:8000/api').replace(/\/$/, '');
}

export default function PaymentSimulator() {
  const { authTokens } = useContext(AuthContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const searchParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const paymentId = searchParams.get('payment_id');
  const provider = searchParams.get('provider') || 'kaspi';
  const providerReference = searchParams.get('provider_reference');
  const amount = Number(searchParams.get('amount') || 0);
  const isKaspi = provider === 'kaspi';

  const confirmUrl = useMemo(() => {
    if (!providerReference) {
      return '';
    }
    return `${getApiRoot()}/payment/qr-confirm/${encodeURIComponent(providerReference)}/`;
  }, [providerReference]);

  const qrImageUrl = useMemo(() => {
    if (!confirmUrl) {
      return '';
    }
    return `https://api.qrserver.com/v1/create-qr-code/?size=480x480&margin=0&data=${encodeURIComponent(confirmUrl)}`;
  }, [confirmUrl]);

  useEffect(() => {
    if (!paymentId || !authTokens?.access) {
      return undefined;
    }

    let cancelled = false;

    const checkStatus = async () => {
      try {
        const response = await axios.get('payment/status/', {
          params: { payment_id: paymentId },
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });

        if (cancelled) {
          return;
        }

        if (response.data?.payment_status === 'paid') {
          localStorage.removeItem('bookingDraft');
          navigate('/payment-success');
        }
      } catch (error) {
        if (!cancelled) {
          setMessage(error?.response?.data?.detail || t('payment.qrStatusError'));
        }
      }
    };

    checkStatus();
    const timer = window.setInterval(checkStatus, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [authTokens?.access, navigate, paymentId, t]);

  return (
    <div className={`kaspi-pay-page ${isKaspi ? 'kaspi-theme' : 'stripe-theme'}`}>
      <div className="kaspi-pay-card">
        <div className="kaspi-pay-brand">
          <div className="kaspi-pay-brand-mark">{isKaspi ? 'k' : 'S'}</div>
          <div className="kaspi-pay-brand-text">{isKaspi ? 'kaspi' : 'Stripe'}</div>
        </div>

        <p className="kaspi-pay-subtitle">{t('payment.qrSubtitle')}</p>

        <p className="kaspi-pay-amount-label">{t('payment.qrAmountLabel')}</p>
        <p className="kaspi-pay-amount">
          {amount > 0 ? `${amount.toLocaleString('ru-RU')} ₸` : '—'}
        </p>

        {qrImageUrl ? (
          <div className="kaspi-pay-qr-wrap">
            <img className="kaspi-pay-qr" src={qrImageUrl} alt={t('payment.qrAlt')} />
          </div>
        ) : (
          <p className="kaspi-pay-error">{t('payment.qrMissing')}</p>
        )}

        <div className="kaspi-pay-status">
          <span className="kaspi-pay-spinner" aria-hidden="true" />
          <span>{t('payment.qrWaiting')}</span>
        </div>

        <p className="kaspi-pay-hint">{t('payment.qrHint')}</p>

        <Link to="/payment-booking" className="kaspi-pay-back">
          {t('payment.back')}
        </Link>

        {message && <p className="kaspi-pay-error">{message}</p>}
      </div>
    </div>
  );
}
