
import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";



function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks')
  }, [isAuthenticated])



  const onSubmit = handleSubmit(async (values) => {
    signup(values);

  });


  return (

    <div className="flex h-[calc(100vh-100px)] items-center justify-center rounded-md">


      <div className="bg-zinc-700 max-w-md p-10 rounded-md" >
        {
          Array.isArray(RegisterErrors) && RegisterErrors.map((error, i) => (
            <div className="bg-red-500 p-2 m-2" key={i}> {error}</div>
          ))
        }

        <h1 className="text-2xl font-bold my-1"> Register </h1>

        <form onSubmit={onSubmit}>
          <input type="text" {...register('username', { required: 'true' })} className="w-full bg-zinc-600 text-white px-4 py-2 my-2"
            placeholder="Username" />
          {errors.username && <p className="text-red-500">Username is required</p>}
          <input type="email" {...register('email', { required: 'true' })} className="w-full bg-zinc-600 text-white px-4 py-2 my-2"
            placeholder="Email" />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input type="password" {...register('password', { required: 'true' })} className="w-full bg-zinc-600 text-white px-4 py-2 my-2"
            placeholder="Password" />
          {errors.password && <p className="text-red-500">Password is required</p>}
          <button className="bg-green-500 text-white px-4 py-2 rounded-md my-2   hover:rounded-full"   type="submit"> Register</button >
        </form>
        <p className="flex gap-x-2 justify-between">Already have an account? <Link to="/login" className="text-sky-500">Login</Link> </p>
      </div>

    </div>
  )
}

export default RegisterPage