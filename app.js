const express=require('express');
const morgan=require('morgan');
require('dotenv').config();
const routerFile=require('./BasicRoutes/routes');
const app=new express();
app.use(morgan('dev'));
const PORT=process.env.PORT || 3000;
const path=require('path');
const filepath=path.join(__dirname, 'hospitals.json');
const fs=require('fs');
app.use(express.json());
//to read hospital data
function readData(){
    try{
const data=fs.readFileSync(filepath,'utf8');
return JSON.parse(data);
    }
    catch(error)
    {
console.error("Error reading data",error);
return [];
    }
}

//write hospital data
function writeData(data){
    try{
const data=fs.writeFile(filepath,JSON.stringify(data,null,2));
console.log("data written")
    }
    catch(error)
    {
console.error("Error reading data",error);

    }
}



//get hospital
app.get('/hospitals/name', (req, res) => {
    const hospitals = readData();
    res.json(hospitals);
});

//post
app.post('/hospitals/add',(req,res)=>{
    const hospitals = readData();
const newHospital=req.body;
    hospitals.push(newHospital);
    writeData(hospitals);
    res.send({message:"Data Added",hospitals});
    
})

//put
app.put('/hospitals/edit',(req,res)=>{
    const hospitals = readData();
    console.log(req.body);
    //replacing 1st element starting at index 0
    //2nd 1 means if 1 element has to be removed and replaced with new data
    hospitals.splice(0,1,req.body);
    res.send({message:"Data updated",hospitals});
})



//delete api
app.delete('/hospitals/remove',(req,res)=>{
    const hospitals = readData();
    hospitals.pop();
    //pop deletes last element and we will get only 1st element 
    res.send({message:"deleted",hospitals})
})

app.listen(PORT,(req,res)=>
{
    console.log(`server is up and running`);
})




