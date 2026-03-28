import Image from 'next/image';
import Link from 'next/link';

const LogoBanner = ({ className }: { className?: string }) => {
	return (
		<Link href="/" className={`flex items-center justify-center gap-2`}>
			<Image
				className="aspect-square w-6 md:w-10"
				src="/alpsector-logo.png"
				width={200}
				height={200}
				priority
				alt="Alpsector Logo"
			/>
			<span role="" className={`font-bold md:text-xl ${className}`}>
				Alpsector
			</span>
		</Link>
	);
};

export default LogoBanner;
