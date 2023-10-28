import { redirect } from "react-router"
import { findByShortenedUrl } from "../util/requests"

interface LoaderParams{
    shortenedUrl: string
}

export async function loader({request, params} : {request : Request, params : LoaderParams}){
    const redirectLink = await findByShortenedUrl(params.shortenedUrl)
    return redirect(redirectLink)
}

