import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import AuthContext from '../../context/AuthContext';

export default function NewsPublish() {
    const {authTokens} = useContext(AuthContext);

    const [numTurn, setNumTurn] = useState(1);
    const [newsList, setNewsList] = useState([]);

    function setNumTurnClick(index){
        setNumTurn(index);
    }

    useEffect(()=>{
        const getNewsList = async() =>{
            try{
                const response = await fetch('http://13.49.18.134/news/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${authTokens.access}`,
                    },
            });

                const res = await response.json();
                setNewsList(res)
                console.log(res);
            }catch(err){
                console.error('Ошибка при получении списка документов:', err);
            }
        }
        getNewsList()
    },[authTokens]);

  return (
    <div className='news-publish'>
        <Navbar/>
        <div className='news-publish-container'>
            <section className='dorm-information'>
                <header className='dorm-information-header'>
                    <div className="title-main">
                        <h1>SDU Dormitory News Management</h1>
                        <p>
                        This page is developed for students to keep up with the news that is happening inside the SDU dormitory.You can write and publish news as a site administrator  
                        </p>
                        <div className='btn-group-publish'>
                            <a href='/add-news'>
                                Publish News Now
                            </a>
                        </div>
                    </div>
                    <div className="dorm-img">
                        <img src={require('../../img/dorm-img.png')} alt="dorm"/>
                    </div>
                </header>
            </section>
            <section className='latest-news'>
                <h2>Latest news</h2>
                <a href='' className='link-news-reading'>
                    <img src={require('../../img/reception.jpg')} alt='latest-news-img'/>
                    <h1>For the fall semester, registration at SDU Dormitory is open!</h1>
                </a>
            </section>
            <section className='news-list'>
                <div className='news-list-nav'>
                    <button className={numTurn === 1 ? 'active-list' : ''} onClick={()=>setNumTurnClick(1)}>
                        All news
                    </button >
                    <button className={numTurn === 2 ? 'active-list' : ''} onClick={()=>setNumTurnClick(2)}>
                        SDU Dorm News
                    </button>
                    <button className={numTurn === 3 ? 'active-list' : ''} onClick={()=>setNumTurnClick(3)}>
                        AC Catering News
                    </button>
                </div>
                {numTurn === 1 &&
                (
                    <div className='news-list-box'>
                        {newsList.map(newsItem => (
                            <div className='news-list-item' key={newsItem.id}>
                                <div className='list-item-img'>
                                    <img src={newsItem.file} alt='news-list-img'/>
                                </div>
                                <div className='list-item-content'>
                                    <p style={{ backgroundColor: newsItem.title === "AC Catering News" ? '#E94949' : '' }}>{newsItem.title}</p>
                                    <h3>{newsItem.content}</h3>
                                    <a href='#'>Read now</a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {numTurn === 2 &&
                (
                    <div className='news-list-box'>
                        {newsList
                        .filter(newsItem => newsItem.title === "SDU Dorm News")
                        .map(newsItem => (
                            <div className='news-list-item' key={newsItem.id}>
                                <div className='list-item-img'>
                                    <img src={newsItem.file} alt='news-list-img'/>
                                </div>
                                <div className='list-item-content'>
                                    <p style={{ backgroundColor: newsItem.title === "AC Catering News" ? '#E94949' : '' }}>{newsItem.title}</p>
                                    <h3>{newsItem.content}</h3>
                                    <a href='#'>Read now</a>
                                </div>
                            </div>
                        ))}
                    </div>  
                )}
                {numTurn === 3 &&
                (
                    <div className='news-list-box'>
                        {newsList
                        .filter(newsItem => newsItem.title === "AC Catering News")
                        .map(newsItem => (
                            <div className='news-list-item' key={newsItem.id}>
                                <div className='list-item-img'>
                                    <img src={newsItem.file} alt='news-list-img'/>
                                </div>
                                <div className='list-item-content'>
                                    <p style={{ backgroundColor: newsItem.title === "AC Catering News" ? '#E94949' : '' }}>{newsItem.title}</p>
                                    <h3>{newsItem.content}</h3>
                                    <a href='#'>Read now</a>
                                </div>
                            </div>
                        ))}
                    </div>  
                )}
            </section>
        </div>
        <footer className='footer'>
             <div className='footer-header'>
                <div className='footer-logo'>
                    <img src={require('../../img/logo-nav.png')}  alt="footer-logo"/>
                </div>
                <div className='footer-team-name'>
                    <p>© 2024 Vision Team</p>
                </div>
                <div className='footer-icons'>
                    <img src={require('../../img/icons/icon-x.png')}  alt="footer-icon1"/>
                    <img src={require('../../img/icons/icon-insta.png')}  alt="footer-icon2"/>
                    <img src={require('../../img/icons/icon-facebook.png')}  alt="footer-icon3"/>
                </div>
             </div>
             <div className='footer-content'>
                <div className='footer-item'>
                    <h5>The head of the SDU Dormitory:</h5>
                    <p>dormserviceboys@sdu.edu.kz</p>
                    <p>(mob.) +7 702 958 7910</p>
                </div>
                <div className='footer-item'>
                    <h5>Reception/ plumbing services</h5>
                    <p>(mob.) +7 778 727 9567</p>
                    <p>(tel.) +7 727 307 9560 (int. 704)</p>
                </div>
                <div className='footer-item'>
                    <h5>Security and Medical care:</h5>
                    <p>(tel.) +7 727 307 9560 (int. 199 /197) | Security</p>
                    <p>(mob.) +7 778 997 5839 | Medical care</p>
                </div>
             </div>             
        </footer>
    </div>
  )
}
