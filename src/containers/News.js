import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import AuthContext from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function News() {
    const { authTokens } = useContext(AuthContext);
    const { t } = useTranslation();

    const [numTurn, setNumTurn] = useState(1);
    const [newsList, setNewsList] = useState([]);

    function setNumTurnClick(index){
        setNumTurn(index);
    }

    useEffect(()=>{
        const getNewsList = async() =>{
            try{
                const response = await axios.get('news/', {
                    headers: authTokens?.access
                      ? { Authorization: `Bearer ${authTokens.access}` }
                      : {},
                });
                setNewsList(Array.isArray(response.data) ? response.data : [])
            }catch(err){
                console.error('Failed to load news:', err);
            }
        }
        getNewsList()
    },[authTokens]);

    const renderNewsItems = (items) => (
      <div className='news-list-box'>
        {items.map(newsItem => (
          <div className='news-list-item' key={newsItem.id}>
            <div className='list-item-img'>
              <img src={newsItem.file} alt='news-list-img'/>
            </div>
            <div className='list-item-content'>
              <p className={newsItem.title === "AC Catering News" ? 'news-badge-hot' : ''}>{newsItem.title}</p>
              <h3>{newsItem.content}</h3>
              <Link to={`/news/${newsItem.id}`}>{t('news.readNow')}</Link>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <div className='news'>
        <Navbar/>   
        <div className='news-container'>
            <section className='social-header social-news'>
                <h1>{t('news.pageTitle')}</h1>
                <div className='social-header-container'>
                    <div className='social-header-content'>
                        <h2>{t('news.pageSubtitle')}</h2>
                        <p>{t('news.pageDesc')}</p>
                    </div>
                    <div className='social-header-img'>
                        <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80" alt='social-header-img'/>
                    </div>
                </div>
            </section>
            <section className='latest-news'>
                <h2>{t('news.latest')}</h2>
                <button type='button' className='link-news-reading'>
                    <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80" alt='latest-news-img'/>
                    <h1>{t('news.featured')}</h1>
                </button>
            </section>
            <section className='news-list'>
                <div className='news-list-nav'>
                    <button className={numTurn === 1 ? 'active-list' : ''} onClick={()=>setNumTurnClick(1)}>
                        {t('news.all')}
                    </button >
                    <button className={numTurn === 2 ? 'active-list' : ''} onClick={()=>setNumTurnClick(2)}>
                        {t('news.dormHub')}
                    </button>
                    <button className={numTurn === 3 ? 'active-list' : ''} onClick={()=>setNumTurnClick(3)}>
                        {t('news.catering')}
                    </button>
                </div>
                {numTurn === 1 && renderNewsItems(newsList)}
                {numTurn === 2 && renderNewsItems(newsList.filter(newsItem => newsItem.title === "Dorm Hub News"))}
                {numTurn === 3 && renderNewsItems(newsList.filter(newsItem => newsItem.title === "AC Catering News"))}
            </section>
        </div>
        <footer className='footer'>
             <div className='footer-header'>
                <div className='footer-logo'>
                    <img src={require('../img/logo-nav.png')}  alt="footer-logo"/>
                </div>
                <div className='footer-team-name'>
                    <p>© 2026 Dorm Hub Kazakhstan</p>
                </div>
                <div className='footer-icons'>
                    <img src={require('../img/icons/icon-x.png')}  alt="footer-icon1"/>
                    <img src={require('../img/icons/icon-insta.png')}  alt="footer-icon2"/>
                    <img src={require('../img/icons/icon-facebook.png')}  alt="footer-icon3"/>
                </div>
             </div>
             <div className='footer-content'>
                <div className='footer-item'>
                    <h5>{t('news.footerSupport')}</h5>
                    <p>support@dormhub.kz</p>
                    <p>(hotline) +7 700 000 0000</p>
                </div>
                <div className='footer-item'>
                    <h5>{t('news.footerReception')}</h5>
                    <p>(mob.) +7 778 727 9567</p>
                    <p>(tel.) +7 727 307 9560 (int. 704)</p>
                </div>
                <div className='footer-item'>
                    <h5>{t('news.footerSecurity')}</h5>
                    <p>(tel.) +7 727 307 9560 (int. 199 /197) | Security</p>
                    <p>(mob.) +7 778 997 5839 | Medical care</p>
                </div>
             </div>             
        </footer>
    </div>
  )
}
