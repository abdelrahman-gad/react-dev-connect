import React  from 'react';
import {connect} from 'react-redux';
import {addReact} from '../../store/actions/reactsActions';
import {compose} from 'redux';
import { Fragment } from 'react';
import {toast} from 'react-toastify';

const  ReactsBar = ({addReact  , auth ,  reactableId , reactedId , reacts  , reactableType  }) => {
   
    const   handleReact = ( 
        e,
        reactableId,
        reactorId,
        reactedId,
        reactType
        ) => { 

        e.preventDefault();
        
        let react = {
            reactableId,
            reactType,
            reactedId,
            reactorId
        }
      
        addReact(react);
      
        toast.success( ` You have ${react.reactType}d  ${reactableType} successfully` ,{
            position:toast.POSITION.BOTTOM_RIGHT,
            autoClose:8000
        });
     }   
         const reactorId = auth.uid;
         let likeReacts = reacts.filter(react=>react.reactType==='like');
         let dislikeReacts= reacts.filter(react=>react.reactType==='dislike');
         let loveReacts= reacts.filter(react=>react.reactType==='love');
        
        return(
            <Fragment>
                
                    <span className="reacts-bar">
                        <button 
                            className={likeReacts.find(react => react.reactorId === reactorId ) ? "btn  btn-primary" : "btn" }
                            onClick={ e => handleReact(e,reactableId,reactorId,reactedId,'like')}
                        >
                        <i className="fas fa-thumbs-up"></i> <span >  {likeReacts.length}   </span>
                        </button>
                        <button 
                            className={dislikeReacts.find(react=>react.reactorId === reactorId)?"btn btn-primary":"btn"}
                            onClick={ (e) => handleReact(e,reactableId,reactorId,reactedId,'dislike')}
                        >
                        <i className="fas fa-thumbs-down"></i> <span>  {dislikeReacts.length} </span>
                        </button>
                        <button 
                            className={loveReacts.find(react=>react.reactorId === reactorId)?"btn btn-primary":"btn"}
                            onClick={ (e) => handleReact(e,reactableId,reactorId,reactedId,'love')}
                        >
                            <i className="fas fa-heart"></i> <span>  {loveReacts.length}  </span>
                        </button>
                </span>
            </Fragment>
            
     );
}


const mapDispatchToProps = (dispatch ) => {
     return {
         addReact: (react) => dispatch(addReact(react))
     }
}

const mapStateToProps = state =>{
    return {
        auth:state.firebase.auth
    }
}

export default compose(connect(mapStateToProps,mapDispatchToProps))(ReactsBar);
