import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { Home } from "./Home";
import { Page } from "./Page";
import { Post } from "./Post";

import "./App.styles.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

const browserRouter = createBrowserRouter(
	[
		{ path: "/pages/:slug", index: true, element: <Page /> },
		{ path: "/posts/:slug", index: true, element: <Post /> },
		{ path: "/", index: true, element: <Home /> }
	],
	{ basename: import.meta["BASE_URL"] }
);

const App: React.FC = () => (
	<StrictMode>
		<RouterProvider router={browserRouter} />
	</StrictMode>
);

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
