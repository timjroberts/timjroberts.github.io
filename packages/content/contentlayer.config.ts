import { ComputedFields, defineDocumentType, makeSource } from "contentlayer/source-files";
import { readFileSync, writeFileSync } from "node:fs";
import readTime from "reading-time";

/**
 * Creates a computed field that contains the URL of a document.
 *
 * @returns A {@link ComputedFields} object that contains a `url` property describing the URL field.
 */
function createStandardFields(): ComputedFields {
	return {
		url: { type: "string", resolve: (document) => `/${document._raw.flattenedPath}` },
		slug: { type: "string", resolve: (document) => document._raw.sourceFileName.match(/^(?<slug>[A-Za-z0-9\\-]+).md/).groups["slug"] }
	}
}

export const Page = defineDocumentType(() => ({
	name: "Page",
	filePathPattern: "pages/**/*.mdx",
	contentType: "mdx",
	fields: {
		title: { type: "string", required: true  },
		renderType: { type: "enum", options: [ "article", "paper" ], default: "article" }
	},
	computedFields: {
		...createStandardFields()
	}
}));


export const Post = defineDocumentType(() => ({
	name: "Post",
	filePathPattern: "posts/**/*.mdx",
	contentType: "mdx",
	fields: {
		title: { type: "string", required: true },
		renderType: { type: "enum", options: [ "article", "paper" ], default: "article" },
		date: { type: "string", required: true },
		summary: { type: "string", required: false, default: null },
		category: { type: "string", required: false, default: "general" }
	},
	computedFields: {
		...createStandardFields(),	
		fetchPath: { type: "string", resolve: document => `/c/post/${document._raw.sourceFilePath.replace('/', "__")}.json` },
		timeStamp: { type: "number", resolve: document => Date.parse(document.date) },
		readTime: { type: "string", resolve: document => readTime(document.body.raw).text }
	}
}));

export default makeSource({
	contentDirPath: ".",
	documentTypes: [
		Page,
		Post
	],
	contentDirInclude: [ "pages", "posts" ],
	onSuccess: async () => {
		const index = JSON.parse(
			readFileSync(
				`${process.cwd()}/.contentlayer/generated/Post/_index.json`, 
				{ encoding: "utf8" }));

		for (const idxItem of index) {
			delete idxItem.body;
			delete idxItem._id;
			delete idxItem._raw;

			// Replace the string based category names with an array.
			idxItem["category"] = idxItem["category"].split(',').map((c: string) => c.trim());
		}

		// Sort the posts to chronological order based on their time stamps.
		index.sort((a, b) => b.timeStamp - a.timeStamp);

		writeFileSync(
			`${process.cwd()}/.contentlayer/generated/posts.json`, 
			JSON.stringify(index, undefined, 2), 
			{ encoding: "utf8"});
	},
	disableImportAliasWarning: true
});
