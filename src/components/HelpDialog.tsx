'use client'

import { useState, useCallback, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ResponsiveDialog } from '@/components/ResponsiveDialog'
import { KeymapDisplay } from '@/components/KeymapDisplay'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useKeyboardShortcuts } from '@/contexts/KeyboardShortcutsContext'

export function HelpDialog() {
	const [isOpen, setIsOpen] = useState(false)

	const shortcuts = [
		{ key: 'a', description: 'Add a student' },
		{ key: 'd', description: 'Delete a student' },
		{ key: 'u', description: 'Update student information' },
		{ key: 's', description: 'View student information' },
		{ key: '?', description: 'Show this help dialog' },
	]

	// Create a stable callback function that won't change on re-renders
	const openDialog = useCallback(() => {
		setIsOpen(true)
	}, [])

	// Create a stable shortcut config using useMemo
	const helpShortcut = useMemo(() => {
		return [
			{
				key: '?',
				callback: openDialog,
				description: 'Show help dialog',
			},
		]
	}, [openDialog])

	// Register the keyboard shortcut
	useKeyboardShortcuts(helpShortcut)

	return (
		<>
			<Button
				variant='ghost'
				size='icon'
				className='fixed bottom-4 right-4 h-8 w-8 rounded-full bg-slate-800/70 text-white hover:bg-slate-700 z-50'
				onClick={() => setIsOpen(true)}
			>
				?
			</Button>

			<ResponsiveDialog
				open={isOpen}
				onOpenChange={setIsOpen}
				title='Keyboard Shortcuts Help'
			>
				<Card>
					<CardHeader>
						<CardTitle className='text-center'>Keyboard Shortcuts</CardTitle>
					</CardHeader>
					<CardContent className='flex flex-col gap-6'>
						<p className='text-slate-600'>
							This application supports keyboard shortcuts for quick access to
							various functions. Press any of the following keys to perform the
							associated action:
						</p>

						<div className='space-y-3'>
							<KeymapDisplay shortcuts={shortcuts} />
						</div>

						<div className='flex justify-end'>
							<Button onClick={() => setIsOpen(false)}>Close</Button>
						</div>
					</CardContent>
				</Card>
			</ResponsiveDialog>
		</>
	)
}
