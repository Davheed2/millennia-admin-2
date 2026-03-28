import { KycTable } from '@/components/dashboard/Kyc';
import DashboardLayout from '../dashboard/layout';
import { generatePageMetadata } from '@/components/common/PageMetaData';
import { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
	return generatePageMetadata({
		title: 'KYC - Alpsector',
		content: 'View and manage users KYC in Alpsector Dashboard',
		url: 'https://admin.alpsector.com/kyc',
	});
};

export default function Users() {
	return (
		<DashboardLayout heading="KYC">
			<div className="mb-5">
				<div className="flex items-center justify-center">
					<KycTable />
				</div>
			</div>
		</DashboardLayout>
	);
}
