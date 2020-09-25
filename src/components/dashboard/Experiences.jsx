import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose } from 'redux';
import {deleteExperience} from '../../store/actions/profilesActions';


class Experiences extends React.Component{

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


        handleDelete(e, experienceId){
            //console.log('handleDelete education method');
            //console.log(educationId);
            e.preventDefault();
            this.setState({
                showConfirm:true,
                deleteElementId:experienceId
            });
        // console.log(this.state);
        
        }
        handleConfirmDelete(e){
        this.props.deleteExperience(this.state.deleteElementId);
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
     ////console.log(this.props.profile);
        const { experiences } = this.props; 
        // //console.log(Object.entries(educations));
        if(experiences && experiences.length>0){
          
            return (
                <div>

                {/* add ConfirmDelte Modal  */}                   
                <div  className={ this.state.showConfirm ? "modal modal-show" : "modal"  } >
                                <p className="modal-text text-primary"> Are you sure you want to delete this experience element from your profile  ? </p>
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
    //   //console.log(userId);
    // //    let  profiles = state.firestore.data;
    let experiences=state.firestore.ordered.experiences;
    const auth = state.firebase.auth;
    const profile=state.firebase.profile;
    //console.log(state);
      if(experiences){
          experiences=experiences.filter(experience => experience.userId===userId);
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