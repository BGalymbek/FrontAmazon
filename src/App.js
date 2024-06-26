import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from "./utils/PrivateRoute";

import MainPage from "./containers/MainPage";
import Login from "./containers/Login";
import Register from "./containers/Register";
import ResetPassword from "./containers/ResetPassword";
import DocumentSubmission from "./containers/DocumentSubmission";
import VerifyDocs from "./containers/VerifyDocs"; 
import UserDocuments from "./containers/UserDocuments";

import { AuthProvider } from "./context/AuthContext";
import Booking from "./containers/Booking"; 
import ConfirmationPage from "./containers/ConfirmationPage";
import PaymentBooking from "./containers/PaymentBooking";
import Oops from "./containers/ResponsePages/Oops";
import MyBookings from "./containers/MyBookings";
import DocSumbitted from "./containers/ResponsePages/DocSumbitted";
import UpdateSubmission from "./containers/UpdateSubmission";
import CongratsBooking from "./containers/ResponsePages/CongratsBooking";
import ProfilePage from "./containers/ProfilePage";
import Rooms from "./containers/Rooms";
import News from "./containers/News";
import NewsPublish from "./containers/AdminPages/NewsPublish";
import AddNews from "./containers/AdminPages/AddNews";
import CongratsPublished from "./containers/ResponsePages/CongratsPublished";
import AboutUs from "./containers/AboutUs";

const App = () => {
  return (
      <Router>
        <AuthProvider>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route exact path="/register" element={<Register/>}/>
                <Route exact path="/document-submission" element={<DocumentSubmission/>}/>
                <Route exact path="/verify-documents" element={<VerifyDocs/>}/>
                <Route exact path="/detailed-doc/:email" element={<UserDocuments/>}/>
                <Route exact path="/booking" element={<Booking/>}/>
                <Route exact path="/confirmation-booking" element={<ConfirmationPage/>}/>
                <Route exact path="/payment-booking" element={<PaymentBooking/>}/>
                <Route exact path="/oops" element={<Oops/>}/>
                <Route exact path="/my-booking" element={<MyBookings/>}/>
                <Route exact path="/doc-submitted" element={<DocSumbitted/>}/>
                <Route exact path="/update-submission" element={<UpdateSubmission/>}/>
                <Route exact path="/congrats-booking" element={<CongratsBooking/>}/>
                <Route exact path="/profile" element={<ProfilePage/>}/>
                <Route exact path="/rooms" element={<Rooms/>}/>
                <Route exact path="/news" element={<News/>}/>
                <Route exact path="/news-admin" element={<NewsPublish/>}/>
                <Route exact path="/add-news" element={<AddNews/>}/>
                <Route exact path="/congrats-published" element={<CongratsPublished/>}/>
                <Route exact path="/about-us" element={<AboutUs/>}/>
                <Route
                  path="/main-page"
                  element={
                    <PrivateRoute>
                      <MainPage />
                    </PrivateRoute>
                  }
                />
                <Route exact path="/reset-password" element={<ResetPassword/>}/>
            </Routes>
          </AuthProvider>
      </Router>
  );
};
export default App;