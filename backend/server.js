const express = require('express')
const app=express()
const mysql = require('mysql') 
const cors = require('cors')


app.use(cors())

app.use(express.json())

const db = mysql.createConnection({
    user: 'taskuser',
    host: 'localhost',
    password: 'taskuser',
    database: 'tasks'
})

//Route
//front >> database


app.get('/tasks',(req, res)=>{
    db.query('SELECT * FROM tasktable',(err,result)=>{
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

// Insert data into database
app.post('/create' , (req,res) =>{
    console.log(req.body)
    const task = req.body.task

    db.query('INSERT INTO tasktable(taskname) VALUES (?)',[task],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

//get single task
app.get("/task/:id", (req, res) => {
    const id = req.params.id;
    const singleTask = `SELECT * FROM tasktable WHERE id ="${id}";`;
    db.query(singleTask, (err, result) => {
        if (err) {
            return res.status(505).json({ msg: err });
        }
        if (result.length < 1) {
            return res.status(404).send(`No task with id : ${id}`);
        } else {
            return res.status(200).json({ result });
        }
    });
});



// Update Database
app.put('/update/:id',(req, res)=>{
    const id = req.params.id
    console.log(req.body)

    // const id = req.body.id
    const task = req.body.task

    db.query('UPDATE tasktable SET taskname= ? WHERE id= ? ', [task, id], (err, result)=>{
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.delete('/delete/:id', (req, res)=>{
    const id = req.params.id

    db.query('DELETE FROM tasktable WHERE id= ?', id, (err, result)=>{
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.listen(9000, () => {
    console.log('task database connected with port number 9000')
})

