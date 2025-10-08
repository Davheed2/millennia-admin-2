import { DepositTable } from '@/components/dashboard/Deposits';
import DashboardLayout from '../dashboard/layout';
import { generatePageMetadata } from '@/components/common/PageMetaData';
import { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
	return generatePageMetadata({
		title: 'Wallet Deposits - Millennia Trades',
		content: 'View and manage users wallet deposits in Millennia Trades Dashboard',
		url: 'https://admin.milleniatrades.com/deposits',
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
