import React from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import {compose } from 'redux';
import AuthUserDetails from './AuthUserDetails';
import Jumbotron from '../recources/UI/Jumbotron';
const  Dashboard = ({auth , profile}) => {
          //console.log(profile.imageUrl);
          return (
                <section className="container"> 
                   <Jumbotron title="Dashboard" description="welcome to dashboard">
                        <i className="fas fa-user"></i>
                   </Jumbotron>
                       {/* user actions */}
                       <div className="row py-1">
                         <div className="col-sm-12 col-md-3">   
                              { 
                              profile.imageUrl!== undefined ?
                              <img  className="profile-img img-rounded"  src={profile.imageUrl} alt="user"/>:
                              <img  className="profile-img img-rounded" src={process.env.PUBLIC_URL+'/imgs/default-user-img.jpeg'}  alt="user" />
                              }
                         </div>
                         <div className="col-sm-12 col-md-9 mt-3 dash-button">
                                   <NavLink to={"/editProfile/"+auth.uid} className="btn">
                                        <i className="fas fa-user-circle text-primary"></i>
                                        <span>  Edit Profile  </span>
                                   </NavLink>
                                   <NavLink exact to={"/editProfileImage/"+auth.uid} className="btn">
                                        <i className="fas fa-camera-retro"></i>
                                        <span>  Edit Profile Image </span>
                                   </NavLink>
                                   <NavLink to={"/addExperience/"+auth.uid} className="btn">
                                        <i className="fab fa-black-tie text-primary mr-2"></i>
                                        <span> Add Exprerience  </span>
                                   </NavLink>
                                   <NavLink to={"/addEducation/"+auth.uid } className="btn">
                                        <i className="fas fa-graduation-cap text-primary mr-2"></i>
                                        <span> Add Eduction  </span>
                                   </NavLink>
                                   <NavLink className="btn" exact to={"/developerPosts/"+auth.uid} >
                                        <i className="fas fa-comment-alt text-primary mr-2"></i>
                                        <span>  my Posts </span> 
                                   </NavLink>                             
                         </div>
                       </div>
                       <AuthUserDetails  />
               </section>
        ); 
     
        
}

const mapStateToProps = (state) => {
   const   auth   = state.firebase.auth;
   const   profile =state.firebase.profile;
     return {
        auth,
        profile
     }
}


export default compose(
     connect(mapStateToProps,null),
     firestoreConnect([{collection:'profiles'}])
   )
   (Dashboard);