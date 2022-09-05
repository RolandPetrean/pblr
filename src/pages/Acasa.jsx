import "./main.css"
import "./Acasa.css"
import { useNavigate } from "@solidjs/router";
import { getToken, setToken } from "../utils"

export default function Acasa() {
  const navigate = useNavigate()
  const token = getToken()
  if (!token) {
    navigate("/auth", { replace: true })
    return
  }

  function logout() {
    setToken("")
    window.location.reload()
  }

  return <>
    <h1 class="centered title">Problemele lu' Roland</h1>
    <span class="centered profile">
      <a href="/utilizatori/nume">{token.data}</a>
      <p>&nbsp;|&nbsp;</p>
      <a onClick={logout} href="/auth">logout</a>
    </span>
    <h2 class="centered subtitle">&lt;Problemset&gt;</h2>
  </>
}