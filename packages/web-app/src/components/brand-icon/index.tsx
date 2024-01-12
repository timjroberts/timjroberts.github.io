import React from "react";

import "./styles.scss";

export type BrandIconProps = {
	brand: "github" | "x-twitter" | "linkedin" | "facebook";
	size?: "small" | "large";
}

export const BrandIcon: React.FC<BrandIconProps> = ({ brand, size }: BrandIconProps) =>
	(<i className={`fa-brands fa-${brand} brand-icon-${size ?? "small"}`} />)
