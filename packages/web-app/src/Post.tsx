import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAsyncPost, useCompiledMdx } from "./hooks";
import { HeaderPanel, TypingDots } from "./components";
import { getChildrenByTypeDeep } from "react-nanny";
import Giscus from "@giscus/react";
import { toHtmlId, Heading, ArticleContent, PaperContent, pageComponents } from "./Page";

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
			{!post && <div className="page-loading"><div><TypingDots /></div></div>}
			{post && 
				<React.Fragment>
					{asPaper
						? <PaperContent headings={headings}><Content components={pageComponents} /></PaperContent>
						: <ArticleContent><Content components={pageComponents} /></ArticleContent>
					}
					<div className="comments-container container">
						<Giscus
							repo="timjroberts/timjroberts.github.io"
							repoId="R_kgDOK3UPSg"
							category="Announcements"
							categoryId="DIC_kwDOK3UPSs4CdB1J"
							mapping="pathname"
							strict="0"
							reactionsEnabled="1"
							emitMetadata="0"
							inputPosition="top"
							theme="light"
							lang="en"
							loading="lazy" />
					</div>
				</React.Fragment>}
		</main>
		
	);
}
