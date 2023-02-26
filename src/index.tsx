import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
/*import App from "./App";*/

const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
}

const app = <div style={styles}>
    <h1>
        你不配得到它
    </h1>
</div>

ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
    /*.render(<App />);*/
    .render(app);
