import React from "react";
import { PostSummary } from "../../../hooks";
import { CategoryLink } from "../../category-link";

import "./styles.scss";
import { Link } from "react-router-dom";
import { Icon } from "../../icon";

export type PostSummaryCardProps = {
  post: PostSummary
}

export const PostSummaryCard: React.FC<PostSummaryCardProps> = ({post}: PostSummaryCardProps) => (
  <div className="post-summary-container">
    <div className="header">
      {new Date(post.timeStamp).toLocaleDateString("en-US", {month: "short", day: "numeric", year: "numeric"})}
    </div>
    <Link to={`/posts/${post.slug}`} className="text-black">
    <div className={`summary ${post.hasThumbNail ? "col-span" : "col-span-2"}`}>
      
        <div className="title">{post.title}</div>
        {post.summary && <div className="text">{post.summary}</div>}
      
      <div className="footer">
        <div><Icon name="clock" size="large" /> {post.readTime}</div>
      </div>
      <div className="categories">
        {post.category.map(
          category => <CategoryLink key={category} slug={category} />
        )}
      </div>
    </div>
    </Link>
    {post.hasThumbNail && 
      <div className="thumbnail">
        <img src={`c/post/${post.slug}.png`} />
      </div>}
  </div>
);