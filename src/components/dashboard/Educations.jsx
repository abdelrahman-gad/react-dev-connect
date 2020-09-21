import { DriveEtaOutlined } from '@material-ui/icons';
import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose } from 'redux';

import {deleteEducation} from '../../store/actions/profilesActions';


class Educations extends React.Component{


 constructor(props){
    super(props);
    this.state={
         showConfirm:false,
         deleteElementId:undefined
     }
     this.handleDelete=this.handleDelete.bind(this);
     this.handleConfirmDelete = this.handleConfirmDelete.bind(this); 
     this.handleCancelDelete = this.handleCancelDelete.bind(this); 

 }


    handleDelete(e, educationId){
        //console.log('handleDelete education method');
        //console.log(educationId);
        e.preventDefault();
        this.setState({
            showConfirm:true,
            deleteElementId:educationId
        });
    //    console.log(this.state);
       
    }
    handleConfirmDelete(e){
       this.props.deleteEducation(this.state.deleteElementId);
       e.preventDefault();
       this.setState({
           showConfirm:false,
           deleteElementId:undefined
       });
    }
    handleCancelDelete(e){
        e.preventDefault();
        this.setState({
            showConfirm:false,
            deleteElementId:undefined
        });
    }




 render(){
     //console.log('Eductions Component');
     //console.log(this.props.auth);
     //console.log(this.props.profile);
        //console.log(this.state);
        const { educations } = this.props; 
        //console.log(educations);   
        // //console.log(Object.entries(educations));
        if(educations && educations.length > 0){
          
            return (
                <div>

                {/* add ConfirmDelte Modal  */}
                    
                        <div  className={ this.state.showConfirm ? "modal modal-show" : "modal"  } >
                                <p className="modal-text text-primary">  Are you sure you want to delete this education element from your profile  ? </p>
                                <p className="modal-actions text-center"> 
                                    <button 
                                     className="btn btn-primary"
                                     onClick={ (e) => this.handleCancelDelete(e)} > cancel </button>   
                                    <button 
                                       className="btn btn-danger"
                                       onClick = {(e)=>this.handleConfirmDelete(e)}
                                       >  yes </button>
                                </p> 
                        </div>
                {/* end Confirm delete modal  */}


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
                                            onClick={(e)=>this.handleDelete(e , userEducation.id)} 
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
    //   //console.log(userId);
    // //    let  profiles = state.firestore.data;
    let educations = state.firestore.ordered.educations;
     if(educations!==undefined){
         educations=educations.filter(education=>education.userId === userId);
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
const mapDispatchToProps=(dispatch, ownProps )=>{
     
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