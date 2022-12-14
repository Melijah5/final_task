
const mysqlConnection = require('./connect.js')
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

// Middle ware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.urlencoded({ extended: true }));



app.use(cors())

mysqlConnection.connect((err) => {
    if (err) console.log(err);
    else console.log("connected")
})

app.get('/install', (req, res) => {
    const installTable = `CREATE TABLE if not exists Task(
        Task_id int auto_increment, 
        task_name VARCHAR(255) not null, 
        complied boolean default false,
        PRIMARY KEY (Task_id)`;
    mysqlConnection.query(installTable, (err, results, fields) => {
        if (err) console.log(`Error Found: ${err}`);
    });
})

app.get('/', (req, res) => {
    res.status(200).send('hello')
})
//get all task

app.get("/tasks", (req, res) => {
    const allTasks = `SELECT * FROM Task;`;
    mysqlConnection.query(allTasks, (err, result) => {
        if (err) {
            return res.status(500).json({ msg: err });
        } else {
            return res.status(200).json({ result });
        }
    });
});

//get single task
app.get("/task/:id", (req, res) => {
    const id = req.params.id;
    const singleTask = `SELECT * FROM Task WHERE id ="${id}";`;
    mysqlConnection.query(singleTask, (err, result) => {
        if (err) {
            return res.status(500).json({ msg: err });
        }
        if (result.length < 1) {
            return res.status(404).send(`No task with id : ${id}`);
        } else {
            return res.status(200).json({ result });
        }
    });
});

// 
app.post("/task", (req, res) => {
    const name = req.body.name;
    console.log(req.body);
    if (!name) {
        return res.status(401).send("please provide data");
    }
    const createTask = `INSERT INTO task (task_name) VALUES ("${name}") `;

    mysqlConnection.query(createTask, (err, result) => {
        if (err) {
            console.log(err);
            return res.send(err);
        } else {
            return res.status(201).send("task created");
        }
    });
});

//update single task
app.patch("/task/:id", (req, res) => {
    const id = req.params.id;
    // console.log(id);
    let name = req.body.name;
    let completed = req.body.completed;

    if (completed) {
        completed = 1;
    }
    // console.log(req.body);

    const updateTask = `UPDATE task
	SET task_name = "${name}",
		completed = ${completed}
		WHERE id=${id}`;

    mysqlConnection.query(updateTask, (err) => {
        if (err) {
            console.log(err);
            return res.send(err);
        } else {
            const singleTask = `SELECT * FROM Task WHERE id ="${id}";`;
            mysqlConnection.query(singleTask, (err, result) => {
                if (err) {
                    return res.status(500).json({ msg: err });
                } else {
                    return res.status(200).json({ result });
                }
            });
        }
    });
});

// delete single task
app.delete("/task/:id", (req, res) => {
    const id = req.params.id;

    const deletTask = `DELETE FROM task WHERE id=${id}`;

    mysqlConnection.query(deletTask, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        } else {
            return res.status(200).send("task deleted");
        }
    });
});


app.listen(5000, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Port is running 5000')
    }
})


