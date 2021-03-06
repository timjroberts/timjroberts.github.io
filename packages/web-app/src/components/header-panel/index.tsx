import React from "react";
import imgUrl from "/assets/favicon-32x32.png";

import "./styles.scss";
import { Link } from "react-router-dom";

export type HeaderPanelProps = {
	title?: string;
	headerElements?: React.ReactElement[];
}

export const HeaderPanel: React.FC<HeaderPanelProps> = ({ title, headerElements }: HeaderPanelProps) => {
	return (
		<div className="header-container">
			<div className="header header-f-container">
				<span className="left"><Link to="/"><img src={imgUrl} /></Link></span>
				{title && <span className="title">{title}</span>}
				{headerElements &&
					<span className="float-right header-f-container">
						{headerElements.map(
							(c, i) => <span key={i}>{c}</span>)}
					</span>}
			</div>
		</div>
	);
}

