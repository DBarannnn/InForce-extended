import { useLoaderData, redirect } from "react-router"
import { findById } from "../util/requests"
import "./UrlInfo.css"

interface LoaderParams {
  urlId: number
}

interface LoaderObject {
  id: number;
  originalUrl: string;
  shortenedUrl: string;
  createdAt: string;
}

export async function loader({ params }: {params: LoaderParams }) {
  const response = await findById(params.urlId)
  const data = response.data 

  if(response.status == 200){
    return data
  }

  return redirect(`/Url?msg=${data.msg}`)
}

export default function UrlInfo() {
  const requestedUrl = useLoaderData() as LoaderObject

  return (
    <div className="url-info-container">
      <h1 className="url-title">URL Information</h1>
      <p className="url-info">Original URL: {requestedUrl.originalUrl}</p>
      <p className="url-info">Shortened URL: {requestedUrl.shortenedUrl}</p>
      <p className="timestamp">Created at: {new Date(requestedUrl.createdAt).toString()}</p>
    </div>
  )
}
