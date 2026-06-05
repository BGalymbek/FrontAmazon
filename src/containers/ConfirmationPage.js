import React, { useContext, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { translateApiError } from '../utils/translateApiError';

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const { authTokens } = useContext(AuthContext);
  const { t } = useTranslation();

  const draft = useMemo(() => {
    const raw = localStorage.getItem('bookingDraft');
    return raw ? JSON.parse(raw) : null;
  }, []);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const bookingAmount = Number(draft?.amount || 195000);

  const submitSeatPlace = async () => {
    if (!draft) {
      setSubmitError(t('confirmation.missingDraft'));
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError('');
      const response = await axios.post(
        'bookings/',
        {
          block: draft.block,
          room_number: draft.room_number,
          seat_number: draft.seat_number,
          dormitory_id: draft.dormitory_id,
          semester_duration: draft.semester_duration,
        },
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );

      const bookingId = response?.data?.id;
      if (!bookingId) {
        setSubmitError(t('confirmation.noBookingId'));
        return;
      }

      localStorage.setItem('currentBookingId', String(bookingId));
      localStorage.setItem('currentBookingAmount', String(bookingAmount));
      navigate('/payment-booking');
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.non_field_errors?.[0] ||
        'Failed to create booking. Seat may have been already reserved.';
      setSubmitError(translateApiError(t, message));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!draft) {
    return (
      <main className='confirmation-data'>
        <Navbar />
        <div className='background-of-confirmation'>
          <div className='confirmation-content'>
            <div className='confirmation-info-left'>
              <h2>{t('confirmation.draftNotFound')}</h2>
              <p>{t('confirmation.returnToBooking')}</p>
              <Link to="/booking">{t('confirmation.backToBooking')}</Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='confirmation-data'>
      <Navbar />
      <div className='background-of-confirmation'>
        <div className='confirmation-content'>
          <div className='confirmation-info-left'>
            <img src={require('../img/logoDorm.png')} alt="logo" />
            <div className='txt-details'>
              <h2>{t('confirmation.title')}</h2>
              <p>{t('confirmation.subtitle')}</p>
            </div>
            <div className='me-selected'>
              <h3 className='me-selected-text'>{t('confirmation.youSelected')}</h3>
              <div>
                <h3>{t('confirmation.block')}: {draft.block}</h3>
                <h3>{t('confirmation.room')}: {draft.room_number}</h3>
                <h3>{t('confirmation.seat')}: {draft.seat_number}</h3>
                <h3>{t('confirmation.semester')}: {draft.semester_duration}</h3>
                {draft.dormitory_name && <h3>{t('confirmation.dormitory')}: {draft.dormitory_name}</h3>}
              </div>
            </div>
            {(draft.image_url || draft.room_image_url || draft.university_image_url) && (
              <div className="confirmation-images">
                {draft.university_image_url && (
                  <img src={draft.university_image_url} alt={t('booking.universityPreview')} />
                )}
                {draft.image_url && (
                  <img src={draft.image_url} alt={t('booking.exterior')} />
                )}
                {draft.room_image_url && (
                  <img src={draft.room_image_url} alt={t('booking.roomPreview')} />
                )}
              </div>
            )}
          </div>
          <div className='confirmation-info-right'>
            <div>
              <p>{t('confirmation.network')}</p>
              <h3>{t('confirmation.online')}</h3>
            </div>
            <h3>{t('confirmation.total')}: {bookingAmount.toLocaleString('ru-RU')} ₸</h3>
          </div>
        </div>
        <div className='btns-confirmation'>
          <button onClick={() => setModalOpen(true)}>{t('confirmation.cancelBooking')}</button>
          <Modal className='modal' isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)}>
            <h3>{t('confirmation.cancelQuestion')}</h3>
            <div className='btns-modal btns-modal-cancel'>
              <button onClick={() => setModalOpen(false)}>{t('confirmation.noReturn')}</button>
              <Link to='/booking'>
                <button className='btn-cancel' onClick={() => setModalOpen(false)}>
                  {t('confirmation.yesCancel')}
                </button>
              </Link>
            </div>
          </Modal>
          <Link to="/booking">
            <button>{t('confirmation.previous')}</button>
          </Link>
          <button className='btn-to-payment' onClick={submitSeatPlace} disabled={isSubmitting}>
            {isSubmitting
              ? t('confirmation.creating')
              : t('confirmation.pay', { amount: bookingAmount.toLocaleString('ru-RU') })}
          </button>
        </div>
        {submitError && <p className="ui-error form-feedback">{submitError}</p>}
      </div>
    </main>
  );
}
