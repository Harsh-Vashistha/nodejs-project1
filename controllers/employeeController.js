const express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var Employee=mongoose.model('Employee');

router.get('/',(req,res)=>{
    res.render("../views/employee/addOrEdit",{
        viewTitle:"Insert Employee"
    });
});


router.post('/',(req,res)=>{
    if(res.body._id=='')
    insertRecord(req,res);
    else
    updateRecord(res,req);
});


router.get('/list',(req,res)=>{
    Employee.find((err,doc)=>{
        if(!err){
            res.render("employee/list",{
                list:doc
            });
        }
        else
        console.log("error in retrieving employee list"+err);
    });
});



router.get('/:id',(req,res)=>{
    Employee.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.render("employee/addOrEdit",{
                viewTitle:"Update Employee",
                employee: doc
            });
        }
        else
        console.log("error in retrieving employee list"+err);
    });
});


function insertRecord(req,res){
var employee=new Employee();
employee.fullName=req.body.fullName;
employee.email=req.body.email;
employee.mobile=req.body.mobile;
employee.city=req.body.city;
employee.save((err,doc)=>{
if(!err)
res.redirect('employee/list');
else
console.log('error during record insertion:'+err);
});
}

function updateRecord(req,res){
    Employee.findOneAndUpdate({_id:req.body._id},req.body, { new:true},(err,doc)=>{
if(!err){res.redirect('employee/list');}
else
console.log("error during updation"+err);
    });
}


module.exports=router;