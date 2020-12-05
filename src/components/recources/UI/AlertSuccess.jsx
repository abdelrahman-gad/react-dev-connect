import React  , {useState} from 'react';




 const AlertSuccess = ( {showSuccess , message  , next } ) => {
    const [alertSuccess , setAlertSuccess] = useState(true);

    return ( showSuccess && alertSuccess &&
        <div className="alert alert-success alert-dismissible"> 
          <p> { message } </p>
           <button 
               type="button" 
               className="close"
               data-dismiss="alert" 
               aria-label="Close"
               onClick = { next() }
             >
            <span aria-hidden="true">&times;</span>
           </button>
        </div> 
       );
 }

 export default AlertSuccess;
  