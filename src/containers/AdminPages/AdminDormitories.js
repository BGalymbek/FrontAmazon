import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import AuthContext from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

const emptyRoom = { block: 'A', room_number: '', seats_count: 4 };

const emptyForm = {
  university_id: '',
  name: '',
  address: '',
  male_blocks: 'A,B',
  female_blocks: 'C,D',
  price_per_semester: '195000',
  image_url: '',
  room_image_url: '',
  rooms: [{ ...emptyRoom }],
};

export default function AdminDormitories() {
  const { authTokens } = useContext(AuthContext);
  const { t } = useTranslation();
  const [dormitories, setDormitories] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [editForm, setEditForm] = useState(null);

  const managedUniversity = authTokens?.user?.managed_university;
  const managedUniversityId = authTokens?.user?.managed_university_id;
  const isPlatformAdmin = authTokens?.user?.is_platform_admin;

  useEffect(() => {
    if (!isPlatformAdmin) {
      return;
    }
    const loadUniversities = async () => {
      try {
        const response = await axios.get('universities/');
        const items = Array.isArray(response.data) ? response.data : [];
        setUniversities(items);
        if (items.length > 0) {
          setForm((prev) => ({ ...prev, university_id: String(items[0].id) }));
        }
      } catch (error) {
        setMessage(t('adminDorm.universitiesLoadError'));
      }
    };
    loadUniversities();
  }, [isPlatformAdmin, t]);

  useEffect(() => {
    if (managedUniversityId) {
      setForm((prev) => ({ ...prev, university_id: String(managedUniversityId) }));
    }
  }, [managedUniversityId]);

  const loadDormitories = async () => {
    setLoading(true);
    try {
      const response = await axios.get('admin/dormitories/', {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      });
      setDormitories(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setMessage(t('adminDorm.loadError'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDormitories();
  }, [authTokens]);

  const updateRoom = (targetForm, setTargetForm, index, field, value) => {
    setTargetForm((prev) => {
      const rooms = [...prev.rooms];
      rooms[index] = { ...rooms[index], [field]: value };
      return { ...prev, rooms };
    });
  };

  const addRoomRow = (targetForm, setTargetForm) => {
    setTargetForm((prev) => ({ ...prev, rooms: [...prev.rooms, { ...emptyRoom }] }));
  };

  const removeRoomRow = (targetForm, setTargetForm, index) => {
    setTargetForm((prev) => ({
      ...prev,
      rooms: prev.rooms.filter((_, roomIndex) => roomIndex !== index),
    }));
  };

  const extractErrorMessage = (error, fallback) => {
    const data = error?.response?.data;
    if (!data) {
      return fallback;
    }
    if (typeof data.detail === 'string') {
      return data.detail;
    }
    if (Array.isArray(data)) {
      return data.join(' ');
    }
    if (typeof data === 'object') {
      const firstKey = Object.keys(data)[0];
      const value = data[firstKey];
      if (Array.isArray(value)) {
        return value.join(' ');
      }
      if (typeof value === 'string') {
        return value;
      }
    }
    return fallback;
  };

  const submitDormitory = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const payload = {
        ...form,
        university_id: Number(form.university_id),
        price_per_semester: Number(form.price_per_semester),
        rooms: form.rooms.map((room) => ({
          block: room.block,
          room_number: Number(room.room_number),
          seats_count: Number(room.seats_count),
        })),
      };
      if (!payload.university_id) {
        setMessage(t('adminDorm.universityRequired'));
        setSaving(false);
        return;
      }
      await axios.post('admin/dormitories/', payload, {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      });
      setMessage(t('adminDorm.createSuccess'));
      setForm({
        ...emptyForm,
        university_id: managedUniversityId
          ? String(managedUniversityId)
          : universities[0]?.id
            ? String(universities[0].id)
            : '',
      });
      await loadDormitories();
    } catch (error) {
      setMessage(extractErrorMessage(error, t('adminDorm.createFailed')));
    } finally {
      setSaving(false);
    }
  };

  const startEdit = async (dormitoryId) => {
    setMessage('');
    setSaving(true);
    try {
      const response = await axios.get(`admin/dormitories/${dormitoryId}/`, {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      });
      const dormitory = response.data;
      setEditingId(dormitoryId);
      setEditForm({
        name: dormitory.name || '',
        address: dormitory.address || '',
        male_blocks: dormitory.male_blocks || '',
        female_blocks: dormitory.female_blocks || '',
        price_per_semester: String(dormitory.price_per_semester ?? ''),
        image_url: dormitory.image_url || '',
        room_image_url: dormitory.room_image_url || '',
        university_name: dormitory.university_name || '',
        rooms: (dormitory.rooms || []).map((room) => ({
          id: room.id,
          block: room.block,
          room_number: String(room.room_number),
          seats_count: room.seats_count ?? room.total_seats,
          reserved_seats: room.reserved_seats ?? 0,
        })),
      });
    } catch (error) {
      setMessage(extractErrorMessage(error, t('adminDorm.loadDetailError')));
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const submitEdit = async (event) => {
    event.preventDefault();
    if (!editingId || !editForm) {
      return;
    }
    setSaving(true);
    setMessage('');
    try {
      const payload = {
        name: editForm.name,
        address: editForm.address,
        male_blocks: editForm.male_blocks,
        female_blocks: editForm.female_blocks,
        price_per_semester: Number(editForm.price_per_semester),
        image_url: editForm.image_url,
        room_image_url: editForm.room_image_url,
        rooms: editForm.rooms.map((room) => ({
          ...(room.id ? { id: room.id } : {}),
          block: room.block,
          room_number: Number(room.room_number),
          seats_count: Number(room.seats_count),
        })),
      };
      await axios.patch(`admin/dormitories/${editingId}/`, payload, {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      });
      setMessage(t('adminDorm.updateSuccess'));
      cancelEdit();
      await loadDormitories();
    } catch (error) {
      setMessage(extractErrorMessage(error, t('adminDorm.updateFailed')));
    } finally {
      setSaving(false);
    }
  };

  const renderRoomRows = (targetForm, setTargetForm, isEdit = false) => (
    <div className="admin-dorm-rooms">
      {targetForm.rooms.map((room, index) => (
        <div key={room.id ? `room-${room.id}` : `room-new-${index}`} className="admin-dorm-room-row">
          <input
            placeholder={t('adminDorm.block')}
            value={room.block}
            onChange={(e) => updateRoom(targetForm, setTargetForm, index, 'block', e.target.value)}
            required
          />
          <input
            type="number"
            placeholder={t('adminDorm.roomNumber')}
            value={room.room_number}
            onChange={(e) => updateRoom(targetForm, setTargetForm, index, 'room_number', e.target.value)}
            required
          />
          <input
            type="number"
            min={isEdit ? room.reserved_seats || 0 : 1}
            placeholder={t('adminDorm.seatsCount')}
            value={room.seats_count}
            onChange={(e) => updateRoom(targetForm, setTargetForm, index, 'seats_count', e.target.value)}
            required
          />
          {isEdit && Number(room.reserved_seats) > 0 && (
            <span className="admin-dorm-room-hint">
              {t('adminDorm.reservedSeats', { count: room.reserved_seats })}
            </span>
          )}
          <button
            type="button"
            className="ui-btn ui-btn-danger"
            onClick={() => removeRoomRow(targetForm, setTargetForm, index)}
            disabled={isEdit && targetForm.rooms.length <= 1}
          >
            {t('adminDorm.removeRoom')}
          </button>
        </div>
      ))}
    </div>
  );

  const isSuccessMessage =
    message === t('adminDorm.createSuccess') || message === t('adminDorm.updateSuccess');

  return (
    <div className="rooms">
      <Navbar />
      <div className="rooms-container">
        <section className="dorm-information">
          <header className="dorm-information-header">
            <div className="title-main">
              <h1>{t('adminDorm.title')}</h1>
              <p>
                {managedUniversity
                  ? t('adminDorm.scopeUniversity', { university: managedUniversity })
                  : isPlatformAdmin
                    ? t('adminDorm.scopePlatform')
                    : t('adminDorm.scopeMissing')}
              </p>
            </div>
          </header>
        </section>

        {message && (
          <p className={isSuccessMessage ? 'ui-success' : 'ui-error'}>{message}</p>
        )}

        <section className="ui-card admin-dorm-form">
          <h2>{t('adminDorm.createTitle')}</h2>
          <form onSubmit={submitDormitory}>
            <div className="admin-dorm-grid">
              {isPlatformAdmin && (
                <label>
                  {t('adminDorm.university')}
                  <select
                    value={form.university_id}
                    onChange={(e) => setForm({ ...form, university_id: e.target.value })}
                    required
                  >
                    <option value="">{t('adminDorm.selectUniversity')}</option>
                    {universities.map((university) => (
                      <option key={university.id} value={university.id}>
                        {university.name}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <label>
                {t('adminDorm.name')}
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </label>
              <label>
                {t('adminDorm.price')}
                <input
                  type="number"
                  value={form.price_per_semester}
                  onChange={(e) => setForm({ ...form, price_per_semester: e.target.value })}
                  required
                />
              </label>
              <label>
                {t('adminDorm.address')}
                <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              </label>
              <label>
                {t('adminDorm.maleBlocks')}
                <input value={form.male_blocks} onChange={(e) => setForm({ ...form, male_blocks: e.target.value })} />
              </label>
              <label>
                {t('adminDorm.femaleBlocks')}
                <input
                  value={form.female_blocks}
                  onChange={(e) => setForm({ ...form, female_blocks: e.target.value })}
                />
              </label>
              <label>
                {t('adminDorm.imageUrl')}
                <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
              </label>
              <label>
                {t('adminDorm.roomImageUrl')}
                <input
                  value={form.room_image_url}
                  onChange={(e) => setForm({ ...form, room_image_url: e.target.value })}
                />
              </label>
            </div>

            <h3>{t('adminDorm.roomsTitle')}</h3>
            {renderRoomRows(form, setForm)}
            <div className="ui-actions-row">
              <button type="button" className="ui-btn" onClick={() => addRoomRow(form, setForm)}>
                {t('adminDorm.addRoom')}
              </button>
              <button type="submit" className="ui-btn ui-btn-primary" disabled={saving}>
                {saving ? t('common.saving') : t('adminDorm.create')}
              </button>
            </div>
          </form>
        </section>

        {editForm && (
          <section className="ui-card admin-dorm-form admin-dorm-edit">
            <h2>{t('adminDorm.editTitle')}</h2>
            <p className="admin-dorm-edit-scope">{editForm.university_name}</p>
            <form onSubmit={submitEdit}>
              <div className="admin-dorm-grid">
                <label>
                  {t('adminDorm.name')}
                  <input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    required
                  />
                </label>
                <label>
                  {t('adminDorm.price')}
                  <input
                    type="number"
                    value={editForm.price_per_semester}
                    onChange={(e) => setEditForm({ ...editForm, price_per_semester: e.target.value })}
                    required
                  />
                </label>
                <label>
                  {t('adminDorm.address')}
                  <input
                    value={editForm.address}
                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  />
                </label>
                <label>
                  {t('adminDorm.maleBlocks')}
                  <input
                    value={editForm.male_blocks}
                    onChange={(e) => setEditForm({ ...editForm, male_blocks: e.target.value })}
                  />
                </label>
                <label>
                  {t('adminDorm.femaleBlocks')}
                  <input
                    value={editForm.female_blocks}
                    onChange={(e) => setEditForm({ ...editForm, female_blocks: e.target.value })}
                  />
                </label>
                <label>
                  {t('adminDorm.imageUrl')}
                  <input
                    value={editForm.image_url}
                    onChange={(e) => setEditForm({ ...editForm, image_url: e.target.value })}
                  />
                </label>
                <label>
                  {t('adminDorm.roomImageUrl')}
                  <input
                    value={editForm.room_image_url}
                    onChange={(e) => setEditForm({ ...editForm, room_image_url: e.target.value })}
                  />
                </label>
              </div>

              <h3>{t('adminDorm.roomsTitle')}</h3>
              {renderRoomRows(editForm, setEditForm, true)}
              <div className="ui-actions-row">
                <button type="button" className="ui-btn" onClick={() => addRoomRow(editForm, setEditForm)}>
                  {t('adminDorm.addRoom')}
                </button>
                <button type="button" className="ui-btn" onClick={cancelEdit} disabled={saving}>
                  {t('adminDorm.cancelEdit')}
                </button>
                <button type="submit" className="ui-btn ui-btn-primary" disabled={saving}>
                  {saving ? t('common.saving') : t('adminDorm.saveChanges')}
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="ui-card">
          <h2>{t('adminDorm.existingTitle')}</h2>
          {loading ? (
            <p>{t('common.loading')}</p>
          ) : dormitories.length === 0 ? (
            <p>{t('adminDorm.empty')}</p>
          ) : (
            <div className="admin-dorm-list">
              {dormitories.map((dormitory) => (
                <article
                  key={dormitory.id}
                  className={`admin-dorm-item${editingId === dormitory.id ? ' admin-dorm-item-active' : ''}`}
                >
                  <div>
                    <h3>{dormitory.name}</h3>
                    <p>{dormitory.university_name}</p>
                    <p>
                      {Number(dormitory.price_per_semester).toLocaleString('ru-RU')} ₸ / {t('adminDorm.semester')}
                    </p>
                  </div>
                  <div className="admin-dorm-item-stats">
                    <span>{t('adminDorm.rooms')}: {dormitory.stats?.rooms_count ?? 0}</span>
                    <span>{t('universities.totalSeats')}: {dormitory.stats?.total_seats ?? 0}</span>
                    <span>{t('universities.availableSeats')}: {dormitory.stats?.available_seats ?? 0}</span>
                  </div>
                  <button
                    type="button"
                    className="ui-btn ui-btn-primary"
                    onClick={() => startEdit(dormitory.id)}
                    disabled={saving}
                  >
                    {editingId === dormitory.id ? t('adminDorm.editing') : t('adminDorm.edit')}
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
