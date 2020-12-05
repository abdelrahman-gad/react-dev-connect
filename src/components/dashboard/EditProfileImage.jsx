import React , {useState} from 'react';
import {storage} from '../../config/fbConfig';
import { firestoreConnect } from 'react-redux-firebase';
import {Redirect, NavLink} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {editProfileImage } from '../../store/actions/profilesActions';
import Jumbotron from '../recources/UI/Jumbotron';
import { Loading } from '../recources/UI/helpers';


const  EditProfileImage = ( props) => {

    const [profileImage , setProfileImage] = useState(null);
    const [uploadProgress,setUploadPrgress] = useState(0);
    const [noSelectedImgError, setNoSelectedImgError]=useState(null);
  


 const  handleChange= (e) => {
      console.log('file choosen');
      console.log(e.target.files);
           if(e.target.files[0]){
             //console.log(e.target.files[0]);
            setProfileImage(e.target.files[0]);
            setNoSelectedImgError(null);
             //console.log(this.state.profileImage);
           }
  }

   const  handleUpload = (e) => {
       
        if(profileImage){
        const uploadTask = storage.ref(`images/profiles/${profileImage.name}`).put(profileImage);
          
          uploadTask.on(
            'state_changed',
            snapshot => {
              const progress = Math.round(
                (snapshot.bytesTransferred/snapshot.totalBytes) * 100
              );
              setUploadPrgress(progress);
            },
            error => {
              //console.log(error);
            },
            () => {
                storage.ref('images/profiles')
                .child(profileImage.name)
                .getDownloadURL()
                .then( url => {
                  //console.log(url);
                  const { editProfileImage } = props;
                  editProfileImage(url);
                })         
            }
        );
        }else{  
          setNoSelectedImgError('Plz , select picture file before submitting');
        }        
    }
    

        const { user } = props;
           
            if(user){
              console.log(user);
              return(
                <div className="container">
                  <Jumbotron title="Edit Profile img" description="Edit You profile image">
                    <i className="text-primary fas fa-user"> </i>
                  </Jumbotron>
                <div className="form-group">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => handleChange(e)}       
                       /><br/>
                      <progress  value={uploadProgress}  max="100" /> <br/>
                        {
                         <div className="col-sm-10 offset-sm-1">
                            { 
                             user.imageUrl? <img  className="img-rounded edit-profile-img" src={user.imageUrl} alt="user"/>:<img  className="img-rounded edit-profile-img" src={process.env.PUBLIC_URL+'/default-user-img.jpeg'} alt="user default" />}                      
                         </div>
                        }
                     {noSelectedImgError &&  <div className="alert alert-danger">  {noSelectedImgError} </div> }
                    <button onClick={() => handleUpload()} className="btn btn-success"> submit profile image </button>
                    <NavLink className="btn btn-light my-1" to="/dashboard">Go Back</NavLink>
                 </div>
                </div>
            );                     
            }else {
              return Loading('Loading Profile ......');
            }
      } 
  



const mapStateToProps = (state,ownProps) => {
  const userId = ownProps.match.params.id;
  const auth =state.firebase.auth;
  let users = state.firestore.data.users;
  let user = users ? users[userId]: null;
  if( auth.uid && user ){
      return {
        auth,
        user
      };
    }else{
      return {
        auth
      }
    }
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
  )(EditProfileImage);