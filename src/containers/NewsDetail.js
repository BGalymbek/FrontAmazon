import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AuthContext from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function NewsDetail() {
  const { id } = useParams();
  const { authTokens } = useContext(AuthContext);
  const { t } = useTranslation();
  const [newsItem, setNewsItem] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadNews = async () => {
      try {
        const headers = authTokens?.access
          ? { Authorization: `Bearer ${authTokens.access}` }
          : {};
        const response = await axios.get(`news-detail/${id}/`, { headers });
        setNewsItem(response.data);
      } catch (err) {
        setError(t('news.loadError'));
      }
    };
    loadNews();
  }, [id, authTokens]);

  return (
    <div className="news">
      <Navbar />
      <div className="news-container">
        <Link className="news-back-link" to="/news">← {t('news.back')}</Link>
        {error && <p className="ui-error">{error}</p>}
        {newsItem && (
          <article className="news-article">
            {newsItem.file && <img src={newsItem.file} alt={newsItem.title || 'News'} />}
            <h1>{newsItem.title}</h1>
            <p className="news-article-date">{newsItem.datePublished}</p>
            <p className="news-article-body">{newsItem.content}</p>
          </article>
        )}
      </div>
    </div>
  );
}
