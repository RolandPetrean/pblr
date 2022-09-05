import "./main.css"
import "./Autentificare.css"
import { createStore } from 'solid-js/store'
import { apiInregistrare, apiLogin, getToken } from "../utils"
import { useNavigate } from "@solidjs/router"

export default function Autentificare() {
  const navigate = useNavigate()
  const token = getToken()
  if (token) {
    navigate("/", {replace: true})
    return
  }

  const [createFields, setCreateFields] = createStore()
  const [loginFields, setLoginFields] = createStore()

  async function inregistrare(e) {
    e.preventDefault()
    console.log(createFields)
    console.log(createFields.nume)
    let resp = await apiInregistrare(createFields.nume, createFields.email, createFields.parola)
    if (resp.status == 400) {
      alert("Contul există deja")
    } else if (resp.status != 200) {
      alert("Am întâmpinat o eroare la înregistrare")
    } else {
      navigate("/")
    }
  }

  async function login(e) {
    e.preventDefault()
    let resp = await apiLogin(loginFields.nume, loginFields.parola)
    if (resp.status == 404) alert("Contul nu există")
    else if (resp.status == 401) alert("Parola este incorectă")
    else if (resp.status != 200) alert("Am întâmpinat o eroare la login") 
    else navigate("/")
  }

  return <>
    <h1 class="centered title">Problemele lu' Roland</h1>
    <h2 class="centered subtitle">&lt;Autentificare&gt;</h2>
    <div class="split right">
      <div class="centered">
        <form onSubmit={inregistrare}>
          <p class="centered">Înregistrare</p>
          <p class="field">Numele tău</p>
          <input onInput={(e) => setCreateFields("nume", e.target.value)} name="nume" type="name" placeholder="johndoe" required />
          <br/>
          <p class="field">Email-ul tău</p>
          <input onInput={(e) => setCreateFields("email", e.target.value)} name="email" type="email" placeholder="john.doe@gmail.com" required />
          <br/>
          <p class="field">Parola ta</p>
          <input onInput={(e) => setCreateFields("parola", e.target.value)} name="parola" type="password" placeholder="password123" required />
          <br/>
          <br/>
          <button type="submit">Creează contul :)</button>     
        </form>
      </div>
    </div>
    <div class="split left">
      <div class="centered">
        <form onSubmit={login}>
          <p class="centered">Login</p>
          <p class="field">Numele tău</p>
          <input onInput={(e) => setLoginFields("nume", e.target.value)} name="nume" type="name" placeholder="johndoe" required />
          <br/>
          <p class="field">Parola ta</p>
          <input onInput={(e) => setLoginFields("parola", e.target.value)} name="parola" type="password" placeholder="password123" required />
          <br/>
          <p class="field">Simetrie</p>
          <input name="symmetry" placeholder="Îmi place simetria" />
          <br/>
          <br/>
          <button type="submit">Intră în cont</button>     
        </form>
      </div>
    </div>
  </>
}
