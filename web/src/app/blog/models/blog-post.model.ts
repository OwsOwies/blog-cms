export type BlogPostId = string;

export interface BlogPost {
	id: BlogPostId;
	date: Date;
	content: string;
}
