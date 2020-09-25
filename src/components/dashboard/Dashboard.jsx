import React from 'react';
import {connect} from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import {compose } from 'redux';
import AuthUserDetails from './AuthUserDetails';
class Dashboard  extends React.Component {
     
     render(){
      const { auth , profile } = this.props; 
      //console.log(profile);
      if(auth.uid === undefined){
         return  <Redirect to="/" />
       } else{
          //console.log(profile.imageUrl);
          return (
                <section className="container"> 
                
                       <h1 className="large text-primary">
                         My Profile Page
                       </h1>
                       <p className="lead">
                       <i className="fas fa-user"></i>
                       Welcome: { profile.handle}
                       </p>
                       {/* user actions */}
                       <div>
                        
                      {
                       profile.imageUrl!== undefined ? <img  className="profile-img" src={profile.imageUrl} alt="user image"/>:<img  className="profile-img" src={process.env.PUBLIC_URL+'/imgs/default-user-img.jpeg'} />
                      }
                       
                     
                       </div>
                       <div className="dash-button">
                            
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
   
   {/* end users action */}
   
   {/* profile data */}
                    <AuthUserDetails  />
   {/* end profile data */}
               </section>
   
        ); 
     }
            
     }

}

const mapStateToProps = (state) =>{
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