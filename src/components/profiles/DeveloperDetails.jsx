import React , { useState , Fragment } from 'react';
import {connect} from 'react-redux';
import { NavLink, Redirect} from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import {compose } from 'redux';
import {showLoading} from '../recources/UI/helpers';
import {formatDate} from '../recources/UI/helpers';


const  DeveloperDetailsNew =  ( { developer  }) => {

   //console.log(developer);
  
   const  [developerInfo , setDeveloperInfo] = useState({});
   const  [loading , setLoading ] = useState(true);

   const  handleUrl = (e,url ) => {
          e.preventDefault();
          // console.log(url);
          if(!url){
              return;
            }else{
              window.location.href=window.location.href='https://'+url;
          }
   }

   const showDeveloper = () => (
      <Fragment>
           <NavLink exact to="/developers" className="btn">Back To Profiles</NavLink>
                    <div className="profile-grid my-1">
                      <div className="profile-top bg-primary p-2">
                        <img
                          className="img-rounded my-2"
                          src={developer.imageUrl}
                          alt="user "
                        />
                        <h1 className="large mt-2"> {developer.handle} </h1>
                        <p className="lead"> {developer.jobTitle} </p>
                        <p> Joined At  {formatDate(developer.createdAt.toDate())}  </p>
                        <p> {developer.location} </p>
                        <div className="icons my-1">
                          
                                        
                            <span> 
                                <i    onClick={(e)=>handleUrl(e,developer.website)} className="fas fa-globe fa-2x"></i>
                                <i    onClick={(e)=>handleUrl(e,developer.twitter)} className="fab fa-twitter fa-2x"></i>
                                <i    onClick={(e)=>handleUrl(e,developer.githubUsername)} className="fab fa-github fa-2x"></i>                          
                                <i    onClick={(e)=>handleUrl(e,developer.facebook)}  className="fab fa-facebook fa-2x"></i>
                                <i    onClick={(e)=>handleUrl(e,developer.linkedin)} className="fab fa-linkedin fa-2x"></i>                          
                                <i    onClick={(e)=>handleUrl(e,developer.instagram)} className="fab fa-instagram fa-2x"></i>
                                <NavLink exact to={"/developerPosts/"+developer.userId} > <i className="fas fa-comment-alt fa-2x"></i> </NavLink>                             
                            </span> 
                                                       
                        </div>
                      </div>
                    
                      <div className="profile-about bg-light p-2">
                        <h2 className="text-primary"> {developer.handle} bio</h2>
                        <p>
                         {developer.bio}
                        </p>
                        <div className="line"></div>
                        <h2 className="text-primary text-center">Skill Set</h2>
                       <div className="skills">
                           {developer.skills && developer.skills.split(',').map((skill,i)=>{
                             return    <div className="p-1" key={i}><i className="fas fa-check"></i> {skill} </div>         
                           })}
                       
                      
                       </div>
                      </div>
                      
                      <div className="profile-exp bg-white p-2">
                        <h1 className="text-primary">Experiences</h1>

                        { developer.experiences && developer.experiences.map( experience => {
                           return (
                            <div key={experience.id}>
                                <h3> {experience.company} </h3>
                                 <p> {experience.fromDate}-  {experience.toDate} </p>
                                <p><strong>Position : </strong> {experience.jobTitle} </p>
                                <p><strong>Description : </strong> {experience.description} </p>
                    
                            </div>
                           );
                        })}
                        
                       
                      </div>
                        
                        <div className="profile-edu bg-white p-2">
                          <h1 className="text-primary">Education</h1>
                          {developer.educations && developer.educations.map(education=>{
                              return (
                                <div key={education.id}>
                                    <h3>{education.school} </h3>
                                    {/* <p> {education.fromDate}- {education.toDate} </p> */}
                                    <p><strong>Degree : </strong> {education.degree} </p>
                                    <p><strong>Field : </strong> {education.field} </p>
                    
                                    <p><strong>Description : </strong> {education.description} </p>
                        
                                </div>
                              );
                          })}
                                                
                      </div>                                                 
                    </div>
      </Fragment>
   )  
   
    return (
           <section className="container">
                    <h1> Developer Details New </h1>
                    { ( Object.keys(developer).length >= 1) ? showDeveloper():showLoading(true) }
            </section>
        );    
              
    
}


        
    const mapStateToProps = ( state , ownProps ) => {
        const userId = ownProps.match.params.id;
      
        //console.log(userId);
        let auth =state.firebase.auth;
        let users = state.firestore.data.users;
        let profiles  = state.firestore.data.profiles;
        
        let user = users?users[userId]:undefined;
        let profile = profiles?profiles[userId]:undefined;           
        let educations=state.firestore.ordered.educations;
            educations= educations?educations.filter(education=>education.userId===userId):undefined;  
                      
       let experiences=state.firestore.ordered.experiences;
           experiences = experiences?experiences.filter(experience=>experience.userId===userId):undefined;                 
         
           let developer = {};
         
           if(user){
             developer={...user};
           }
           

           if(profile){
             developer = {
                  ...developer,
                  ...profile
                }
           } 

           if(educations){
             developer = {
               ...developer,
               educations
             }
           }
           if(experiences){
             developer = {
               ...developer,
               experiences
             }
           
           }

          
      


        /**
         *  developer = {
         *             ...user,
         *             ...profile,
         *              educations:[{},{},{}] ,   
         *              expriences:[{},{},{}] 
         *           };
         * 
         * */ 
        
        return {
            developer    
        };                  
 }

export default compose(
    connect(mapStateToProps,null),
    firestoreConnect([
        {collection:'users'},
        {collection:'profiles'},
        {collection:'educations'},
        {collection:'experiences'}   
    ])
  )
  (DeveloperDetailsNew);

