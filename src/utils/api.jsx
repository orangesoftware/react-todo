
const getHeaders = () => {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
  }
}

export const get = async (url) => {
  let options = {
    method: "GET",
    headers: getHeaders()
  }

  const response = await fetch(url, options);  
  return response;
}

export const post = async (url, data) => {  
  let options = {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data)
  }
  const response = await fetch(url, options);
  return response;
}

export const deleteReq = async (url) => {  
  let options = {
    method: "DELETE",
    headers: getHeaders(),    
  }
  const response = await fetch(url, options);
  return response;
}
