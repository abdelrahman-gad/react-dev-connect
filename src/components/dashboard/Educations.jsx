import React  from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose } from 'redux';
import {deleteEducation} from '../../store/actions/profilesActions';
import {toast} from 'react-toastify';
import {confirmAlert} from 'react-confirm-alert';

const  Educations = ({deleteEducation , educations}) => {
       

    const  handleDelete = (e , educationId ) => {
                e.preventDefault();
                confirmAlert({
                title: 'Confirm to Delete',
                message: 'Are you sure to delete Eduacation element ',
                buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        deleteEducation(educationId);
                        toast.success(`You have deleted education element successfully`,{
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

        if(educations && educations.length > 0){
          
            return (
                <div>
                 <h2 className="my-2">
                  Education Credential
                 </h2>
                 <table className="table">
                 <thead>
                     <tr>
                     <th>School</th>
                      <th>Field</th>
                     <th className="hide-sm">Degree</th>
                     <th className="hide-sm">Years</th>
                     </tr>
                 </thead>
                 <tbody>
                    {
                        educations.map(userEducation=>(
                                <tr key={userEducation.id}>
                                    <td> {userEducation.school} </td>
                                    <td> {userEducation.field} </td>
                                    <td> {userEducation.degree} </td>
                                    {/* <td>  {userEducation.fromDate} / {userEducation.toDate} </td> */}
                                    <td>
                                        <button 
                                            className="btn btn-danger" 
                                            onClick={(e)=> handleDelete( e , userEducation.id)} 
                                            >
                                           delete
                                        </button>         
                                    </td>
                                </tr>
                        ))
                    }
                 </tbody>
               </table>
              </div>
             );
        }else {
          return null;
     }
}

const  mapStateToProps = state => {
    const userId=state.firebase.auth.uid;
    let educations = state.firestore.ordered.educations;
    const profile = state.firebase.profile;
    const auth = state.firebase.auth;
     if(educations){
         educations = educations.filter(education=>education.userId === userId);
         return{
            auth,
            profile,
            educations
       }
    }else return{auth};      
}
const mapDispatchToProps=( dispatch )=>{     
    return {
        deleteEducation:(educationId)=>dispatch(deleteEducation(educationId))
    }
}

export default 
        compose(
            connect(mapStateToProps,mapDispatchToProps),
            firestoreConnect([
                {collection:'educations'}])
                )
        (Educations);