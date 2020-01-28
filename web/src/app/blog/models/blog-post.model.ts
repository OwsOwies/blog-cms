export type BlogPostId = number;

export interface BlogPost {
	ID: BlogPostId;
	date: Date;
	content: string;
}
