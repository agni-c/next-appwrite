const conf = {
	appWriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
	appWriteProjectId: String(
		process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
	)
};

export default conf;
