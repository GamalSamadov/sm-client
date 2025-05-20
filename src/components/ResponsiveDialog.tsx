'use client'

import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import * as React from 'react'

interface ResponsiveDialogProps {
	trigger?: React.ReactNode
	children: React.ReactNode
	open?: boolean
	onOpenChange?: (open: boolean) => void
	className?: string
	title?: string // Add optional title prop
}

export function ResponsiveDialog({
	trigger,
	children,
	open,
	onOpenChange,
	className,
	title = 'Dialog', // Default title for accessibility
}: ResponsiveDialogProps) {
	const isDesktop = useMediaQuery('(min-width: 768px)')

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			{trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
			<DialogContent
				className={cn(
					'sm:max-w-[90vw] md:max-w-[600px] max-h-[90vh] overflow-y-auto',
					isDesktop ? 'p-6' : 'p-4',
					className
				)}
			>
				{/* Add DialogTitle for accessibility, but hide it visually if needed */}
				<DialogTitle className='sr-only'>{title}</DialogTitle>
				{children}
			</DialogContent>
		</Dialog>
	)
}
