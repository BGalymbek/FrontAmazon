import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import AuthContext from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { translateApiError } from '../../utils/translateApiError';

export default function PaymentFail() {
  const { authTokens } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [message, setMessage] = useState(t('payment.failDefault'));

  useEffect(() => {
    const loadStatus = async () => {
      try {
        const response = await axios.get('payment/fail/', {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        setMessage(translateApiError(t, response?.data?.message || 'Payment failed.'));
      } catch (error) {
        setMessage(t('payment.failed'));
      }
    };
    loadStatus();
  }, [authTokens, t]);

  return (
    <div className='oops'>
      <Navbar />
      <div className='oops-container'>
        <div className='oops-img'>
          <img src={require('../../img/oops.png')} alt='payment-fail' />
        </div>
        <div className='oops-content'>
          <h1 className='oops-title'>{t('payment.failTitle')}</h1>
          <p className='oops-message'>{message}</p>
        </div>
        <button className='oops-link' onClick={() => navigate('/payment-booking')}>
          {t('payment.failRetry')}
        </button>
      </div>
    </div>
  );
}
