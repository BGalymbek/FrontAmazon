import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import AuthContext from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

const STATUS_OPTIONS = [
  'under_review',
  'requires_clarification',
  'approved',
  'rejected',
  'expired',
];

export default function AdminApplications() {
  const { authTokens } = useContext(AuthContext);
  const { t } = useTranslation();
  const [applications, setApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [commentById, setCommentById] = useState({});

  const loadApplications = async () => {
    setLoading(true);
    try {
      const params = statusFilter ? { status: statusFilter } : {};
      const response = await axios.get('applications/', {
        params,
        headers: { Authorization: `Bearer ${authTokens.access}` },
      });
      setApplications(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setMessage('Failed to load applications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, [authTokens, statusFilter]);

  const updateStatus = async (id, status) => {
    setMessage('');
    try {
      await axios.patch(
        `applications/${id}/`,
        {
          status,
          admin_comment: commentById[id] || '',
        },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      );
      setMessage(`Application #${id} updated to ${status}.`);
      await loadApplications();
    } catch (error) {
      setMessage(error?.response?.data?.admin_comment?.[0] || 'Failed to update application.');
    }
  };

  const downloadPayments = (e) => {
    e.preventDefault();
    axios
      .get('admin/reports/payments/', {
        headers: { Authorization: `Bearer ${authTokens.access}` },
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'payments_report.csv');
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  };

  return (
    <div className="rooms">
      <Navbar />
      <div className="rooms-container">
        <section className="dorm-information">
          <header className="dorm-information-header">
            <div className="title-main">
              <h1>{t('admin.applicationsTitle')}</h1>
              <p>{t('admin.applicationsDesc')}</p>
            </div>
          </header>
        </section>

        <div className="ui-toolbar">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All statuses</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <a href="#download" className="ui-link-btn" onClick={downloadPayments}>
            {t('admin.downloadPayments')}
          </a>
        </div>

        {loading && <p className="ui-muted">Loading...</p>}
        {message && (
          <p className={message.includes('Failed') ? 'ui-error' : 'ui-success'}>{message}</p>
        )}

        <div className="ui-stack">
          {applications.map((item) => (
            <div key={item.id} className="admin-app-card">
              <h3>
                #{item.id} — {item.user_name} ({item.user_email})
              </h3>
              <p>
                Status: <strong>{item.status}</strong> | Priority: {item.priority_score} | Type:{' '}
                {item.application_type}
              </p>
              {item.admin_comment && <p>Comment: {item.admin_comment}</p>}
              <textarea
                placeholder="Admin comment (required for reject/clarification)"
                value={commentById[item.id] || ''}
                onChange={(e) => setCommentById((prev) => ({ ...prev, [item.id]: e.target.value }))}
              />
              <div className="admin-status-btns">
                {STATUS_OPTIONS.map((status) => (
                  <button key={status} type="button" onClick={() => updateStatus(item.id, status)}>
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
