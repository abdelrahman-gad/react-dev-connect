import React   , {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {addPost} from '../../store/actions/postsActions';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

 const AddPost = ( { addPost } ) => {
   const AddPostForm = ( ) => {   
      return (
        <Formik
          initialValues={{ post: ''}}
          validationSchema={Yup.object({
            post: Yup.string()
              .min(5, 'Must be 5 characters or more')
              .required('Required field')
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {    
              addPost(values.post);
              values.post='';
              setSubmitting(false);
              toast.success(`You have added post successfully` , {  
                position:toast.POSITION.BOTTOM_RIGHT,
                autoClose:8000
              });
            }, 400);
          }}
        >
          <Form>
           <div className="form-group">
              <Field
                    name="post" 
                    as="textarea"
                    placeholder="Add post" 
                    className="form-control"
                  
                    />
              <p className="text-danger">       
                  <ErrorMessage name="post"  />
              </p>
              <button type="submit" className="btn btn-submit">Add Post</button>
           </div>
          </Form>
        </Formik>
      );
    };

   return (
     <div>
         {AddPostForm()}
     </div>
   );
 }

const mapDispatchToProps =  dispatch => {
    return {
         addPost: post => dispatch(addPost(post))
    }
}

export default connect( null ,mapDispatchToProps) (AddPost);