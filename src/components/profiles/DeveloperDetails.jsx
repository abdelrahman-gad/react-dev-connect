import React from 'react';
import {connect} from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import {compose } from 'redux';

class DeveloperDetails extends React.Component{

    render(){
            let  {auth , user , profile , experiences , educations} = this.props;
            if(!auth.uid){
                return <Redirect exact to="/"   />
            }else{
                if(! (user && profile && experiences && educations  ) ){
                    return (
                        <div className="container">
                            <h1 className="text-center text-primary loading">Loading data .........</h1>
                        </div>
                    );
                }else{
                    console.log(user);
                    console.log(profile);
                    experiences=experiences.filter(experience=>experience.userId===user.userId);
                    educations=educations.filter(education=>education.userId===user.userId);

                    console.log(experiences);
                    console.log(educations);
                   return (
                       <div className="container">
                            <h1 className="text-center text-primary"> Data loaded successfully </h1>
                            {user.handle}
                       </div>
                   );    
                }

            }
          
    }
}


        
    const mapStateToProps = (state,ownProps)=>{
        const userId = ownProps.match.params.id;
      
        console.log(userId);
      
        let users = state.firestore.data.users;
        let profiles  = state.firestore.data.profiles;

        let educations=state.firestore.ordered.educations;                 
        let experiences=state.firestore.ordered.experiences;

        let user = users ? users[userId]: null;
        let profile = profiles ? profiles[userId]: null;

      
        console.log(users);
        console.log(user);
        console.log(educations);
        console.log(experiences);
        console.log(profile);

        if( state.firebase.auth.uid && user && profile && educations && experiences ){
          return {
            auth:state.firebase.auth,
            user:user,
            profile:profile,
            educations:educations,
            experiences:experiences
      
          };
        }else if(state.firebase.auth.uid){
           return {
             auth:state.firebase.auth
           }
        } else return {};
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