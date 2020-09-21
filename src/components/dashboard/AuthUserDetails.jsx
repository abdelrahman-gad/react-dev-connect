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
             showConfirm:false,
             deleteElementId:undefined
         }
         this.handleDelete=this.handleDelete.bind(this);
         this.handleConfirmDelete = this.handleConfirmDelete.bind(this); 
         this.handleCancelDelete = this.handleCancelDelete.bind(this); 
    
    }
    handleDelete(e , accountId ){
        e.preventDefault();
        console.log(accountId);
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
       this.props.deleteAccount(this.state.deleteElementId);
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
        //console.log('from Auth user Details');
        //console.log(this.props);
        const {auth} = this.props;
        // console.log(auth.uid);
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
                         onClick={(e) => this.handleDelete( e , auth.uid ) }
                         >
                        <i className="fas fa-user-minus">Delete My Account</i>
                    </button>
                </div>
            </div>
           );
    }
}

const mapStateToProps = (state) =>{
    return {
       auth:state.firebase.auth,
       profile:state.firebase.profile     
    }
}

const mapDispatchToProps = (dispatch, ownProps )=>{
    return {
        deleteAccount: (accountId)=>dispatch(deleteAccount(accountId)) 
    }
}


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([{collection:'profiles'}])
  )
  (AuthUserDetails);