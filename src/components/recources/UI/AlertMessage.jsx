import React ,{ useState } from 'react';

import {Alert } from 'react-bootstrap';

const  AlertMessage = ( {  type , message } ) => {
    const [ show , setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant={type} onClose={ () => setShow(false)} dismissible>
          <Alert.Heading> {message} </Alert.Heading>
        </Alert>
      );
    }
  }

  export default  AlertMessage;