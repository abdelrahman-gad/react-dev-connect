import React  , {useState , useEffect } from 'react';
import {firestoreConnect} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {editPost} from '../../store/actions/postsActions';
import {compose} from 'redux';
import FormikControl from '../../components/recources/formikComponents/FormikControl';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Jumbotron  from '../recources/UI/Jumbotron';
import { toast } from 'react-toastify';
const  EditPost = (  { editPost , post } ) => {

          
            useEffect( ()=> {
                if(post){
                    const { body , postId  } = post;         
                    setInitialValues({
                        body,
                        postId
                    });       
                }
            } ,[post]);
            const [initialValues , setInitialValues ] = useState({
                body: "",
                postId: ""
            });
            const   validationSchema = Yup.object({
                body: Yup.string()
                  .min(5, 'Must be 5 characters or more')
                  .required('Required field')
              });

            const onSubmit =(values, { setSubmitting }) => {
                setTimeout(() => {    
                    console.log(values);
                    console.log(initialValues);
                  editPost({...values });
                  
                  setSubmitting(false);
                  toast.success(`You have updated post successfully` , {  
                    position:toast.POSITION.BOTTOM_RIGHT,
                    autoClose:8000
                  });
                }, 400);
              }

              const handleChange = e => {
                  setInitialValues({...initialValues,body:e.target.value})
              }

              return (
                  <div className="container">
                      <Jumbotron title="Edit post page" description="post body"></Jumbotron>
                      <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        enableReinitialize
                        >
                        {formik => 
                         {
                         return (
                            <Form>
                                <div className="form-group">
                                    <FormikControl
                                        control='textarea'
                                        name='post'
                                        value={initialValues.body}
                                        cols="70"
                                        onChange={(e)=>handleChange(e)}

                                    />

                                </div>
                                <input type="submit"  className="btn btn-primary" value="Update Post "  />
                            </Form>
                             )}
                        }
                        </Formik>        
                  </div>
             );
          }



const mapStateToProps = (state ,ownProps )=> {
    const postId= ownProps.match.params.id;
    const posts = state.firestore.data.posts;
    const post = posts ? posts[postId]:undefined;
    // console.log(posts);
    // console.log(post);
   return {
       post
   }
}

const mapDispatchToProps = (dispatch,ownProps)=>{
    ////console.log('add post');
    // const  postId = ownProps.match.params.id;
    // console.log(postId); 
    return {
         editPost: (post)=>dispatch(editPost(post))
    }
}


export default   compose(
                    connect(mapStateToProps,mapDispatchToProps),
                    firestoreConnect([{collection:'posts'}])
                    ) (EditPost);