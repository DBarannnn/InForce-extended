import { Form, redirect } from "react-router-dom"
import "./Login.css"
import { login, register } from "../util/requests"

export async function action({request} : {request : Request}){
    const formData = await request.formData()
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    console.log("before req")
    const response = await login(email,password)
    if(response.status == 200){
        console.log("after req")
        return redirect("/Url")
    }
    return redirect("/login?msg=Invalid credentials")
}

export default function Login(){
    return(
        <div className="form-wrapper">
            <Form  method="post" className="register-form">
                
                <label htmlFor="email">Email</label>
                <input type="email" name="email"></input>

                <label htmlFor="password">Password</label>
                <input type="password" name="password"></input>

                <button>Submit</button>
            </Form>
        </div>
    )
}