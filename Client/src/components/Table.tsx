import "./Table.css"
import {Form, redirect, useLoaderData} from "react-router-dom"
import axios from "axios"
import getAllUrls, { submitUrl } from "../util/requests"

interface loaderObject{
    id: number,
    originalUrl: string,
    shortenedUrl: string,
    createdAt: Date,
    msg: string | null
}

export async function action({ request }: { request: Request }) {
    let msg = ""
    try{
        const formData = await request.formData();
        const longUrl = formData.get("longUrl")?.toString() as string;
        console.log("before check")
        if(!longUrl){
            throw new Error("Url can`t be empty")
        }
        const resp = await submitUrl(longUrl);
        return redirect("/");
    }
    catch(ex){
        return(redirect(`/?msg=${ex}`))
    }
}


export async function loader({request} : {request : Request}){
    const msg =  await new URL(request.url).searchParams.get("msg")
    const urlsData = await getAllUrls()
    return {...urlsData, msg: msg || ""}
}

export default function Table(){
    const loaderData  = useLoaderData() as loaderObject
    return(
        <>
           
            <section className="table-section">
                <h2>Add new URL</h2>
               
                {loaderData.msg && <p className="error-msg">{loaderData.msg}</p> }
                <Form 
                method="post"
                className="add-url-form"
                >
                    <input type="text" name="longUrl" placeholder="Paste Your Long URL" className="url-input"></input>
                    <button type="submit" className="shorten-btn">Shorten</button>
                </Form>
            </section>

            <section className="table-section">
                <h2>Listed URLS:</h2>
                <p>Urls should go here</p>
                {/*
                    Load data from Server and put here Every item should have link on details
                    ensure deletion made by user that has rights to
                */}
                
            </section>

        </>
    )
}