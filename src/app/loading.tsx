'use client'

import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Card } from '@/components/ui/card'

export default function Loading() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen p-6 bg-slate-50'>
			<Card className='w-full max-w-md shadow-lg p-8'>
				<div className='flex flex-col items-center justify-center'>
					<LoadingSpinner size='lg' text='Loading application...' />
				</div>
			</Card>
		</div>
	)
}
