import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import AuthContext from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';

const CHART_COLORS = ['#1f3a8a', '#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#64748b'];

function formatStatusLabel(status, t) {
  const key = `admin.statuses.${status}`;
  const translated = t(key);
  return translated === key ? status : translated;
}

export default function AdminDashboard() {
  const { authTokens } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const [metrics, setMetrics] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const [metricsResponse, logsResponse] = await Promise.all([
          axios.get('admin/dashboard/', {
            headers: { Authorization: `Bearer ${authTokens.access}` },
          }),
          axios.get('admin/audit-logs/', {
            headers: { Authorization: `Bearer ${authTokens.access}` },
          }),
        ]);
        setMetrics(metricsResponse.data);
        setAuditLogs(Array.isArray(logsResponse.data) ? logsResponse.data.slice(0, 8) : []);
      } catch (err) {
        setError(t('admin.loadError'));
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
  }, [authTokens, t]);

  const applicationsChart = (metrics?.charts?.applications_by_status || []).map((item) => ({
    name: formatStatusLabel(item.status, t),
    count: item.count,
  }));

  const paymentsChart = (metrics?.charts?.payments_by_status || []).map((item) => ({
    name: formatStatusLabel(item.status, t),
    count: item.count,
  }));

  const funnelChart = (metrics?.charts?.document_funnel || []).map((item) => ({
    name: t(`admin.funnel.${item.stage}`),
    count: item.count,
  }));

  const bookingsTimeline = metrics?.charts?.bookings_timeline || [];

  const currency = new Intl.NumberFormat(i18n.language === 'ru' ? 'ru-RU' : 'en-US');

  return (
    <div className='rooms'>
      <Navbar />
      <div className='rooms-container'>
        <section className='dorm-information'>
          <header className='dorm-information-header'>
            <div className='title-main'>
              <h1>{t('admin.analyticsTitle')}</h1>
              <p>{t('admin.analyticsDesc')}</p>
            </div>
          </header>
        </section>

        {loading && <p className="ui-muted">{t('common.loading')}</p>}
        {error && <p className="ui-error">{error}</p>}

        {metrics && (
          <>
            <section className='numeric-data-dorm admin-metrics-grid'>
              <div className='data-dorm-item'>
                <h4>{t('admin.metricUsers')}</h4>
                <h1>{metrics.users_total}</h1>
                <p>{t('admin.metricUsersDesc')}</p>
              </div>
              <div className='data-dorm-item'>
                <h4>{t('admin.metricApplications')}</h4>
                <h1>{metrics.applications_total}</h1>
                <p>{t('admin.metricApplicationsDesc')}</p>
              </div>
              <div className='data-dorm-item'>
                <h4>{t('admin.metricDocsVerified')}</h4>
                <h1>{metrics.documents_verified}</h1>
                <p>{t('admin.metricDocsPending', { count: metrics.documents_pending })}</p>
              </div>
              <div className='data-dorm-item'>
                <h4>{t('admin.metricBookings')}</h4>
                <h1>{metrics.bookings_active}</h1>
                <p>{t('admin.metricBookingsDesc', { total: metrics.bookings_total })}</p>
              </div>
              <div className='data-dorm-item'>
                <h4>{t('admin.metricPayments')}</h4>
                <h1>{metrics.payments_paid}/{metrics.payments_pending}</h1>
                <p>{t('admin.metricPaymentsDesc', { failed: metrics.payments_failed })}</p>
              </div>
              <div className='data-dorm-item'>
                <h4>{t('admin.metricRevenue')}</h4>
                <h1>{currency.format(metrics.revenue_total)}</h1>
                <p>{t('admin.metricRevenueDesc')}</p>
              </div>
              <div className='data-dorm-item'>
                <h4>{t('admin.metricOccupancy')}</h4>
                <h1>{metrics.occupancy.percent}%</h1>
                <p>{t('admin.metricOccupancyDesc', {
                  reserved: metrics.occupancy.reserved_seats,
                  total: metrics.occupancy.total_seats,
                })}</p>
              </div>
            </section>

            <div className="admin-charts-grid">
              <section className="ui-card chart-card">
                <h3>{t('admin.chartApplications')}</h3>
                {applicationsChart.length === 0 ? (
                  <p className="ui-muted">{t('admin.noChartData')}</p>
                ) : (
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={applicationsChart}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#1f3a8a" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </section>

              <section className="ui-card chart-card">
                <h3>{t('admin.chartPayments')}</h3>
                {paymentsChart.length === 0 ? (
                  <p className="ui-muted">{t('admin.noChartData')}</p>
                ) : (
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie data={paymentsChart} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={95} label>
                        {paymentsChart.map((entry, index) => (
                          <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </section>

              <section className="ui-card chart-card">
                <h3>{t('admin.chartFunnel')}</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={funnelChart} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" allowDecimals={false} />
                    <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </section>

              <section className="ui-card chart-card">
                <h3>{t('admin.chartBookings')}</h3>
                {bookingsTimeline.length === 0 ? (
                  <p className="ui-muted">{t('admin.noChartData')}</p>
                ) : (
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={bookingsTimeline}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </section>
            </div>

            <section className="ui-card">
              <h3>{t('admin.auditTitle')}</h3>
              {auditLogs.length === 0 && <p className="ui-muted">{t('admin.noAudit')}</p>}
              {auditLogs.length > 0 && (
                <div className="ui-stack">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="ui-list-item">
                      <p>
                        <strong>{log.action}</strong> | {log.entity_type}:{log.entity_id || '-'}
                      </p>
                      <small className="ui-muted">
                        {log.user_email || t('admin.system')} | {log.created_at ? new Date(log.created_at).toLocaleString() : ''}
                      </small>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
