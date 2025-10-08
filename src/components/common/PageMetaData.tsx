import type { Metadata } from 'next';

interface MetaDataProps {
	title: string;
	content: string;
	image?: string;
	url?: string;
}

export function generatePageMetadata({ title, content, image, url }: MetaDataProps): Metadata {
	const defaultImage = '/millennnia.png';

	return {
		title: `${title}`,
		description: content,
		openGraph: {
			type: 'website',
			siteName: 'Millennia Trades dashboard',
			locale: 'en_US',
			title: `${title}`,
			description: content,
			url: url || 'https://admin.milleniatrades.com',
			images: [
				{
					url: 'https://www.admin.milleniatrades.com/opengraph-image.png',
					width: 1200,
					height: 630,
					alt: 'Millennia Trades Open Graph Image',
				},
			],
		},
		twitter: {
			card: image || defaultImage ? 'summary_large_image' : 'summary',
			title: `${title}`,
			description: content,
			images: ['millennnia.png'],
		},
		other: {
			'og:locale': 'en_US',
		},
		metadataBase: new URL('https://www.admin.milleniatrades.com'),
	};
}
