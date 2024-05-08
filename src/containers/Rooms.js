import React, { useState } from 'react'
import Navbar from '../components/Navbar'

export default function Rooms() {
    const [numTurn, setNumTurn] = useState(1);

    function setNumTurnClick(index){
        setNumTurn(index);
     }

  return (
    <div className='rooms'>
        <Navbar/>
        <div className='rooms-container'>
                <div className='profile-nav' id='profile-nav'>
                    <button className={numTurn === 1 ? 'active' : ''} onClick={()=>setNumTurnClick(1)}>
                        Dormitory Review
                    </button>
                    <button className={numTurn === 2 ? 'active' : ''} onClick={()=>setNumTurnClick(2)}>
                        Social Life
                    </button>
                </div>
                {numTurn === 1 && (
                    <>
                        <section className='dorm-information'>
                            <header className='dorm-information-header'>
                                <div className="title-main">
                                    <h1>SDU Student House</h1>
                                    <p>
                                        The student house is located on the campus 30 meters from the university itself. There are football, volleyball and basketball courts for students and guests. The campus is serviced by a 24-hour security service and ensures the safety of all students and visitors. In addition, there are two guest rooms for foreign teachers and guests.University" dormitories. It’s a user friendly platform that will allow all students, especially first-year students who want to live in dormitories, to book places while at home. Because this platform allows students to adapt easily and book with peace of mind.  
                                    </p>
                                </div>
                                <div className="dorm-img">
                                    <img src={require('../img/dorm-img.png')} alt="dorm"/>
                                </div>
                            </header>
                        </section>
                        <section className='numeric-data-dorm'>
                            <div className='data-dorm-item'>
                                <h4>Total number of blocks:</h4>
                                <h1>4</h1>
                                <p>The SDU student house has 2 blocks for men: blocks C and D, and 2 blocks(A and B) for female.</p>
                            </div>
                            <div className='data-dorm-item'>
                                <h4>Total number of seats:</h4>
                                <h1>1280</h1>
                                <p>Counting from 320 places in each block of the dorm, a total of 1,280 places will appear in 4 blocks</p>
                            </div>
                            <div className='data-dorm-item'>
                                <h4>Available seats: for Boys</h4>
                                <h1>525</h1>
                                <p>For men, counting from 320 seats in each block, a total of 640 seats in 2 blocks will be obtained</p>
                            </div>
                            <div className='data-dorm-item'>
                                <h4>Available seats: for Girls</h4>
                                <h1>350</h1>
                                <p>For girls, counting from 320 seats in each block, a total of 640 seats in 2 blocks will be obtained</p>
                            </div>
                        </section>
                        <section className='instructional-videos dormitory-review'>
                            <h1>SDU  Student Dormitory review</h1>
                            <div className='docSubmissin-instructional instruction-videos-item'>
                                <div className='docSubmissin-instructional-content'>
                                    <div>
                                        <h2>Living and Social Spaces</h2>
                                        <p>These areas are designated for relaxation, socializing, and recreational activities. They provide comfortable seating arrangements, entertainment options, and spaces for group gatherings or quiet relaxation.</p>
                                        <a href=''>
                                            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.5 1.8125C17.8649 1.8125 21.092 3.14921 23.4714 5.52858C25.8508 7.90795 27.1875 11.1351 27.1875 14.5C27.1875 17.8649 25.8508 21.092 23.4714 23.4714C21.092 25.8508 17.8649 27.1875 14.5 27.1875C11.1351 27.1875 7.90795 25.8508 5.52858 23.4714C3.14921 21.092 1.8125 17.8649 1.8125 14.5C1.8125 11.1351 3.14921 7.90795 5.52858 5.52858C7.90795 3.14921 11.1351 1.8125 14.5 1.8125ZM14.5 25.375C17.3842 25.375 20.1503 24.2292 22.1898 22.1898C24.2292 20.1503 25.375 17.3842 25.375 14.5C25.375 11.6158 24.2292 8.84967 22.1898 6.81021C20.1503 4.77076 17.3842 3.625 14.5 3.625C11.6158 3.625 8.84967 4.77076 6.81021 6.81021C4.77076 8.84967 3.625 11.6158 3.625 14.5C3.625 17.3842 4.77076 20.1503 6.81021 22.1898C8.84967 24.2292 11.6158 25.375 14.5 25.375ZM13.1406 18.3624L18.9352 14.5L13.1406 10.6376V18.3624ZM13.4415 8.65831L20.5066 13.369C20.6928 13.4931 20.8455 13.6613 20.951 13.8586C21.0566 14.0559 21.1119 14.2762 21.1119 14.5C21.1119 14.7238 21.0566 14.9441 20.951 15.1414C20.8455 15.3387 20.6928 15.5069 20.5066 15.631L13.4415 20.3417C13.2368 20.4782 12.9989 20.5565 12.7531 20.5684C12.5074 20.5803 12.263 20.5252 12.0461 20.4091C11.8292 20.293 11.6478 20.1203 11.5214 19.9092C11.3949 19.6981 11.3281 19.4567 11.3281 19.2107V9.7875C11.3281 9.54147 11.3949 9.30005 11.5214 9.08899C11.6478 8.87794 11.8292 8.70515 12.0461 8.58906C12.263 8.47297 12.5074 8.41793 12.7531 8.42981C12.9989 8.44169 13.2368 8.52003 13.4415 8.6565V8.65831Z" fill="white"/>
                                            </svg>
                                            See more...
                                        </a>
                                    </div>
                                </div>
                                <div className='docSubmissin-instructional-img'>
                                    <img src={require('../img/lounge-room.png')}  alt="doc-submission"/>
                                </div>
                            </div>
                            <div className='docSubmissin-instructional instruction-videos-item'>
                                <div className='docSubmissin-instructional-img instructional-img-left'>
                                    <img src={require('../img/kitchen.png')}  alt="doc-submission"/>
                                </div>
                                <div className='docSubmissin-instructional-content docSubmissin-instructional-content-right'>
                                    <div className='content-right'>
                                        <h2>Food and Dining</h2>
                                        <p>This category includes spaces for meals preparation, dining, and food services. It typically comprises a dining room where meals are served, a canteen for purchasing snacks or quick meals, and a kitchen for food preparation.</p>
                                        <a href=''>
                                            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.5 1.8125C17.8649 1.8125 21.092 3.14921 23.4714 5.52858C25.8508 7.90795 27.1875 11.1351 27.1875 14.5C27.1875 17.8649 25.8508 21.092 23.4714 23.4714C21.092 25.8508 17.8649 27.1875 14.5 27.1875C11.1351 27.1875 7.90795 25.8508 5.52858 23.4714C3.14921 21.092 1.8125 17.8649 1.8125 14.5C1.8125 11.1351 3.14921 7.90795 5.52858 5.52858C7.90795 3.14921 11.1351 1.8125 14.5 1.8125ZM14.5 25.375C17.3842 25.375 20.1503 24.2292 22.1898 22.1898C24.2292 20.1503 25.375 17.3842 25.375 14.5C25.375 11.6158 24.2292 8.84967 22.1898 6.81021C20.1503 4.77076 17.3842 3.625 14.5 3.625C11.6158 3.625 8.84967 4.77076 6.81021 6.81021C4.77076 8.84967 3.625 11.6158 3.625 14.5C3.625 17.3842 4.77076 20.1503 6.81021 22.1898C8.84967 24.2292 11.6158 25.375 14.5 25.375ZM13.1406 18.3624L18.9352 14.5L13.1406 10.6376V18.3624ZM13.4415 8.65831L20.5066 13.369C20.6928 13.4931 20.8455 13.6613 20.951 13.8586C21.0566 14.0559 21.1119 14.2762 21.1119 14.5C21.1119 14.7238 21.0566 14.9441 20.951 15.1414C20.8455 15.3387 20.6928 15.5069 20.5066 15.631L13.4415 20.3417C13.2368 20.4782 12.9989 20.5565 12.7531 20.5684C12.5074 20.5803 12.263 20.5252 12.0461 20.4091C11.8292 20.293 11.6478 20.1203 11.5214 19.9092C11.3949 19.6981 11.3281 19.4567 11.3281 19.2107V9.7875C11.3281 9.54147 11.3949 9.30005 11.5214 9.08899C11.6478 8.87794 11.8292 8.70515 12.0461 8.58906C12.263 8.47297 12.5074 8.41793 12.7531 8.42981C12.9989 8.44169 13.2368 8.52003 13.4415 8.6565V8.65831Z" fill="white"/>
                                            </svg>
                                            See more...
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className='docSubmissin-instructional instruction-videos-item'>
                                <div className='docSubmissin-instructional-content'>
                                    <div>
                                        <h2>Health and Well-being</h2>
                                        <p>These areas are dedicated to promoting health and well-being among students. They may offer medical services for minor ailments or consultations, fitness facilities for exercise and workouts, and a barbershop for grooming needs.</p>
                                        <a href=''>
                                            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.5 1.8125C17.8649 1.8125 21.092 3.14921 23.4714 5.52858C25.8508 7.90795 27.1875 11.1351 27.1875 14.5C27.1875 17.8649 25.8508 21.092 23.4714 23.4714C21.092 25.8508 17.8649 27.1875 14.5 27.1875C11.1351 27.1875 7.90795 25.8508 5.52858 23.4714C3.14921 21.092 1.8125 17.8649 1.8125 14.5C1.8125 11.1351 3.14921 7.90795 5.52858 5.52858C7.90795 3.14921 11.1351 1.8125 14.5 1.8125ZM14.5 25.375C17.3842 25.375 20.1503 24.2292 22.1898 22.1898C24.2292 20.1503 25.375 17.3842 25.375 14.5C25.375 11.6158 24.2292 8.84967 22.1898 6.81021C20.1503 4.77076 17.3842 3.625 14.5 3.625C11.6158 3.625 8.84967 4.77076 6.81021 6.81021C4.77076 8.84967 3.625 11.6158 3.625 14.5C3.625 17.3842 4.77076 20.1503 6.81021 22.1898C8.84967 24.2292 11.6158 25.375 14.5 25.375ZM13.1406 18.3624L18.9352 14.5L13.1406 10.6376V18.3624ZM13.4415 8.65831L20.5066 13.369C20.6928 13.4931 20.8455 13.6613 20.951 13.8586C21.0566 14.0559 21.1119 14.2762 21.1119 14.5C21.1119 14.7238 21.0566 14.9441 20.951 15.1414C20.8455 15.3387 20.6928 15.5069 20.5066 15.631L13.4415 20.3417C13.2368 20.4782 12.9989 20.5565 12.7531 20.5684C12.5074 20.5803 12.263 20.5252 12.0461 20.4091C11.8292 20.293 11.6478 20.1203 11.5214 19.9092C11.3949 19.6981 11.3281 19.4567 11.3281 19.2107V9.7875C11.3281 9.54147 11.3949 9.30005 11.5214 9.08899C11.6478 8.87794 11.8292 8.70515 12.0461 8.58906C12.263 8.47297 12.5074 8.41793 12.7531 8.42981C12.9989 8.44169 13.2368 8.52003 13.4415 8.6565V8.65831Z" fill="white"/>
                                            </svg>
                                            See more...
                                        </a>
                                    </div>
                                </div>
                                <div className='docSubmissin-instructional-img'>
                                    <img src={require('../img/medical.png')}  alt="doc-submission"/>
                                </div>
                            </div>
                            <div className='docSubmissin-instructional instruction-videos-item'>
                                <div className='docSubmissin-instructional-img instructional-img-left'>
                                    <img src={require('../img/laundry.png')}  alt="doc-submission"/>
                                </div>
                                <div className='docSubmissin-instructional-content docSubmissin-instructional-content-right'>
                                    <div className='content-right'>
                                        <h2>Personal Care and Hygiene</h2>
                                        <p>This category includes facilities for maintaining personal hygiene and cleanliness. It encompasses laundry facilities for washing clothes, an ironing room for pressing garments, and bathrooms equipped with showers and sinks. Additionally, water closets (toilets) are provided for restroom needs.</p>
                                        <a href=''>
                                            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.5 1.8125C17.8649 1.8125 21.092 3.14921 23.4714 5.52858C25.8508 7.90795 27.1875 11.1351 27.1875 14.5C27.1875 17.8649 25.8508 21.092 23.4714 23.4714C21.092 25.8508 17.8649 27.1875 14.5 27.1875C11.1351 27.1875 7.90795 25.8508 5.52858 23.4714C3.14921 21.092 1.8125 17.8649 1.8125 14.5C1.8125 11.1351 3.14921 7.90795 5.52858 5.52858C7.90795 3.14921 11.1351 1.8125 14.5 1.8125ZM14.5 25.375C17.3842 25.375 20.1503 24.2292 22.1898 22.1898C24.2292 20.1503 25.375 17.3842 25.375 14.5C25.375 11.6158 24.2292 8.84967 22.1898 6.81021C20.1503 4.77076 17.3842 3.625 14.5 3.625C11.6158 3.625 8.84967 4.77076 6.81021 6.81021C4.77076 8.84967 3.625 11.6158 3.625 14.5C3.625 17.3842 4.77076 20.1503 6.81021 22.1898C8.84967 24.2292 11.6158 25.375 14.5 25.375ZM13.1406 18.3624L18.9352 14.5L13.1406 10.6376V18.3624ZM13.4415 8.65831L20.5066 13.369C20.6928 13.4931 20.8455 13.6613 20.951 13.8586C21.0566 14.0559 21.1119 14.2762 21.1119 14.5C21.1119 14.7238 21.0566 14.9441 20.951 15.1414C20.8455 15.3387 20.6928 15.5069 20.5066 15.631L13.4415 20.3417C13.2368 20.4782 12.9989 20.5565 12.7531 20.5684C12.5074 20.5803 12.263 20.5252 12.0461 20.4091C11.8292 20.293 11.6478 20.1203 11.5214 19.9092C11.3949 19.6981 11.3281 19.4567 11.3281 19.2107V9.7875C11.3281 9.54147 11.3949 9.30005 11.5214 9.08899C11.6478 8.87794 11.8292 8.70515 12.0461 8.58906C12.263 8.47297 12.5074 8.41793 12.7531 8.42981C12.9989 8.44169 13.2368 8.52003 13.4415 8.6565V8.65831Z" fill="white"/>
                                            </svg>
                                            See more...
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className='docSubmissin-instructional instruction-videos-item'>
                                <div className='docSubmissin-instructional-content'>
                                    <div>
                                        <h2>Recreational Facilities</h2>
                                        <p>Student rooms are private living spaces provided for individual students. These rooms typically include basic furnishings such as a bed, desk, and storage, offering a comfortable environment for studying and rest.</p>
                                        <a href=''>
                                            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.5 1.8125C17.8649 1.8125 21.092 3.14921 23.4714 5.52858C25.8508 7.90795 27.1875 11.1351 27.1875 14.5C27.1875 17.8649 25.8508 21.092 23.4714 23.4714C21.092 25.8508 17.8649 27.1875 14.5 27.1875C11.1351 27.1875 7.90795 25.8508 5.52858 23.4714C3.14921 21.092 1.8125 17.8649 1.8125 14.5C1.8125 11.1351 3.14921 7.90795 5.52858 5.52858C7.90795 3.14921 11.1351 1.8125 14.5 1.8125ZM14.5 25.375C17.3842 25.375 20.1503 24.2292 22.1898 22.1898C24.2292 20.1503 25.375 17.3842 25.375 14.5C25.375 11.6158 24.2292 8.84967 22.1898 6.81021C20.1503 4.77076 17.3842 3.625 14.5 3.625C11.6158 3.625 8.84967 4.77076 6.81021 6.81021C4.77076 8.84967 3.625 11.6158 3.625 14.5C3.625 17.3842 4.77076 20.1503 6.81021 22.1898C8.84967 24.2292 11.6158 25.375 14.5 25.375ZM13.1406 18.3624L18.9352 14.5L13.1406 10.6376V18.3624ZM13.4415 8.65831L20.5066 13.369C20.6928 13.4931 20.8455 13.6613 20.951 13.8586C21.0566 14.0559 21.1119 14.2762 21.1119 14.5C21.1119 14.7238 21.0566 14.9441 20.951 15.1414C20.8455 15.3387 20.6928 15.5069 20.5066 15.631L13.4415 20.3417C13.2368 20.4782 12.9989 20.5565 12.7531 20.5684C12.5074 20.5803 12.263 20.5252 12.0461 20.4091C11.8292 20.293 11.6478 20.1203 11.5214 19.9092C11.3949 19.6981 11.3281 19.4567 11.3281 19.2107V9.7875C11.3281 9.54147 11.3949 9.30005 11.5214 9.08899C11.6478 8.87794 11.8292 8.70515 12.0461 8.58906C12.263 8.47297 12.5074 8.41793 12.7531 8.42981C12.9989 8.44169 13.2368 8.52003 13.4415 8.6565V8.65831Z" fill="white"/>
                                            </svg>
                                            See more...
                                        </a>
                                    </div>
                                </div>
                                <div className='docSubmissin-instructional-img'>
                                    <img src={require('../img/court.png')}  alt="doc-submission"/>
                                </div>
                            </div>
                            <div className='docSubmissin-instructional instruction-videos-item'>
                                <div className='docSubmissin-instructional-img instructional-img-left'>
                                    <img src={require('../img/room.png')}  alt="doc-submission"/>
                                </div>
                                <div className='docSubmissin-instructional-content docSubmissin-instructional-content-right'>
                                    <div className='content-right'>
                                        <h2>Accommodation</h2>
                                        <p>Student rooms are private living spaces provided for individual students. These rooms typically include basic furnishings such as a bed, desk, and storage, offering a comfortable environment for studying and rest.</p>
                                        <a href=''>
                                            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.5 1.8125C17.8649 1.8125 21.092 3.14921 23.4714 5.52858C25.8508 7.90795 27.1875 11.1351 27.1875 14.5C27.1875 17.8649 25.8508 21.092 23.4714 23.4714C21.092 25.8508 17.8649 27.1875 14.5 27.1875C11.1351 27.1875 7.90795 25.8508 5.52858 23.4714C3.14921 21.092 1.8125 17.8649 1.8125 14.5C1.8125 11.1351 3.14921 7.90795 5.52858 5.52858C7.90795 3.14921 11.1351 1.8125 14.5 1.8125ZM14.5 25.375C17.3842 25.375 20.1503 24.2292 22.1898 22.1898C24.2292 20.1503 25.375 17.3842 25.375 14.5C25.375 11.6158 24.2292 8.84967 22.1898 6.81021C20.1503 4.77076 17.3842 3.625 14.5 3.625C11.6158 3.625 8.84967 4.77076 6.81021 6.81021C4.77076 8.84967 3.625 11.6158 3.625 14.5C3.625 17.3842 4.77076 20.1503 6.81021 22.1898C8.84967 24.2292 11.6158 25.375 14.5 25.375ZM13.1406 18.3624L18.9352 14.5L13.1406 10.6376V18.3624ZM13.4415 8.65831L20.5066 13.369C20.6928 13.4931 20.8455 13.6613 20.951 13.8586C21.0566 14.0559 21.1119 14.2762 21.1119 14.5C21.1119 14.7238 21.0566 14.9441 20.951 15.1414C20.8455 15.3387 20.6928 15.5069 20.5066 15.631L13.4415 20.3417C13.2368 20.4782 12.9989 20.5565 12.7531 20.5684C12.5074 20.5803 12.263 20.5252 12.0461 20.4091C11.8292 20.293 11.6478 20.1203 11.5214 19.9092C11.3949 19.6981 11.3281 19.4567 11.3281 19.2107V9.7875C11.3281 9.54147 11.3949 9.30005 11.5214 9.08899C11.6478 8.87794 11.8292 8.70515 12.0461 8.58906C12.263 8.47297 12.5074 8.41793 12.7531 8.42981C12.9989 8.44169 13.2368 8.52003 13.4415 8.6565V8.65831Z" fill="white"/>
                                            </svg>
                                            See more...
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className='room-has-info'>
                            <h2>Each student room has</h2>
                            <div className='numeric-data-dorm room-numeric-info'>
                                <div className='data-dorm-item'>
                                    <h4>Total number of sleeping beds:</h4>
                                    <h1>4</h1>
                                </div>
                                <div className='data-dorm-item'>
                                    <h4>Total number of writing desks:</h4>
                                    <h1>2</h1>
                                </div>
                                <div className='data-dorm-item'>
                                    <h4>Total number of cabinets</h4>
                                    <h1>4</h1>
                                </div>
                                <div className='data-dorm-item'>
                                    <h4>Total number of bookshelves</h4>
                                    <h1>4</h1>
                                </div>
                            </div>
                        </section>
                    </>
                )}
                {numTurn === 2 && (
                    <>
                        <section className='social-header'>
                            <h1>Social Life in the SDU Dorm</h1>
                            <div className='social-header-container'>
                                <div className='social-header-content'>
                                    <h2>This page is developed for to review all events within the dorm.</h2>
                                    <p>You can browse the various interesting seasonal activities and events experienced by a student in the SDU Dorm here on this page.</p>
                                </div>
                                <div className='social-header-img'>
                                    <img src={require('../img/social-header-img.jpg')} alt='social-header-img'/>
                                </div>
                            </div>
                        </section>
                        <section className='social-life-boxes'>
                            <div className='social-box-item'>
                                <img src={require('../img/ice-party.jpg')} alt="dorm"/>
                                <div className='social-item-content'>
                                    <h3>SDU ICE Party</h3>
                                    <p>SDU ICE Party is an event held every winter for students of SDU dormitories</p>
                                    <a href=''>
                                        Learn more...
                                    </a>
                                </div>
                            </div>
                            <div className='social-box-item'>
                                <img src={require('../img/sdu-heroes.jpg')} alt="dorm"/>
                                <div className='social-item-content'>
                                    <h3>SDU Heroes</h3>
                                    <p>SDU  Heroes is an event held every autumn for students of SDU Dorm</p>
                                    <a href=''>
                                        Learn more...
                                    </a>
                                </div>
                            </div>
                            <div className='social-box-item'>
                                <img src={require('../img/hangover.jpg')} alt="dorm"/>
                                <div className='social-item-content'>
                                    <h3>Hangover</h3>
                                    <p>Hangover is an event held every spring for students of SDU dormitories</p>
                                    <a href=''>
                                        Learn more...
                                    </a>
                                </div>
                            </div>
                        </section>
                        <section className='instructional-videos dormitory-review social-life-review'>
                            <div className='docSubmissin-instructional instruction-videos-item'>
                                <div className='docSubmissin-instructional-content'>
                                    <div>
                                        <h2>SDU ICE Party</h2>
                                        <p>SDU ICE Party event, held annually in winter for dormitory students.This is considered a day trip.In the morning, buses are waiting for students in front of the hostel, and by the same bus, students, together with their teachers, go to the Medeo ice skating rink.It is played in different ways. And along the way, a quiz question and answer game will be played for students on the bus.The winners will be Prize-winning</p>
                                        <a href=''>
                                            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.5 1.8125C17.8649 1.8125 21.092 3.14921 23.4714 5.52858C25.8508 7.90795 27.1875 11.1351 27.1875 14.5C27.1875 17.8649 25.8508 21.092 23.4714 23.4714C21.092 25.8508 17.8649 27.1875 14.5 27.1875C11.1351 27.1875 7.90795 25.8508 5.52858 23.4714C3.14921 21.092 1.8125 17.8649 1.8125 14.5C1.8125 11.1351 3.14921 7.90795 5.52858 5.52858C7.90795 3.14921 11.1351 1.8125 14.5 1.8125ZM14.5 25.375C17.3842 25.375 20.1503 24.2292 22.1898 22.1898C24.2292 20.1503 25.375 17.3842 25.375 14.5C25.375 11.6158 24.2292 8.84967 22.1898 6.81021C20.1503 4.77076 17.3842 3.625 14.5 3.625C11.6158 3.625 8.84967 4.77076 6.81021 6.81021C4.77076 8.84967 3.625 11.6158 3.625 14.5C3.625 17.3842 4.77076 20.1503 6.81021 22.1898C8.84967 24.2292 11.6158 25.375 14.5 25.375ZM13.1406 18.3624L18.9352 14.5L13.1406 10.6376V18.3624ZM13.4415 8.65831L20.5066 13.369C20.6928 13.4931 20.8455 13.6613 20.951 13.8586C21.0566 14.0559 21.1119 14.2762 21.1119 14.5C21.1119 14.7238 21.0566 14.9441 20.951 15.1414C20.8455 15.3387 20.6928 15.5069 20.5066 15.631L13.4415 20.3417C13.2368 20.4782 12.9989 20.5565 12.7531 20.5684C12.5074 20.5803 12.263 20.5252 12.0461 20.4091C11.8292 20.293 11.6478 20.1203 11.5214 19.9092C11.3949 19.6981 11.3281 19.4567 11.3281 19.2107V9.7875C11.3281 9.54147 11.3949 9.30005 11.5214 9.08899C11.6478 8.87794 11.8292 8.70515 12.0461 8.58906C12.263 8.47297 12.5074 8.41793 12.7531 8.42981C12.9989 8.44169 13.2368 8.52003 13.4415 8.6565V8.65831Z" fill="white"/>
                                            </svg>
                                            Watch the video
                                        </a>
                                    </div>
                                </div>
                                <div className='docSubmissin-instructional-img social-life-img'>
                                    <img src={require('../img/ice-party.jpg')}  alt="doc-submission"/>
                                </div>
                            </div>
                            <div className='docSubmissin-instructional instruction-videos-item'>
                                <div className='docSubmissin-instructional-img instructional-img-left social-life-img'>
                                    <img src={require('../img/sdu-heroes.jpg')}  alt="doc-submission"/>
                                </div>
                                <div className='docSubmissin-instructional-content docSubmissin-instructional-content-right'>
                                    <div className='content-right'>
                                        <h2>SDU Heroes</h2>
                                        <p>One of the seasonal events is he SDU Heroes. This event is held annually in the fall. In the morning, students go on a day trip to the Mountain Recreation Area "Electron" outside the city. It competes through sports relays, where the finish point was the mountain.Each student joins the team, and each team also has two groups of leaders.The winners will be awarded prizes such as breakfast with the Rector, breakfast with the dean</p>
                                        <a href=''>
                                            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.5 1.8125C17.8649 1.8125 21.092 3.14921 23.4714 5.52858C25.8508 7.90795 27.1875 11.1351 27.1875 14.5C27.1875 17.8649 25.8508 21.092 23.4714 23.4714C21.092 25.8508 17.8649 27.1875 14.5 27.1875C11.1351 27.1875 7.90795 25.8508 5.52858 23.4714C3.14921 21.092 1.8125 17.8649 1.8125 14.5C1.8125 11.1351 3.14921 7.90795 5.52858 5.52858C7.90795 3.14921 11.1351 1.8125 14.5 1.8125ZM14.5 25.375C17.3842 25.375 20.1503 24.2292 22.1898 22.1898C24.2292 20.1503 25.375 17.3842 25.375 14.5C25.375 11.6158 24.2292 8.84967 22.1898 6.81021C20.1503 4.77076 17.3842 3.625 14.5 3.625C11.6158 3.625 8.84967 4.77076 6.81021 6.81021C4.77076 8.84967 3.625 11.6158 3.625 14.5C3.625 17.3842 4.77076 20.1503 6.81021 22.1898C8.84967 24.2292 11.6158 25.375 14.5 25.375ZM13.1406 18.3624L18.9352 14.5L13.1406 10.6376V18.3624ZM13.4415 8.65831L20.5066 13.369C20.6928 13.4931 20.8455 13.6613 20.951 13.8586C21.0566 14.0559 21.1119 14.2762 21.1119 14.5C21.1119 14.7238 21.0566 14.9441 20.951 15.1414C20.8455 15.3387 20.6928 15.5069 20.5066 15.631L13.4415 20.3417C13.2368 20.4782 12.9989 20.5565 12.7531 20.5684C12.5074 20.5803 12.263 20.5252 12.0461 20.4091C11.8292 20.293 11.6478 20.1203 11.5214 19.9092C11.3949 19.6981 11.3281 19.4567 11.3281 19.2107V9.7875C11.3281 9.54147 11.3949 9.30005 11.5214 9.08899C11.6478 8.87794 11.8292 8.70515 12.0461 8.58906C12.263 8.47297 12.5074 8.41793 12.7531 8.42981C12.9989 8.44169 13.2368 8.52003 13.4415 8.6565V8.65831Z" fill="white"/>
                                            </svg>
                                            Watch the video
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className='docSubmissin-instructional instruction-videos-item'>
                                <div className='docSubmissin-instructional-content'>
                                    <div>
                                        <h2>Hangover</h2>
                                        <p>The Hangover is a seasonal event held each year in the spring.This event consists of several sub-stages.It can be said that the main thing is to have fun without sleeping until the morning. As for the types of sub-stages, among students there are tournaments on CS:Go, table tennis, tournaments on Playstation and, most importantly, it is a quest game.</p>
                                        <a href=''>
                                            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.5 1.8125C17.8649 1.8125 21.092 3.14921 23.4714 5.52858C25.8508 7.90795 27.1875 11.1351 27.1875 14.5C27.1875 17.8649 25.8508 21.092 23.4714 23.4714C21.092 25.8508 17.8649 27.1875 14.5 27.1875C11.1351 27.1875 7.90795 25.8508 5.52858 23.4714C3.14921 21.092 1.8125 17.8649 1.8125 14.5C1.8125 11.1351 3.14921 7.90795 5.52858 5.52858C7.90795 3.14921 11.1351 1.8125 14.5 1.8125ZM14.5 25.375C17.3842 25.375 20.1503 24.2292 22.1898 22.1898C24.2292 20.1503 25.375 17.3842 25.375 14.5C25.375 11.6158 24.2292 8.84967 22.1898 6.81021C20.1503 4.77076 17.3842 3.625 14.5 3.625C11.6158 3.625 8.84967 4.77076 6.81021 6.81021C4.77076 8.84967 3.625 11.6158 3.625 14.5C3.625 17.3842 4.77076 20.1503 6.81021 22.1898C8.84967 24.2292 11.6158 25.375 14.5 25.375ZM13.1406 18.3624L18.9352 14.5L13.1406 10.6376V18.3624ZM13.4415 8.65831L20.5066 13.369C20.6928 13.4931 20.8455 13.6613 20.951 13.8586C21.0566 14.0559 21.1119 14.2762 21.1119 14.5C21.1119 14.7238 21.0566 14.9441 20.951 15.1414C20.8455 15.3387 20.6928 15.5069 20.5066 15.631L13.4415 20.3417C13.2368 20.4782 12.9989 20.5565 12.7531 20.5684C12.5074 20.5803 12.263 20.5252 12.0461 20.4091C11.8292 20.293 11.6478 20.1203 11.5214 19.9092C11.3949 19.6981 11.3281 19.4567 11.3281 19.2107V9.7875C11.3281 9.54147 11.3949 9.30005 11.5214 9.08899C11.6478 8.87794 11.8292 8.70515 12.0461 8.58906C12.263 8.47297 12.5074 8.41793 12.7531 8.42981C12.9989 8.44169 13.2368 8.52003 13.4415 8.6565V8.65831Z" fill="white"/>
                                            </svg>
                                            Watch the video
                                        </a>
                                    </div>
                                </div>
                                <div className='docSubmissin-instructional-img social-life-img'>
                                    <img src={require('../img/hangover.jpg')}  alt="doc-submission"/>
                                </div>
                            </div>
                        </section>
                    </>
                )}
        </div>
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
