import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ReactModal from "react-modal";
import App from "./App";
import "./App.css";

ReactModal.setAppElement("#root");

const rootElement = document.getElementById("root");
if (rootElement) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	);
}
