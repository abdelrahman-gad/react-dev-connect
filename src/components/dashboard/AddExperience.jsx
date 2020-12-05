import React  , {useState , useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {addExperience } from '../../store/actions/profilesActions';
import {NavLink} from 'react-router-dom';
import Jumbotron  from '../recources/UI/Jumbotron';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';
import FormikControl from '../../components/recources/formikComponents/FormikControl';
function AddExperience (  {AddExperience} ) {
 


  const [initialValues , setInitialValues] = useState({
    company: '',
    jobTitle:'',
    location:'',
    description: '',
    fromDate:'',
    toDate:'',
  });
  const validationSchema = Yup.object({
    company: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    jobTitle: Yup.string().required('Required'),
    location: Yup.string().required('Required'),
    fromDate: Yup.date()
      .required('Required'),
    toDate: Yup.date()
      .nullable(),   
  })
  const onSubmit = (values  , {resetForm} )  => {
    console.log("submitted");
    console.log(values);
    addExperience(values);
    toast.success(`You have added Experience item successfully` , {  
      position:toast.POSITION.BOTTOM_RIGHT,
      autoClose:8000
    });
     resetForm({values:{
      company: '',
      location:'',
      jobTitle:'',
      fromDate:'',
      toDate:'',
      description: ''
     }});
}

  return (
    <section className="container">
      <Jumbotron title="Add Education Item " ></Jumbotron>
       <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          
        >
      {formik => (
        <Form>
           <div className="form-group">
              <FormikControl
                control='input'
                type='text'
                name='company'
                className="form-control"
                placeholder="company"
              />
           </div>
           <div className="form-group">
              <FormikControl
                control='input'
                type='text'
                placeholder="job title"
                name='jobTitle'
                className="form-control"
              />
           </div>

          <div className="form-group">
              <FormikControl
                control='textarea'
                placeholder="description of experience"
                name='description'
                className="form-control"
              />
           </div>
          <div className="form-group">
              <FormikControl
                control='input'
                type='text'
                placeholder='area or country of company'
                name='location'
                className="form-control"
              />
           </div>
           <div className="form-group d-flex justify-content-between">
            <FormikControl
              control='date'
              label='Pick a date'
              name='fromDate'
              label="from date"
              className='form-control'
            />
    
            <FormikControl
              control='date'
              label='Pick a date'
              name='toDate'
              placeholder="to date"
              className="form-control"
            />
          </div> 
                
        <input type="submit"  className="btn btn-primary" value="add experience"  />
        </Form>
      )}
     </Formik>
    </section>
  )
}

const mapDispatchToProps = (dispatch)=> {
    return {
        addExperience :(experience)=>dispatch(addExperience(experience))
    }

}

export default compose(
  connect(null,mapDispatchToProps)
)
(AddExperience);


