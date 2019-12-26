var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeDB',{useNewUrlParser:true},(err)=>{
    if(!err){console.log("db connection successful");}
    else
    {console.log("database connection unsucessful: "+err);}
});

require('./employee.model');


