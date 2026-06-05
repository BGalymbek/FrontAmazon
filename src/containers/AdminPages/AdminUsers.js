import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import AuthContext from '../../context/AuthContext';
import UserDetailsPanel from '../../components/UserDetailsPanel';
import { useTranslation } from 'react-i18next';

export default function AdminUsers() {
  const { authTokens } = useContext(AuthContext);
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await axios.get('users/', {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        });
        setUsers(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [authTokens]);

  const loadDetails = async (email) => {
    setSelectedEmail(email);
    try {
      const response = await axios.get('user-details/', {
        params: { email },
        headers: { Authorization: `Bearer ${authTokens.access}` },
      });
      setDetails(response.data);
    } catch (error) {
      setDetails(null);
    }
  };

  return (
    <div className="rooms">
      <Navbar />
      <div className="rooms-container">
        <section className="dorm-information">
          <header className="dorm-information-header">
            <div className="title-main">
              <h1>{t('admin.usersTitle')}</h1>
              <p>{t('admin.usersDesc')}</p>
            </div>
          </header>
        </section>

        {loading && <p className="ui-muted">{t('common.loading')}</p>}

        <div className="admin-users-grid">
          <div className="ui-card">
            <h3>{t('admin.registeredUsers')}</h3>
            <ul className="admin-user-list">
              {users.map((user) => (
                <li key={user.email}>
                  <button
                    type="button"
                    className={selectedEmail === user.email ? 'active' : ''}
                    onClick={() => loadDetails(user.email)}
                  >
                    {user.first_name} {user.last_name} — {user.email}
                  </button>
                  <Link className="ui-link-btn" to={`/detailed-doc/${encodeURIComponent(user.email)}`}>
                    {t('admin.openDocs')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="ui-card">
            <UserDetailsPanel details={details} email={selectedEmail} />
          </div>
        </div>
      </div>
    </div>
  );
}
