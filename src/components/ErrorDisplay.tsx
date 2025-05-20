'use client'

import { Alert } from '@/components/ui/alert'

interface ErrorDisplayProps {
	message?: string
}

export function ErrorDisplay({
	message = 'An error occurred. Please try again.',
}: ErrorDisplayProps) {
	return (
		<Alert
			variant='destructive'
			className='bg-red-50 text-red-700 p-4 rounded-md border border-red-200'
		>
			<p>{message}</p>
		</Alert>
	)
}
