import { DepositTable } from '@/components/dashboard/Deposits';
import DashboardLayout from '../dashboard/layout';
import { generatePageMetadata } from '@/components/common/PageMetaData';
import { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
	return generatePageMetadata({
		title: 'Wallet Deposits - Alpsector',
		content: 'View and manage users wallet deposits in Alpsector Dashboard',
		url: 'https://admin.alpsector.com/deposits',
	});
};

export default function Users() {
	return (
		<DashboardLayout heading="Deposits">
			<div className="mb-5">
				<div className="flex items-center justify-center">
					<DepositTable />
				</div>
			</div>
		</DashboardLayout>
	);
}
