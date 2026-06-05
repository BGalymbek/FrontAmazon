import React, { useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function PaymentSimulator() {
  const { authTokens } = useContext(AuthContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loadingStatus, setLoadingStatus] = useState('');
  const [message, setMessage] = useState('');

  const paymentId = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('payment_id');
  }, []);

  const provider = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('provider') || 'unknown';
  }, []);

  const simulateStatus = async (status) => {
    if (!paymentId) {
      setMessage('Payment id is missing.');
      return;
    }

    setLoadingStatus(status);
    setMessage('');
    try {
      await axios.post(
        'payment/simulate/',
        {
          payment_id: paymentId,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );

      if (status === 'paid') {
        navigate('/payment-success');
      } else {
        navigate('/payment-fail');
      }
    } catch (error) {
      setMessage(error?.response?.data?.detail || 'Failed to simulate payment status.');
    } finally {
      setLoadingStatus('');
    }
  };

  return (
    <div className='rooms'>
      <Navbar />
      <div className='rooms-container'>
        <section className='dorm-information'>
          <header className='dorm-information-header'>
            <div className='title-main'>
              <h1>{t('payment.simulatorTitle')}</h1>
              <p>Provider: {provider} | Payment ID: {paymentId || 'N/A'}</p>
            </div>
          </header>
        </section>

        <section className="ui-card">
          <p>{t('payment.simulatorDesc')}</p>
          <div className="ui-actions-row">
            <button type="button" className="ui-btn ui-btn-success" onClick={() => simulateStatus('paid')} disabled={Boolean(loadingStatus)}>
              {loadingStatus === 'paid' ? t('payment.processing') : t('payment.simulateSuccess')}
            </button>
            <button type="button" className="ui-btn ui-btn-danger" onClick={() => simulateStatus('failed')} disabled={Boolean(loadingStatus)}>
              {loadingStatus === 'failed' ? t('payment.processing') : t('payment.simulateFail')}
            </button>
          </div>
          {message && <p className="ui-error form-feedback">{message}</p>}
        </section>
      </div>
    </div>
  );
}
