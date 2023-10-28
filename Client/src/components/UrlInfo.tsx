import "./UrlInfo.css"

interface LoaderParams{
    urlId: number
}

export function loader({request, params} : {request : Request, params : LoaderParams}){
    console.log(params.urlId)
    return null
}

export default function UrlInfo(){
    return(
        <p>UrlInfo here</p>
    )
}