import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import AuthContext from '../context/AuthContext';
import { json, useNavigate } from 'react-router';
import axios from 'axios';

export default function ProfilePage() {
  const { authTokens } = useContext(AuthContext)
  const userProfile = JSON.parse(localStorage.getItem('userProfile'))

  const [numTurn, setNumTurn] = useState(1);
  const [userDocuments, setDocumentsOfUser] = useState([])
  const [statement, setStatement] = useState('')
  const [photo_3x4, setPhoto] = useState('')
  const [form_075, setForm] = useState('')
  const [identity_card_copy, setIdentityCart] = useState('')

  function setNumTurnClick(index){
     setNumTurn(index);
  }

  // let profileNav = document.querySelector('#profile-nav').querySelectorAll('button')


  useEffect(() => {
    const fetchData = async () => {
        try {
            // Выполняем GET запрос
            const getResponse = await axios.get('documents/get/', {
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`,
                }
            });

            const res = getResponse.data
            setDocumentsOfUser(res)

            // console.log("Документы пользователя: ", res);
        } catch (error) {
            // Обработка ошибок
            console.error('Error fetching data:', error);
        }
    };

    fetchData(); // Вызов функции для выполнения запроса при загрузке компонента
}, [authTokens]);

const fetchData = async () => {
  const formData = new FormData();

  if (statement) {
      formData.append('statement', statement);
  }
  if (photo_3x4) {
      formData.append('photo_3x4', photo_3x4);
  }
  if (form_075) {
      formData.append('form_075', form_075);
  }
  if (identity_card_copy) {
      formData.append('identity_card_copy', identity_card_copy);
  }

  try {
      const response = await axios.patch('documents/update/', formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${authTokens.access}`,
          },
      });

      // Обработка успешного ответа
      window.location.reload()
  } catch (err) {
      console.error('You have problems: ' + err);
  }
};

  const userData = userDocuments.length > 0 ? userDocuments[0].user_data : '';
  console.log(userDocuments[0]);

  return (
    <div className='profile'>
        <Navbar/>
        <div className='profile-container'>
            <div className='profile-content'>
                <div className='profile-nav' id='profile-nav'>
                    <button className={numTurn === 1 ? 'active' : ''} onClick={()=>setNumTurnClick(1)}>
                        My Profile
                    </button>
                    <button className={numTurn === 2 ? 'active' : ''} onClick={()=>setNumTurnClick(2)}>
                        Submitted Documents
                    </button>
                </div>
                {numTurn === 1 && (
                    <>
                        <h1>{userData.first_name} {userData.last_name}</h1>
                        <div className='profile-data'>
                          <div className='user-info-box'>
                              <h3>User information</h3>
                              <div className='user-infos'>
                                  <ul className='user-info-labels'>
                                      <li>Full name</li>
                                      <li>Student ID</li>
                                      <li>Email</li>
                                      <li>Faculty</li>
                                      <li>Gender</li>
                                  </ul>
                                  <ul className='user-info'>
                                      <li>{userData.first_name} {userData.last_name}</li>
                                      <li>{userData.id_number}</li>
                                      <li>{userData.email}</li>
                                      <li>{userData.faculty_name}</li>
                                      <li>{userProfile.gender}</li>
                                  </ul>
                              </div>
                          </div>
                          <div className='profile-btns'>
                              <button>Change Password</button>
                              <button>Edit Profile</button>
                          </div>
                        </div>
                    </>
                )}
                {numTurn === 2 &&(
                  <>
                  <div className='status-container'>
                      <p className='status-txt'>Current Status of Document Submission: </p>
                      <div className='status'>
                        {userDocuments && userDocuments.length > 0 &&(
                          userDocuments[0].is_verified == false ? (
                            <div className='status-doc-submission' style= {{backgroundColor: '#F3A367' }}></div>
                          ):(
                            <div className='status-doc-submission' style= {{backgroundColor: '#00A35D' }}></div>
                          )
                        )}
                        {userDocuments && userDocuments.length > 0 &&
                          (
                            userDocuments[0].is_verified == false ? (
                              <p>Waiting verification of admin</p>
                            ):(
                              <p>Verified by Admin</p>
                            )
                          )}
                      </div>
                    </div>
                    <div className='submitted-doc-list'>
                      <div className='submitted-item'>
                              <div>
                                  <div className='submitted-img'>
                                    <img src={userDocuments[0].statement} alt="submited-item"/>
                                  </div>
                                  <p>statement</p>
                              </div>
                              <div className='custom-file-input update-file'>
                                <input 
                                  type="file" id="state" name="state"
                                  onChange={e => setStatement(e.target.files[0])}
                                  required
                                  placeholder='Updated File'
                                />
                                <img src={require('../img/update.png')} alt="logo"/>
                                <p>{statement ? statement.name : userDocuments[0].statement.substring(userDocuments[0].statement.lastIndexOf("/") + 1)}</p>
                              </div>
                      </div>
                      <div className='submitted-item'>
                        <div>
                          <div className='submitted-img'>
                            <img src={userDocuments[0].photo_3x4} alt="submited-item"/>
                          </div>
                          <p>3x4-photo</p>
                        </div>
                        <div className='custom-file-input update-file'>
                          <input 
                            type="file" id="photo" name="photo"
                            onChange={e => setPhoto(e.target.files[0])}
                            required
                            placeholder='Updated File'
                          />
                          <img src={require('../img/update.png')} alt="logo"/>
                          <p>{photo_3x4 ? photo_3x4.name : userDocuments[0].photo_3x4.substring(userDocuments[0].photo_3x4.lastIndexOf("/") + 1)}</p>
                        </div>
                      </div>
                      <div className='submitted-item'>
                        <div>
                          <div className='submitted-img'>
                             <img src={userDocuments[0].form_075} alt="submited-item"/>
                          </div>
                          <p>075-form</p>
                        </div>
                        <div className='custom-file-input update-file'>
                          <input 
                           type="file" id="form" name="form"
                           onChange={e => setForm(e.target.files[0])}
                           required
                           placeholder='Updated File'
                          />
                          <img src={require('../img/update.png')} alt="logo"/>
                          <p>{form_075 ? form_075.name : userDocuments[0].form_075.substring(userDocuments[0].form_075.lastIndexOf("/") + 1)}</p>
                        </div>
                      </div>
                      <div className='submitted-item'>
                        <div>
                            <div className='submitted-img'>
                              <img src={userDocuments[0].identity_card_copy} alt="submited-item"/>
                            </div>
                            <p>identity-card</p>
                        </div>
                        <div className='custom-file-input update-file'>
                          <input 
                            type="file" id="identity" name="identity"
                            onChange={e => setIdentityCart(e.target.files[0])}
                            required
                            placeholder='Updated File'
                          />
                          <img src={require('../img/update.png')} alt="logo"/>
                          <p>{identity_card_copy ? identity_card_copy.name : userDocuments[0].identity_card_copy.substring(userDocuments[0].identity_card_copy.lastIndexOf("/") + 1)}</p>
                        </div> 
                      </div>
                    </div>
                    
                    {statement || photo_3x4 || identity_card_copy || form_075 ? (
                          <div className='update-btn'>
                            <button onClick={()=>fetchData()}>Submit</button>
                          </div>
                      ): null}
                  </>
                )}
            </div>
        </div>
    </div>
  )
}
