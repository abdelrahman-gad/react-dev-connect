

export  const showReadableDateTime = (createdAt) => {
     
    // let showTime = showTime; 
    let nowDateDay = new Date().getDate();
    
     //console.log(nowDateDay);
     
     let date = createdAt.toDate();
     let hours = date.getHours();
     let minutes =date.getMinutes();
     let day =date.getDate();
     let month = date.getMonth();
     let monthName= getMonthName(month);
     let years = date.getFullYear();

      let readableDateTime;
      if(nowDateDay-day > 1){
        
         readableDateTime = years+"-"+monthName+"-"+day+"  "+hours+":"+minutes; 
      }else{
        readableDateTime = hours+":"+minutes; 
      }

     return readableDateTime;

}


export  const showReadableDate = (createdAt) => {
     
    
     
     let date = createdAt.toDate();
     
     let day =date.getDate();
     let month = date.getMonth();
     let monthName= getMonthName(month);
     let years = date.getFullYear();
     let  readableDate = years+"-"+monthName+"-"+day      
     return readableDate;
}



const getMonthName= (monthNum) => {
    const monthNames = ["January", "February", "March",
                        "April", "May", "June",
                        "July", "August", "September", 
                        "October", "November", "December"
                         ];
   return monthNames[monthNum];
}




