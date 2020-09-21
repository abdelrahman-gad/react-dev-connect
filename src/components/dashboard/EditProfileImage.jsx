import React from 'react';
import {storage} from '../../config/fbConfig';
import { firestoreConnect } from 'react-redux-firebase';
import {Redirect, NavLink} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {editProfileImage } from '../../store/actions/profilesActions';


class EditProfileImage extends React.Component{


    constructor(props){
        super(props);
        
     
       this.state = {
           profileImage:null,
           uploadProgress:0,
           noSelectedImgError:null
          }
      //  this.props.profileImageUrl= 'mdmad';
        //console.log(this.props);
        this.handleChange=this.handleChange.bind(this);
        this.handleUpload=this.handleUpload.bind(this);
        
    }


    componentWillReceiveProps(nextProps){
          // console.log(nextProps);
          const { user } = nextProps;
            if(user !== undefined){
              this.mapProfileImageUrlToState(user.imageUrl);
            }

    }
    mapProfileImageUrlToState(profileImageUrl){
      this.setState({
             profileImageUrl:profileImageUrl
      });             

    }
    handleChange(e){
      //console.log('file choosen');
           if(e.target.files[0]){
             //console.log(e.target.files[0]);
             this.setState({
                 profileImage:e.target.files[0]
             });
             this.setState({
               noSelectedImgError:null
             })
             //console.log(this.state.profileImage);
           }
    }
    handleUpload(e){
        //console.log('handle-upload');
        // console.log(this.state.profileImage);
        if(this.state.profileImage){
        const uploadTask = storage.ref(`images/profiles/${this.state.profileImage.name}`).put(this.state.profileImage);
          
          uploadTask.on(
            'state_changed',
            snapshot => {
              const progress = Math.round(
                (snapshot.bytesTransferred/snapshot.totalBytes) * 100
              );
              this.setState({
                  uploadProgress:progress
              })
            },
            error => {
              //console.log(error);
            },
            () => {
                storage.ref('images/profiles')
                .child(this.state.profileImage.name)
                .getDownloadURL()
                .then( url => {
                  //console.log(url);
                  const { editProfileImage } = this.props;
                  editProfileImage(url);
                })         
            }
        );
        }else{
          //console.log('Plz , select picture file before submitting');
          this.setState({
            noSelectedImgError:'Plz , select picture file before submitting'
          })
        }

        
       
       // console.log(uploadTask);


    }
    
    render(){
        //console.log(storage);
        const {user, auth } = this.props;
        //console.log(auth)
        //console.log(user);

          if(!auth.uid){
            return <Redirect exact to="/" />
          }else{
            if( user ){
              return(
                <div className="container">
                     <h1 className="large text-primary">
                        Create Your Profile
                     </h1>
                <p className="lead">
                  <i className="fas fa-user"></i> Let's get some information to make your
                  profile stand out
                </p>
                <div className="form-group">
                    <input
                      type="file"
                      className="form-control"
                      onChange={this.handleChange}       
                       /><br/>
                      <progress  value={this.state.uploadProgress}  max="100" /> <br/>
                        {
                           this.state.profileImageUrl? <img  className="rounded" src={this.state.profileImageUrl} alt="user image"/>:<img  className="profile-img" src={process.env.PUBLIC_URL+'/default-user-img.jpeg'} />
                        }
                     {this.state.noSelectedImgError &&  <div className="alert alert-danger">  {this.state.noSelectedImgError} </div> }
                    <button onClick={this.handleUpload} className="btn btn-success"> submit profile image </button>
                    <NavLink className="btn btn-light my-1" to="/dashboard">Go Back</NavLink>
                </div>
    
                </div>
            );              

                
            }else {
              return (<div className="container">
                        <h1 className="text-center text-primary loading">Loading user's data ....... </h1>
                    </div>);

            }
          } 
    }
  

}


const mapStateToProps = (state,ownProps)=>{
  const userId = ownProps.match.params.id;

 

  let users = state.firestore.data.users;
  let user = users ? users[userId]: null;

  //console.log(users);
  //console.log(user);
 
  if( state.firebase.auth.uid && user ){
    return {
      auth:state.firebase.auth,
      user:user

    };
  }else if(state.firebase.auth.uid){
     return {
       auth:state.firebase.auth
     }
  } else return {};
}
const mapDispatchToProps= (dispatch)=>{
  //console.log('in mapDispatch');
      return {
        editProfileImage: (profileImage) =>dispatch(editProfileImage(profileImage))
      } 
}



export default  compose 
(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([{collection:'users'}])
)
(EditProfileImage);