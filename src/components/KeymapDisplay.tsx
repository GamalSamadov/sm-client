'use client'

import { cn } from '@/lib/utils'

interface KeyboardShortcutProps {
	shortcut: string
	description: string
	className?: string
}

export function KeyboardShortcut({
	shortcut,
	description,
	className,
}: KeyboardShortcutProps) {
	return (
		<div className={cn('flex items-center gap-2', className)}>
			<kbd className='px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg'>
				{shortcut.toUpperCase()}
			</kbd>
			<span className='text-sm text-gray-600'>{description}</span>
		</div>
	)
}

interface KeymapDisplayProps {
	shortcuts: Array<{ key: string; description: string }>
	className?: string
}

export function KeymapDisplay({ shortcuts, className }: KeymapDisplayProps) {
	return (
		<div className={cn('flex flex-wrap gap-4', className)}>
			{shortcuts.map(shortcut => (
				<KeyboardShortcut
					key={shortcut.key}
					shortcut={shortcut.key}
					description={shortcut.description}
				/>
			))}
		</div>
	)
}
