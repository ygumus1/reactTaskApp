import { createContext } from "react";
import axios from 'axios'
import { useState } from "react";

const TasksContext = createContext();

function Provider({children}){
    const [tasks, setTasks] = useState([]);
  const createTask = async (title,taskDesc) =>{
    const response = await axios.post('http://localhost:3000/tasks',{
      title,
      taskDesc
    });
    console.log(response);
    const createdTasks =[
      ...tasks,response.data      
    ];
    setTasks(createdTasks);
  };

  const fetchTasks = async ()=>{
    const response = await axios.get('http://localhost:3000/tasks');
    setTasks(response.data);
  }
  const deleteTaskById = async (id) =>{
    await axios.delete(`http://localhost:3000/tasks/${id}`);
    const afterDeletingTasks = tasks.filter((task)=>{
      return task.id !== id;
    })
    setTasks(afterDeletingTasks);
  }
  const editTaskById = async (id, updatedTitle, updatedTaskDesc, completed) => {
    await axios.put(`http://localhost:3000/tasks/${id}`, {
        title: updatedTitle,
        taskDesc: updatedTaskDesc,
        completed: completed // Completed durumu burada ekleniyor
    });
    const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
            return {
                ...task,
                title: updatedTitle,
                taskDesc: updatedTaskDesc,
                completed: completed
            };
        } else {
            return task;
        }
    });
    setTasks(updatedTasks);
};
  const sharedValuesAndMethods = {
    tasks,
    createTask,
    fetchTasks,
    deleteTaskById,
    editTaskById

  }
    return (
        <TasksContext.Provider value={sharedValuesAndMethods}>
            {children}
        </TasksContext.Provider>
    )
}

export {Provider}
export default TasksContext;