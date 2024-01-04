import { Page, allPages } from "content";
import posts from "content/posts.json";
import type { Post } from "content";
import { useEffect, useMemo, useState } from "react";

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

/**
 * Retrieves the top-most posted categories.
 * 
 * @param top The number of 'top-most' categories to return.
 * @returns An array of category strings representing the `top` categories with the most Posts.
 */
export function useTopPostedCategories(top: number):  [string, number][] {
	const rankedCategories = useMemo(
		() => {
			const counts = allPosts.reduce(
				(agg, post) => {
					for (const category of post.category) {
						agg[category] = (agg[category] ?? 0) + 1;
					}

					return agg;
				}, {});
			
			return Object
				.entries<number>(counts)
				.sort((a, b) => b[1] - a[1]);
		},
		[ allPosts ]);
	const topCategories = useMemo(
		() => rankedCategories.slice(0, top),
		[ rankedCategories, top ]
	);

	return topCategories;
}

export type PostSummary = Omit<Post, "_id" | "_raw" | "body" | "category"> & {
	category: string[];
}

export const allPosts: PostSummary[] = posts as any;

