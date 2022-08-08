import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { App, Room } from "./Components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "./Context/GameProvider";
import "./styles/index.css";
import {config} from 'dotenv';
const rootElement = document.querySelector<HTMLDivElement>("#App")!;
ReactDOM.createRoot(rootElement).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route
					path="/room/:roomId"
					element={
						<GameProvider>
							<Room />
						</GameProvider>
					}
				/>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
