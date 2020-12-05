import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose } from 'redux';
import {deleteExperience} from '../../store/actions/profilesActions';
import {confirmAlert} from 'react-confirm-alert';
import { toast } from 'react-toastify';
// import {formatDate} from '../recources/UI/helpers';


const  Experiences = ( {deleteExperience , experiences } ) =>{

     
    const  handleDelete = (e , experienceId ) => {
        e.preventDefault();
        confirmAlert({
         title: 'Confirm to Delete',
         message: 'Are you sure to delete exprience element ',
         buttons: [
           {
             label: 'Yes',
             onClick: () => {
                deleteExperience(experienceId);
                toast.success(`You have deleted exprience element successfully`,{
                  position:toast.POSITION.BOTTOM_RIGHT,
                  autoClose:8000
                });                            
             }
           },
           {
             label: 'No',
             onClick: () => { return; }
           }
         ]
       });
     } 
       

     


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
                        {/* <th className="hide-sm">duration</th> */}
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

                                    {/* <td>   { formatDate() JSON.stringify(createdAt) }/  {formatDate(userExperience?.createdAt?.toDate())} </td> */}
                                    <td>
                                        <button 
                                            className="btn btn-danger" 
                                            onClick={(e)=>handleDelete(e,userExperience.id)} 
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

const mapStateToProps = (state)=>{
    const userId=state.firebase.auth.uid;
    let experiences=state.firestore.ordered.experiences;
    const auth = state.firebase.auth;
    const profile=state.firebase.profile;
  
      if(experiences){
          experiences = experiences.filter(experience => experience.userId===userId);
        return{
            auth,
            profile,
            experiences
       }  
      } else return {};
      
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