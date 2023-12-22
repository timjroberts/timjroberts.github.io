import React from "react";
import { useParams } from "react-router-dom";
import { usePage, useRawMdx } from "./hooks";

export const Page: React.FC = () => {
	const { slug } = useParams();
	const page = usePage(slug);
	const Content = useRawMdx(page.body.code);

	return (
		<main>
			<h1>{ page.title }</h1>
			<Content />
		</main>
	);
}
