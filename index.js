const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');







app.use(bodyparser.json());








var mysqlConnection = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: '1234',
     database: 'foodsdb',
     multipleStatements: true




});


mysqlConnection.connect((err) => {
    if(!err){
        console.log('DB connection succeded');

    }else{
        console.log('DB connection failed \n Error:  ' + JSON.stringify(err,undefined,2));


    }
});





app.listen(3000,()=>console.log('Express servers is running in port 3000...' ));


//Get all foods
app.get('/foods',(req,res)=> {
    mysqlConnection.query('SELECT * from foods', (err,rows,fields)=>{
        if(!err){
            res.send(rows);

        }else{
            console.log(err);
        }
    });
});

//Get a foods
app.get('/foods/:id',(req,res)=> {
    mysqlConnection.query(`SELECT * from foods WHERE foodID = ${req.params.id}`, (err,rows,fields)=>{
        if(!err){
            res.send(rows);

        }else{
            console.log(err);
        }
    });
});


//Delete a food
app.delete('/foods/:id',(req,res)=> {
    mysqlConnection.query(`DELETE from foods WHERE foodID = ${req.params.id}`, (err,rows,fields)=>{
        if(!err){
            res.send('Deleted succesfully.');

        }else{
            console.log(err);
        }
    });
});


//Insert a food
app.post('/foods',(req,res)=> {
    let emp = req.body;
    var sql = "SET @foodID = ?; SET @placeName = ?; SET @foodName = ?; SET @foodRating = ?; \
    CAll FoodsAddOrEdit(@foodID,@placeName,@FoodName,@foodRating);";
    mysqlConnection.query(sql,[emp.foodID, emp.placeName, emp.foodName, emp.foodRating], (err,rows,fields)=>{
        if(!err){
            res.send(rows);

        }else{
            console.log(err);
        }
    });
});
