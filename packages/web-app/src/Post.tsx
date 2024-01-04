import React from "react";
import { useParams } from "react-router-dom";
import { useAsyncPost, useCompiledMdx } from "./hooks";

export const Post: React.FC = () => {
	const { slug } = useParams();
	const [ err, post ] = useAsyncPost(slug);
	const Content = useCompiledMdx(post?.body?.code);

	return (
		<main>
			{ post ? <Content /> : <span>Loading...</span> }
		</main>
	);
}
