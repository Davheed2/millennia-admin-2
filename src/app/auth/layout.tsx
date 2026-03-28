import type { ReactNode } from 'react';
import Image from 'next/image';

interface AuthLayoutProps {
	children: ReactNode;
	heading: string;
	greeting: string;
	withHeader?: boolean;
	hasSuccess?: boolean;
}

export default function AuthLayout({
	children,
	heading,
	greeting,
	withHeader = false,
	hasSuccess = false,
}: AuthLayoutProps) {
	return (
		<main className="flex w-full items-center justify-center bg-slate-50 mb-auto mt-20" role="main">
			<section
				className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-slate-100"
				aria-label="Authentication form"
			>
				<div className="flex flex-col items-center space-y-4">
					<Image
						src="/alpsector-logo.png"
						alt="Alpsector Logo"
						width={80}
						height={80}
						className="rounded-xl"
						priority
					/>
					<h1 className="text-2xl font-bold text-slate-900">Alpsector</h1>
					{withHeader && (
						<>
							<div className="text-center space-y-2">
								<h2 className="text-xl font-semibold text-gray-900 md:text-2xl">{heading}</h2>
								<p className="text-sm text-gray-600">{greeting}</p>
							</div>
						</>
					)}
					{/* <LogoBanner /> Reintroduced LogoBanner */}

					{hasSuccess && <p className="text-green-600 text-sm text-center">Success!</p>}
					{children}
				</div>
			</section>
		</main>
	);
}
