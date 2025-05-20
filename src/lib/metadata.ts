import { Metadata } from 'next'

// Base shared metadata
export const sharedMetadata: Metadata = {
	title: {
		default: 'Student Management System',
		template: '%s | Student Management System',
	},
	description:
		'A keyboard-driven student management system for managing student information and lessons',
	authors: [{ name: 'Your Name' }],
	keywords: [
		'student management',
		'lessons',
		'education',
		'keyboard shortcuts',
		'Next.js',
		'React',
	],
	creator: 'Your Name',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://your-domain.com',
		title: 'Student Management System',
		description:
			'A keyboard-driven student management system for managing student information and lessons',
		siteName: 'Student Management System',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Student Management System',
		description:
			'A keyboard-driven student management system for managing student information and lessons',
	},
}
