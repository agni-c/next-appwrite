import conf from '@/conf/config';
import { Client, Account, ID } from 'appwrite';

type CreateUserAccount = {
	email: string;
	password: string;
	name: string;
};
type LoginUserAccount = {
	email: string;
	password: string;
};

const appwriteClient = new Client();

appwriteClient
	.setEndpoint(conf.appWriteUrl)
	.setProject(conf.appWriteProjectId);

export const account = new Account(appwriteClient);

export class AppwriteService {
	async createUserAccount({
		name,
		email,
		password
	}: CreateUserAccount) {
		try {
			const userAccount = await account.create(
				ID.unique(),
				email,
				password,
				name
			);
			if (userAccount) {
				return this.login({ email, password });
			} else {
				throw userAccount;
			}
		} catch (error) {
			throw error;
		}
	}
	async login({ email, password }: LoginUserAccount) {
		try {
			const session = await account.createEmailPasswordSession(
				email,
				password
			);
			return session;
		} catch (error) {
			throw error;
		}
	}
	async isLoggedIn(): Promise<boolean> {
		try {
			const data = await this.getCurrentUser();
			return Boolean(data);
		} catch (error) {
			console.log(error);
		}
		return false;
	}
	async getCurrentUser() {
		try {
			return account.get();
		} catch (error) {
			console.log('getCurrentUser: ', error);
		}
	}
	async logout() {
		try {
			await account.deleteSession('current');
		} catch (error) {
			console.log('logout error:', error);
		}
	}
}

const appWriteService = new AppwriteService();

export default appWriteService;
