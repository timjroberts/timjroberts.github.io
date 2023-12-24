import React from "react";
import { useParams } from "react-router-dom";
import { useAsyncPost, useMdxComponent } from "./hooks";

export const Post: React.FC = () => {
	const { slug } = useParams();
	const [ err, postMdx ] = useAsyncPost(slug);
	const Content = useMdxComponent(postMdx?.body?.code);

	return (
		<main>
			{ postMdx ? <Content /> : <span>Loading...</span> }
		</main>
	);
}
