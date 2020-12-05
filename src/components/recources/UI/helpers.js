import React, { useState } from 'react';

export const showLoading = ( loading , message = 'Loading data .....' ) => {

    return ( loading &&  <div className="container">
              <h2 className="text-primary  text-center loading "> {message} </h2>
            </div>);
    } 
  

export  const Loading = ( msg ) => {
      return (
          <div className="container">
               <h2 className="text-primary text-center loading"> {msg} </h2>
          </div> 
      );    
}




  
  