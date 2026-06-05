import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function Notifications() {
  const { authTokens } = useContext(AuthContext);
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadNotifications = async () => {
      setLoading(true);
      setErrorMessage('');
      try {
        const response = await axios.get('notifications/', {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        setNotifications(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        setErrorMessage(t('notifications.loadError'));
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, [authTokens]);

  return (
    <div className='rooms'>
      <Navbar />
      <div className='rooms-container'>
        <section className='dorm-information'>
          <header className='dorm-information-header'>
            <div className='title-main'>
              <h1>{t('notifications.title')}</h1>
              <p>{t('notifications.desc')}</p>
            </div>
          </header>
        </section>

        <section className="ui-card">
          {loading && <p className="ui-muted">{t('common.loading')}</p>}
          {!loading && errorMessage && <p className="ui-error">{errorMessage}</p>}
          {!loading && !errorMessage && notifications.length === 0 && (
            <p className="ui-muted">{t('notifications.empty')}</p>
          )}

          {!loading && notifications.length > 0 && (
            <div className="ui-stack">
              {notifications.map((item) => (
                <div key={item.id} className="ui-list-item">
                  <h3>{item.title || t('notifications.defaultTitle')}</h3>
                  <p>{item.body}</p>
                  <small className="ui-muted">
                    {item.created_at ? new Date(item.created_at).toLocaleString() : ''}
                  </small>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
