import { generatePageMetadata } from '@/components/common/PageMetaData';
import DashboardStats from '@/components/dashboard/Dashboard';
import { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
	return generatePageMetadata({
		title: 'Dashboard - Alpsector',
		content: 'View your stats and manage your Alpsector account',
		url: 'https://admin.alpsector.com/dashboard',
	});
};

const Dashboard = () => {
	return (
		<>
			<div className="mb-5 2xl:h-screen">
				<div className="p-4 pt-0">
					<DashboardStats />
				</div>
			</div>
		</>
	);
};

export default Dashboard;
