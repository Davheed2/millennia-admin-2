'use client';

import { Success } from '@/components/common';
import AuthLayout from '@/app/auth/layout';
import Link from 'next/link';
import { Button } from '../ui/button';

const ResetPasswordSuccessPage = () => {
	return (
		<AuthLayout
			withHeader={false}
			heading=""
			greeting=""
		>
			<Success
				classNames={{
					description: 'text-gray-600 text-sm',
				}}
				description="Password Reset Successful"
			>
				<Button className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] hover:cursor-pointer text-white font-semibold py-5 rounded">
					<Link href="/">Sign in to continue</Link>
				</Button>
			</Success>
		</AuthLayout>
	);
};

export default ResetPasswordSuccessPage;
