let express = require("express") ;
let app = express();
app.use(express.json ());
app.use( function (req, res, next) {
res.header("Access-Control-Allow-Origin","*");
res.header( "Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD");
res. header( "Access-Control-Allow-Headers", "Origin, x-Requested-With, Content-Type, Accept");
next();
});
// const port = 2410;
var port = process.env.PORT || 2410
app.listen(port,()=>console.log(`Listening on port ${port}!`));

let {customerData} = require("./customerData");

// app.get("/customers",function(req,res){
//     res.send(customerData);
//  })

 app.get("/customers/:id",function(req,res){
    let id = req.params.id;
    let customer = customerData.find(ct=>ct.id===id);
    res.send(customer);
 })

 app.post("/customers",function(req,res){
    let body = req.body;
    customerData.push(body);
    res.send(body);
});

app.put("/customers/:id",function(req,res){
    let id = req.params.id;
    let body = req.body;
    let  index = customerData.findIndex((p1)=>p1.id===id);
    if(index>=0){
        let updateCustomer = {id:id,...body};
        customerData[index] = updateCustomer;
        res.send(body);
    }else{
        res.status(404).send("No Found")
    }
   
})

app.delete("/customers/:id",function(req,res){
    let id = req.params.id;
    let  index = customerData.findIndex((p1)=>p1.id===id);
    let deletecus = customerData.splice(index,1);
    res.send(deletecus);
})



app.get("/customers",function(req,res){
    let city = req.query.city;
    let gender = req.query.gender;
    let payment = req.query.payment;
    let sortBy = req.query.sortBy;
    let arr1 = customerData;

    if(city){
        arr1 = arr1.filter((st)=>st.city===city);
    }
    if(gender){
        arr1 = arr1.filter((st)=>st.gender===gender);
    }
    if(payment){
        arr1 = arr1.filter((st)=>st.payment===payment);
    }
    if(sortBy==="city"){
        arr1.sort((st1,st2)=>st1.city.localeCompare(st2.city));
    }
    if(sortBy==="age"){
        arr1.sort((st1,st2)=>st1.age-st2.age);
    }
    if(sortBy==="payment"){
        arr1.sort((st1,st2)=>st1.payment.localeCompare(st2.payment));
    }
    res.send(arr1);
});