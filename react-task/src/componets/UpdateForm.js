import React, { useState } from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'


function UpdateForm() {

    const [newTask, setNewTask] = useState('')
    const [taskList, setTaskList] = useState([])
    const {pid} =useParams()
    var perTaskName = ''
    console.log(pid)

    // useEffect(()=>{
    //     fetch('http://localhost:9000/tasks')
    //     .then((res) => res.json())
    //     .then((data)=>{
    //         const taskData = data;
    //         console.log(taskData)
    //         const singletask = taskData.filter(
    //             (taskList) => taskList.id === id
    //         )
    //         setTaskList(singletask)
    //     })
    //     .catch(() => console.log('Error'))
    // },[])

    useEffect(() =>{
        getTask()
    },[])

    const getTask = async () => {
        try{
            const{
                data: {result},
            } = await Axios.get(`http://localhost:9000/task/${pid}`)
            const { id, taskname } = result[0];
            console.log({  id, taskname });
            perTaskName = {taskname}
            console.log(perTaskName)

        }catch(error){
            console.log(error)

        }
    }



    const updateTask = () => {
        Axios.put(`http://localhost:9000/update/${pid}`, { task: newTask, id: pid }).then((res) => {
            setTaskList(taskList.map((task) => {
                return task.id === pid ? { task: newTask, id: task.id } : task
            }))
        })
    }
    return (

        <div>
           
            <div className="container">
               
                <form className="single-task-form" onSubmit={updateTask}>
                    <h4>Edit Task</h4>
                    <div className="form-control">
                        <label>Task ID</label>
                        <p className="task-edit-id">{pid}</p>
                    </div>
                    
                    <div className="form-control">
                        <label for="name">Name</label>
                        <input type="text" name="name" value={newTask} className="task-edit-name" onChange={(e) => { setNewTask(e.target.value) }} />
                    </div>
                    <div className="form-control">
                        <label for="completed">completed</label>
                        <input type="checkbox" name="completed" className="task-edit-completed" />
                    </div>
                    <button type="submit" className="block btn task-edit-btn" >edit</button>
                    <div className="form-alert"></div>
                </form>
                <a href="/" className="btn back-link">back to tasks</a>
            </div>
        </div>

    )
}

export default UpdateForm