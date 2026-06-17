import React, { useContext, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router';
import AuthContext from '../../context/AuthContext';

export default function AddNews() {
  const navigate = useNavigate();
  const { authTokens } = useContext(AuthContext);

  const [category, setCategory] = useState('');
  const [headline, setHeadline] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', category);
      formData.append('content', headline);
      formData.append('file', file);

      await axios.post('news/', formData, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/congrats-published');
    } catch (err) {
      const responseData = err?.response?.data;
      if (typeof responseData === 'string') {
        setError(responseData);
      } else if (responseData?.detail) {
        setError(responseData.detail);
      } else if (responseData && typeof responseData === 'object') {
        const firstKey = Object.keys(responseData)[0];
        const value = responseData[firstKey];
        setError(Array.isArray(value) ? value.join(' ') : String(value));
      } else {
        setError('Не удалось опубликовать новость. Проверьте подключение и права администратора.');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="add-news">
      <Navbar />
      <div className="add-news-container">
        <div className="add-news-content">
          <div className="add-news-logo">
            <img src={require('../../img/logoDorm.png')} alt="add-news-logo" />
          </div>
          <div className="add-news-title">
            <div className="add-title">
              <h2>Publish News</h2>
              <p>Here you, as a site administrator, can publish news to the attention of students!</p>
            </div>
            <div className="add-news-img">
              <img src={require('../../img/add-news.png')} alt="add-news-img" />
            </div>
          </div>
          <form className="add-news-form" onSubmit={submit}>
            <select
              id="category-select"
              className="add-news-select"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
            >
              <option value="">Selected Category</option>
              <option value="Dorm Hub News">Dorm Hub News</option>
              <option value="AC Catering News">AC Catering News</option>
            </select>
            <div className="add-news-withLabel">
              <label className="add-news-label" htmlFor="headline">
                Enter a news title
              </label>
              <input
                type="text"
                placeholder="Current Title"
                id="headline"
                value={headline}
                onChange={(event) => setHeadline(event.target.value)}
                required
              />
            </div>
            <div className="custom-file-input add-news-file">
              <input
                type="file"
                id="file"
                name="file"
                accept="image/*"
                onChange={(event) => setFile(event.target.files[0])}
                required
              />
              <img src={require('../../img/round-upload.png')} alt="logo" />
              <p>{file ? file.name : 'Upload File'}</p>
            </div>
            {error && <p className="ui-error">{error}</p>}
            <button className="add-news-btn" type="submit" disabled={saving}>
              {saving ? 'Publishing...' : 'Publish'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
