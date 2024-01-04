import React, { PropsWithChildren, memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import { usePage, useCompiledMdx } from "./hooks";
import { HeaderPanel } from "./components";
import { getChildrenByTypeDeep } from "react-nanny";

import "./Page.styles.scss";

/**
 * Coverts a string to a valid HTML identifier.
 * 
 * @param source An object that can be converted to a string via a `toString()` method.
 * @returns A string representation of `source` that is also a valid HTML identifer.
 */
const toHtmlId: (source: {toString(): string}) => string = (source) =>
	source.
		toString()
		.toLowerCase()
		.replace(' ', '-');

const headerComponents = {
	h1: (() => {
		const H1 = props => {
			const target = toHtmlId(React.Children.toArray(props.children)[0]);

			return (
				<div id={target}>
					<h2 {...props} />
				</div>
			);
		}

		return memo(H1);
	})(),
	h2: (() => {
		const H2 = props => {
			const target = toHtmlId(React.Children.toArray(props.children)[0]);

			return (
				<div id={target}>
					<h3 {...props} />
				</div>
			);
		}

		return memo(H2);
	})(),
	h3: (() => {
		const H3 = props => {
			const target = toHtmlId(React.Children.toArray(props.children)[0]);

			return (
				<div id={target}>
					<h4 {...props} />
				</div>
			);
		}

		return memo(H3);
	})()
}

type ArticleContentProps = PropsWithChildren;

const ArticleContent: React.FC<ArticleContentProps> = ({ children }: ArticleContentProps) => {
	return (
		<div className="page-container">
			<div className="content article">
				{ children }
			</div>
		</div>
	);
}

type Heading = [type: string, target:string, displayText: string];
type PaperContentProps = PropsWithChildren<{
	headings: Heading[];
}>;

const PaperContent: React.FC<PaperContentProps> = ({ headings, children }: PaperContentProps) => {
	return (
		<div className="page-container">
			<div className="content paper">
				{ children }
			</div>
			<div className="sidebar">
				<div className="section">
					<div>Contents</div>
					<div>
						{headings.map(
							([type, target, displayText]) => 
								<div key={target} className={`toc-${type}`}>
									<a href={`#${target}`}>{displayText}</a>
								</div>)}
					</div>
				</div>
			</div>
		</div>
	);
}

export const Page: React.FC = () => {
	const { slug } = useParams();
	const page = usePage(slug);
	const Content = useCompiledMdx(page.body.code);
	const asPaper = page.renderType === "paper";
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
		[ Content, page ]);

	return (
		<main>
			<HeaderPanel title={page.title} />
			{asPaper
				? <PaperContent headings={headings}><Content components={headerComponents} /></PaperContent>
				: <ArticleContent><Content /></ArticleContent>}
		</main>
	);
}
