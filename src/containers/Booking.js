import React, { useContext, useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { translateApiError } from '../utils/translateApiError';

export default function Booking() {
  const navigate = useNavigate();
  const { authTokens } = useContext(AuthContext);
  const { t } = useTranslation();

  const [universities, setUniversities] = useState([]);
  const [dormitories, setDormitories] = useState([]);
  const [seats, setSeats] = useState([]);
  const [layoutBlocks, setLayoutBlocks] = useState([]);
  const [loadingSeats, setLoadingSeats] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [loadingLayout, setLoadingLayout] = useState(false);

  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedDormitory, setSelectedDormitory] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedRoomNumber, setSelectedRoomNumber] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get('universities/');
        setUniversities(response.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUniversities();
  }, []);

  useEffect(() => {
    const fetchDormitories = async () => {
      if (!selectedUniversity) {
        setDormitories([]);
        return;
      }
      try {
        const response = await axios.get(`dormitories/?university_id=${selectedUniversity}`);
        setDormitories(response.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDormitories();
  }, [selectedUniversity]);

  useEffect(() => {
    const fetchLayout = async () => {
      if (!authTokens?.access || !selectedDormitory) {
        setLayoutBlocks([]);
        return;
      }
      try {
        setLoadingLayout(true);
        setBookingError('');
        const response = await axios.get(`dormitories/${selectedDormitory}/layout/`, {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        });
        setLayoutBlocks(response.data?.blocks || []);
        if (!response.data?.blocks?.length) {
          setSelectedBlock('');
        }
      } catch (error) {
        const message = error?.response?.data?.error || 'Unable to load dormitory structure.';
        setBookingError(translateApiError(t, message));
        setLayoutBlocks([]);
      } finally {
        setLoadingLayout(false);
      }
    };
    fetchLayout();
  }, [authTokens, selectedDormitory, t]);

  useEffect(() => {
    const fetchSeats = async () => {
      if (!authTokens?.access || !selectedDormitory || !selectedBlock) {
        setSeats([]);
        return;
      }
      try {
        setLoadingSeats(true);
        setBookingError('');
        const params = new URLSearchParams({
          dormitory_id: selectedDormitory,
          block: selectedBlock,
        });
        if (selectedRoomNumber) params.append('room_number', selectedRoomNumber);
        const response = await axios.get(`seats/available/?${params.toString()}`, {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        });
        setSeats(response.data || []);
      } catch (error) {
        const message = error?.response?.data?.error || 'Unable to load available seats.';
        setBookingError(translateApiError(t, message));
        setSeats([]);
      } finally {
        setLoadingSeats(false);
      }
    };
    fetchSeats();
  }, [authTokens, selectedUniversity, selectedDormitory, selectedBlock, selectedRoomNumber, t]);

  const selectedBlockLayout = useMemo(
    () => layoutBlocks.find((item) => item.block === selectedBlock) || null,
    [layoutBlocks, selectedBlock]
  );
  const selectedUniversityData = useMemo(
    () => universities.find((item) => String(item.id) === String(selectedUniversity)) || null,
    [universities, selectedUniversity]
  );
  const selectedDormitoryData = useMemo(
    () => dormitories.find((item) => String(item.id) === String(selectedDormitory)) || null,
    [dormitories, selectedDormitory]
  );

  const floorOptions = useMemo(() => selectedBlockLayout?.floors || [], [selectedBlockLayout]);

  const roomOptions = useMemo(() => {
    const rooms = selectedBlockLayout?.rooms || [];
    const filtered = selectedFloor
      ? rooms.filter((room) => String(room.floor) === String(selectedFloor))
      : rooms;
    return filtered.map((room) => room.room_number).sort((a, b) => Number(a) - Number(b));
  }, [selectedBlockLayout, selectedFloor]);

  const groupedSeats = useMemo(() => {
    return seats.reduce((acc, seat) => {
      const room = seat.room_number;
      if (!acc[room]) acc[room] = [];
      acc[room].push(seat);
      return acc;
    }, {});
  }, [seats]);

  const goToConfirmation = () => {
    if (!selectedSeat || !selectedSemester) {
      setBookingError(t('booking.errorChooseSemesterSeat'));
      return;
    }
    const pricePerSemester = Number(selectedDormitoryData?.price_per_semester || 195000);
    const totalAmount = pricePerSemester * Number(selectedSemester || 1);
    const draft = {
      university_id: selectedUniversity,
      dormitory_id: selectedDormitory,
      dormitory_name: selectedDormitoryData?.name || '',
      block: selectedSeat.block,
      room_number: String(selectedSeat.room_number),
      seat_number: selectedSeat.seat_number,
      semester_duration: Number(selectedSemester),
      price_per_semester: pricePerSemester,
      amount: totalAmount,
      image_url: selectedDormitoryData?.image_url || '',
      room_image_url: selectedDormitoryData?.room_image_url || '',
      university_image_url: selectedUniversityData?.image_url || '',
    };
    localStorage.setItem('bookingDraft', JSON.stringify(draft));
    navigate('/confirmation-booking');
  };

  return (
    <main className='booking'>
      <Navbar />
      <div className='wrapper booking-content'>
        <div className='booking-system'>
          <div className='booking-panel'>
            <img src={require('../img/logoDorm.png')} alt="booking-logo" />
            <h2>{t('booking.title')}</h2>
            <p className='txt booking-subtitle'>{t('booking.subtitle')}</p>

            <div className='booking-select-row'>
              <label className='booking-field'>
                <span className='booking-field-label'>{t('booking.selectUniversity')}</span>
                <select
                  className='booking-select'
                  value={selectedUniversity}
                  onChange={(event) => {
                    setSelectedUniversity(event.target.value);
                    setSelectedDormitory('');
                    setSelectedBlock('');
                    setSelectedFloor('');
                    setSelectedRoomNumber('');
                    setSelectedSeat(null);
                  }}
                >
                  <option value="">{t('booking.selectUniversity')}</option>
                  {universities.map((university) => (
                    <option key={university.id} value={university.id}>
                      {university.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className='booking-field'>
                <span className='booking-field-label'>{t('booking.selectDormitory')}</span>
                <select
                  className='booking-select'
                  value={selectedDormitory}
                  onChange={(event) => {
                    setSelectedDormitory(event.target.value);
                    setSelectedBlock('');
                    setSelectedFloor('');
                    setSelectedRoomNumber('');
                    setSelectedSeat(null);
                  }}
                  disabled={!selectedUniversity}
                >
                  <option value="">{t('booking.selectDormitory')}</option>
                  {dormitories.map((dormitory) => (
                    <option key={dormitory.id} value={dormitory.id}>
                      {dormitory.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {selectedUniversityData?.image_url && (
              <div className="booking-preview booking-preview-university">
                <p className="booking-preview-title">{t('booking.universityPreview')}</p>
                <div className="booking-preview-images">
                  <img
                    src={selectedUniversityData.image_url}
                    alt={selectedUniversityData.name}
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            {selectedDormitoryData && (
              <div className="booking-preview booking-preview-dorm">
                <p className="booking-preview-price">
                  {t('booking.pricePerSemester')}: {Number(selectedDormitoryData.price_per_semester || 0).toLocaleString('ru-RU')} ₸
                </p>
                <div className="booking-preview-images">
                  {selectedDormitoryData.image_url && (
                    <figure>
                      <img
                        src={selectedDormitoryData.image_url}
                        alt={t('booking.exterior')}
                        loading="lazy"
                      />
                      <figcaption>{t('booking.exterior')}</figcaption>
                    </figure>
                  )}
                  {selectedDormitoryData.room_image_url && (
                    <figure>
                      <img
                        src={selectedDormitoryData.room_image_url}
                        alt={t('booking.roomPreview')}
                        loading="lazy"
                      />
                      <figcaption>{t('booking.roomPreview')}</figcaption>
                    </figure>
                  )}
                </div>
              </div>
            )}

            <div className='booking-block-group'>
              {layoutBlocks.map((blockInfo) => (
                <button
                  key={blockInfo.block}
                  type="button"
                  className={`booking-block-btn ${selectedBlock === blockInfo.block ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedBlock(blockInfo.block);
                    setSelectedFloor('');
                    setSelectedRoomNumber('');
                    setSelectedSeat(null);
                  }}
                >
                  {t('booking.block', { block: blockInfo.block })}
                </button>
              ))}
            </div>

            {!loadingLayout && selectedDormitory && layoutBlocks.length === 0 && (
              <p className="booking-hint">{t('booking.noBlocks')}</p>
            )}
            {selectedBlockLayout && (
              <p className="booking-availability">
                {t('booking.availableInBlock', { block: selectedBlockLayout.block })}: {selectedBlockLayout.available_seats} / {selectedBlockLayout.total_seats}
              </p>
            )}

            <div className='booking-select-row booking-select-row-triple'>
              <label className='booking-field'>
                <span className='booking-field-label'>{t('booking.floor')}</span>
                <select
                  className='booking-select'
                  value={selectedFloor}
                  onChange={(event) => {
                    setSelectedFloor(event.target.value);
                    setSelectedRoomNumber('');
                    setSelectedSeat(null);
                  }}
                  disabled={!selectedBlock || floorOptions.length === 0}
                >
                  <option value="">{t('booking.allFloors')}</option>
                  {floorOptions.map((floor) => (
                    <option key={floor} value={floor}>
                      {t('booking.floor')} {floor}
                    </option>
                  ))}
                </select>
              </label>

              <label className='booking-field'>
                <span className='booking-field-label'>{t('booking.selectSemester')}</span>
                <select
                  className='booking-select'
                  value={selectedSemester}
                  onChange={(event) => setSelectedSemester(event.target.value)}
                >
                  <option value="">{t('booking.selectSemester')}</option>
                  <option value="1">{t('booking.semester1')}</option>
                  <option value="2">{t('booking.semester2')}</option>
                </select>
              </label>

              <label className='booking-field'>
                <span className='booking-field-label'>{t('booking.room')}</span>
                <select
                  className='booking-select'
                  value={selectedRoomNumber}
                  onChange={(event) => {
                    setSelectedRoomNumber(event.target.value);
                    setSelectedSeat(null);
                  }}
                  disabled={roomOptions.length === 0}
                >
                  <option value="">{t('booking.allRooms')}</option>
                  {roomOptions.map((room) => (
                    <option key={room} value={room}>
                      {t('booking.room')} {room}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {loadingLayout && <p className="booking-hint">{t('booking.loadingLayout')}</p>}
            {loadingSeats && <p className="booking-hint">{t('booking.loadingSeats')}</p>}
            {!loadingSeats && !loadingLayout && selectedBlock && Object.keys(groupedSeats).length === 0 && (
              <p className="booking-hint">{t('booking.noSeats')}</p>
            )}

            {!loadingSeats && Object.keys(groupedSeats).length > 0 && (
              <div className="booking-rooms-grid">
                {Object.keys(groupedSeats).sort((a, b) => Number(a) - Number(b)).map((room) => (
                  <div key={room} className="booking-room-card">
                    <h4>{t('booking.room')} {room}</h4>
                    <div className="booking-seats-row">
                      {groupedSeats[room].map((seat) => (
                        <button
                          key={seat.id}
                          type="button"
                          onClick={() => setSelectedSeat(seat)}
                          className={`seat-place ${selectedSeat?.id === seat.id ? 'selected-seat' : ''}`}
                        >
                          {t('booking.seat')} {seat.seat_number}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {bookingError && <p className="ui-error form-feedback booking-error">{bookingError}</p>}

            <div className='booking-actions'>
              <button
                type="button"
                className='booking-btn-secondary'
                onClick={() => {
                  setSelectedSeat(null);
                  setSelectedRoomNumber('');
                  setSeats([]);
                }}
              >
                {t('booking.restart')}
              </button>
              <button type="button" className='booking-btn-primary' onClick={goToConfirmation}>
                {t('booking.goToConfirm')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
