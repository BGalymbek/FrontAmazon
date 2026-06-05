import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import AuthContext from '../context/AuthContext'
import { useTranslation } from 'react-i18next'

export default function AboutUs() {
  const { authTokens } = useContext(AuthContext)
  const { t } = useTranslation()
  const [reviews, setReviews] = useState([])
  const [comment, setComment] = useState('')
  const [rate, setRate] = useState(5)
  const [reviewMessage, setReviewMessage] = useState('')

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const headers = authTokens?.access
          ? { Authorization: `Bearer ${authTokens.access}` }
          : {}
        const response = await axios.get('review/', { headers })
        setReviews(Array.isArray(response.data) ? response.data : [])
      } catch (error) {
        console.error(error)
      }
    }
    loadReviews()
  }, [authTokens])

  const submitReview = async (event) => {
    event.preventDefault()
    if (!authTokens?.access) {
      setReviewMessage(t('about.signInToReview'))
      return
    }
    try {
      await axios.post(
        'review/',
        { comment, rate },
        { headers: { Authorization: `Bearer ${authTokens.access}` } }
      )
      setComment('')
      setRate(5)
      setReviewMessage(t('about.reviewThanks'))
      const response = await axios.get('review/', {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      })
      setReviews(response.data)
    } catch (error) {
      setReviewMessage(t('about.reviewFail'))
    }
  }

  const reviewFeedbackClass = reviewMessage.includes(t('about.reviewThanks').slice(0, 6))
    ? 'form-feedback success'
    : reviewMessage
      ? 'form-feedback error'
      : 'form-feedback'

  return (
    <div className='rooms'>
        <Navbar/>
        <div className='rooms-container'>
            <section className='dorm-information'>
                <header className='dorm-information-header'>
                    <div className="title-main">
                        <h1>{t('about.title')}</h1>
                        <p>{t('about.desc')}</p>
                    </div>
                    <div className="dorm-img">
                        <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80" alt="Student community"/>
                    </div>
                </header>
            </section>
            <section className="main-points main-tasks">
                <h2>{t('about.mission')}</h2>
                <div className='main-points-container main-task-container'>
                    <div className="vision main-task-item">
                        <div className='vision-circle'></div>
                        <h3>{t('about.transparency')}</h3>
                        <p>{t('about.transparencyDesc')}</p>
                    </div>
                    <div className="mission main-task-item">
                        <div className='mission-circle'></div>
                        <h3>{t('about.scalability')}</h3>
                        <p>{t('about.scalabilityDesc')}</p>
                    </div>
                    <div className="mission main-task-item">
                        <div className='main-task-circle'></div>
                        <h3>{t('about.automation')}</h3>
                        <p>{t('about.automationDesc')}</p>
                    </div>
                    <div className="goal main-task-item">
                        <div className='goal-circle'></div>
                        <h3>{t('about.value')}</h3>
                        <p>{t('about.valueDesc')}</p>
                    </div>
                </div>
            </section>
            <section className='author-section'>
                <h2>{t('about.author')}</h2>
                <div className='author-card'>
                    <div className='author-photo'>
                        <img src={require('../img/Rusya.jpg')} alt="Rustem Nygmet" />
                    </div>
                    <div className='author-content'>
                        <h3>Rustem Nygmet</h3>
                        <h4>Researcher and Full-Stack Developer</h4>
                        <p>
                            The project was designed and implemented as an individual dissertation work.
                            It focuses on creating a unified dormitory booking system suitable for universities across Kazakhstan.
                        </p>
                        <div className='author-tags'>
                            <span>React</span>
                            <span>Django REST</span>
                            <span>JWT Auth</span>
                            <span>Dormitory Workflow Automation</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className='author-section reviews-section'>
                <h2>{t('about.reviews')}</h2>
                {authTokens?.access && (
                  <form onSubmit={submitReview} className="review-form">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder={t('about.reviewPlaceholder')}
                      required
                    />
                    <div className="review-form-rating">
                      <label htmlFor="review-rate">{t('about.rating')}:</label>
                      <select id="review-rate" value={rate} onChange={(e) => setRate(Number(e.target.value))}>
                        {[1, 2, 3, 4, 5].map((value) => (
                          <option key={value} value={value}>{value}</option>
                        ))}
                      </select>
                    </div>
                    <button type='submit' className="ui-btn ui-btn-primary">{t('about.submitReview')}</button>
                    {reviewMessage && <p className={reviewFeedbackClass}>{reviewMessage}</p>}
                  </form>
                )}
                <div className="reviews-list">
                  {reviews.map((item) => (
                    <div key={item.id} className="review-card">
                      <div className="review-card-header">
                        <strong>{item.user_data?.first_name} {item.user_data?.last_name}</strong>
                        <span className="review-card-rating">★ {item.rate}/5</span>
                      </div>
                      <p>{item.comment}</p>
                    </div>
                  ))}
                  {reviews.length === 0 && <p className="ui-muted">{t('about.noReviews')}</p>}
                </div>
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
                    <h5>Dorm Hub support:</h5>
                    <p>support@dormhub.kz</p>
                    <p>(hotline) +7 700 000 0000</p>
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
