import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
// import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function AboutUs() {
    const [numTurn, setNumTurn] = useState(1);

    function setNumTurnClick(index){
        setNumTurn(index);
     }

  return (
    <div className='rooms' style={{ backgroundColor: numTurn === 2 ? '#f0f0f0' : '' }}>
        <Navbar/>
        <div className='rooms-container'>
                <div className='profile-nav aboutUs-nav' id='profile-nav'>
                    <button className={numTurn === 1 ? 'active' : ''} onClick={()=>setNumTurnClick(1)}>
                        About the Gala
                    </button>
                    <button className={numTurn === 2 ? 'active' : ''} onClick={()=>setNumTurnClick(2)}>
                        Development Team
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
                        <section className="main-points main-tasks">
                            <h2>Student House Mission and Responsibilities</h2>
                            <div className='main-points-container main-task-container'>
                                <div class="vision main-task-item">
                                    <div className='vision-circle'></div>
                                    <h3>Main Task</h3>
                                    <p>Creating an atmosphere of mutual understanding among students of SDU</p>
                                </div>
                                <div class="mission main-task-item">
                                    <div className='mission-circle'></div>
                                    <h3>Main Task</h3>
                                    <p>Ensuring Student Comfort and Well-being Through Supportive Measures</p>
                                </div>
                                <div class="mission main-task-item">
                                    <div className='main-task-circle'></div>
                                    <h3>Main Task</h3>
                                    <p>Providing a place for young people to strive for knowledge and make friends</p>
                                </div>
                                <div class="goal main-task-item">
                                    <div className='goal-circle'></div>
                                    <h3>Main Task</h3>
                                    <p>Key role in forming specialists who develop Kazakhstan internationally</p>
                                </div>
                            </div>
                        </section>
                        <section className='contact-dormitory'>
                            <h2>Contact with the Dormitory</h2>
                            <div className='dorm-contact-container'>
                                <div className='male-dorm-contact'>
                                    <h3>Male Dorm</h3>
                                    <div className='male-dorm-info'>
                                        <div className='male-info-item'>
                                            <h3>The head of the Male Dorm:</h3>
                                            <h4>Shokan Duisenov</h4>
                                            <div className='dorm-contact-info'>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16.667 3.33301H3.33366C2.41699 3.33301 1.67533 4.08301 1.67533 4.99967L1.66699 14.9997C1.66699 15.9163 2.41699 16.6663 3.33366 16.6663H16.667C17.5837 16.6663 18.3337 15.9163 18.3337 14.9997V4.99967C18.3337 4.08301 17.5837 3.33301 16.667 3.33301ZM16.667 6.66634L10.0003 10.833L3.33366 6.66634V4.99967L10.0003 9.16634L16.667 4.99967V6.66634Z" fill="white"/>
                                                </svg>
                                                dormserviceboys@sdu.edu.kz
                                            </div>
                                            <div className='dorm-contact-info'>
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.2735 17.7496C13.511 17.7496 12.4399 17.4739 10.836 16.5778C8.88562 15.484 7.37702 14.4742 5.43718 12.5395C3.56687 10.6703 2.65671 9.46018 1.38288 7.14222C-0.0561797 4.52503 0.189133 3.15315 0.463352 2.56683C0.789914 1.86604 1.27195 1.4469 1.89499 1.03089C2.24888 0.799026 2.62338 0.600269 3.01374 0.437138C3.0528 0.420341 3.08913 0.404325 3.12156 0.389872C3.31491 0.302763 3.60788 0.171122 3.97898 0.311747C4.22663 0.404716 4.44773 0.59495 4.79382 0.936747C5.50359 1.63675 6.47351 3.19573 6.83132 3.96136C7.07156 4.47737 7.23054 4.818 7.23093 5.20003C7.23093 5.64729 7.00593 5.99222 6.73288 6.36448C6.68171 6.4344 6.63093 6.5012 6.58171 6.56604C6.28445 6.95667 6.21921 7.06956 6.26218 7.27112C6.34929 7.6762 6.9989 8.88206 8.06648 9.94729C9.13406 11.0125 10.3051 11.6211 10.7118 11.7078C10.9219 11.7528 11.0372 11.6848 11.4403 11.377C11.4981 11.3328 11.5575 11.2871 11.6196 11.2414C12.036 10.9317 12.3649 10.7125 12.8016 10.7125H12.804C13.1841 10.7125 13.5094 10.8774 14.0485 11.1492C14.7516 11.5039 16.3575 12.4614 17.0618 13.1719C17.4044 13.5172 17.5954 13.7375 17.6887 13.9848C17.8294 14.3571 17.6969 14.6489 17.6106 14.8442C17.5962 14.8766 17.5802 14.9121 17.5634 14.9516C17.3989 15.3413 17.199 15.715 16.9661 16.068C16.5509 16.6891 16.1301 17.17 15.4278 17.4969C15.0672 17.6675 14.6725 17.7539 14.2735 17.7496Z" fill="white" fill-opacity="0.85"/>
                                                </svg>
                                                (mob.) +7 702 958 7910
                                            </div>
                                        </div>
                                        <div className='male-info-item'>
                                            <h3>Reception/ plumbing services:</h3>
                                            <h4>Ms. Afura</h4>
                                            <div className='dorm-contact-info'>
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.2735 17.7496C13.511 17.7496 12.4399 17.4739 10.836 16.5778C8.88562 15.484 7.37702 14.4742 5.43718 12.5395C3.56687 10.6703 2.65671 9.46018 1.38288 7.14222C-0.0561797 4.52503 0.189133 3.15315 0.463352 2.56683C0.789914 1.86604 1.27195 1.4469 1.89499 1.03089C2.24888 0.799026 2.62338 0.600269 3.01374 0.437138C3.0528 0.420341 3.08913 0.404325 3.12156 0.389872C3.31491 0.302763 3.60788 0.171122 3.97898 0.311747C4.22663 0.404716 4.44773 0.59495 4.79382 0.936747C5.50359 1.63675 6.47351 3.19573 6.83132 3.96136C7.07156 4.47737 7.23054 4.818 7.23093 5.20003C7.23093 5.64729 7.00593 5.99222 6.73288 6.36448C6.68171 6.4344 6.63093 6.5012 6.58171 6.56604C6.28445 6.95667 6.21921 7.06956 6.26218 7.27112C6.34929 7.6762 6.9989 8.88206 8.06648 9.94729C9.13406 11.0125 10.3051 11.6211 10.7118 11.7078C10.9219 11.7528 11.0372 11.6848 11.4403 11.377C11.4981 11.3328 11.5575 11.2871 11.6196 11.2414C12.036 10.9317 12.3649 10.7125 12.8016 10.7125H12.804C13.1841 10.7125 13.5094 10.8774 14.0485 11.1492C14.7516 11.5039 16.3575 12.4614 17.0618 13.1719C17.4044 13.5172 17.5954 13.7375 17.6887 13.9848C17.8294 14.3571 17.6969 14.6489 17.6106 14.8442C17.5962 14.8766 17.5802 14.9121 17.5634 14.9516C17.3989 15.3413 17.199 15.715 16.9661 16.068C16.5509 16.6891 16.1301 17.17 15.4278 17.4969C15.0672 17.6675 14.6725 17.7539 14.2735 17.7496Z" fill="white" fill-opacity="0.85"/>
                                                </svg>
                                                (mob.) +7 778 727 9567
                                            </div>
                                            <div className='dorm-contact-info'>
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.2735 17.7496C13.511 17.7496 12.4399 17.4739 10.836 16.5778C8.88562 15.484 7.37702 14.4742 5.43718 12.5395C3.56687 10.6703 2.65671 9.46018 1.38288 7.14222C-0.0561797 4.52503 0.189133 3.15315 0.463352 2.56683C0.789914 1.86604 1.27195 1.4469 1.89499 1.03089C2.24888 0.799026 2.62338 0.600269 3.01374 0.437138C3.0528 0.420341 3.08913 0.404325 3.12156 0.389872C3.31491 0.302763 3.60788 0.171122 3.97898 0.311747C4.22663 0.404716 4.44773 0.59495 4.79382 0.936747C5.50359 1.63675 6.47351 3.19573 6.83132 3.96136C7.07156 4.47737 7.23054 4.818 7.23093 5.20003C7.23093 5.64729 7.00593 5.99222 6.73288 6.36448C6.68171 6.4344 6.63093 6.5012 6.58171 6.56604C6.28445 6.95667 6.21921 7.06956 6.26218 7.27112C6.34929 7.6762 6.9989 8.88206 8.06648 9.94729C9.13406 11.0125 10.3051 11.6211 10.7118 11.7078C10.9219 11.7528 11.0372 11.6848 11.4403 11.377C11.4981 11.3328 11.5575 11.2871 11.6196 11.2414C12.036 10.9317 12.3649 10.7125 12.8016 10.7125H12.804C13.1841 10.7125 13.5094 10.8774 14.0485 11.1492C14.7516 11.5039 16.3575 12.4614 17.0618 13.1719C17.4044 13.5172 17.5954 13.7375 17.6887 13.9848C17.8294 14.3571 17.6969 14.6489 17.6106 14.8442C17.5962 14.8766 17.5802 14.9121 17.5634 14.9516C17.3989 15.3413 17.199 15.715 16.9661 16.068C16.5509 16.6891 16.1301 17.17 15.4278 17.4969C15.0672 17.6675 14.6725 17.7539 14.2735 17.7496Z" fill="white" fill-opacity="0.85"/>
                                                </svg>
                                                (tel.) +7 727 307 9560 (int. 704)
                                            </div>
                                        </div>
                                        <div className='male-info-item'>
                                            <h3>Security:</h3>
                                            <h4>Mr.Nursultan</h4>
                                            <div className='dorm-contact-info'>
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.2735 17.7496C13.511 17.7496 12.4399 17.4739 10.836 16.5778C8.88562 15.484 7.37702 14.4742 5.43718 12.5395C3.56687 10.6703 2.65671 9.46018 1.38288 7.14222C-0.0561797 4.52503 0.189133 3.15315 0.463352 2.56683C0.789914 1.86604 1.27195 1.4469 1.89499 1.03089C2.24888 0.799026 2.62338 0.600269 3.01374 0.437138C3.0528 0.420341 3.08913 0.404325 3.12156 0.389872C3.31491 0.302763 3.60788 0.171122 3.97898 0.311747C4.22663 0.404716 4.44773 0.59495 4.79382 0.936747C5.50359 1.63675 6.47351 3.19573 6.83132 3.96136C7.07156 4.47737 7.23054 4.818 7.23093 5.20003C7.23093 5.64729 7.00593 5.99222 6.73288 6.36448C6.68171 6.4344 6.63093 6.5012 6.58171 6.56604C6.28445 6.95667 6.21921 7.06956 6.26218 7.27112C6.34929 7.6762 6.9989 8.88206 8.06648 9.94729C9.13406 11.0125 10.3051 11.6211 10.7118 11.7078C10.9219 11.7528 11.0372 11.6848 11.4403 11.377C11.4981 11.3328 11.5575 11.2871 11.6196 11.2414C12.036 10.9317 12.3649 10.7125 12.8016 10.7125H12.804C13.1841 10.7125 13.5094 10.8774 14.0485 11.1492C14.7516 11.5039 16.3575 12.4614 17.0618 13.1719C17.4044 13.5172 17.5954 13.7375 17.6887 13.9848C17.8294 14.3571 17.6969 14.6489 17.6106 14.8442C17.5962 14.8766 17.5802 14.9121 17.5634 14.9516C17.3989 15.3413 17.199 15.715 16.9661 16.068C16.5509 16.6891 16.1301 17.17 15.4278 17.4969C15.0672 17.6675 14.6725 17.7539 14.2735 17.7496Z" fill="white" fill-opacity="0.85"/>
                                                </svg>
                                                (tel.) +7 727 307 9560 (int. 199 /197)
                                            </div>
                                        </div>
                                        <div className='male-info-item'>
                                            <h3>Medical Care:</h3>
                                            <h4>Mr. Dias</h4>
                                            <div className='dorm-contact-info'>
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.2735 17.7496C13.511 17.7496 12.4399 17.4739 10.836 16.5778C8.88562 15.484 7.37702 14.4742 5.43718 12.5395C3.56687 10.6703 2.65671 9.46018 1.38288 7.14222C-0.0561797 4.52503 0.189133 3.15315 0.463352 2.56683C0.789914 1.86604 1.27195 1.4469 1.89499 1.03089C2.24888 0.799026 2.62338 0.600269 3.01374 0.437138C3.0528 0.420341 3.08913 0.404325 3.12156 0.389872C3.31491 0.302763 3.60788 0.171122 3.97898 0.311747C4.22663 0.404716 4.44773 0.59495 4.79382 0.936747C5.50359 1.63675 6.47351 3.19573 6.83132 3.96136C7.07156 4.47737 7.23054 4.818 7.23093 5.20003C7.23093 5.64729 7.00593 5.99222 6.73288 6.36448C6.68171 6.4344 6.63093 6.5012 6.58171 6.56604C6.28445 6.95667 6.21921 7.06956 6.26218 7.27112C6.34929 7.6762 6.9989 8.88206 8.06648 9.94729C9.13406 11.0125 10.3051 11.6211 10.7118 11.7078C10.9219 11.7528 11.0372 11.6848 11.4403 11.377C11.4981 11.3328 11.5575 11.2871 11.6196 11.2414C12.036 10.9317 12.3649 10.7125 12.8016 10.7125H12.804C13.1841 10.7125 13.5094 10.8774 14.0485 11.1492C14.7516 11.5039 16.3575 12.4614 17.0618 13.1719C17.4044 13.5172 17.5954 13.7375 17.6887 13.9848C17.8294 14.3571 17.6969 14.6489 17.6106 14.8442C17.5962 14.8766 17.5802 14.9121 17.5634 14.9516C17.3989 15.3413 17.199 15.715 16.9661 16.068C16.5509 16.6891 16.1301 17.17 15.4278 17.4969C15.0672 17.6675 14.6725 17.7539 14.2735 17.7496Z" fill="white" fill-opacity="0.85"/>
                                                </svg>
                                                (mob.) +7 778 997 5839
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='female-dorm-contact'>
                                    <h3>Female Dorm</h3>
                                    <div className='female-dorm-info'>
                                        <div className='female-info-item'>
                                            <h3>The head of the Male Dorm:</h3>
                                            <h4>Aruzhan Zhanibek</h4>
                                            <div className='dorm-contact-info'>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16.667 3.33301H3.33366C2.41699 3.33301 1.67533 4.08301 1.67533 4.99967L1.66699 14.9997C1.66699 15.9163 2.41699 16.6663 3.33366 16.6663H16.667C17.5837 16.6663 18.3337 15.9163 18.3337 14.9997V4.99967C18.3337 4.08301 17.5837 3.33301 16.667 3.33301ZM16.667 6.66634L10.0003 10.833L3.33366 6.66634V4.99967L10.0003 9.16634L16.667 4.99967V6.66634Z" fill="white"/>
                                                </svg>
                                                dormservicegirls@sdu.edu.kz
                                            </div>
                                            <div className='dorm-contact-info'>
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.2735 17.7496C13.511 17.7496 12.4399 17.4739 10.836 16.5778C8.88562 15.484 7.37702 14.4742 5.43718 12.5395C3.56687 10.6703 2.65671 9.46018 1.38288 7.14222C-0.0561797 4.52503 0.189133 3.15315 0.463352 2.56683C0.789914 1.86604 1.27195 1.4469 1.89499 1.03089C2.24888 0.799026 2.62338 0.600269 3.01374 0.437138C3.0528 0.420341 3.08913 0.404325 3.12156 0.389872C3.31491 0.302763 3.60788 0.171122 3.97898 0.311747C4.22663 0.404716 4.44773 0.59495 4.79382 0.936747C5.50359 1.63675 6.47351 3.19573 6.83132 3.96136C7.07156 4.47737 7.23054 4.818 7.23093 5.20003C7.23093 5.64729 7.00593 5.99222 6.73288 6.36448C6.68171 6.4344 6.63093 6.5012 6.58171 6.56604C6.28445 6.95667 6.21921 7.06956 6.26218 7.27112C6.34929 7.6762 6.9989 8.88206 8.06648 9.94729C9.13406 11.0125 10.3051 11.6211 10.7118 11.7078C10.9219 11.7528 11.0372 11.6848 11.4403 11.377C11.4981 11.3328 11.5575 11.2871 11.6196 11.2414C12.036 10.9317 12.3649 10.7125 12.8016 10.7125H12.804C13.1841 10.7125 13.5094 10.8774 14.0485 11.1492C14.7516 11.5039 16.3575 12.4614 17.0618 13.1719C17.4044 13.5172 17.5954 13.7375 17.6887 13.9848C17.8294 14.3571 17.6969 14.6489 17.6106 14.8442C17.5962 14.8766 17.5802 14.9121 17.5634 14.9516C17.3989 15.3413 17.199 15.715 16.9661 16.068C16.5509 16.6891 16.1301 17.17 15.4278 17.4969C15.0672 17.6675 14.6725 17.7539 14.2735 17.7496Z" fill="white" fill-opacity="0.85"/>
                                                </svg>
                                                (mob.) +7 702 958 7911
                                            </div>
                                        </div>
                                        <div className='female-info-item'>
                                            <h3>Reception/ plumbing services:</h3>
                                            <h4>Ms. Raushan</h4>
                                            <div className='dorm-contact-info'>
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.2735 17.7496C13.511 17.7496 12.4399 17.4739 10.836 16.5778C8.88562 15.484 7.37702 14.4742 5.43718 12.5395C3.56687 10.6703 2.65671 9.46018 1.38288 7.14222C-0.0561797 4.52503 0.189133 3.15315 0.463352 2.56683C0.789914 1.86604 1.27195 1.4469 1.89499 1.03089C2.24888 0.799026 2.62338 0.600269 3.01374 0.437138C3.0528 0.420341 3.08913 0.404325 3.12156 0.389872C3.31491 0.302763 3.60788 0.171122 3.97898 0.311747C4.22663 0.404716 4.44773 0.59495 4.79382 0.936747C5.50359 1.63675 6.47351 3.19573 6.83132 3.96136C7.07156 4.47737 7.23054 4.818 7.23093 5.20003C7.23093 5.64729 7.00593 5.99222 6.73288 6.36448C6.68171 6.4344 6.63093 6.5012 6.58171 6.56604C6.28445 6.95667 6.21921 7.06956 6.26218 7.27112C6.34929 7.6762 6.9989 8.88206 8.06648 9.94729C9.13406 11.0125 10.3051 11.6211 10.7118 11.7078C10.9219 11.7528 11.0372 11.6848 11.4403 11.377C11.4981 11.3328 11.5575 11.2871 11.6196 11.2414C12.036 10.9317 12.3649 10.7125 12.8016 10.7125H12.804C13.1841 10.7125 13.5094 10.8774 14.0485 11.1492C14.7516 11.5039 16.3575 12.4614 17.0618 13.1719C17.4044 13.5172 17.5954 13.7375 17.6887 13.9848C17.8294 14.3571 17.6969 14.6489 17.6106 14.8442C17.5962 14.8766 17.5802 14.9121 17.5634 14.9516C17.3989 15.3413 17.199 15.715 16.9661 16.068C16.5509 16.6891 16.1301 17.17 15.4278 17.4969C15.0672 17.6675 14.6725 17.7539 14.2735 17.7496Z" fill="white" fill-opacity="0.85"/>
                                                </svg>
                                                (mob.) +7 775 529 2726
                                            </div>
                                            <div className='dorm-contact-info'>
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.2735 17.7496C13.511 17.7496 12.4399 17.4739 10.836 16.5778C8.88562 15.484 7.37702 14.4742 5.43718 12.5395C3.56687 10.6703 2.65671 9.46018 1.38288 7.14222C-0.0561797 4.52503 0.189133 3.15315 0.463352 2.56683C0.789914 1.86604 1.27195 1.4469 1.89499 1.03089C2.24888 0.799026 2.62338 0.600269 3.01374 0.437138C3.0528 0.420341 3.08913 0.404325 3.12156 0.389872C3.31491 0.302763 3.60788 0.171122 3.97898 0.311747C4.22663 0.404716 4.44773 0.59495 4.79382 0.936747C5.50359 1.63675 6.47351 3.19573 6.83132 3.96136C7.07156 4.47737 7.23054 4.818 7.23093 5.20003C7.23093 5.64729 7.00593 5.99222 6.73288 6.36448C6.68171 6.4344 6.63093 6.5012 6.58171 6.56604C6.28445 6.95667 6.21921 7.06956 6.26218 7.27112C6.34929 7.6762 6.9989 8.88206 8.06648 9.94729C9.13406 11.0125 10.3051 11.6211 10.7118 11.7078C10.9219 11.7528 11.0372 11.6848 11.4403 11.377C11.4981 11.3328 11.5575 11.2871 11.6196 11.2414C12.036 10.9317 12.3649 10.7125 12.8016 10.7125H12.804C13.1841 10.7125 13.5094 10.8774 14.0485 11.1492C14.7516 11.5039 16.3575 12.4614 17.0618 13.1719C17.4044 13.5172 17.5954 13.7375 17.6887 13.9848C17.8294 14.3571 17.6969 14.6489 17.6106 14.8442C17.5962 14.8766 17.5802 14.9121 17.5634 14.9516C17.3989 15.3413 17.199 15.715 16.9661 16.068C16.5509 16.6891 16.1301 17.17 15.4278 17.4969C15.0672 17.6675 14.6725 17.7539 14.2735 17.7496Z" fill="white" fill-opacity="0.85"/>
                                                </svg>
                                                (tel.) +7 727 307 9560 (int. 700)
                                            </div>
                                        </div>
                                        <div className='female-info-item'>
                                            <h3>Security:</h3>
                                            <h4>Mr.Nursultan</h4>
                                            <div className='dorm-contact-info'>
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.2735 17.7496C13.511 17.7496 12.4399 17.4739 10.836 16.5778C8.88562 15.484 7.37702 14.4742 5.43718 12.5395C3.56687 10.6703 2.65671 9.46018 1.38288 7.14222C-0.0561797 4.52503 0.189133 3.15315 0.463352 2.56683C0.789914 1.86604 1.27195 1.4469 1.89499 1.03089C2.24888 0.799026 2.62338 0.600269 3.01374 0.437138C3.0528 0.420341 3.08913 0.404325 3.12156 0.389872C3.31491 0.302763 3.60788 0.171122 3.97898 0.311747C4.22663 0.404716 4.44773 0.59495 4.79382 0.936747C5.50359 1.63675 6.47351 3.19573 6.83132 3.96136C7.07156 4.47737 7.23054 4.818 7.23093 5.20003C7.23093 5.64729 7.00593 5.99222 6.73288 6.36448C6.68171 6.4344 6.63093 6.5012 6.58171 6.56604C6.28445 6.95667 6.21921 7.06956 6.26218 7.27112C6.34929 7.6762 6.9989 8.88206 8.06648 9.94729C9.13406 11.0125 10.3051 11.6211 10.7118 11.7078C10.9219 11.7528 11.0372 11.6848 11.4403 11.377C11.4981 11.3328 11.5575 11.2871 11.6196 11.2414C12.036 10.9317 12.3649 10.7125 12.8016 10.7125H12.804C13.1841 10.7125 13.5094 10.8774 14.0485 11.1492C14.7516 11.5039 16.3575 12.4614 17.0618 13.1719C17.4044 13.5172 17.5954 13.7375 17.6887 13.9848C17.8294 14.3571 17.6969 14.6489 17.6106 14.8442C17.5962 14.8766 17.5802 14.9121 17.5634 14.9516C17.3989 15.3413 17.199 15.715 16.9661 16.068C16.5509 16.6891 16.1301 17.17 15.4278 17.4969C15.0672 17.6675 14.6725 17.7539 14.2735 17.7496Z" fill="white" fill-opacity="0.85"/>
                                                </svg>
                                                (tel.) +7 727 307 9560 (int. 199 /197)
                                            </div>
                                        </div>
                                        <div className='female-info-item'>
                                            <h3>Medical Care:</h3>
                                            <h4>Mr. Dias</h4>
                                            <div className='dorm-contact-info'>
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.2735 17.7496C13.511 17.7496 12.4399 17.4739 10.836 16.5778C8.88562 15.484 7.37702 14.4742 5.43718 12.5395C3.56687 10.6703 2.65671 9.46018 1.38288 7.14222C-0.0561797 4.52503 0.189133 3.15315 0.463352 2.56683C0.789914 1.86604 1.27195 1.4469 1.89499 1.03089C2.24888 0.799026 2.62338 0.600269 3.01374 0.437138C3.0528 0.420341 3.08913 0.404325 3.12156 0.389872C3.31491 0.302763 3.60788 0.171122 3.97898 0.311747C4.22663 0.404716 4.44773 0.59495 4.79382 0.936747C5.50359 1.63675 6.47351 3.19573 6.83132 3.96136C7.07156 4.47737 7.23054 4.818 7.23093 5.20003C7.23093 5.64729 7.00593 5.99222 6.73288 6.36448C6.68171 6.4344 6.63093 6.5012 6.58171 6.56604C6.28445 6.95667 6.21921 7.06956 6.26218 7.27112C6.34929 7.6762 6.9989 8.88206 8.06648 9.94729C9.13406 11.0125 10.3051 11.6211 10.7118 11.7078C10.9219 11.7528 11.0372 11.6848 11.4403 11.377C11.4981 11.3328 11.5575 11.2871 11.6196 11.2414C12.036 10.9317 12.3649 10.7125 12.8016 10.7125H12.804C13.1841 10.7125 13.5094 10.8774 14.0485 11.1492C14.7516 11.5039 16.3575 12.4614 17.0618 13.1719C17.4044 13.5172 17.5954 13.7375 17.6887 13.9848C17.8294 14.3571 17.6969 14.6489 17.6106 14.8442C17.5962 14.8766 17.5802 14.9121 17.5634 14.9516C17.3989 15.3413 17.199 15.715 16.9661 16.068C16.5509 16.6891 16.1301 17.17 15.4278 17.4969C15.0672 17.6675 14.6725 17.7539 14.2735 17.7496Z" fill="white" fill-opacity="0.85"/>
                                                </svg>
                                                (mob.) +7 778 997 5839
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )}
                {numTurn === 2 && (
                    <>
                        <section className='dorm-information'>
                            <header className='dorm-information-header'>
                                <div className="title-main">
                                    <h1>Diploma project team— Vision</h1>
                                    <p>
                                      The Vision team was founded in January 2024. Our main task is to make SDU student house reservations a convenient system for SDU students. And simplify the continuous process, improve communication and communication with students, and optimize the booking of places for freshmen through a user-friendly interface.  
                                    </p>
                                </div>
                                <div className="dorm-img">
                                    <img src={require('../img/vision-logo.png')} alt="vision-logo"/>
                                </div>
                            </header>
                        </section>
                        <section className='team-roles'>
                            <h1>Team Roles</h1>
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={30}
                                slidesPerView={4}
                                navigation
                                pagination={{ clickable: true }}
                                autoHeight={true}
                                scrollbar={{ draggable: true }}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                                breakpoints={{
                                    200: { slidesPerView: 1 },
                                    768: { slidesPerView: 2 },
                                    997: { slidesPerView: 3 },
                                    1270: { slidesPerView: 4 }
                                }}
                            >
                                <SwiperSlide>
                                <div className='team-member'>
                                    <div className='img-container'>
                                        <img src={require('../img/KamshatPM.jfif')} alt="Kamshat Koszhanova" />
                                    </div>
                                    <div className='main-info-member'>
                                        <h4>Kamshat Koszhanova</h4>
                                        <h5>Project Manager</h5>
                                        <p>
                                            "I am in the Project Manager position on the Vision team. And I am further developing my previous learned Project Management knowledge in the process of developing this project. I am pleased to contribute in the development of the SDU University dormitory online platform.”
                                        </p>
                                    </div>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='team-member'>
                                    <div className='img-container'>
                                        <img src={require('../img/Yerkebulan.jfif')} alt="Yerkebulan"/>
                                    </div>
                                    <div className='main-info-member'>
                                        <h4>Yerkebulan Rakhmanberdi</h4>
                                        <h5>Product Designer</h5>
                                        <p>
                                        “I work in the Vision team as a designer. And I am further developing the design tools that I learned in the process of creating this project. I am glad that I am contributing to the development of the online platform of the Dormitory of the University where I studied.”
                                        </p>
                                    </div>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='team-member'>
                                    <div className='img-container'>
                                        <img src={require('../img/Gala.jfif')} alt="Galymbek" />
                                    </div>
                                    <div className='main-info-member'>
                                        <h4>Galymbek Batyrbek</h4>
                                        <h5>Frontend Developer</h5>
                                        <p>
                                            "I'm  in the Frontend Developer position on the Vision team. And I am further developing my previous learned frontend development knowledge in the process of developing this project.I am pleased to contribute in the development of the SDU University dormitory online platform."
                                        </p>
                                    </div>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='team-member'>
                                    <div className='img-container'>
                                        <img src={require('../img/Rusya.jpg')} alt="Rustem" />
                                    </div>
                                    <div className='main-info-member'>
                                        <h4>Rustem Nygmet</h4>
                                        <h5>Backend Developer</h5>
                                        <p>
                                          "I am in the Backend Developer position on the Vision team. And I am further developing my previous learned Backend development knowledge in the process of developing this project.I am pleased to contribute in the development of the SDU University dormitory online platform."
                                        </p>
                                    </div>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='team-member'>
                                    <div className='img-container'>
                                        <img src={require('../img/Berik.jfif')} alt="Berik" />
                                    </div>
                                    <div className='main-info-member'>
                                        <h4>Berik Serikbay</h4>
                                        <h5>Backend Developer</h5>
                                        <p>
                                          "I am in the Backend Developer position on the Vision team. And I am further developing my previous learned Backend development knowledge in the process of developing this project.I am pleased to contribute in the development of the SDU University dormitory online platform."    
                                        </p>
                                    </div>
                                </div>
                                </SwiperSlide>
                            </Swiper>
                            {/* <div className='team-members-box'>
                                <div className='team-member'>
                                    <img src={require('../img/KamshatPM.jfif')} alt="img-member"/>
                                    <div className='main-info-member'>
                                        <h4>Kamshat Koszhanova</h4>
                                        <h5>Project Manager</h5>
                                        <p>
                                            "I am in the Project Manager position on the Vision team. And I am further developing my previous learned Project Management knowledge in the process of developing this project.I am pleased to contribute in the development of the SDU University dormitory online platform.”
                                        </p>
                                    </div>
                                </div>
                                <div className='team-member'>
                                    <img src={require('../img/KamshatPM.jfif')} alt="img-member"/>
                                    <div className='main-info-member'>
                                        <h4>Kamshat Koszhanova</h4>
                                        <h5>Project Manager</h5>
                                        <p>
                                            "I am in the Project Manager position on the Vision team. And I am further developing my previous learned Project Management knowledge in the process of developing this project.I am pleased to contribute in the development of the SDU University dormitory online platform.”
                                        </p>
                                    </div>
                                </div>
                                <div className='team-member'>
                                    <img src={require('../img/KamshatPM.jfif')} alt="img-member"/>
                                    <div className='main-info-member'>
                                        <h4>Kamshat Koszhanova</h4>
                                        <h5>Project Manager</h5>
                                        <p>
                                            "I am in the Project Manager position on the Vision team. And I am further developing my previous learned Project Management knowledge in the process of developing this project.I am pleased to contribute in the development of the SDU University dormitory online platform.”
                                        </p>
                                    </div>
                                </div>
                            </div> */}
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
