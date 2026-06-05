import React, { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AuthContext from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { formToProfilePayload, profileToForm } from '../utils/profileForm';

const EMPTY_FORM = profileToForm(null);

export default function Settings() {
  const { authTokens } = useContext(AuthContext);
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const [tab, setTab] = useState('theme');
  const [profile, setProfile] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [profileMessage, setProfileMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileLoadError, setProfileLoadError] = useState('');

  const [form, setForm] = useState(EMPTY_FORM);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const loadCurrentUser = useCallback(async () => {
    if (!authTokens?.access) {
      return;
    }

    setProfileLoading(true);
    setProfileLoadError('');
    try {
      const headers = { Authorization: `Bearer ${authTokens.access}` };
      const [userRes, uniRes, facRes, specRes] = await Promise.all([
        axios.get('current-user/', { headers }),
        axios.get('universities/'),
        axios.get('faculties/'),
        axios.get('specialities/'),
      ]);

      const data = userRes.data;
      let cachedProfile = {};
      try {
        cachedProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
      } catch (e) {
        cachedProfile = {};
      }
      const mergedProfile = { ...cachedProfile, ...data };
      setProfile(mergedProfile);
      setUniversities(Array.isArray(uniRes.data) ? uniRes.data : []);
      setFaculties(Array.isArray(facRes.data) ? facRes.data : []);
      setSpecialities(Array.isArray(specRes.data) ? specRes.data : []);
      setForm(profileToForm(mergedProfile));
      localStorage.setItem('userProfile', JSON.stringify(mergedProfile));

      const storedTokens = localStorage.getItem('authTokens');
      if (storedTokens) {
        try {
          const parsed = JSON.parse(storedTokens);
          if (parsed?.user) {
            parsed.user = { ...parsed.user, ...mergedProfile };
            localStorage.setItem('authTokens', JSON.stringify(parsed));
          }
        } catch (e) {
          // ignore invalid token cache
        }
      }
    } catch (error) {
      console.error(error);
      setProfileLoadError(t('settings.profileLoadError'));
    } finally {
      setProfileLoading(false);
    }
  }, [authTokens, t]);

  useEffect(() => {
    loadCurrentUser();
  }, [loadCurrentUser]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    setProfileMessage('');
    setProfileSaving(true);
    try {
      const response = await axios.patch('current-user/', formToProfilePayload(form), {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      });
      const data = response.data;
      let cachedProfile = {};
      try {
        cachedProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
      } catch (e) {
        cachedProfile = {};
      }
      const mergedProfile = { ...cachedProfile, ...data };
      setProfile(mergedProfile);
      setForm(profileToForm(mergedProfile));
      localStorage.setItem('userProfile', JSON.stringify(mergedProfile));
      setProfileMessage(t('settings.profileSaved'));
    } catch (error) {
      const detail = error?.response?.data;
      const firstError = detail && typeof detail === 'object'
        ? Object.values(detail).flat()[0]
        : null;
      setProfileMessage(firstError || t('settings.profileError'));
    } finally {
      setProfileSaving(false);
    }
  };

  const changePassword = async (event) => {
    event.preventDefault();
    setPasswordMessage('');
    setPasswordSuccess(false);
    try {
      const response = await axios.post(
        'change-password/',
        {
          old_password: oldPassword,
          new_password: newPassword,
          confirm_new_password: confirmPassword,
        },
        { headers: { Authorization: `Bearer ${authTokens.access}` } }
      );
      if (response.status === 200) {
        setPasswordSuccess(true);
        setPasswordMessage(t('settings.passwordSaved'));
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      const data = error?.response?.data;
      const msg =
        data?.old_password?.[0] ||
        data?.confirm_new_password?.[0] ||
        data?.non_field_errors?.[0] ||
        t('settings.passwordError');
      setPasswordMessage(msg);
    }
  };

  const filteredSpecialities = specialities.filter(
    (item) => !form.faculty || String(item.faculty) === String(form.faculty)
  );

  return (
    <div className="rooms">
      <Navbar />
      <div className="rooms-container">
        <section className="dorm-information">
          <header className="dorm-information-header">
            <div className="title-main">
              <h1>{t('settings.title')}</h1>
              <p>{t('settings.desc')}</p>
            </div>
          </header>
        </section>

        <div className="settings-tabs">
          <button type="button" className={tab === 'theme' ? 'active' : ''} onClick={() => setTab('theme')}>
            {t('settings.themeTab')}
          </button>
          <button type="button" className={tab === 'profile' ? 'active' : ''} onClick={() => setTab('profile')}>
            {t('settings.profileTab')}
          </button>
          <button type="button" className={tab === 'password' ? 'active' : ''} onClick={() => setTab('password')}>
            {t('settings.passwordTab')}
          </button>
        </div>

        {tab === 'theme' && (
          <section className="ui-card settings-panel">
            <h3>{t('settings.themeTitle')}</h3>
            <p className="ui-muted">{t('settings.themeDesc')}</p>
            <div className="theme-toggle-row">
              <button
                type="button"
                className={`ui-btn ${theme === 'light' ? 'ui-btn-primary' : 'ui-btn-secondary'}`}
                onClick={() => setTheme('light')}
              >
                {t('settings.themeLight')}
              </button>
              <button
                type="button"
                className={`ui-btn ${theme === 'dark' ? 'ui-btn-primary' : 'ui-btn-secondary'}`}
                onClick={() => setTheme('dark')}
              >
                {t('settings.themeDark')}
              </button>
            </div>
          </section>
        )}

        {tab === 'profile' && (
          <section className="ui-card settings-panel">
            <h3>{t('settings.profileTitle')}</h3>

            {profileLoading && <p className="ui-muted">{t('common.loading')}</p>}
            {profileLoadError && <p className="ui-error">{profileLoadError}</p>}

            {!profileLoading && !profileLoadError && (
              <form className="settings-form" onSubmit={saveProfile}>
                <div className="settings-grid">
                  <label>
                    {t('settings.email')}
                    <input type="email" value={profile?.email || ''} readOnly disabled className="input-readonly" />
                  </label>
                  <label>
                    {t('settings.firstName')}
                    <input
                      value={form.first_name}
                      onChange={(e) => updateField('first_name', e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    {t('settings.lastName')}
                    <input
                      value={form.last_name}
                      onChange={(e) => updateField('last_name', e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    {t('settings.studentId')}
                    <input
                      value={form.id_number}
                      onChange={(e) => updateField('id_number', e.target.value)}
                    />
                  </label>
                  <label>
                    {t('settings.birthDate')}
                    <input
                      type="date"
                      value={form.birth_date}
                      onChange={(e) => updateField('birth_date', e.target.value)}
                    />
                  </label>
                  <label>
                    {t('settings.gender')}
                    <select value={form.gender} onChange={(e) => updateField('gender', e.target.value)}>
                      <option value="">{t('settings.select')}</option>
                      <option value="Male">{t('settings.male')}</option>
                      <option value="Female">{t('settings.female')}</option>
                      <option value="male">{t('settings.male')}</option>
                      <option value="female">{t('settings.female')}</option>
                    </select>
                  </label>
                  <label>
                    {t('settings.university')}
                    <select value={form.university} onChange={(e) => updateField('university', e.target.value)}>
                      <option value="">{t('settings.select')}</option>
                      {universities.map((item) => (
                        <option key={item.id} value={String(item.id)}>{item.name}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    {t('settings.faculty')}
                    <select value={form.faculty} onChange={(e) => updateField('faculty', e.target.value)}>
                      <option value="">{t('settings.select')}</option>
                      {faculties.map((item) => (
                        <option key={item.id} value={String(item.id)}>{item.name}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    {t('settings.specialty')}
                    <select value={form.specialty} onChange={(e) => updateField('specialty', e.target.value)}>
                      <option value="">{t('settings.select')}</option>
                      {filteredSpecialities.map((item) => (
                        <option key={item.id} value={String(item.id)}>{item.name}</option>
                      ))}
                    </select>
                  </label>
                </div>

                {profile?.faculty_name && (
                  <p className="ui-muted">{t('settings.currentFaculty')}: {profile.faculty_name}</p>
                )}

                <div className="ui-actions-row">
                  <button type="submit" className="ui-btn ui-btn-primary" disabled={profileSaving}>
                    {profileSaving ? t('common.loading') : t('settings.saveProfile')}
                  </button>
                  <button type="button" className="ui-btn ui-btn-secondary" onClick={loadCurrentUser} disabled={profileSaving}>
                    {t('settings.resetForm')}
                  </button>
                </div>

                {profileMessage && (
                  <p className={`form-feedback ${profileMessage === t('settings.profileSaved') ? 'success' : 'error'}`}>
                    {profileMessage}
                  </p>
                )}
              </form>
            )}
          </section>
        )}

        {tab === 'password' && (
          <section className="ui-card settings-panel">
            <h3>{t('settings.passwordTitle')}</h3>
            <form className="settings-form" onSubmit={changePassword}>
              <label>
                {t('settings.currentPassword')}
                <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
              </label>
              <label>
                {t('settings.newPassword')}
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
              </label>
              <label>
                {t('settings.confirmPassword')}
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </label>
              <button type="submit" className="ui-btn ui-btn-primary">{t('settings.changePassword')}</button>
              {passwordMessage && (
                <p className={`form-feedback ${passwordSuccess ? 'success' : 'error'}`}>{passwordMessage}</p>
              )}
            </form>
          </section>
        )}
      </div>
    </div>
  );
}
