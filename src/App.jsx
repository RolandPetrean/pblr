import { lazy } from "solid-js";
import { Routes, Route } from "@solidjs/router"
const Acasa = lazy(() => import("./pages/Acasa"));
const Autentificare = lazy(() => import("./pages/Autentificare"));

export default function App() {
  return <>
    <Routes>
      <Route path="/" component={Acasa} />
      <Route path="/auth" component={Autentificare} />
    </Routes>
  </>
}