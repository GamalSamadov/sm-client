'use client'

interface LoadingSpinnerProps {
	size?: 'sm' | 'md' | 'lg'
	text?: string
}

export function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
	const sizeClasses = {
		sm: 'h-4 w-4 border-2',
		md: 'h-8 w-8 border-3',
		lg: 'h-12 w-12 border-4',
	}

	return (
		<div className='flex flex-col items-center justify-center space-y-2 py-4'>
			<div
				className={`animate-spin rounded-full border-t-transparent border-slate-300 ${sizeClasses[size]}`}
			></div>
			{text && <p className='text-sm text-slate-500'>{text}</p>}
		</div>
	)
}
