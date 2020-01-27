export type BlogPostId = string;

export interface BlogPost {
	id: BlogPostId;
	date: string;
	content: string;
}
