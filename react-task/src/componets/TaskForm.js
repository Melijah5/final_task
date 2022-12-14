
import React, { useState } from 'react'
import Axios from 'axios'


function TaskForm() {

    const [task, setTask] = useState('')

    const [taskList, setTaskList] = useState([])
    // const [newTask, setNewTask] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)



    const addTask = () => {
        Axios.post('http://localhost:9000/create', {
            task: task
        }).then(() => {
            console.log('post data')
        })
            .then(() => {
                if (task) {
                    setIsSubmit(true)
                }
                //   setTaskList([...taskList,{
                //     task: task
                //   }])
            })
    }
    // console.log(task)


    //// get request
    const getTask = () => {
        Axios.get('http://localhost:9000/tasks')
            .then((res) => {
                // console.log(res)
                setTaskList(res.data)
            })
    }

    console.log(taskList)

    // //update task
    // const updateTask = (id) => {
    //     Axios.put('http://localhost:9000/update', { task: newTask, id: id }).then((res) => {
    //         setTaskList(taskList.map((task) => {
    //             return task.id === id ? { task: newTask, id: id } : task
    //         }))
    //     })
    // }


    //delete the task

    const deleteTask = (id) => {
        Axios.delete(`http://localhost:9000/delete/${id}`)

        setTaskList(taskList.filter((task) => {
            return task.id !== id
        }))
        window.confirm('Are you sure to delete me?')

    }


    const handleChange = e => {
        setTask(e.target.value)
    }

    return (
        <div>
            <form className="task-form" onSubmit={addTask} >

                <h4>task manager</h4>

                <div className="form-control">
                    <input
                        type="text"
                        name="name"
                        className="task-input"
                        placeholder="e.g. learn Nodejs"
                        onChange={handleChange}

                    />

                    <button type="submit" value="submit" className="btn submit-btn">submit</button>

                </div>
                <div className="form-alert"></div>
            </form>

            <button type="submit" onClick={getTask} className="btn submit-btn">show Data</button>
            <div className="tasks-container">
                {taskList.map((task, index) => {
                    let id = task.id
                    let updateForm = '/task/' + id
                    let taskname = task.taskname
                    return (
                        <div className="tasks" key={index}>
                            <div className="single-task" >
                                <h5>
                                    <span><i className="far fa-check-circle"></i></span>
                                    ${taskname}
                                </h5>
                                <div className="task-links">

                                    <a href={updateForm} className="edit-link">
                                        <i className="fas fa-edit" ></i>
                                    </a>

                                    <button type="button" className="delete-btn" >
                                        <i className=" fas fa-trash" onClick={() => { deleteTask(task.id) }}></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default TaskForm


// onChange={(e) => { setNewTask(e.target.value) }}


// fetch backend ... useEffect hook --- update ... Console
// form state add data to database...
// update the database



