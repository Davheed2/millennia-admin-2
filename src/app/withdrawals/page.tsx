import { WithdrawalTable } from '@/components/dashboard/Withdrawals';
import DashboardLayout from '../dashboard/layout';
import { generatePageMetadata } from '@/components/common/PageMetaData';
import { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
	return generatePageMetadata({
		title: 'Wallet Withdrawals - Millennia Trades',
		content: 'View and manage users wallet deposits in Millennia Trades Dashboard',
		url: 'https://admin.milleniatrades.com/withdrawals',
	});
};

export default function Users() {
	return (
		<DashboardLayout heading="Withdrawals">
			<div className="mb-5">
				<div className="flex items-center justify-center">
					<WithdrawalTable />
				</div>
			</div>
		</DashboardLayout>
	);
}
