import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { getOopsMessage } from '../../utils/translateApiError'

export default function Oops() {
  const { authTokens } = useContext(AuthContext)
  const [userProfile, setUserProfile] = useState('')
  const navigate = useNavigate()
  const { t } = useTranslation()
  const oopsMessage = getOopsMessage(t)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getResponse = await axios.get('profile/', {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        })
        setUserProfile(getResponse.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [authTokens])

  return (
    <div className='oops'>
      <Navbar />
      <div className='oops-container'>
        <div className='oops-img'>
          <img src={require('../../img/oops.png')} alt="oops" />
        </div>
        <div className='oops-content'>
          <h1 className='oops-title'>{t('oops.title')}</h1>
          <p className='oops-message'>{t('oops.sorry', { message: oopsMessage })}</p>
        </div>
        {!userProfile.is_doc_submitted ? (
          <button className='oops-link' onClick={() => navigate('/document-submission')}>
            {t('oops.goToDocs')}
          </button>
        ) : (
          <button className='oops-link' onClick={() => navigate('/main-page')}>
            {t('oops.goToMain')}
          </button>
        )}
      </div>
    </div>
  )
}
