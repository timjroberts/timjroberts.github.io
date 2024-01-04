import React from "react";
import { Link } from "react-router-dom";

import "./styles.scss";

export type CategoryLinkProps = {
	slug: string;
  count?: number;
}

export const CategoryLink: React.FC<CategoryLinkProps> = ({ slug, count }: CategoryLinkProps) => (
  <span className="category-link-container">
    <Link to={`/categories/${slug}`} className="text-black">{slug}</Link>
    {(count ?? 0) > 0 && <span className="count">{count}</span>}
  </span>
);
