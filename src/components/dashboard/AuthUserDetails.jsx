import React ,{useState} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose } from 'redux';
import Educations from './Educations';
import Experiences from './Experiences';
import {deleteAccount} from '../../store/actions/authActions';
const  AuthUserDetails = ({ deleteAccount }) => {

   const [showConfirm , setShowConfirm] = useState(false);
   const  handleDelete= e => {
        e.preventDefault();
       setShowConfirm(true);       
    }

   const  handleConfirmDelete = e=>{
      deleteAccount(this.state.deleteElementId);
       e.preventDefault();
       setShowConfirm(false);
    }

   const  handleCancelDelete= e => {
        e.preventDefault();
        setShowConfirm(false);
    }

  const confirmModal = ( showConfirmModal ) => ( 
    <div  className={showConfirmModal ? "modal modal-show" : "modal"  } >
        <p className="modal-text text-primary"> Are you sure you want to delete  your account ? </p>
        <p className="modal-actions text-center"> 
            <button 
                className="btn btn-primary"
                onClick={ (e) => handleCancelDelete(e)}> cancel </button>   
            <button 
                className="btn btn-danger"
                onClick = {(e)=>handleConfirmDelete(e)}>  yes </button>
        </p> 
    </div>
  )

  const deleteAccountButton = () => (
    <div className="my-2">
            <button 
                className="btn btn-danger"
                onClick={(e) => handleDelete( e ) }
                >
                <i className="fas fa-user-minus">Delete My Account</i>
            </button>
     </div>
     )

        return  (
            <div>
                 <Experiences />           
                 <Educations/>
                 {confirmModal(showConfirm)}
                 {deleteAccountButton()}
            </div>
         );
    
}

const mapStateToProps = (state) =>{
    
    const profile = state.firebase.profile;
    return {
      
       profile    
    }
}

const mapDispatchToProps = (dispatch )=>{
    return {
        deleteAccount: () => dispatch(deleteAccount()) 
    }
}
export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([{collection:'profiles'}])
  )
  (AuthUserDetails);