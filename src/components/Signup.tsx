'use client';

import appWriteService from '@/appWrite/config';
import useAuth from '@/context/useAuth';
import Error from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

const Signup = () => {
	const router = useRouter();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: ''
	});
	const [error, setError] = useState('');
	const { setAuthStatus } = useAuth();
	const create = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const userData = await appWriteService.createUserAccount(
				formData
			);
			console.log(userData);

			if (userData) {
				setAuthStatus(true);
				router.push('/');
			}
		} catch (error) {
			const errorData = error as unknown as { message: string };
			setError(errorData?.message);
		}
	};

	return (
		<div>
			<h1>Signup</h1>
		</div>
	);
};

export default Signup;
