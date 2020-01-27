import { List } from 'immutable';
import { RegistrationValues } from 'src/app/auth/models';
import { BlogPost } from 'src/app/blog/models';

/** User JSON shape returned from API */
export interface UserRaw extends RegistrationValues {
	isAdmin: boolean;
	posts: BlogPost[];
}

export class User {
	private constructor(
		public readonly bio: string,
		public readonly contact: string,
		public readonly isAdmin: boolean,
		public readonly visibleName: string,
		public readonly login: string,
		public readonly posts: List<BlogPost>,
	) {}

	public static parse(raw: UserRaw): User {
		return new User(raw.bio, raw.contact, raw.isAdmin, raw.visibleName, raw.login, List(raw.posts));
	}
}
