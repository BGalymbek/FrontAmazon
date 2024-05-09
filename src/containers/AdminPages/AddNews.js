import React, { useContext, useState } from 'react'
import Navbar from '../../components/Navbar'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router';
import AuthContext from '../../context/AuthContext';

export default function AddNews() {
    const navigate = useNavigate();
    const {authTokens} = useContext(AuthContext);

    const [title, setSelectedCategory] = useState("");
    const [content, setTitle] = useState("");
    const [file, setFile] = useState('')
    const [successfullyPublished, setSuccessfullyPublished] = useState('')

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const submit = async (e) =>{
        e.preventDefault();
        
         try{
            const formData = new FormData()
            formData.append('title', title);
            formData.append('content', content);
            formData.append('file', file);
            const response = await fetch('http://13.49.18.134/news/', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`,
                },
            });
    
          // console.log(response.response.data.email);
          console.log(await response.json());
    
          if(response.ok){
            navigate('/main-page');
            setSuccessfullyPublished('You registered succesfully! Please check your email')
          }else{
            setSuccessfullyPublished('')
          }
         }catch(err){
            console.error("Ошибка: ", err);
         }
      }
    
  return (
    <div className='add-news'>
        <Navbar/>
        <div className='add-news-container'>
            <div className='add-news-content'>
                <div className='add-news-logo'>
                    <img/>
                </div>
                <div className='add-news-title'>
                    <div className='add-title'>

                    </div>
                    <div className='add-news-img'>
                        <img/>
                    </div>
                </div>
                <form className='add-news-form' onSubmit={submit}>
                    <select id="floor-select" className='add-news-select' value={title} onChange={handleCategoryChange}>
                        <option value="">Selected Category</option>
                        <option value="SDU Dorm News">SDU Dorm News</option>
                        <option value="AC Catering News">AC Catering News</option>
                    </select>
                    <input 
                      type="txt" placeholder="Current Title" id="title"
                      onChange={e => setTitle(e.target.value)}
                      required
                      />
                    <input 
                        type="file" id="file" name="file"
                        onChange={e => setFile(e.target.files[0])}
                        required
                        placeholder='Upload File'
                    />
                    <button>Save</button>
                </form>
            </div>
        </div>
    </div>
  )
}
