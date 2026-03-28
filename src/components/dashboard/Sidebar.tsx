'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
	DashboardIcon,
	UsersIcon,
	LogoutIcon,
	SettingsIcon,
	XIcon,
	GroupIcon,
	DepositIcon,
	WithdrawalIcon,
	MessageIcon,
} from '../common';
import Image from 'next/image';

const menuItems = [
	{ name: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
	{ name: 'Users', icon: GroupIcon, path: '/users' },
	{ name: 'Kyc', icon: UsersIcon, path: '/kyc' },
	{ name: 'Deposits', icon: DepositIcon, path: '/deposits' },
	{ name: 'Withdrawals', icon: WithdrawalIcon, path: '/withdrawals' },
	{ name: 'Messages', icon: MessageIcon, path: '/messages' },
	{ name: 'Settings', icon: SettingsIcon, path: '/settings' },
];

const bottomMenuItems = [{ name: 'Logout', icon: LogoutIcon, path: '/logout' }];
export default function Sidebar() {
	const pathname = usePathname();

	return (
		<>
			<aside className="w-[220px] bg-white text-[#000000] flex-col p-4 space-y-6 h-screen py-5 overflow-y-auto hidden md:flex scrollbar-hide">
				{/* <div className="flex items-center mb-11 mdd:mb-8 mt-7 mx-auto">
					<Image src="/millennnia.png" alt="Logo" className="w-17 h-17" width={100} height={100} />
				</div> */}
				<div className="flex items-center gap-2 mb-11 mdd:mb-8 mt-7">
					<Image
						src="/alpsector-logo.png"
						alt="Alpsector Logo"
						width={32}
						height={32}
						className="rounded-full object-cover"
					/>
					<span className="text-lg font-bold">Alpsector</span>
				</div>

				<nav className="flex flex-col gap-4 flex-grow">
					{menuItems.map((item) => (
						<Link key={item.name} href={item.path}>
							<div className="relative flex items-center">
								{pathname === item.path && (
									<div className="absolute left-[-10px] w-1 h-[70%] bg-[#1d4ed8] rounded-r-lg" />
								)}

								<span
									className={cn(
										'flex items-center justify-between p-3 rounded-lg transition cursor-pointer text-xs pl-5 w-full',
										pathname === item.path ? 'bg-[#F3F3F3]' : 'hover:bg-[#F3F3F3]'
									)}
								>
									<div className="flex items-center gap-3 text-[14px]">
										{item.icon && <item.icon className="w-5 h-5" />}
										{item.name}
									</div>

									{pathname === item.path && <ChevronRight className="w-5 h-5" />}
								</span>
							</div>
						</Link>
					))}
				</nav>

				<div className="flex flex-col gap-4">
					{bottomMenuItems.map((item) => (
						<Link key={item.name} href={item.path}>
							<span
								className={cn(
									'flex items-center justify-between p-3 rounded-lg transition cursor-pointer text-xs text-red-800',
									pathname === item.path ? 'bg-[#F8F8F8]' : 'hover:bg-[#F8F8F8]'
								)}
							>
								<div className="flex items-center gap-3">
									{item.icon && <item.icon className=" w-5 h-5" />}
									{item.name}
								</div>
								{pathname === item.path && <ChevronRight className="w-5 h-5" />}
							</span>
						</Link>
					))}
				</div>
			</aside>
		</>
	);
}

export function MobileSidebar({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const pathname = usePathname();

	return (
		<>
			<aside
				className={cn(
					'fixed top-0 left-0 h-screen bg-white text-[#000000] flex-col p-4 pl-0 space-y-6 py-5 overflow-y-auto z-[9999] transition-transform duration-300 ease-in-out scrollbar-hide',
					isOpen ? 'translate-x-0 w-[70%] sms:w-[220px]' : '-translate-x-full',
					'md:hidden'
				)}
			>
				<div className="flex items-center justify-between mb-8">
					{/* <div className="flex items-center mt-7 ml-3">
						<Image src="/millennnia.png" alt="Logo" className="w-28 h-17" width={100} height={100} />
						Millennia Trades
					</div> */}
					<div className="flex items-center gap-2 mt-7 ml-3">
						<Image
							src="/millennnia.png"
							alt="Millennia Trades Logo"
							width={32}
							height={32}
							className="rounded-full object-cover"
						/>
						<span className="text-lg font-bold">Alpsector</span>
					</div>
					<button
						className="cursor-pointer bg-[#F3F3F3] rounded-xl p-2 md:hidden mt-5"
						onClick={() => setIsOpen(false)}
					>
						<XIcon className="w-5 h-5" />
					</button>
				</div>

				<nav className="flex flex-col gap-4 flex-grow">
					{menuItems.map((item) => (
						<Link key={item.name} href={item.path} onClick={() => setIsOpen(false)}>
							<div className="relative flex items-center">
								{pathname === item.path && (
									<div className="absolute left-[5px] w-1 h-[70%] bg-[#1d4ed8] rounded-r-lg" />
								)}
								<span
									className={cn(
										'flex items-center justify-between p-3 rounded-lg transition cursor-pointer text-xs pl-4 w-full ml-3',
										pathname === item.path ? 'bg-[#F3F3F3]' : 'hover:bg-[#F3F3F3]'
									)}
								>
									<div className="flex items-center gap-3 text-[14px]">
										{item.icon && <item.icon className="text-black w-5 h-5" />}
										{item.name}
									</div>
									{pathname === item.path && <ChevronRight className="w-5 h-5" />}
								</span>
							</div>
						</Link>
					))}
				</nav>

				<div className="flex flex-col gap-4">
					{bottomMenuItems.map((item) => (
						<Link key={item.name} href={item.path} onClick={() => setIsOpen(false)}>
							<span
								className={cn(
									'flex items-center justify-between p-3 rounded-lg transition cursor-pointer text-xs text-red-800 ml-3 pl-4',
									pathname === item.path ? 'bg-[#F8F8F8]' : 'hover:bg-[#F8F8F8]'
								)}
							>
								<div className="flex items-center gap-3">
									{item.icon && <item.icon className="w-5 h-5" />}
									{item.name}
								</div>
								{pathname === item.path && <ChevronRight className="w-5 h-5" />}
							</span>
						</Link>
					))}
				</div>
			</aside>

			{isOpen && <div className="fixed inset-0 bg-black/60 z-[9998] md:hidden" onClick={() => setIsOpen(false)} />}
		</>
	);
}
