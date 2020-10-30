import React , {useState} from 'react';
import {connect } from 'react-redux';
// import {compose} from 'redux';
// import { firestoreConnect } from 'react-redux-firebase';
import {signUp } from '../../store/actions/authActions';
import { NavLink, Redirect } from 'react-router-dom';
import Jumbotron from '../recources/UI/Jumbotron';
import { Formik, Field , Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const  SignUp  = ( props ) => {

  const validate = () => Yup.object({
    name:Yup.string()
      .min(3 , 'name is too short should be 3 chars minimum. '),
    email:Yup.string()
     .email('Invalid Email Address')
     .required('Please fill up email address field'),
    password:Yup.string()
     .required('Please provide a password') 
     .min(6, 'Password is too short - should be 6 chars minimum.'),
    passwordConfirmation:Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match')     
 });

   const signupForm = () =>  (
    <Formik
      //1- initial values
      initialValues={{ name:'' ,  email:'' , password:'' , passwordConfirmation:'' }}
      //2- validation [ I used Yup package ]
      validationSchema={validate()}
      //3-  add Submit handler method
      onSubmit={ ( values ) => {
           const { name , email , password } = values;
           const user = {name , email , password}
           console.log(user);
           props.signUp(user);
          //  props.history.push('/dashboard');
         // console.log(props.auth);
       }}
      >
     <Form className="form">   
        <Field className="form-control"  name="name" type="text" placeholder="name" />
        <p  className="text-danger"> <ErrorMessage name="name"  /></p> 
        <br/> 
        <Field className="form-control"  name="email" type="email"  placeholder="email" />
        <p  className="text-danger"> <ErrorMessage name="email"  /></p> 
        <br/> 
        <Field  className="form-control"  name="password" type="password"  placeholder="password" id="password" />
        <p className="text-danger"> <ErrorMessage name="password"   /> </p>
        <br/>
        <Field  className="form-control"  name="passwordConfirmation" type="password" placeholder="confirm password" />
        <p className="text-danger"> <ErrorMessage name="passwordConfirmation"  /> </p>
        <br/>
        <button type="submit" className="btn btn-primary" >Submit</button>          
     </Form>
    </Formik>
   );

  
const signinLink = ( ) => (<p className="my-1"> Already have an account ? <NavLink to="/signin"> sign in </NavLink></p>);
 
   const { auth } = props;
   console.log(auth);
   if(auth.uid){
     return <Redirect exact to="/dashboard" />
   } else {
    return (
      <section className="container" >    
        <Jumbotron title="Sign Up" description="Create New  Account" >  <i className="fas fa-user"></i>  </Jumbotron>
        {signupForm()}
        {signinLink()}
      </section>
    );
   }
  
}



const mapStateToProps = (state) => {
  const auth = state.firebase.auth;
    return {
        authError:state.auth.error,
        auth
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return {
        signUp:(newUser)=> dispatch(signUp(newUser))
    }
}

export default connect( mapStateToProps , mapDispatchToProps ) (SignUp);