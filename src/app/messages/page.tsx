import AdminMessages from '@/components/dashboard/Messages';
import DashboardLayout from '../dashboard/layout';
import { generatePageMetadata } from '@/components/common/PageMetaData';
import { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
	return generatePageMetadata({
		title: 'Messages - Millennia Trades',
		content: 'View and respond to user messages as a customer care in Millennia Trades Dashboard',
		url: 'https://admin.millenniatrades.com/messages',
	});
};

export default function Users() {
	return (
		<DashboardLayout heading="Messages">
			<div className="mb-5">
				<div className="flex items-center justify-center">
					<AdminMessages />
				</div>
			</div>
		</DashboardLayout>
	);
}
