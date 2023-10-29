import "./Table.css"
import { useState } from "react";
import {Form, Link, redirect, useLoaderData, useRevalidator} from "react-router-dom"
import getAllUrls, { deleteById, getCurrentUser, isUserAuthorized, submitUrl } from "../util/requests"

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
        return redirect("/url");
    } catch (ex) {
        return redirect(`/url?msg=${ex}`);
    }
}

export async function loader({ request }: { request: Request }) {
    const msg = new URL(request.url).searchParams.get("msg");
    const urlsData = await getAllUrls(); // Implement this function to fetch URLs from your server
    return { urls: urlsData, msg: msg || "" };
}

export default function Table(){
    const revalidator = useRevalidator()
    const loaderData  = useLoaderData() as LoaderObject
    const urlElements = loaderData.urls.map(e => {
        return(
            <div key={e.id} className="url-container">
                <div>
                    <p className="url-text">Long url: <Link  className="url" to={e.originalUrl}>{e.originalUrl}</Link></p>
                    <p className="url-text">Short url: <Link className="url" to={e.shortenedUrl}>{e.shortenedUrl}</Link></p>
                </div>
                <div className="btn-container">
                    <Link to={`/url/${e.id}`} className="info-btn">Info</Link>
                    <button  className="delete-btn" onClick={async () => { 
                        await deleteById(e.id)
                        if (revalidator.state === "idle") {
                            revalidator.revalidate();
                          }
                         }}
                    >Delete</button>

                </div>
                <hr className="url-separator"/>
            </div>
        )
    })

    return(
        <>  

            <section className="table-section">
                <h2>Add new URL</h2>
                <p className="info">Paste Your Long URL: Copy the long URL you want to shorten
                (e.g., "https://www.example.com/page/subpage/long-url-name") and paste it into the provided input field.
                Click "Shorten": After pasting the long URL, click the "Shorten" button. Our app will generate a shorter
                version of your link. Shortened link will be displayed on the table, copy it.Share the Shortened Link: You can now
                share the shortened link with others. It's perfect for social media, emails, or any place where space is
                limited.</p>
                {loaderData.msg && <p className="error-msg">{loaderData.msg}</p> }
                <Form 
                method="post"
                className="add-url-form"
                >
                    <input type="text" name="longUrl" placeholder="Paste Your Long URL" className="url-input"></input>
                    <button type="submit" id="shorten-btn">Shorten</button>
                </Form>
            </section>

            <section className="table-section">
                <h2>Listed URLS:</h2>
                {urlElements}
            </section>


        </>
    )
}