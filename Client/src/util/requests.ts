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
        const res = await axios.post(apiPath, {
            "longUrl" : longUrl})
        
        const data = await res.data
        return data
    }
    catch(ex){
        redirect(`/url?msg=${ex.response.data.msg}`)
    }
}