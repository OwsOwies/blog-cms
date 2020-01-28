import { RegistrationValues } from 'src/app/auth/models';

/** User JSON shape returned from API */
export interface UserRaw extends RegistrationValues {
	ID: number;
	isAdmin: boolean;
}

export class User {
	public constructor(
		public readonly ID: number,
		public readonly bio: string,
		public readonly contact: string,
		public readonly isAdmin: boolean,
		public readonly visibleName: string,
		public readonly login: string,
	) {}

	public static parse(raw: UserRaw): User {
		return new User(raw.ID, raw.bio, raw.contact, raw.isAdmin, raw.visibleName, raw.login);
	}
}
