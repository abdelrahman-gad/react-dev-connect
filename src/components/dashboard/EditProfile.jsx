import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import {Redirect, NavLink} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {editProfile } from '../../store/actions/profilesActions';


class EditProfile extends React.Component{

    constructor(props){
       super(props);
       
       //console.log(props.profile);
       const {profile} = props;
       //console.log('from constructor');
       this.state={
        jobTitle:profile?profile.jobTitle:'',
        company:profile?profile.company:'',
        website:profile?profile.website:'',
        location:profile?profile.location:'',
        skills:profile?profile.skills.join(','):'',
        githubUsername:profile?profile.githubUsername:'',
        bio:profile?profile.bio:'',
        // socialLinks
        facebook:profile?profile.socialLinks.facebook:'',
        youtube:profile?profile.socialLinks.youtube:'',
        linkedin:profile?profile.socialLinks.linkedin:'',
        twitter:profile?profile.socialLinks.twitter:'',
        instagram:profile?profile.socialLinks.instagram:''
       }
       //binding methods
       this.handleChange=this.handleChange.bind(this);
       this.handleSubmit=this.handleSubmit.bind(this);
    }
   
      componentWillReceiveProps(nextProps){
      //console.log(nextProps.profile);
      this.mapProfileDataToState(nextProps.profile);
    }
  
    

    mapProfileDataToState = (profile) => {
    
        this.setState({
          jobTitle:profile?profile.jobTitle:'',
          company:profile?profile.company:'',
          website:profile?profile.website:'',
          location:profile?profile.location:'',
          skills:profile?profile.skills.join(','):'',
          githubUsername:profile?profile.githubUsername:'',
          bio:profile?profile.bio:'',
          // socialLinks
          facebook:profile?profile.socialLinks.facebook:'',
          youtube:profile?profile.socialLinks.youtube:'',
          linkedin:profile?profile.socialLinks.linkedin:'',
          twitter:profile?profile.socialLinks.twitter:'',
          instagram:profile?profile.socialLinks.instagram:''
        });
      
      
    }

    handleChange(e){
      e.preventDefault();
    //  //console.log(e.target.id,e.target.value);
      this.setState({
        [e.target.id]:e.target.value
        });
      ////console.log(this.state);
    }
  

 
  
    handleSubmit(e){
      e.preventDefault();
      let {jobTitle,company,website,location,skills,bio,githubUsername,facebook,twitter,youtube,linkedin,instagram}=this.state;
      let socialLinks= {facebook,twitter,youtube,linkedin,instagram};
      let skillsArr = skills.split(',');
      let editableProfile = {jobTitle,company,website,location,bio,githubUsername,socialLinks,skillsArr};
      //  //console.log('from component',profile);
      //console.log(editableProfile);
      const {editProfile} = this.props;
      editProfile(editableProfile);
      this.props.history.push('/');
    }
    
