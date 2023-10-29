import axios, { AxiosError } from "axios";
import { redirect } from "react-router";

// await axios({
//   method: "GET",
//   url: "https://example.com",
//   validateStatus: () => true,
// })



interface User {
  id: number,
  email: string,
  password: string 
}

const apiUrlPath  = "https://localhost:7154/api/Url"

export default async function getAllUrls(){
    const res = await axios.get(apiUrlPath)
    const data = await res.data;
    return data
}

export async function submitUrl(longUrl: string | null) {
  try {
    const res = await axios.post(apiUrlPath, longUrl, {
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
        const res = await axios.get(apiUrlPath+`/${urlId}`)    
        const data = await res.data
        return data
    }
    catch(ex){
        return redirect(`/url?msg=${ex.response.data.msg}`)
    }
}

export async function deleteById(urlId : number){
    await axios.delete(apiUrlPath+`/delete/${urlId}`)
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

export async function register(name : string | null, email: string | null, password: string | null){
  const url = "https://localhost:7154/api/Auth/register"
  const body = JSON.stringify({
    name,
    email,
    password 
  })

  const headers = {
    'accept': '*/*',
    'Content-Type': 'application/json',
  };

  await axios.post(url, body,{headers})
  return redirect("/login")
}

export async function login(email : string, password : string){
  const url = "https://localhost:7154/api/Auth/login"
  const body = JSON.stringify({
    email,
    password 
  })
  
  const headers = {
    'Content-Type': 'application/json',
  }

  const response = await axios.post(url, body, {headers, withCredentials: true, validateStatus: () => true})
  return response
}

export async function getCurrentUser(){

    const response = await axios.get("https://localhost:7154/api/Auth/user")
    if(response.status == 200){
      return response.data
    }
    return redirect("/register")

}

export async function isUserAuthorized(){
  try{
    const currentUser = await getCurrentUser()
    if(currentUser) return true
  }
  catch(ex){
    return false
  }
}