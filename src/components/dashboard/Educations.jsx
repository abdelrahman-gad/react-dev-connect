import React from 'react';
import {connect} from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import {compose } from 'redux';
import { auth } from 'firebase';
import moment from 'moment';
import {deleteEducation} from '../../store/actions/profilesActions';


class Educations extends React.Component{

 constructor(props){
     super(props);
     this.handleDelete=this.handleDelete.bind(this);
 }


 handleDelete(e,educationId){
    console.log('handleDelete education method');
    console.log(educationId);
    e.preventDefault();
    this.props.deleteEducation(educationId);
    console.log(this.props.educations);
 }

 render(){
     console.log('Eductions Component');
     console.log(this.props.auth);
     console.log(this.props.profile);
        console.log(this.state);
        const {educations} = this.props; 
        console.log(educations);   
        // console.log(Object.entries(educations));
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
                        educations.map(userEducation=>{
                            return(
                                <tr key={userEducation.id}>
                                    <td> {userEducation.school} </td>
                                    <td> {userEducation.field} </td>

                                    <td> {userEducation.degree} </td>
                                    <td>  {userEducation.fromDate} / {userEducation.toDate} </td>
                                    <td>
                                        <button 
                                            className="btn btn-danger" 
                                            onClick={(e)=>this.handleDelete(e,userEducation.id)} 
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

const  mapStateToProps = (state)=>{

      const userId=state.firebase.auth.uid;
    //   console.log(userId);
    // //    let  profiles = state.firestore.data;
    let educations = state.firestore.ordered.educations;
     if(educations!==undefined){
         educations=educations.filter(education=>education.userId===userId);
         return{
            auth:state.firebase.auth,
            profile:state.firebase.profile,
            educations:educations
       }
 
    }
     //  filter(education=>education.userId===userId);
    else{
        return{};
    }
      
 

}
const mapDispatchToProps=(dispatch,ownProps)=>{
     
    return {
        deleteEducation:(educationId)=>dispatch(deleteEducation(educationId))
    }
}



export default 
compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
         {
            collection:'educations',         
         }
        ]))
(Educations);