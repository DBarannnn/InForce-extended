import { useLoaderData } from "react-router"
import { findById } from "../util/requests"
import "./UrlInfo.css"

interface LoaderParams{
    urlId: number
}

interface LoaderObject {
    id: number;
    originalUrl: string;
    shortenedUrl: string;
    createdAt: string;
  }
  

export async function loader({request, params} : {request : Request, params : LoaderParams}){
    const requestedUrl  = await findById(params.urlId)
    
    return requestedUrl
}

export default function UrlInfo(){
    const requestedUrl  = useLoaderData() as LoaderObject
    
    return(
        <>
        <p>Original url: {requestedUrl.originalUrl}</p>
        <p>Shortened url: {requestedUrl.shortenedUrl}</p>
        <p>Created at: {new Date(requestedUrl.createdAt).toString()}</p>
        </>

    )
}