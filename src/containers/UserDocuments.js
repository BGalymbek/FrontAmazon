import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar';
import DocumentThumb from '../components/DocumentThumb';
import { useTranslation } from 'react-i18next';

export default function UserDocuments() {
    const { email } = useParams();
    const { authTokens } = useContext(AuthContext)
    const { t } = useTranslation();
    const [userDocuments, setUserDocuments] = useState(null);
    const [userVerifiedOrNot, setUserVerifiedOrNot] = useState("");
    const [facultyOfStudent, setFacultyOfStudent] = useState("");
    const [IdNumberOfStudent, setIdNumberOfStudent] = useState("");
    const [userName, setUserName] = useState("");
    const navigate = useNavigate()

    useEffect(()=>{
            const fetchDocuments = async() =>{
                try{
                    const response = await axios.get(`user-documents/?email=${email}`,{
                        headers:{
                            'Authorization': `Bearer ${authTokens.access}`,
                        }
                    })
    
                    const res = response.data;
                    setUserDocuments(res);
                    setIdNumberOfStudent(res.user?.id_number)
                    setFacultyOfStudent(res.user?.faculty_name)
                    setUserName(res.user?.first_name)
                    setUserVerifiedOrNot(res.is_verified)
    
                }catch(err){
                    console.error('Failed to load user documents:', err);
                }
            }
            if(email){
                fetchDocuments()
            }
    },[email, authTokens]);

    const verifyUser = async () => {
        try {
             await axios.put(`documents/verify/?email=${email}`, {
                is_verified: true
            }, {
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`,
                }
            });
            setUserVerifiedOrNot(true);
        } catch (err) {
            console.error('Verification failed:', err);
        }
    }

    const cancelVerifyUser = async () => {
        try {
            await axios.put(`documents/verify/?email=${email}`, {
                is_verified: false
            }, {
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`,
                }
            });
            setUserVerifiedOrNot(false);
        } catch (err) {
            console.error('Cancel verification failed:', err);
        }
    }

    const handleBack = ()=>{
        navigate('/verify-documents')
    }

    const docItems = [
      { key: 'form_075', label: t('docs.form075'), kind: 'document' },
      { key: 'identity_card_copy', label: t('docs.identityCard'), kind: 'document' },
      { key: 'photo_3x4', label: t('docs.photo'), kind: 'photo' },
      { key: 'statement', label: t('docs.statement'), kind: 'document' },
    ];

    return (
    <div className="rooms" id="view-details">
        <Navbar/>
        <div className='rooms-container'>
            <section className='dorm-information'>
              <header className='dorm-information-header'>
                <div className='title-main'>
                  <h1>{t('docs.viewDetails')}</h1>
                  <p>{t('docs.viewDetailsDesc')}</p>
                </div>
              </header>
            </section>

            <div className="ui-toolbar">
              <button type="button" className='ui-btn ui-btn-secondary btn-update' onClick={handleBack}>
                <img src={require('../img/go-back.png')} alt="" />
                {t('common.goBack')}
              </button>
            </div>

            <div className='ui-card'>
              <div className='info-of-student'>
                  <h2>{userName}</h2>
                  <p className='stud-id-txt'>{t('admin.studentId')}: {IdNumberOfStudent || '—'}</p>
                  <p>{t('admin.faculty')}: {facultyOfStudent || '—'}</p>
                  <span className={`doc-status-pill ${userVerifiedOrNot ? 'verified' : 'pending'}`}>
                    {userVerifiedOrNot ? t('admin.verified') : t('admin.pending')}
                  </span>
              </div>

              <h3>{t('docs.submittedForVerification', { name: userName || '' })}</h3>
              <div className='user-docs-grid'>
                {docItems.map((item) => (
                  <div key={item.key} className='user-doc-card'>
                    <p>{item.label}</p>
                    <DocumentThumb
                      fileUrl={userDocuments?.[item.key]}
                      label={item.label}
                      kind={item.kind}
                    />
                  </div>
                ))}
              </div>

              <div className="ui-actions-row">
                {!userVerifiedOrNot && (
                  <button type="button" className='ui-btn ui-btn-success' onClick={verifyUser}>
                    {t('docs.verify')}
                  </button>
                )}
                {userVerifiedOrNot && (
                  <button type="button" className='ui-btn ui-btn-danger' onClick={cancelVerifyUser}>
                    {t('docs.cancelVerification')}
                  </button>
                )}
              </div>
            </div>
        </div>
    </div>
  )
}
