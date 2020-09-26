
// some form input regular expressions
 const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  const nameAndAddressRegex = RegExp(
    /\S+\s+\S+\s+\S+/
 ); 
 const phoneRegex = RegExp(
    /(201)[0-9]{9}/
  );

 export {emailRegex,nameAndAddressRegex,phoneRegex}


