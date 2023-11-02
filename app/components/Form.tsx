'use client'

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}

const Form = () => {
    const {
        register, 
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<Inputs>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    }); // Specify the type of useForm as Inputs
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
    console.log(watch("firstName"));
    return (  
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="firstname">First Name</label>
            <input 
            {...register("firstName", {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i
            })} />
            {errors?.firstName?.type === "required" && <span>This field is required</span>}
            {errors?.firstName?.type === "maxLength" && <span>First name cannot exceed 20 characters</span>}
            {errors?.firstName?.type === "pattern" && <span>Alphabetical characters only</span>}
            <label htmlFor="lastname">Last Name</label>
            <input 
            {...register("lastName", {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i
            })} />
            {errors?.lastName?.type === "required" && <span>This field is required</span>}
            {errors?.lastName?.type === "maxLength" && <span>Last name cannot exceed 20 characters</span>}
            {errors?.lastName?.type === "pattern" && <span>Alphabetical characters only</span>}
            <label htmlFor="email">Email</label>
            <input 
            {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i
            })} />
            {errors?.email?.type === "required" && <span>This field is required</span>}
            {errors?.email?.type === "pattern" && <span>Invalid email</span>}
            <label htmlFor="password">Password</label>
            <input 
            {...register("password", {
                required: true,
                minLength: 8,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i
            })} />
            {errors?.password?.type === "required" && <span>This field is required</span>}
            {errors?.password?.type === "minLength" && <span>Password must be at least 8 characters</span>}
            {errors?.password?.type === "pattern" && <span>Password must contain at least one uppercase letter, one lowercase letter, and one number</span>}
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
            {...register("confirmPassword", {
                required: true,
                validate: value => value === watch("password")
            })} />
            {errors?.confirmPassword?.type === "required" && <span>This field is required</span>}
            {errors?.confirmPassword?.type === "validate" && <span>Passwords must match</span>}
            <input type="submit" value="Submit" />
        </form>
    );
}
 
export default Form;