import React from "react";
import { HeaderPanel, BrandIcon, Icon, PostSummaryCard, TopPostCategories } from "./components";
import { allPosts } from "./hooks";

import "./Home.styles.scss";
import { Link } from "react-router-dom";

export const Home: React.FC = () => (
	<main>
		<HeaderPanel
			headerElements={[
				<a href="https://www.linkedin.com/in/timjroberts" target="blank"><BrandIcon brand="linkedin" size="large" /></a>,
				<a href="https://github.com/timjroberts" target="blank"><BrandIcon brand="github" size="large" /></a>,
				<a href="https://x.com/timjroberts" target="blank"><BrandIcon brand="x-twitter" size="large" /></a>
			]} />
		<div className="home-container">
			<div className="posts">
				{allPosts.map(post => <PostSummaryCard key={post.slug} post={post} />)}
			</div>
			<div className="sidebar">
				<div className="section">
					<div>Most Posted Categories</div>
					<TopPostCategories top={6} />
				</div>
				<div className="section">
					<div>Reading List</div>
					<div>Click the <Icon name="paste" size="large" /> on any post to easily add it to your reading list.</div>
				</div>
				<div className="footnote">
					Copyright &copy; Tim Roberts. All rights reserved.
					<div><Link to={`/pages/terms-of-use`}>Terms of Use</Link></div>
				</div>
			</div>
		</div>
	</main>
);
