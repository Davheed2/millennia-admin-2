import { DataTable } from '@/components/dashboard/Users';
import DashboardLayout from '../dashboard/layout';
import { generatePageMetadata } from '@/components/common/PageMetaData';
import { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
	return generatePageMetadata({
		title: 'Users - Millennia Trades',
		content: 'View and manage user accounts in Millennia Trades Dashboard',
		url: 'https://admin.milleniatrades.com/users',
	});
};

export default function Users() {
	return (
		<DashboardLayout heading="Users">
			<div className="mb-5">
				<div className="flex items-center justify-center">
					<DataTable />
				</div>
			</div>
		</DashboardLayout>
	);
}
