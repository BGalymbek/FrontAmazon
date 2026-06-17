import React, { useCallback, useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import AuthContext from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function MyBookings() {
    const { authTokens } = useContext(AuthContext)
    const { t } = useTranslation()
    const [userBooking, setUserBooking] = useState(null)
    const [bookingId, setBookingId] = useState(null)
    const [totalAmount, setTotalAmount] = useState(null)
    const [corridorNum, setCorridorNum] = useState('')
    const [bookingStatus, setBookingStatus] = useState('Active booking')
    const [paymentStatus, setPaymentStatus] = useState('Pending')
    const [actionMessage, setActionMessage] = useState('')
    const [isCancelling, setIsCancelling] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)
    const room = userBooking?.room_number
    const floor = room ? Math.round(room / 100) : '-'
    const hasActiveBooking = Boolean(userBooking)

    const formatPaymentStatus = (status) => {
        if (!status) {
            return t('myBookings.paymentPending');
        }
        const normalized = String(status).toLowerCase();
        if (normalized === 'paid') {
            return t('myBookings.paymentPaid');
        }
        if (normalized === 'failed') {
            return t('myBookings.paymentFailed');
        }
        return t('myBookings.paymentPending');
    };

    const loadBookings = useCallback(async () => {
        try {
            const getResponse = await axios.get('get-bookings/', {
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`,
                }
            });

            const res = getResponse.data
            if (res.length > 0) {
                const booking = res[0];
                setUserBooking(booking.seat_detail)
                setBookingId(booking.id)
                setTotalAmount(booking.total_amount)
                setBookingStatus(t('myBookings.statusConfirmed'))
                setPaymentStatus(formatPaymentStatus(booking.payment_status))
            } else {
                setUserBooking(null)
                setBookingId(null)
                setTotalAmount(null)
                setBookingStatus(t('myBookings.statusNone'))
                setPaymentStatus(t('myBookings.paymentPending'))
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    }, [authTokens, t]);

    useEffect(() => {
        loadBookings();
    }, [loadBookings]);

    useEffect(() => {
        if (!room) {
            return;
        }

        const recognizeCorridorNum = (roomNum) => {
            if (roomNum) {
                let num = roomNum % 100;

                if (num >= 12 && num <= 16) {
                    setCorridorNum(2)
                } else if (num >= 22 && num <= 26) {
                    setCorridorNum(3)
                } else if (num >= 34 && num <= 38) {
                    setCorridorNum(4)
                } else {
                    setCorridorNum(1)
                }
            }
        }
        recognizeCorridorNum(room);
    }, [room]);

    const cancelBooking = async () => {
        if (!hasActiveBooking || isCancelling) {
            return;
        }

        setActionMessage('');
        setIsCancelling(true);
        try {
            await axios.post(
                'cancel-booking/',
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${authTokens.access}`,
                    },
                }
            );
            setActionMessage(t('myBookings.cancelSuccess'));
            setPaymentStatus(t('myBookings.paymentPending'));
            localStorage.removeItem('currentBookingId');
            localStorage.removeItem('currentBookingAmount');
            localStorage.removeItem('bookingDraft');

            const storedProfile = localStorage.getItem('userProfile');
            if (storedProfile) {
                const profile = JSON.parse(storedProfile);
                profile.is_dorm = false;
                localStorage.setItem('userProfile', JSON.stringify(profile));
            }

            await loadBookings();
        } catch (error) {
            setActionMessage(error?.response?.data?.error || t('myBookings.cancelFailed'));
        } finally {
            setIsCancelling(false);
        }
    };

    const downloadReceipt = async () => {
        if (isDownloading) {
            return;
        }

        setActionMessage('');
        setIsDownloading(true);
        try {
            const response = await axios.get('payment/download-receipt/', {
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`,
                },
                responseType: 'blob',
            });

            const blobUrl = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', `receipt_${bookingId || 'dorm'}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            setActionMessage(t('myBookings.receiptUnavailable'));
        } finally {
            setIsDownloading(false);
        }
    };

  return (
    <div className='my-booking'>
        <Navbar/>
        <div className='my-booking-container'>
            <h1>{t('myBookings.title')}</h1>
            <h3>{t('myBookings.subtitle')}</h3>
            <h3>{t('myBookings.statusLine', { bookingStatus, paymentStatus })}</h3>
            <div className='table-container'>
                <table className='table'>
                    <thead>
                        <tr className='header-table'>
                            <th>{t('myBookings.block')}</th>
                            <th>{t('myBookings.floor')}</th>
                            <th>{t('myBookings.corridor')}</th>
                            <th>{t('myBookings.room')}</th>
                            <th>{t('myBookings.seat')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="Block">{hasActiveBooking ? `${userBooking.block}-Block` : '-'}</td>
                            <td data-label="Floor">{hasActiveBooking ? `${floor}-floor` : '-'}</td>
                            <td data-label="Corridor">{hasActiveBooking ? `${corridorNum}-corridor` : '-'}</td>
                            <td data-label="Room">{hasActiveBooking ? `${room}-room` : '-'}</td>
                            <td data-label="Seat">{hasActiveBooking ? `${userBooking.seat_number}-seat` : '-'}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr className='table-cost'>
                            <td colSpan="5">
                                {t('myBookings.totalCost', {
                                    amount: totalAmount
                                        ? Number(totalAmount).toLocaleString('ru-RU')
                                        : '—',
                                })}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="ui-actions-row">
                <button type="button" className="ui-btn ui-btn-danger" onClick={cancelBooking} disabled={!hasActiveBooking || isCancelling}>
                    {isCancelling ? t('myBookings.cancelling') : t('myBookings.cancel')}
                </button>
                <button type="button" className="ui-btn ui-btn-primary" onClick={downloadReceipt} disabled={isDownloading}>
                    {isDownloading ? t('myBookings.downloading') : t('myBookings.downloadReceipt')}
                </button>
            </div>
            {actionMessage && (
                <p className={actionMessage.includes(t('myBookings.cancelSuccess')) ? 'ui-success' : 'ui-error'}>
                    {actionMessage}
                </p>
            )}
        </div>
        <footer></footer>
    </div>
  )
}
