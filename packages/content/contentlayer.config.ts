import { ComputedFields, defineDocumentType, makeSource } from "contentlayer/source-files";

/**
 * Creates a computed field that contains the URL of a document.
 *
 * @returns A {@link ComputedFields} object that contains a `url` property describing the URL field.
 */
function createStandardFields(): ComputedFields {
	return {
		url: { type: "string", resolve: (document) => `/${document._raw.flattenedPath}` },
		slug: { type: "string", resolve: (document) => document._raw.sourceFileName.match(/^(?<slug>[A-Za-z0-9\\-]+).md/).groups["slug"] },
		fetchPath: { type: "string", resolve: document => `${document._raw.sourceFilePath.replace('/', "__")}.json` }
	}
}

export const Page = defineDocumentType(() => ({
	name: "Page",
	filePathPattern: "pages/**/*.mdx",
	contentType: "mdx",
	fields: {
		title: { type: "string", required: true  }
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
		title: { type: "string", required: true  }
	},
	computedFields: {
		...createStandardFields()
	}
}));

export default makeSource({
	contentDirPath: ".",
	documentTypes: [
		Page,
		Post
	],
	contentDirInclude: [ "pages", "posts" ],
	onSuccess: async (importData) => {
		const { allDocuments } = await importData();


		console.log(`Content items: ${allDocuments.length}`);
	},
	disableImportAliasWarning: true
});
