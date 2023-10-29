import { Form, redirect } from "react-router-dom"
import "./LoginRegister.css"
import { register } from "../util/requests"

export async function action({request} : {request : Request}){
    const formData = await request.formData()

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    if(name && email && password){
        return await register(name, email,password)
    }
    return redirect("/register?msg=?Invalid Credentials")
}

export default function Register(){
    return(
        <div className="form-wrapper">
            <Form  method="post" className="register-form">
                <h2 className="form-header">Register now</h2>

                <label htmlFor="name">Name</label>
                <input type="text" name="name"></input>
                
                <label htmlFor="email">Email</label>
                <input type="email" name="email"></input>

                <label htmlFor="password">Password</label>
                <input type="password" name="password"></input>

                <button>Register</button>
            </Form>
        </div>
    )
}