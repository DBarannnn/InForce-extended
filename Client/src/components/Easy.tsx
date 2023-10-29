import { redirect } from "react-router"
import { findByShortenedUrl } from "../util/requests"

interface LoaderParams{
    shortenedUrl: string
}

export async function loader({request, params} : {request : Request, params : LoaderParams}){
    const response = await findByShortenedUrl(params.shortenedUrl)
    const data = response.data
    
    if(response.status == 200){
        return redirect(data)
    }
    return redirect(`/Url?msg=${data.msg}`)
}

