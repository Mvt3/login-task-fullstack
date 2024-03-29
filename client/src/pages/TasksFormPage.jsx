import { useForm } from 'react-hook-form'
import { useTasks } from '../context/TaskContext';
import { useNavigate, useParams } from 'react-router-dom'; //Hooks
import { useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc)

function TasksFormPage() {

    const { register, handleSubmit, setValue } = useForm();
    const { createTask, getTask, updateTask } = useTasks();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const task = await getTask(params.id);
                setValue('title', task.title)
                setValue('description', task.description)
                setValue('date', dayjs(task.date).utc().format("YYYY-MM-DD"))
            }
        } loadTask();
    }, [])


    const onSubmit = handleSubmit((data) => {
        const dataValid = {
            ...data,
            date: data.date ? dayjs(data.date).format() : dayjs.utc().format(),
        };


        if (params.id) {
            updateTask(params.id, dataValid);
        } else {
            createTask(dataValid)
        }

        navigate('/tasks')

    })

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center rounded-md">

            <div className='bg-zinc-900 max-w-md w-full p-10 rounded-md'>
                <form onSubmit={onSubmit}>

                    <label htmlFor="title">Title</label>
                    <input type="text" placeholder='Title'
                        {...register('title')}
                        autoFocus
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md m-2'
                    />

                    <label htmlFor="description">Description</label>
                    <textarea placeholder="Description" rows="3"
                        {...register("description")}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md m-2'
                    >

                    </textarea>

                    <label htmlFor="date">Date</label>
                    <input type="date" className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md m-2'  {...register('date')} />


                    <button className='bg-green-600 px-3 py-2 rounded-md'>Save task</button>
                </form>
            </div>
        </div>
    )
}

export default TasksFormPage