import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AuthContext from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { isAdminLikeUser } from '../utils/authRoles';

export default function UniversitiesOverview() {
  const { authTokens } = useContext(AuthContext);
  const { t } = useTranslation();
  const isAdmin = isAdminLikeUser(authTokens?.user);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUniversities = async () => {
      try {
        const response = await axios.get('universities/overview/');
        setUniversities(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError(t('universities.loadError'));
      } finally {
        setLoading(false);
      }
    };
    loadUniversities();
  }, [t]);

  return (
    <div className="universities-page">
      <Navbar />
      <div className="universities-container">
        <header className="universities-hero">
          <div>
            <h1>{t('universities.title')}</h1>
            <p>{t('universities.subtitle')}</p>
          </div>
          <Link to={isAdmin ? '/admin-dashboard' : '/booking'} className="ui-btn ui-btn-primary">
            {isAdmin ? t('nav.adminPanel') : t('universities.startBooking')}
          </Link>
        </header>

        {loading && <p className="universities-muted">{t('common.loading')}</p>}
        {error && <p className="ui-error">{error}</p>}

        <div className="universities-grid">
          {universities.map((university) => {
            const stats = university.stats || {};
            const occupancy = stats.occupancy_percent || 0;
            return (
              <article key={university.id} className="university-card">
                <div className="university-card-image-wrap">
                  {university.image_url ? (
                    <img src={university.image_url} alt={university.name} />
                  ) : (
                    <div className="university-card-placeholder">{university.short_name || university.name}</div>
                  )}
                </div>
                <div className="university-card-body">
                  <div className="university-card-head">
                    <h2>{university.name}</h2>
                    <span className="university-city">{university.city}</span>
                  </div>

                  <div className="university-stats">
                    <div className="university-stat">
                      <span className="label">{t('universities.dormitories')}</span>
                      <strong>{stats.dormitories_count ?? 0}</strong>
                    </div>
                    <div className="university-stat">
                      <span className="label">{t('universities.totalSeats')}</span>
                      <strong>{stats.total_seats ?? 0}</strong>
                    </div>
                    <div className="university-stat">
                      <span className="label">{t('universities.availableSeats')}</span>
                      <strong className="available">{stats.available_seats ?? 0}</strong>
                    </div>
                  </div>

                  <div className="university-occupancy">
                    <div className="university-occupancy-top">
                      <span>{t('universities.occupancy')}</span>
                      <span>{occupancy}%</span>
                    </div>
                    <div className="university-occupancy-bar">
                      <div className="university-occupancy-fill" style={{ width: `${occupancy}%` }} />
                    </div>
                  </div>

                  {stats.min_price_per_semester && (
                    <p className="university-price">
                      {t('universities.fromPrice', {
                        amount: Number(stats.min_price_per_semester).toLocaleString('ru-RU'),
                      })}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
