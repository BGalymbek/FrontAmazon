import React, { useContext, useEffect, useState }  from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import axios from 'axios'

export default function MainPage() {
    const { authTokens } = useContext(AuthContext)

    const [userBookedEarlier, setUserBookedEarlier] = useState('')
    const [userProfile, setUserProfile] = useState('')

    const navigate = useNavigate();

    const handleClickBookNow = async ()=> {
        const response = await axios.get('documents/get/', {
            headers: {
                'Authorization': `Bearer ${authTokens.access}`,
            }
        });
        
        const res = response.data[0]
        console.log("Doc is submitted: ", userProfile.is_doc_submitted);

        if(userProfile.is_doc_submitted == false){
            let messageDocSubmissionTxt = 'you must first submit the documents to the Dorm administration!';
            localStorage.setItem('messageDocSubm', messageDocSubmissionTxt)
            navigate('/oops');
        }else{
            if(res && res.hasOwnProperty('is_verified')){
                const userDocVerified = res.is_verified;
                if(userDocVerified == true){
                    navigate('/booking') 
                }else{
                    let messageDocSubmissionTxt = 'the Dorm administration must verify your documents';
                    localStorage.setItem('messageDocSubm', messageDocSubmissionTxt)
                    navigate('/oops');
                }
            }else{
                console.log('Ключ is_verified отсутствует или массив пуст.');
            }
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Выполняем GET запрос
                const getResponse = await axios.get('get-bookings/', {
                    headers: {
                        'Authorization': `Bearer ${authTokens.access}`,
                    }
                });

                const res = getResponse.data
                setUserBookedEarlier(res)
                console.log("Пользователь забронировал: ", res);
            } catch (error) {
                // Обработка ошибок
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Вызов функции для выполнения запроса при загрузке компонента
    }, []);
    localStorage.setItem('userBookedEarlier', JSON.stringify(userBookedEarlier))

    useEffect(() => {
        const fetchProfile = async ()=> {
            try {
                // Выполняем GET запрос с задержкой 3 секунды
                const getResponse = await axios.get('profile/', {
                    headers: {
                        'Authorization': `Bearer ${authTokens.access}`,
                    }
                });
    
                const res = getResponse.data
                setUserProfile(res)
    
                console.log("Данные профиля: ", res);
            } catch (error) {
                console.error("Ошибка при выполнении GET запроса:", error);
            }
        }
        fetchProfile();
    }, []);
    localStorage.setItem('userProfile', JSON.stringify(userProfile))

    // console.log(userProfile.is_doc_submitted);

  return (
    <div className='main-page'>
        <Navbar/>
        <section className="wrapper">
            <header className='header'>
                <div className="title-main">
                    <h1>Booking platform —Dorm Hub</h1>
                    <p>This website is intended for booking places in the "SDU University" dormitories. It’s a user friendly platform that will allow all students, especially first-year students who want to live in dormitories, to book places while at home. Because this platform allows students to adapt easily and book with peace of mind. </p>
                    <div className="btn-group">
                        {userBookedEarlier == '' ? (
                           <button className="btn-book" onClick={()=>handleClickBookNow()}>Book Now</button>
                        ):(
                           <button className="btn-book" onClick={()=>navigate('/my-booking')}>My Bookings</button>
                        )}

                        {userProfile.is_doc_submitted == true ? (
                           <button className="btn-submission" onClick={()=>navigate('/update-submission')}>Update Submission</button>
                        ):(
                           <button className="btn-submission" onClick={()=>navigate('/document-submission')}>Document Submission</button>
                        )}
                    </div>
                </div>
                <div className="dorm-img">
                    <img src={require('../img/dorm-img.png')} alt="dorm"/>
                </div>
            </header>
        </section>
        <section className="main-points">
            <h2>Main Points</h2>
            <div className='main-points-container'>
                <div class="vision">
                    <div className='vision-circle'></div>
                    <h3>Vision</h3>
                    <p>Transforming dormitory booking with services into a convenient system for SDU students.</p>
                </div>
                <div class="mission">
                    <div className='mission-circle'></div>
                    <h3>Mission</h3>
                    <p>Facilitating a smooth process, improving interaction and communication with students.</p>
                </div>
                <div class="goal">
                    <div className='goal-circle'></div>
                    <h3>Goal</h3>
                    <p>Streamlining accommodation booking for first-year students through a user-friendly platform.</p>
                </div>
            </div>
        </section>
        <section className='instructional-videos'>
            <h2>Instructional video of using the platform</h2>
            <div className='docSubmissin-instructional instruction-videos-item'>
                <div className='docSubmissin-instructional-content'>
                    <div>
                        <h2>Document Submission</h2>
                        <p>This is instructional video of submission of the document. By watching this video, you will learn how to submit documents correctly and in full on our platform.Watch the video carefully and repeat with us. Good luck!</p>
                        <a href=''>
                            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.5 1.8125C17.8649 1.8125 21.092 3.14921 23.4714 5.52858C25.8508 7.90795 27.1875 11.1351 27.1875 14.5C27.1875 17.8649 25.8508 21.092 23.4714 23.4714C21.092 25.8508 17.8649 27.1875 14.5 27.1875C11.1351 27.1875 7.90795 25.8508 5.52858 23.4714C3.14921 21.092 1.8125 17.8649 1.8125 14.5C1.8125 11.1351 3.14921 7.90795 5.52858 5.52858C7.90795 3.14921 11.1351 1.8125 14.5 1.8125ZM14.5 25.375C17.3842 25.375 20.1503 24.2292 22.1898 22.1898C24.2292 20.1503 25.375 17.3842 25.375 14.5C25.375 11.6158 24.2292 8.84967 22.1898 6.81021C20.1503 4.77076 17.3842 3.625 14.5 3.625C11.6158 3.625 8.84967 4.77076 6.81021 6.81021C4.77076 8.84967 3.625 11.6158 3.625 14.5C3.625 17.3842 4.77076 20.1503 6.81021 22.1898C8.84967 24.2292 11.6158 25.375 14.5 25.375ZM13.1406 18.3624L18.9352 14.5L13.1406 10.6376V18.3624ZM13.4415 8.65831L20.5066 13.369C20.6928 13.4931 20.8455 13.6613 20.951 13.8586C21.0566 14.0559 21.1119 14.2762 21.1119 14.5C21.1119 14.7238 21.0566 14.9441 20.951 15.1414C20.8455 15.3387 20.6928 15.5069 20.5066 15.631L13.4415 20.3417C13.2368 20.4782 12.9989 20.5565 12.7531 20.5684C12.5074 20.5803 12.263 20.5252 12.0461 20.4091C11.8292 20.293 11.6478 20.1203 11.5214 19.9092C11.3949 19.6981 11.3281 19.4567 11.3281 19.2107V9.7875C11.3281 9.54147 11.3949 9.30005 11.5214 9.08899C11.6478 8.87794 11.8292 8.70515 12.0461 8.58906C12.263 8.47297 12.5074 8.41793 12.7531 8.42981C12.9989 8.44169 13.2368 8.52003 13.4415 8.6565V8.65831Z" fill="white"/>
                            </svg>
                            Watch the video
                        </a>
                    </div>
                </div>
                <div className='docSubmissin-instructional-img'>
                    <img src={require('../img/docSubmissionImg.png')}  alt="doc-submission"/>
                </div>
            </div>
            <div className='docSubmissin-instructional instruction-videos-item'>
                <div className='docSubmissin-instructional-img instructional-img-left'>
                    <img src={require('../img/make-booking.jpg')}  alt="doc-submission"/>
                </div>
                <div className='docSubmissin-instructional-content docSubmissin-instructional-content-right'>
                    <div className='content-right'>
                        <h2>Make a Booking</h2>
                        <p>This is instructional video of make a booking. By watching this video, you will learn how to make a booking easily and correctly on our platform.Watch the video carefully and repeat with us. Good luck!</p>
                        <a href=''>
                            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.5 1.8125C17.8649 1.8125 21.092 3.14921 23.4714 5.52858C25.8508 7.90795 27.1875 11.1351 27.1875 14.5C27.1875 17.8649 25.8508 21.092 23.4714 23.4714C21.092 25.8508 17.8649 27.1875 14.5 27.1875C11.1351 27.1875 7.90795 25.8508 5.52858 23.4714C3.14921 21.092 1.8125 17.8649 1.8125 14.5C1.8125 11.1351 3.14921 7.90795 5.52858 5.52858C7.90795 3.14921 11.1351 1.8125 14.5 1.8125ZM14.5 25.375C17.3842 25.375 20.1503 24.2292 22.1898 22.1898C24.2292 20.1503 25.375 17.3842 25.375 14.5C25.375 11.6158 24.2292 8.84967 22.1898 6.81021C20.1503 4.77076 17.3842 3.625 14.5 3.625C11.6158 3.625 8.84967 4.77076 6.81021 6.81021C4.77076 8.84967 3.625 11.6158 3.625 14.5C3.625 17.3842 4.77076 20.1503 6.81021 22.1898C8.84967 24.2292 11.6158 25.375 14.5 25.375ZM13.1406 18.3624L18.9352 14.5L13.1406 10.6376V18.3624ZM13.4415 8.65831L20.5066 13.369C20.6928 13.4931 20.8455 13.6613 20.951 13.8586C21.0566 14.0559 21.1119 14.2762 21.1119 14.5C21.1119 14.7238 21.0566 14.9441 20.951 15.1414C20.8455 15.3387 20.6928 15.5069 20.5066 15.631L13.4415 20.3417C13.2368 20.4782 12.9989 20.5565 12.7531 20.5684C12.5074 20.5803 12.263 20.5252 12.0461 20.4091C11.8292 20.293 11.6478 20.1203 11.5214 19.9092C11.3949 19.6981 11.3281 19.4567 11.3281 19.2107V9.7875C11.3281 9.54147 11.3949 9.30005 11.5214 9.08899C11.6478 8.87794 11.8292 8.70515 12.0461 8.58906C12.263 8.47297 12.5074 8.41793 12.7531 8.42981C12.9989 8.44169 13.2368 8.52003 13.4415 8.6565V8.65831Z" fill="white"/>
                            </svg>
                            Watch the video
                        </a>
                    </div>
                </div>
            </div>
        </section>
        <footer className='footer'>
             <div className='footer-header'>
                <div className='footer-logo'>
                    <img src={require('../img/logo-nav.png')}  alt="footer-logo"/>
                </div>
                <div className='footer-team-name'>
                    <p>© 2024 Vision Team</p>
                </div>
                <div className='footer-icons'>
                    <img src={require('../img/icons/icon-x.png')}  alt="footer-icon1"/>
                    <img src={require('../img/icons/icon-insta.png')}  alt="footer-icon2"/>
                    <img src={require('../img/icons/icon-facebook.png')}  alt="footer-icon3"/>
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
