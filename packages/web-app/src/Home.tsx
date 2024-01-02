import React from "react";
import imgUrl from "/assets/head-thought.png";
import { TypingDots, HeaderPanel } from "./components";

export const Home: React.FC = () => (
	<main>
		<HeaderPanel />
	 	<div>Hello World</div>
		<img src={imgUrl} />

		<TypingDots />
	</main>
);