    render(){
     const  { auth  } = this.props;
      

       if(!auth.uid){
         return (<Redirect exact to="/" />)
       }else{
        return (
          <section className="container">
           <h1 className="large text-primary">
             Create Your Profile
           </h1>
           <p className="lead">
             <i className="fas fa-user"></i> Let's get some information to make your
             profile stand out
           </p>
           <small> * = required fields</small>
           <form className="form" onSubmit={this.handleSubmit}>
             <div className="form-group">
               <select
                onChange={this.handleChange}
                id="jobTitle"
                name="status">
                 <option value={this.state.jobTitle}>{this.state.jobTitle?this.state.jobTitle:"--please select option--"}</option>
                 <option value="Developer">Developer</option>
                 <option value="Junior Developer">Junior Developer</option>
                 <option value="Senior Developer">Senior Developer</option>
                 <option value="Manager">Manager</option>
                 <option value="Student or Learning">Student or Learning</option>
                 <option value="Instructor">Instructor or Teacher</option>
                 <option value="Intern">Intern</option>
                 <option value="Other">Other</option>
               </select>
               <small className="form-text"
                 >Give us an idea of where you are at in your career</small>
             </div>
             <div className="form-group">
               <input 
                onChange={this.handleChange}
                value={this.state.company}
                type="text" 
                id="company"
                placeholder="Company"
                name="company" />
               <small className="form-text"
                 >Could be your own company or one you work for</small>
             </div>
             <div className="form-group">
               <input
                  onChange={this.handleChange}               
                  type="text"
                  id="website"
                  value={this.state.website}
                  placeholder="Website" 
                  name="website" />
               <small className="form-text"
                 >Could be your own or a company website</small>
             </div>
             <div className="form-group">
               <input
                onChange={this.handleChange}
                type="text"
                id="location"
                value={this.state.location}
                placeholder="Location"
                name="location" />
               <small className="form-text"
                 >City & state suggested (eg. Boston, MA)</small>
             </div>
             <div className="form-group">
               <input 
                 onChange={this.handleChange}
                 id="skills"
                 value={this.state.skills}
                 type="text"
                 placeholder="* Skills"
                 name="skills"
               
               />
               <small className="form-text"
                 >Please use comma separated values (eg.
                 HTML,CSS,JavaScript,PHP)</small>
             </div>
             <div className="form-group">
               <input
                 onChange={this.handleChange}
                 id="githubUsername"
                 type="text"
                 value={this.state.githubUsername}
                 placeholder="Github Username"
                 name="githubusername"
               />
               <small className="form-text"
                 >If you want your latest repos and a Github link, include your
                 username</small>
             </div>
             <div className="form-group">
               <textarea
                 onChange={this.handleChange}
                 id="bio" 
                 value={this.state.bio}
                 placeholder="A short bio of yourself" 
                 name="bio"></textarea>
               <small className="form-text">Tell us a little about yourself</small>
             </div>
     
             <div className="my-2">
               <button type="button" className="btn btn-light" disabled>
                 Add Social Network Links
               </button>
               <span>Optional</span>
             </div>
     
             <div className="form-group social-input">
               <i className="fab fa-twitter fa-2x"></i>
               <input
                 onChange={this.handleChange}
                 id="twitter"
                 value={this.state.twitter}
                 type="text" 
                 placeholder="Twitter URL" 
                 name="twitter" />
             </div>
     
             <div className="form-group social-input">
               <i className="fab fa-facebook fa-2x"></i>
               <input
                 onChange={this.handleChange}
                 id="facebook"
                 value={this.state.facebook}
                 type="text" 
                 placeholder="Facebook URL" 
                 name="facebook" />
             </div>
     
             <div className="form-group social-input">
               <i className="fab fa-youtube fa-2x"></i>
               <input 
                 onChange={this.handleChange}
                 id="youtube"
                 value={this.state.youtube}
                 type="text"
                 placeholder="YouTube URL" 
                 name="youtube" />
             </div>
     
             <div className="form-group social-input">
               <i className="fab fa-linkedin fa-2x"></i>
               <input 
                 onChange={this.handleChange}
                  id="linkedin"
                  value={this.state.linkedin}
                  type="text" 
                  placeholder="Linkedin URL" 
                  name="linkedin" />
             </div>
     
             <div className="form-group social-input">
               <i className="fab fa-instagram fa-2x"></i>
               <input
                 onChange={this.handleChange}
                 id="instagram"
                 value={this.state.instagram}
                 type="text" 
                 placeholder="Instagram URL"
                 name="instagram" />
             </div>
             <input type="submit" className="btn btn-primary my-1" />
             <NavLink className="btn btn-light my-1" to="/dashboard">Go Back</NavLink>
           </form>
         </section>
         
        );
       }
      
    
     }
  }

 const mapStateToProps = (state,ownProps) =>{
  
  
  const userId = ownProps.match.params.id;
  //console.log(userId);
  let profiles = state.firestore.data.profiles;
  //console.log(profiles);
  const profile = profiles ? profiles[userId]: null;
  //console.log(profile);
  if( profile !== null ){
    return {
      auth:state.firebase.auth,
      profile:profile
    }
  }else{
    return{
      
    }

  }
  
    
}
const mapDispatchToProps = (dispatch)=>{
    return {
        editProfile:(editableProfile)=>dispatch(editProfile(editableProfile))
    }
}

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([{collection:'profiles'}])
)
(EditProfile);


