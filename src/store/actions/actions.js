
// auth actions

const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const SIGNUP_ERROR = 'SIGNUP_ERROR';
const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
const SIGNIN_ERROR = 'SIGNIN_ERROR';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_ERROR = 'LOGOUT_ERROR'; 

// account  actions
const ACCOUNT_DELETE_SUCCESS = 'ACCOUNT_DELETE_SUCCESS';
const ACCOUNT_DELETE_ERROR='ACCOUNT_DELETE_ERROR';




// comments actions 
const ADD_COMMENT_SUCCESS= 'ADD_COMMENT_SUCCESS';
const ADD_COMMENT_ERROR = 'ADD_COMMENT_ERROR';
const DELETE_COMMENT_SUCCESS='DELETE_COMMENT_SUCCESS';
const DELETE_COMMENT_ERROR='DELETE_COMMENT_ERROR';

// notifications actions
const READ_NOTIFICATION_SUCCESS='READ_NOTIFICATION_SUCCESS';

// post actions
const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
const ADD_POST_ERROR = 'ADD_POST_ERROR';
const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
const DELETE_POST_ERROR= 'DELETE_POST_ERROR';
const EDIT_POST_SUCCESS='EDIT_POST_SUCCESS';
const EDIT_POST_ERROR='EDIT_POST_ERROR';


// profile actions
const EDIT_PROFILEIMAGE_SUCCESS='EDIT_PROFILEIMAGE_SUCCESS';
const EDIT_PROFILEIMAGE_ERROR='EDIT_PROFILEIMAGE_ERROR';
const EDIT_PROFILE_SUCCESS='EDIT_PROFILE_SUCCESS';
const EDIT_PROFILE_ERROR='EDIT_PROFILE_ERROR';
const ADD_EXPERIENCE_SUCCESS='ADD_EXPERIENCE_SUCCESS';
const ADD_EXPERIENCE_ERROR='ADD_EXPERIENCE_ERROR';
const DELETE_EXPERIENCE_SUCCESS='DELETE_EXPERIENCE_SUCCESS';
const DELETE_EXPERIENCE_ERROR='DELETE_EXPERIENCE_ERROR';
const ADD_EDUCATION_SUCCESS='ADD_EDUCATION_SUCCESS';
const ADD_EDUCATION_ERROR='ADD_EDUCATION_ERROR';
const DELETE_EDUCATION_SUCCESS='DELETE_EDUCATION_SUCCESS';
const DELETE_EDUCATION_ERROR='DELETE_EDUCATION_ERROR';



// reacts actions
const ADD_REACT_SUCCESS='ADD_REACT_SUCCESS';
const ADD_REACT_ERROR='ADD_REACT_ERROR';
const DELETE_REACT_SUCCESS='DELETE_REACT_SUCCESS';
const DELETE_REACT_ERROR='DELETE_REACT_ERROR';


export {
        SIGNUP_SUCCESS , SIGNUP_ERROR , SIGNIN_SUCCESS  , SIGNIN_ERROR  , LOGOUT_SUCCESS , LOGOUT_ERROR , ACCOUNT_DELETE_SUCCESS,ACCOUNT_DELETE_ERROR,
        ADD_COMMENT_SUCCESS ,ADD_COMMENT_ERROR, DELETE_COMMENT_SUCCESS ,  DELETE_COMMENT_ERROR,
        READ_NOTIFICATION_SUCCESS ,
        ADD_POST_SUCCESS ,ADD_POST_ERROR ,DELETE_POST_SUCCESS , DELETE_POST_ERROR, EDIT_POST_SUCCESS , EDIT_POST_ERROR,
        EDIT_PROFILEIMAGE_SUCCESS , EDIT_PROFILEIMAGE_ERROR , EDIT_PROFILE_SUCCESS , EDIT_PROFILE_ERROR , ADD_EXPERIENCE_SUCCESS , ADD_EXPERIENCE_ERROR , DELETE_EXPERIENCE_SUCCESS , DELETE_EXPERIENCE_ERROR , ADD_EDUCATION_SUCCESS , ADD_EDUCATION_ERROR , DELETE_EDUCATION_SUCCESS ,DELETE_EDUCATION_ERROR ,
        ADD_REACT_SUCCESS ,ADD_REACT_ERROR , DELETE_REACT_SUCCESS ,DELETE_REACT_ERROR
  }