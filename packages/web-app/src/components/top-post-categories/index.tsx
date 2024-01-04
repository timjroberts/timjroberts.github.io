import React, { useMemo } from "react";
import { useTopPostedCategories } from "../../hooks";

import "./styles.scss";
import { CategoryLink } from "../category-link";

export type TopPostCategoriesProps = {
  top: number;
}

export const TopPostCategories: React.FC<TopPostCategoriesProps> = ({ top }: TopPostCategoriesProps) => {
  const categories = useTopPostedCategories(top);

  return (
    <div className="top-post-categories-container">
      {categories.map(category => <CategoryLink key={category[0]} slug={category[0]} count={category[1]} />)}
    </div>
  );
}