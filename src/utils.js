import jwt_decode from 'jwt-decode'

const BASE = "http://127.0.0.1:3000/" // Change in production

export function setToken(value) {
  return localStorage.setItem("token", value)
}

async function setTokenFromResp(resp) {
  if (resp.status == 200) {
    const json = await resp.json()
    if (json["token"]) setToken(json["token"])
  } else if (resp.status == 401) {
    setToken("")
    window.location.reload()
  }
}

export function getToken() {
  const token = localStorage.getItem("token")
  if (!token) return null
  return jwt_decode(token)
}

export async function apiInregistrare(nume, email, parola) {
  const resp = await fetch(BASE + "utilizatori", {
    method: "POST",
    body: "{\"nume\":\"" + nume + "\",\"email\":\"" + email + "\",\"parola\":\"" + parola + "\"}",
  })
  await setTokenFromResp(resp)
  return resp
}

export async function apiLogin(nume, parola) {
  const resp = await fetch(BASE + "utilizatori", {
    method: "PUT",
    body: "{\"nume\":\"" + nume + "\",\"parola\":\"" + parola + "\"}",
  })
  await setTokenFromResp(resp)
  return resp
}