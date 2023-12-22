import { Page, allPages } from "content";

export function usePage(slug: string): Page {
	const page = allPages.find(page => page.slug === slug);

	if (!page) throw new Error(`No page could be found with slug '${slug}'.`);

	return page;
}
