import React from "react";
import imgUrl from "/assets/favicon-32x32.png";

import "./styles.scss";

export type HeaderPanelProps = {
	title?: string;
	headerElements?: React.ReactElement[];
}

export const HeaderPanel: React.FC<HeaderPanelProps> = ({ title, headerElements }: HeaderPanelProps) => {
	return (
		<div className="container">
			<div className="header">
				<span className="left"><img src={imgUrl} /></span>
				{title && <span className="title">{title}</span>}
				{headerElements &&
					headerElements.map((c, i) => <span key={i} className="float-right">{c}</span>)}
			</div>
		</div>
	);
}

