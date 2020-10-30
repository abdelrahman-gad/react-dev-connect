import React from 'react';


/**
* @author
* @function Input
**/

export const Input = props => (
          <div className={props.className} >
              {props.label && <label> {props.label} </label> }
              <input 
                type={props.type} 
                placeholder={props.placeholder}  
                id={props.id}
                onChange={props.handleChange}  
                value={props.value}  
                {...props}        
                />
              { props.error &&  <p className="text-danger"> {props.error} </p> }

          </div>
   );
 
export const SubmitBtn = props => (
  <div className={props.className} >
      <input 
        type="submit" 
        value={props.value}  
        className="btn btn-primary"
        {...props}        
        />
    </div>
);


