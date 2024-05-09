import React from 'react'
import Navbar from '../../components/Navbar'

export default function NewsPublish() {
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
                            <a href=''>
                                Add News Category
                            </a>
                        </div>
                    </div>
                    <div className="dorm-img">
                        <img src={require('../../img/dorm-img.png')} alt="dorm"/>
                    </div>
                </header>
            </section>
        </div>
    </div>
  )
}
