import LoginForm from '@/components/auth/LoginForm';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/components/common/PageMetaData';

export const generateMetadata = (): Metadata => {
	return generatePageMetadata({
		title: 'Sign in - Millennia Trades',
		content: 'Sign in to access Millennia Trades admin dashboard',
		url: 'https://admin.millenniatrades.com',
	});
};

export default function Home() {
	return (
		<div className="flex h-screen items-center justify-center">
			<LoginForm />
		</div>
	);
}
