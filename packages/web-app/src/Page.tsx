import React from "react";
import { useParams } from "react-router-dom";
import { usePage, useCompiledMdx } from "./hooks";
import { HeaderPanel } from "./components";

export const Page: React.FC = () => {
	const { slug } = useParams();
	const page = usePage(slug);
	const Content = useCompiledMdx(page.body.code);

	return (
		<main>
			<HeaderPanel 
				title={page.title} 
				headerElements={[
					<><i className="fa-regular fa-clock" /> 2 mins</>
				]} />
			<Content />
		</main>
	);
}
