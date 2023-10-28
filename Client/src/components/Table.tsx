import "./Table.css"
import {Form, Link, redirect, useLoaderData} from "react-router-dom"
import axios from "axios"
import getAllUrls, { submitUrl } from "../util/requests"

interface UrlObject {
    id: number;
    originalUrl: string;
    shortenedUrl: string;
    createdAt: string; // Change to string as you are using ISO date strings
}

interface LoaderObject {
    urls: UrlObject[];
    msg: string | null;
}

export async function action({ request }: { request: Request }) {
    try {
        const formData = await request.formData();
        const longUrl = formData.get("longUrl")?.toString() as string;
        if (!longUrl) {
            throw new Error("Url can't be empty");
        }
        const resp = await submitUrl(longUrl);
        return redirect("/");
    } catch (ex) {
        return redirect(`/?msg=${ex}`);
    }
}

export async function loader({ request }: { request: Request }) {
    const msg = new URL(request.url).searchParams.get("msg");
    const urlsData = await getAllUrls(); // Implement this function to fetch URLs from your server
    return { urls: urlsData, msg: msg || "" };
}

export default function Table(){
    const loaderData  = useLoaderData() as LoaderObject
    const urlElements = loaderData.urls.map(e => {
        return(
            <div key={e.id} className="url-container">
                <div>
                    <p>Long url: {e.originalUrl}</p>
                    <p>Short url: {e.shortenedUrl}</p>
                </div>
                <div className="btn-container">
                    <Link to={`/url/${e.id}`} className="info-btn">Info</Link>
                    <Link to={`url/delete/${e.id}`} className="delete-btn">Delete</Link>
                </div>
                <hr className="url-separator"/>
            </div>
        )
    })

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
                {urlElements}
            </section>

        </>
    )
}