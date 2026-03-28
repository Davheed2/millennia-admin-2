import LoginForm from '@/components/auth/LoginForm';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/components/common/PageMetaData';

export const generateMetadata = (): Metadata => {
	return generatePageMetadata({
		title: 'Sign in - Alpsector',
		content: 'Sign in to access Alpsector admin dashboard',
		url: 'https://admin.alpsector.com',
	});
};

export default function Home() {
	return (
		<div className="flex h-screen items-center justify-center">
			<LoginForm />
		</div>
	);
}
