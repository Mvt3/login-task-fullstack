import { createContext, useContext, useState } from "react";
import { createTasksRequest, getTasksRequest, deleteTasksRequest, getTaskRequest, updateTasksRequest } from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider")
    }
    return context;
};




export function TaskProvider({ children }) {

    const [tasks, setTasks] = useState([]);
    //getAll
    const getTasks = async () => {

        try {
            const res = await getTasksRequest();
            setTasks(res.data)
        } catch (error) {
        }
    };

    //create
    const createTask = async (task) => {
        const res = await createTasksRequest(task)
    };
    //delete
    const deleteTask = async (id) => {
        try {
            const res = await deleteTasksRequest(id);            //_id = id dont save
            if (res.status === 204) setTasks(tasks.filter(task => task._id !== id))
        } catch (error) {
            console.log(error)
        }
    };
    //get1
    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    //update
    const updateTask = async (id, task) =>{
        try {
            await updateTasksRequest(id, task);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                createTask,
                getTasks, //All tasks
                deleteTask,
                getTask, // One task
                updateTask,
            }}

        >

            {children}

        </TaskContext.Provider>

    )
}