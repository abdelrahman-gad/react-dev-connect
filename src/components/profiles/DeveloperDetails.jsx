import React from 'react';
import {connect} from 'react-redux';
import { NavLink, Redirect} from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import {compose } from 'redux';
class DeveloperDetails extends React.Component{


      constructor(props){
          super(props);
          this.handleUrl=this.handleUrl.bind(this);
      }
      handleUrl(e,url){
          e.preventDefault();
         // console.log(url);

          url.includes('https://')?window.location.href=url:window.location.href='https://'+url;
          
        }

    render(){
            let  {auth , developer} = this.props;
            if(!auth.uid){
                return <Redirect exact to="/" />
            }else{
            
                if(! developer ){
                    return (
                        <div className="container">
                            <h1 className="text-center text-primary loading">Loading data.........</h1>
                        </div>
                    );
                }else{
                   
                  
                   
                   let {educations , experiences , socialLinks } = developer;
                   
                    // console.log(experiences);
                    // console.log(educations);
                    //  console.log(developer);
                



                   return (
                    <section className="container">
                    <NavLink exact to="/developers" className="btn">Back To Profiles</NavLink>
                    <div className="profile-grid my-1">
                      <div className="profile-top bg-primary p-2">
                        <img
                          className="round-img my-2"
                          src={developer.imageUrl}
                        />
                        <h1 className="large"> {developer.handle} </h1>
                        <p className="lead"> {developer.jobTitle} </p>
                        {/* <p> Joined At {showReadableDate(developer.createdAt)}   </p> */}
                        <p> {developer.location} </p>
                        <div className="icons my-1">
                          
                        {
                         socialLinks
                           ?                  
                            <span> 
                                <a  onClick={(e)=>this.handleUrl(e,developer.website)}>
                                <i className="fas fa-globe fa-2x"></i>
                              </a>
                              <a onClick={(e)=>this.handleUrl(e,socialLinks.twitter)}>
                                <i className="fab fa-twitter fa-2x"></i>
                              </a>
                              <a onClick={(e)=>this.handleUrl(e,developer.githubUsername)}>
                                <i className="fab fa-github fa-2x"></i>
                              </a>
                            
                              <a onClick={(e)=>this.handleUrl(e,socialLinks.facebook)} >
                                <i className="fab fa-facebook fa-2x"></i>
                              </a>
                              <a  onClick={(e)=>this.handleUrl(e,socialLinks.linkedin)}>
                                <i className="fab fa-linkedin fa-2x"></i>
                              </a>
                              <a  onClick={(e)=>this.handleUrl(e,socialLinks.instagram)}>
                                <i className="fab fa-instagram fa-2x"></i>
                              </a>
                              <NavLink exact to={"/developerPosts/"+developer.userId} > <i className="fas fa-comment-alt fa-2x"></i> </NavLink>                             
                            </span> 
                             :
                             <NavLink exact to={"/developerPosts/"+developer.userId} > <i className="fas fa-comment-alt fa-2x"></i> </NavLink>
                          }
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
                           {developer.skills && developer.skills.map((skill,i)=>{
                             return    <div className="p-1" key={i}><i className="fas fa-check"></i> {skill} </div>         
                           })}
                       
                      
                       </div>
                      </div>
                      
                      <div className="profile-exp bg-white p-2">
                        <h1 className="text-primary">Experiences</h1>

                        { experiences && experiences.map( experience =>{
                           return (
                            <div key={experience.id}>
                                <h3> {experiences.company} </h3>
                                 <p> {experience.fromDate}-  {experience.toDate} </p>
                                <p><strong>Position : </strong> {experience.jobTitle} </p>
                                <p><strong>Description : </strong> {experience.description} </p>
                    
                            </div>
                           );
                        })}
                        
                       
                      </div>
                        
                        <div className="profile-edu bg-white p-2">
                          <h1 className="text-primary">Education</h1>
                          {educations && educations.map(education=>{
                              return (
                                <div key={education.id}>
                                    <h3>{education.school} </h3>
                                    <p> {education.fromDate}- {education.toDate} </p>
                                    <p><strong>Degree : </strong> {education.degree} </p>
                                    <p><strong>Field : </strong> {education.field} </p>
                    
                                    <p><strong>Description : </strong> {education.description} </p>
                        
                                </div>
                              );
                          })}
                                                
                        </div>                                                 
                    </div>
                  </section>
                );    
                }

            }
          
    }
}


        
    const mapStateToProps = (state,ownProps)=>{
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
           //console.log(developer);

           if(user){
             developer={...user};
          //   console.log(developer);
           }
           

           if(profile){
             developer={
                  ...developer,
                  ...profile
                }
           } 

           if(educations){
             developer={
               ...developer,
               educations
             }
           }
           if(experiences){
             developer={
               ...developer,
               experiences
             }
           //  console.log(developer);
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

       

        if( auth && developer ){
          return {
            auth,
            developer    
          };
        }else {

        
           return {
             auth
           }
          }
        
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
  (DeveloperDetails);