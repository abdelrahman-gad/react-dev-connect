import React   from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {addEducation } from '../../store/actions/profilesActions';
import FormikControl from '../../components/recources/formikComponents/FormikControl';
import { Formik,  Form } from 'formik';
import * as Yup from 'yup';
import Jumbotron  from '../recources/UI/Jumbotron';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';
function AddEducation (  {addEducation} ) {

 


  const initialValues  = {
    school: '',
    degree:'',
    field:'',
    fromDate:'',
    toDate:'',
    description: ''
  };
  
  const validationSchema = Yup.object({
    school: Yup.string().required('Required'),
    degree: Yup.string().required('Required'),
    field: Yup.string().required('Required'),
    fromDate: Yup.date()
      .required('Required'),
    toDate: Yup.date()
      .required('Required'),
    description: Yup.string().required('Required')
  })
  const onSubmit = (values  , {resetForm} )  => {
    console.log("submitted");
    console.log(values);
    addEducation(values);
   toast.success(`You have added eduacation item successfully` , {  
    position:toast.POSITION.BOTTOM_RIGHT,
    autoClose:8000
    });
    resetForm({values:{
      school: '',
      degree:'',
      field:'',
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
                name='school'
                className="form-control"
                placeholder="school name"
              />
           </div>
           <div className="form-group">
              <FormikControl
                control='degree'
                type='text'

                placeholder="add degree"
                name='degree'
                className="form-control"
              />
           </div>

          <div className="form-group">
              <FormikControl
                control='input'
                type='text'
                placeholder='field'
                name='field'
                className="form-control"
              />
           </div>
           <div className="form-group d-flex justify-content-between">
            <FormikControl
              control='date'
              label='Pick a date'
              name='fromDate'           
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
          <div className="form-group">
              <FormikControl
                control='textarea'
                className="form-control"
                placeholder='add description'
                name='description'         
              />
           </div>      
        <input type="submit"  className="btn btn-primary" value="add Education"  />
        </Form>
      )}
     </Formik>
    </section>
  )
}

const mapDispatchToProps = (dispatch)=> {
    return {
        addEducation :(education)=>dispatch(addEducation(education))
    }

}

export default compose(
  connect(null,mapDispatchToProps)
)
(AddEducation);


