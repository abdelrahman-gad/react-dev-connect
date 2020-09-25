import React from 'react';
import {connect} from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import {compose } from 'redux';
import {showReadableDate} from '../../utils/utilsFuncs';

class Developers extends React.Component{

    render(){
        const {auth,developers}  = this.props;
        console.log(auth.uid);
        

        if(!auth.uid){
            return (<Redirect exact to="/" />)
        }else{

            if(!developers){
                return (
                    <div className="container">
                         <h1 className="text-primary text-center loading"> Loading Developers ....... </h1>
                    </div>
             ); 
            }else{
                  return(
                    <section className="container">
                        <h1 className="large text-primary">
                         Developers
                        </h1>
                        <p className="lead">
                        <i className="fab fa-connectdevelop"></i>
                        Browse And Connect With Developers
                        </p>
                        <div className="profiles">
                           {developers && developers.map(developer=>{

                          
                            return (
                                       
                                        <div className="profile bg-light p-2"  key={developer.id}>
                                            <img
                                                className="round-img"
                                                src={developer.imageUrl}
                                                alt={developer.handle}
                                            />
                                            <div>
                                                <h1> {developer.handle} </h1>
                                                <p> {developer.jobTitle} </p>
                                                <p> {developer.location} </p>
                                                <p className="text-primary"> Joined at {showReadableDate(developer.createdAt)} </p>
                                                <NavLink exact to={"/profile/"+developer.id} target="_parent" className="btn btn-primary">View Profile</NavLink>
                                            </div>
                                             {developer.skills !== undefined ?  <ul> {developer.skills.map((skill,i)=><li className="text-primary" key={i} ><i className="fas fa-check"></i> {skill} </li>)} </ul>:null  }
                                            
                                        </div>           
                             
                          );
                          
                        })}
                     </div>
                  </section>
                );  
            } 
         }
    }
}

const mapStateToProps = (state)=>{
     
     const auth=state.firebase.auth;
      let users=state.firestore.ordered.users;
     let  profiles=state.firestore.ordered.profiles;
     console.log(auth);
     console.log(users);
     console.log(profiles);
     if(!(users && profiles)){
        return {
            auth
         }
     }else{
         let developers = users.map(user=>{
               let matchedProfile = profiles.filter(profile=>profile.userId===user.userId);
                   matchedProfile  = matchedProfile? matchedProfile[0]:undefined;
                   console.log(matchedProfile);
                   if(matchedProfile){
                        return {
                            ...user,
                            ...matchedProfile
                            
                        }
                   }else{
                       return {
                           ...user
                       }
                   }
               
         });
            //console.log(developers);
         return {
             auth,
             developers
         }
     }
    
}

export default compose(
    connect(mapStateToProps,null),
    firestoreConnect([
        {collection:'users'},
        {collection:'profiles'}
      ])
  )
  (Developers);