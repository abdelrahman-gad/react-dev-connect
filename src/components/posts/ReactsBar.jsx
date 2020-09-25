import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {addReact} from '../../store/actions/reactsActions';
import {compose} from 'redux';
class ReactsBar extends React.Component{
      
    handleReact = (e,reactableId,reactorId,reactedId,reactType)=>{ 
        //console.log(reactableId);
        //console.log(reactType);
        e.preventDefault();
        let react ={
            reactableId,
            reactType,
            reactedId,
            reactorId
        }

        //console.log(react);
        const {addReact} = this.props;
        addReact(react);

     }
    render(){
        const { reactableId , reactorId , reactedId ,reacts } = this.props;
        //console.log(reacts);
         let likeReacts=reacts.filter(react=>react.reactType==='like');
         let dislikeReacts=reacts.filter(react=>react.reactType==='dislike');
         let loveReacts=reacts.filter(react=>react.reactType==='love');

        return(

            <span className="reacts-bar">
                <button 
                    className={likeReacts.find(react=>react.reactorId===reactorId)?"btn btn-primary":"btn"}
                    onClick={ (e) => this.handleReact(e,reactableId,reactorId,reactedId,'like')}
                >
                <i className="fas fa-thumbs-up"></i> <span >  {likeReacts.length}   </span>
                </button>
                <button 
                    className={dislikeReacts.find(react=>react.reactorId===reactorId)?"btn btn-primary":"btn"}
                    onClick={ (e) => this.handleReact(e,reactableId,reactorId,reactedId,'dislike')}
                >
                <i className="fas fa-thumbs-down"></i> <span>  {dislikeReacts.length} </span>
                </button>
                <button 
                    className={loveReacts.find(react=>react.reactorId===reactorId)?"btn btn-primary":"btn"}
                    onClick={ (e) => this.handleReact(e,reactableId,reactorId,reactedId,'love')}
                    >
                    <i className="fas fa-heart"></i> <span>  {loveReacts.length}  </span>
                </button>
            
        </span>

     );
    }

}





const mapDispatchToProps = (dispatch)=>{
     return {
         addReact: (react) => dispatch(addReact(react))
     }
}


 export default compose(
    connect(null,mapDispatchToProps),
    firestoreConnect([
       { collection:'reacts'}
    ])  
) 
(ReactsBar);

