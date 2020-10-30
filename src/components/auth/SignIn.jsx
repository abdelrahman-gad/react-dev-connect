import React  , { useState , useEffect } from 'react';
import { connect } from 'react-redux';
import {Redirect,NavLink} from 'react-router-dom';
import {signIn } from '../../store/actions/authActions';
import Jumbotron from '../recources/UI/Jumbotron';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const  SignIn = ( props )  =>  {
const { auth , authError , signIn } = props;
const validate = () => Yup.object({
    email:Yup.string().email('Invalid Email Address').required('Please fill up email address field'),
    password:Yup.string()
    .required('Please provide a password') 
    .min(6, 'Password is too short - should be 6 chars minimum.')
 });
 

const signinForm = () => {
 return (
    <Formik
      //1- initial values
      initialValues={{ email:'' , password:'' }}
      //2- validation [ I used Yup package ]
      validationSchema={validate()}
      //3-  add Submit handler method
      onSubmit={ ( values ) =>{
           signIn(values);
      } }
      >
     <Form className="form">   
        <Field className="form-control"  name="email" type="text" placeholder="email" />
        <p  className="text-danger"> <ErrorMessage name="email"  /></p> 
        <br/> 
        <Field  className="form-control"  name="password" type="password"  placeholder="password"/>
        <p className="text-danger"> <ErrorMessage name="password"  /> </p>
        <br/>
        <button type="submit" className="btn btn-primary" >Submit</button>          
     </Form>
    </Formik>
 );

}

const  showError = authError => (authError ? <div className="alert alert-danger"> {authError} </div>:""); 
const  signupLink = () => (<p className="my-1">Don't have an account ? <NavLink exact to="/signup"> Sign Up  </NavLink></p>)  

  if( authError || ! auth.uid ) {
  return (
    <section className="container">
      <Jumbotron title="Sign in " description="Sign in an existing account " > <i className="fas fa-user"></i> </Jumbotron>
      {showError(authError)}
      {signinForm()}
      {signupLink()}     
    </section>  
  );

  } else if(auth.uid){ 
    return <Redirect exact to="/dashboard" />
  }  
 
}


const mapDispatchToProps = dispatch => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

const mapStateToProps =  ( state ) => {
    const auth =  state.firebase.auth;
    return  { authError:state.auth.authError , auth };

 }
export default connect( mapStateToProps , mapDispatchToProps) (SignIn);