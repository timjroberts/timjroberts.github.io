import { Page, allPages } from "content";
import type { Post } from "content";
import { useEffect, useState } from "react";

export function usePage(slug: string): Page {
	const page = allPages.find(page => page.slug === slug);

	if (!page) throw new Error(`No page could be found with slug '${slug}'.`);

	return page;
}

export function useAsyncPost(slug: string): [ Error | null, Post ] {
	const [ post, setPost ] = useState<Post>(undefined);
	const [ err, setErr ] = useState<Error | null>(null);
	const fetchPost = async () => {
		try {
			const resp = await fetch(`/c/post/posts__${slug}.mdx.json`);

			if (!resp.ok) return setErr(new Error("Unexpected network error."));

			setPost(await resp.json());
		}
		catch(respErr) {
			setErr(respErr);
		}
	}	
	
	useEffect(() => {
		if (post || err) return;

		fetchPost();
	}, [slug]);

	return [ err, post ];
}

