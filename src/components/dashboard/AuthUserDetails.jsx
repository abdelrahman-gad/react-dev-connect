import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose } from 'redux';
import Educations from './Educations';
import Experiences from './Experiences';
import {deleteAccount} from '../../store/actions/authActions';
class AuthUserDetails extends React.Component{


    constructor(props){
        super(props);
        this.state={
             showConfirm:false
          
         }
         this.handleDelete=this.handleDelete.bind(this);
         this.handleConfirmDelete = this.handleConfirmDelete.bind(this); 
         this.handleCancelDelete = this.handleCancelDelete.bind(this); 
    
    }
  
    handleDelete(e){
        //console.log('handleDelete education method');
        //console.log(educationId);
        e.preventDefault();
        this.setState({
            showConfirm:true      
        });
    //    console.log(this.state);
       
    }
    handleConfirmDelete(e){
       this.props.deleteAccount(this.state.deleteElementId);
       e.preventDefault();
       this.setState({
           showConfirm:false      
       });
    }

    handleCancelDelete(e){
        e.preventDefault();
        this.setState({
            showConfirm:false
           
        });
    }



    render(){
        //console.log('from Auth user Details');
        //console.log(this.props);
   
         console.log(this.props.auth.uid);
        return  (
            <div>
                    <Experiences />
                   {/* educations Component */}
                     <Educations/>


                      {/* add ConfirmDelte Modal  */}
                    
                        <div  className={ this.state.showConfirm ? "modal modal-show" : "modal"  } >
                                <p className="modal-text text-primary"> Are you sure you want to delete  your account ? </p>
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


                    <div className="my-2">
                    <button 
                         className="btn btn-danger"
                         onClick={(e) => this.handleDelete( e ) }
                         >
                        <i className="fas fa-user-minus">Delete My Account</i>
                    </button>
                </div>
            </div>
           );
    }
}

const mapStateToProps = (state) =>{
    const auth = state.firebase.auth;
    const profile = state.firebase.profile;
    return {
       auth,
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