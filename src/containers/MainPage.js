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
        <section className="wrapper header">
            <header>
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
                    <h2>Document Submission</h2>
                    <p>This is instructional video of submission of the document. By watching this video, you will learn how to submit documents correctly and in full on our platform.Watch the video carefully and repeat with us. Good luck!</p>
                    <a href=''>
                        <img alt="dorm"/>
                        Watch the video
                    </a>
                </div>
                <div className='docSubmissin-instructional-img'>
                    <img src={require('../img/docSubmissionImg.png')}  alt="doc-submission"/>
                </div>
            </div>
        </section>
  </div>

  )
}
