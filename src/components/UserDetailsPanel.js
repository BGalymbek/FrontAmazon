import React from 'react';
import { useTranslation } from 'react-i18next';
import DocumentThumb from './DocumentThumb';

function InfoRow({ label, value }) {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  return (
    <div className="user-detail-row">
      <span className="user-detail-label">{label}</span>
      <span className="user-detail-value">{String(value)}</span>
    </div>
  );
}

function DocumentsBlock({ documents, t }) {
  if (!documents || typeof documents === 'string') {
    return <p className="ui-muted">{documents || t('admin.noDocuments')}</p>;
  }

  const items = [
    { key: 'form_075', label: t('docs.form075'), kind: 'document' },
    { key: 'identity_card_copy', label: t('docs.identityCard'), kind: 'document' },
    { key: 'photo_3x4', label: t('docs.photo'), kind: 'photo' },
    { key: 'statement', label: t('docs.statement'), kind: 'document' },
  ];

  return (
    <div className="user-docs-grid">
      {items.map((item) => (
        <div key={item.key} className="user-doc-card">
          <p>{item.label}</p>
          <DocumentThumb fileUrl={documents[item.key]} label={item.label} kind={item.kind} />
          <span className={`doc-status-pill ${documents.is_verified ? 'verified' : 'pending'}`}>
            {documents.is_verified ? t('admin.verified') : t('admin.pending')}
          </span>
        </div>
      ))}
    </div>
  );
}

function BookingsBlock({ bookings, t }) {
  if (!bookings || typeof bookings === 'string') {
    return <p className="ui-muted">{bookings || t('admin.noBookings')}</p>;
  }
  if (!Array.isArray(bookings) || bookings.length === 0) {
    return <p className="ui-muted">{t('admin.noBookings')}</p>;
  }

  return (
    <div className="ui-stack">
      {bookings.map((booking) => (
        <div key={booking.id} className="ui-list-item">
          <p>
            <strong>{t('admin.seat')}:</strong> {booking.seat_detail?.seat_number || booking.seat_number || '—'}
            {' · '}
            <strong>{t('admin.room')}:</strong> {booking.seat_detail?.room_number || booking.room_number || '—'}
          </p>
          <p className="ui-muted">
            {t('admin.semester')}: {booking.semester_duration || '—'} | {t('admin.active')}: {booking.is_active !== false ? t('common.yes') : t('common.no')}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function UserDetailsPanel({ details, email }) {
  const { t } = useTranslation();

  if (!details) {
    return <p className="ui-muted">{t('admin.selectUser')}</p>;
  }

  return (
    <div className="user-details-panel">
      <div className="user-details-header">
        <h3>{details.first_name} {details.last_name}</h3>
        <p className="ui-muted">{email || details.email}</p>
      </div>

      <section className="user-details-section">
        <h4>{t('admin.personalInfo')}</h4>
        <InfoRow label={t('admin.studentId')} value={details.id_number} />
        <InfoRow label={t('admin.birthDate')} value={details.birth_date} />
        <InfoRow label={t('admin.gender')} value={details.gender} />
        <InfoRow label={t('admin.role')} value={details.role} />
        <InfoRow label={t('admin.university')} value={details.university_name} />
        <InfoRow label={t('admin.faculty')} value={details.faculty_name} />
        <InfoRow label={t('admin.specialty')} value={details.specialty_name} />
        <InfoRow label={t('admin.docSubmitted')} value={details.is_doc_submitted ? t('common.yes') : t('common.no')} />
        <InfoRow label={t('admin.inDorm')} value={details.is_dorm ? t('common.yes') : t('common.no')} />
      </section>

      {details.application && (
        <section className="user-details-section">
          <h4>{t('admin.application')}</h4>
          <InfoRow label={t('admin.status')} value={details.application.status} />
          <InfoRow label={t('admin.type')} value={details.application.application_type} />
          <InfoRow label={t('admin.priority')} value={details.application.priority_score} />
          {details.application.admin_comment && (
            <InfoRow label={t('admin.comment')} value={details.application.admin_comment} />
          )}
        </section>
      )}

      <section className="user-details-section">
        <h4>{t('admin.documents')}</h4>
        <DocumentsBlock documents={details.submission_documents} t={t} />
      </section>

      <section className="user-details-section">
        <h4>{t('admin.bookings')}</h4>
        <BookingsBlock bookings={details.bookings} t={t} />
      </section>
    </div>
  );
}
