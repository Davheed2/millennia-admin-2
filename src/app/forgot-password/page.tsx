import ForgotPasswordPage from '@/components/auth/ForgotPassword';
import { generatePageMetadata } from '@/components/common/PageMetaData';
import { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
	return generatePageMetadata({
		title: 'Forgot Password - Alpsector',
		content: 'Reset your password. Follow the instructions on this page to get your account back!',
		url: 'https://admin.alpsector.com/forgot-password',
	});
};

export default function ForgotPassword() {
	return (
		<div className="flex h-screen items-center justify-center">
			<ForgotPasswordPage />
		</div>
	);
}
