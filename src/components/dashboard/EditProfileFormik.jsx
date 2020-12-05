import React , {useState , useEffect} from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import {Redirect, NavLink} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {editProfile } from '../../store/actions/profilesActions';
import FormikControl from '../../components/recources/formikComponents/FormikControl';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Jumbotron  from '../recources/UI/Jumbotron';
import { toast } from 'react-toastify';

// test if data available 
// in useEffect if any data is available setInitial data based on it


const  EditProfile =  ( {editProfile  , profile } ) => {
        const jobTitleOptions = [ 
          { key: 'Select an option', value: '' },
          { key: 'Junior developer', value: 'junior Eveloper' },
          { key: 'Senior', value: 'Senior' },
          { key: 'Project Manager', value: 'Prject Manager' },
          { key: 'Team Leader', value: 'Team Leader' },
          { key: 'CEO', value: 'CEO' },
          { key: 'CTO', value: 'CTO' }
        ];
       

      useEffect(() => {
        console.log(profile);
        // when you reintialize the values some profile on firestore is not the same on initial values
        // so you have to do some modificatoins when you fetch and also when you puhs to firebase firestore
        // convert array of skills into string
        //
        if(profile){
          setInitialValues({
            ...profile   
          });
        }

      }, [profile]);

    let  [initialValues , setInitialValues] = useState({
        jobTitle:'',
        company:'',
        website:'',
        location:'',
        skills:'',
        githubUsername:'',
        bio:'',
        facebook:'',
        twitter:'',
        linkedin:'',
        youtube:'',
        instagram:''
        });
  

 

    const handleChange = e =>{
      e.preventDefault();
      setInitialValues({
           ...initialValues,
           [e.target.id]:e.target.value
        });
      console.log(initialValues);  
    }
  
    const urlRegex =/((https?):\/\/)?(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
    const validationSchema = Yup.object({
      bio: Yup.string().min(5, 'Must be 5 characters or more').nullable(),
      company: Yup.string().min(4, 'Must be 4 characters or more').nullable(),
      skills: Yup.string().min(2, 'Must be 2 characters or more').nullable(),
      website: Yup.string().matches( urlRegex , 'Enter correct url!').nullable(),
      location:Yup.string().min(5,'location must be 5 chars at least').nullable(),
      facebook: Yup.string().matches( urlRegex , 'Enter correct url!').nullable(),
      twitter: Yup.string().matches( urlRegex , 'Enter correct url!').nullable(),
      linkedin: Yup.string().matches( urlRegex , 'Enter correct url!').nullable(),
      youtube: Yup.string().matches( urlRegex , 'Enter correct url!').nullable(),
      instagram: Yup.string().matches( urlRegex , 'Enter correct url!').nullable(),
      githubUsername: Yup.string().matches( urlRegex , 'Enter correct url!').nullable(),
    });
    
    const onSubmit =(values, { setSubmitting }) => {
        setTimeout(() => {    
            //console.log(values);
            console.log(initialValues);
           
            console.log(initialValues);
             editProfile(initialValues);
          setSubmitting(false);
          toast.success(`You have updated post successfully` , {  
            position:toast.POSITION.BOTTOM_RIGHT,
            autoClose:8000
          });
        }, 400);
      }

 

      

     
        return (
          <section className="container">
              <Jumbotron 
                  title="Create Your Profile"
                  description="Let's get some information to make your profile stand out"
                  >
                 <i className="fas fa-user"></i>
              </Jumbotron>
           
           <small> * = required fields</small>
           <Formik
             validationSchema={validationSchema}
             initialValues={initialValues}
             onSubmit={onSubmit}
             enableReinitialize
           
           > 
             
             {formik => 
                {
                  const {
                    jobTitle,
                    company,
                    website,
                    location,
                    skills,
                    githubUsername,
                    bio,
                    facebook,
                    twitter,
                    linkedin,
                    youtube,
                    instagram
                    } = initialValues;
                  return (
                  <Form className="form">

                    <div className="form-group">          
                    <FormikControl
                        control='select'
                        label='Select a jobTile '
                        name='jobTitle'
                        options={jobTitleOptions}
                      />
                        <small className="form-text">what is your job title</small>
                      </div>
                      <div className="form-group">          
                        <FormikControl
                              control='input'
                              name='company'
                              value={company}       
                              className="form-control"
                              onChange={(e)=>handleChange(e)}
                          />
                        <small className="form-text">latest company you are working for </small>
                      </div>
                      <div className="form-group">
                          <FormikControl
                              control='input'
                              className="form-control"
                              name='website'
                              value={website}
                              onChange={(e)=>handleChange(e)}
                          />
                          <small className="form-text">Provide your website/porfolio link</small>

                      </div>
                      <div className="form-group">
                          <FormikControl
                              control='input'
                              className="form-control"
                              name='location'
                              value={location}         
                              onChange={(e)=>handleChange(e)}
                          />
                          <small className="form-text">location or area of the latest company you worked for</small>
                      </div>
                      <div className="form-group">
                          <FormikControl
                              control='textarea'
                              className="form-control"
                              name='skills'
                              value={skills}   
                              cols='70'      
                              onChange={(e)=>handleChange(e)}
                          />
                          <small className="form-text">Provide your skills <bold>Seperated with comma "," </bold>  .Plz </small>
                      </div>
                      <div className="form-group">
                          <FormikControl
                              control='textarea'
                              className="form-control"
                              name='bio'
                              value={bio}   
                              cols='70'      
                              onChange={(e)=>handleChange(e)}
                          />
                          <small className="form-text">Provide small biography about yourself</small>
                      </div>
                      <div className="form-group">
                          <FormikControl
                              control='input'
                              className="form-control"
                              name='githubUsername'
                              value={githubUsername}         
                              onChange={(e)=>handleChange(e)}
                          />
                           <small className="form-text">
                             <i className="fab fa-github mr-3"></i> 
                               your github link
                          </small>
                      </div>
                      <div className="form-group">
                          <FormikControl
                              control='input'
                              className="form-control"
                              name='facebook'
                              value={facebook}         
                              onChange={(e)=>handleChange(e)}
                          />
                          <small className="form-text">
                             <i className="fab fa-facebook mr-3"></i> 
                             your facebook account link
                          </small>
                      </div>
                      <div className="form-group">
                          <FormikControl
                              control='input'
                              className="form-control"
                              name='youtube'
                              value={youtube}         
                              onChange={(e)=>handleChange(e)}
                          />
                          <small className="form-text">
                             <i className="fab fa-youtube mr-3"></i> 
                             your youtube account link
                          </small>
                      </div>
                      <div className="form-group">
                          <FormikControl
                              control='input'
                              className="form-control"
                              name='twitter'
                              value={twitter}         
                              onChange={(e)=>handleChange(e)}
                          />
                          <small className="form-text">
                             <i className="fab fa-twitter mr-3"></i> 
                             your twitter account  link
                          </small>
                      </div>
                      <div className="form-group">
                          <FormikControl
                              control='input'
                              className="form-control"
                              name='linkedin'
                              value={linkedin}         
                              onChange={(e)=>handleChange(e)}
                          />
                          <small className="form-text">
                             <i className="fab fa-linkedin mr-3"></i> 
                             your linkedin account link
                          </small>
                      </div>
                    
                      <div className="form-group">
                          <FormikControl
                              control='input'
                              className="form-control"
                              name='instagram'
                              value={instagram}         
                              onChange={(e)=>handleChange(e)}
                          />
                          <small className="form-text">
                             <i className="fab fa-instagram mr-3"></i> 
                             your instagram account link
                          </small>
                      </div>
                      <input type="submit"  className="btn btn-primary" value="update profile information"  />
                  </Form>
                )}
              }

           </Formik> 
          
         </section>
         
        );
       
      
  }

 const mapStateToProps = (state,ownProps) =>{
  
  
  const userId = ownProps.match.params.id;
  //console.log(userId);
  let profiles = state.firestore.data.profiles;
  //console.log(profiles);
  const profile = profiles ? profiles[userId]: null;
  //console.log(profile);
  const auth =  state.firebase.auth;
  
    return {
      auth,
      profile
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
