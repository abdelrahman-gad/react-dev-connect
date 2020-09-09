import React from 'react';
import {connect} from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import {compose } from 'redux';
import { auth } from 'firebase';
import {deleteExperience} from '../../store/actions/profilesActions';


class Experiences extends React.Component{

 constructor(props){
     super(props);
     this.handleDelete=this.handleDelete.bind(this);
 }


 handleDelete(e,experienceId){
     e.preventDefault();
     console.log('handleDelete Experience method ');
     this.props.deleteExperience(experienceId);

 }

 render(){
     console.log('Eductions Component');
     console.log(this.props.auth);
     //console.log(this.props.profile);
        const {experiences} = this.props; 
        // console.log(Object.entries(educations));
        if(experiences && experiences.length>0){
          
            return (
                <div>
                 <h2 className="my-2">
                 Experience Credential
                 </h2>
                 <table className="table">
                 <thead>
                     <tr>
                        <th>company</th>
                        <th className="hide-sm">jobTitle</th>
                        <th className="hide-sm">location</th>
                        <th className="hide-sm">duration</th>
                     </tr>
                 </thead>
                 <tbody>
                    {
                        experiences.map(userExperience=>{
                            return(
                                <tr key={userExperience.id}>
                                    <td> {userExperience.company} </td>
                                    <td> {userExperience.jobTitle} </td>
                                    <td> {userExperience.location} </td>

                                    <td>  {userExperience.fromDate} / {userExperience.toDate} </td>
                                    <td>
                                        <button 
                                            className="btn btn-danger" 
                                            onClick={(e)=>this.handleDelete(e,userExperience.id)} 
                                            >
                                           delete
                                        </button>
                                            
                                    </td>
                                </tr>
                            );
                        })
                    }
                 </tbody>
               </table>
              </div>
         
              );
        }else{
            return null;
        }
    
 }

}

const mapStateToProps = (state)=>{

      const userId=state.firebase.auth.uid;
    //   console.log(userId);
    // //    let  profiles = state.firestore.data;
    let experiences=state.firestore.ordered.experiences;
    //console.log(state);
      if(experiences!==undefined){
          experiences=experiences.filter(experience => experience.userId===userId);
        return{
            auth:state.firebase.auth,
            profile:state.firebase.profile,
            experiences:experiences
       }  
      }else{
          return {};
      }
}
const mapDispatchToProps=(dispatch,ownProps)=>{
  //  console.log(ownProps);
    return {
        deleteExperience:(experienceId)=>dispatch(deleteExperience(experienceId))
    }

}



export default 
compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
         {
            collection:'experiences',         
         }
        ]))
(Experiences);