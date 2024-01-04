import React from "react";

import "./styles.scss";

export type IconProps = {
	name: "bookmark" | "paste" | "clock";
	size?: "small" | "large";
}

export const Icon: React.FC<IconProps> = ({ name, size }: IconProps) =>
	(<i className={`fa-regular fa-${name} icon-${size ?? "small"}`} />)
