import axios from "axios";

const apiPath  = "https://localhost:7154/api/Url"

export default async function getAllUrls(){
    const res = await axios.get(apiPath)
    const data = await res.data;
    return data
}

export async function submitUrl(longUrl: string|null){
    try{
        const res = await axios.post(apiPath, {
            "longUrl" : longUrl})
        const data = await res.data
        return data
    }
    catch(ex){
        throw new Error("Url already exists or invalid URL")
    }
   
   
}