import React , { Fragment , useState } from 'react';
import {connect} from 'react-redux';
import {addComment} from '../../../store/actions/commentsActions';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const AddComment = (  { addComment , postId , auth } ) => {
        const initialValues = { comment:'' };
   
        const validate = (  ) => Yup.object({
            comment: Yup.string()
             .min(3,'minimum comment length is 3 characters' )
             .required('Required'),
        });
         
        const AddCommentForm = ( ) => {
          return (
              <Formik 
                  initialValues={ initialValues }
                  validationSchema={validate()}
                  onSubmit = { (values , { setSubmitting }  )  => {
                    setTimeout(() => {
                      console.log('from submit');
                       const userId = auth.uid;
                       let comment = {body:values.comment , postId , userId };
                       addComment(comment);            
                       values.comment = '';
                       setSubmitting(false);
                       toast.success(`You have commented on post successfully `,{
                         position:toast.POSITION.BOTTOM_RIGHT,
                         autoClose:8000
                       });
                    },400);
                    }}
                  >
                <Form className="form my-1">   
                  <Field        
                        name="comment"  
                        as="textarea"
                        rows="4"
                        placeholder="append comment on post ...."    
                        id="comment"
                    />
                    <p  className="text-danger"> <ErrorMessage name="comment" /></p>              
                    <button type="submit" className="btn btn-dark my-1" >Comment</button>  
                </Form>   
              </Formik>
          );
        } 
    return (
        <Fragment> 
            {AddCommentForm()}
        </Fragment>                
      );
}

const mapDispatchToProps = (dispatch)=>{
    return {
        addComment:(comment)=>dispatch(addComment(comment))
    }
}

export default connect(null,mapDispatchToProps) (AddComment);

