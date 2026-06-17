import React, { useContext, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { translateApiError } from '../utils/translateApiError';

const PROVIDER_INFO = {
    kaspi: {
        labelKey: 'payment.providerKaspi',
        descKey: 'payment.providerKaspiDesc',
        redirectKey: 'payment.providerRedirect',
    },
    stripe: {
        labelKey: 'payment.providerStripe',
        descKey: 'payment.providerStripeDesc',
        redirectKey: 'payment.providerRedirect',
    },
    manual: {
        labelKey: 'payment.providerManual',
        descKey: 'payment.providerManualDesc',
        redirectKey: null,
    },
};

export default function PaymentBooking() {
    const [expiry, setExpiry] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [paymentError, setPaymentError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [provider, setProvider] = useState('kaspi');

    const { authTokens } = useContext(AuthContext);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const bookingId = useMemo(() => localStorage.getItem('currentBookingId'), []);
    const amount = useMemo(() => Number(localStorage.getItem('currentBookingAmount') || 195000), []);
    const isExternalProvider = provider === 'kaspi' || provider === 'stripe';
    const providerInfo = PROVIDER_INFO[provider];

    const submitPayment = async () => {
        const requiresCardFields = provider === 'manual';
        if (!bookingId || (requiresCardFields && (!expiry || !cvv || !cardNumber))) {
            setPaymentError(t('payment.fillAll'));
            return;
        }

        try {
            setIsSubmitting(true);
            setPaymentError('');
            const response = await axios.post(
                'payment/',
                {
                    booking: bookingId,
                    provider,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authTokens.access}`,
                    },
                }
            );

            const res = response.data;
            if (res?.checkout_url) {
                window.location.href = res.checkout_url;
                return;
            }
            localStorage.removeItem('bookingDraft');
            navigate('/payment-success');
        } catch (err) {
            console.error(err);
            const data = err?.response?.data;
            const apiMessage =
                data?.detail ||
                data?.booking?.[0] ||
                data?.amount?.[0] ||
                data?.provider?.[0] ||
                data?.error ||
                'Payment failed. Please check card details or try again.';
            setPaymentError(translateApiError(t, apiMessage));
            if (err?.response?.status !== 400) {
                navigate('/payment-fail');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleExpiryChange = (event) => {
        setExpiry(event.target.value);
    };

    const handleCardNumberChange = (event) => {
        let inputCardNumber = event.target.value.replace(/\s/g, '');

        if (inputCardNumber.length < cardNumber.replace(/\s/g, '').length) {
            inputCardNumber = inputCardNumber.replace(/(.{4})/g, '$1 ').trim();
        } else {
            inputCardNumber = inputCardNumber.replace(/(.{4})/g, '$1 ').trim();
        }

        setCardNumber(inputCardNumber);
    };

    return (
        <main className="payment">
            <Navbar />
            <div className="background-payment">
                <div className="payment-header">
                    <h2>{t('payment.title')}</h2>
                    <h2>{amount.toLocaleString('ru-RU')} ₸</h2>
                    <div>
                        <img src={require('../img/visa.png')} alt="visa" />
                        <img src={require('../img/mastercard.png')} alt="mastercard" />
                    </div>
                </div>
                <form className="form-payment">
                    {!bookingId && (
                        <p className="ui-error form-feedback">{t('payment.notFoundBooking')}</p>
                    )}

                    <div className="field-component">
                        <label>{t('payment.providerLabel')}</label>
                        <select value={provider} onChange={(event) => setProvider(event.target.value)}>
                            <option value="kaspi">{t('payment.providerKaspi')}</option>
                            <option value="stripe">{t('payment.providerStripe')}</option>
                            <option value="manual">{t('payment.providerManual')}</option>
                        </select>
                    </div>

                    {providerInfo?.descKey && (
                        <p className="payment-provider-desc">{t(providerInfo.descKey)}</p>
                    )}

                    {isExternalProvider && providerInfo?.redirectKey && (
                        <p className="payment-provider-redirect">{t(providerInfo.redirectKey)}</p>
                    )}

                    {!isExternalProvider && (
                        <>
                            <div className="field-component">
                                <label>{t('payment.cardNumber')}</label>
                                <input
                                    type="text"
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    maxLength={19}
                                    placeholder="4400 **** **** ****"
                                />
                            </div>
                            <div className="payment-cvv-mm">
                                <div className="field-component">
                                    <label htmlFor="expiry">{t('payment.expiry')}</label>
                                    <InputMask
                                        mask="99/99"
                                        value={expiry}
                                        onChange={handleExpiryChange}
                                        placeholder="mm/yy"
                                    />
                                </div>
                                <div className="field-component">
                                    <label>CVV</label>
                                    <input
                                        type="text"
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value)}
                                        maxLength={3}
                                        placeholder="***"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </form>
                <div className="btns-payment">
                    <button onClick={() => submitPayment()} disabled={isSubmitting}>
                        {isSubmitting
                            ? t('payment.processing')
                            : isExternalProvider
                              ? t('payment.continueToProvider')
                              : t('payment.pay')}
                    </button>
                    <Link to="/confirmation-booking">
                        <button>{t('payment.back')}</button>
                    </Link>
                </div>
                {paymentError && <p style={{ marginTop: '12px', color: '#E94949' }}>{paymentError}</p>}
                <div></div>
            </div>
        </main>
    );
}
