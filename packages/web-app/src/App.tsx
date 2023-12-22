import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { Home } from "./Home";
import { Page } from "./Page";

const browserRouter = createBrowserRouter(
	[
		{ path: "/pages/:slug", index: true, element: <Page /> },
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