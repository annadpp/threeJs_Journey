import "./style.css";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const root = createRoot(document.querySelector("#root"));

root.render(
  <div>
    <App clickersCount={3}>
      <h1>My first React app</h1>
      <h3>and a fancy subtitle</h3>
    </App>
  </div>
);
