import { WithdrawalTable } from '@/components/dashboard/Withdrawals';
import DashboardLayout from '../dashboard/layout';
import { generatePageMetadata } from '@/components/common/PageMetaData';
import { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
	return generatePageMetadata({
		title: 'Wallet Withdrawals - Alpsector',
		content: 'View and manage users wallet deposits in Alpsector Dashboard',
		url: 'https://admin.alpsector.com/withdrawals',
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
