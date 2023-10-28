import axios, { AxiosError } from "axios";
import { redirect } from "react-router";


const apiPath  = "https://localhost:7154/api/Url"

export default async function getAllUrls(){
    const res = await axios.get(apiPath)
    const data = await res.data;
    return data
}

import axios from 'axios';

export async function submitUrl(longUrl: string | null) {
  try {
    const res = await axios.post(apiPath, longUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.data;
    return data;
  } catch (ex) {
    throw new Error(ex.response.data.msg);
  }
}


export async function findById(urlId : number){
    try{
        const res = await axios.get(apiPath+`/${urlId}`)    
        const data = await res.data
        return data
    }
    catch(ex){
        return redirect(`/url?msg=${ex.response.data.msg}`)
    }
}

export async function deleteById(urlId : number){
    await axios.delete(apiPath+`/delete/${urlId}`)
}

export async function findByShortenedUrl(shortenedUrl : string){
    const url = 'https://localhost:7154/api/Url/easy';
    const headers = {
      Accept: 'text/plain',
      shortenedUrl: `http://localhost:5173/easy/${shortenedUrl}`
    };
  
    try {
      const response = await axios.get(url, { headers });
      const data = response.data;
      return data
    } catch (error) {
      return `http://localhost:5173/Url?msg=No such short url`
    }

}