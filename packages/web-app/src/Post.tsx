import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAsyncPost, useCompiledMdx } from "./hooks";
import { HeaderPanel } from "./components";
import { getChildrenByTypeDeep } from "react-nanny";
import { toHtmlId, Heading, ArticleContent, PaperContent, headerComponents } from "./Page";

import "./Page.styles.scss";

export const Post: React.FC = () => {
	const { slug } = useParams();
	const [ err, post ] = useAsyncPost(slug);
	const Content = useCompiledMdx(post?.body?.code);
	const asPaper = (post?.renderType ?? "article") === "paper";
	const headings = useMemo(
		() => asPaper
					? getChildrenByTypeDeep(
							Content({}), ["h1", "h2", "h3"])
								.map((child: any) => ([
									child.type,
									toHtmlId(React.Children.toArray(child.props.children)[0]),
									React.Children.toArray(child.props.children)[0].toString()
								] as Heading))
					: [],
		[ Content, post ]);

	return (
		<main>
			<HeaderPanel title={post?.title} />
			{!post && <div>Loading...</div>}
			{post && 
				(asPaper
					? <PaperContent headings={headings}><Content components={headerComponents} /></PaperContent>
					: <ArticleContent><Content components={headerComponents} /></ArticleContent>
				)}
		</main>
	);
}
