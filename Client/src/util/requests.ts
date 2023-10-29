import axios, { AxiosError } from "axios";

const axionsInstance = axios.create({
  validateStatus: () => true,
  baseURL: "https://localhost:7154/api"
}
  )
  
interface User {
  id: number,
  email: string,
  password: string 
}

 const apiUrlPath  = "https://localhost:7154/api/Url"

export default async function getAllUrls(){
    const res = await axionsInstance.get("/Url")
    const data = await res.data;
    return data
}

export async function submitUrl(longUrl: string | null) {
    const res = await axionsInstance.post("/Url", longUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res
}


export async function findById(urlId : number){
        const res = await axionsInstance.get(`Url/${urlId}`)
        return res   
}

export async function deleteById(urlId : number){
    return await axionsInstance.delete(`/Url/delete/${urlId}`)
}

export async function findByShortenedUrl(shortenedUrl : string){
    const url = 'https://localhost:7154/api/Url/easy';
    const headers = {
      Accept: 'text/plain',
      shortenedUrl: `http://localhost:5173/easy/${shortenedUrl}`
    };
      const response = await axionsInstance.get("/Url/easy", { headers });
      return response
}

export async function register(name : string | null, email: string | null, password: string | null){
  const url = "/Auth/register"
  const body = JSON.stringify({
    name,
    email,
    password 
  })

  const headers = {
    'accept': '*/*',
    'Content-Type': 'application/json',
  };
  return await axionsInstance.post(url, body,{headers})
}

export async function login(email : string, password : string){
  const url = "/Auth/login"
  const body = JSON.stringify({
    email,
    password 
  })
  
  const headers = {
    'Content-Type': 'application/json',
  }

  const response = await axionsInstance.post(url, body, {headers})
  return response
}

export async function getCurrentUser(){
    return await axionsInstance.get("Auth/user")
}

export async function isUserAuthorized(){
  return (await getCurrentUser()).status == 200
}