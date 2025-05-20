'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { AddStudent } from '@/components/student/AddStudent'
import { UpdateStudent } from '@/components/student/UpdateStudent'
import { ViewStudent } from '@/components/student/ViewStudent'
import { ManageLessons } from '@/components/student/ManageLessons'
import { ResponsiveDialog } from '@/components/ResponsiveDialog'
import { useKeyboardShortcuts } from '@/contexts/KeyboardShortcutsContext'

type DialogType = 'add' | 'update' | 'view' | 'lessons' | null

export function KeyboardManager() {
	const [dialogType, setDialogType] = useState<DialogType>(null)
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	// Create stable callback functions with useCallback
	const handleOpenAddDialog = useCallback(() => {
		setDialogType('add')
		setIsDialogOpen(true)
	}, [])

	const handleOpenUpdateDialog = useCallback(() => {
		setDialogType('update')
		setIsDialogOpen(true)
	}, [])

	const handleOpenViewDialog = useCallback(() => {
		setDialogType('view')
		setIsDialogOpen(true)
	}, [])

	const handleOpenLessonsDialog = useCallback(() => {
		setDialogType('lessons')
		setIsDialogOpen(true)
	}, [])

	// Create stable shortcuts array with useMemo
	const shortcutsList = useMemo(
		() => [
			{ key: 'a', callback: handleOpenAddDialog, description: 'Add a student' },
			{
				key: 'u',
				callback: handleOpenUpdateDialog,
				description: 'Update a student',
			},
			{
				key: 's',
				callback: handleOpenViewDialog,
				description: 'View a student',
			},
			{
				key: 'l',
				callback: handleOpenLessonsDialog,
				description: 'Manage lessons',
			},
		],
		[
			handleOpenAddDialog,
			handleOpenUpdateDialog,
			handleOpenViewDialog,
			handleOpenLessonsDialog,
		]
	)

	// Use the keyboard shortcuts hook with the stable shortcuts list
	const { disableAllShortcuts, enableAllShortcuts } =
		useKeyboardShortcuts(shortcutsList)

	// Disable shortcuts when dialog is open
	useEffect(() => {
		if (isDialogOpen) {
			disableAllShortcuts()
		} else {
			enableAllShortcuts()
		}
	}, [isDialogOpen, disableAllShortcuts, enableAllShortcuts])

	const handleCloseDialog = () => {
		setIsDialogOpen(false)
		// Small delay to prevent immediate re-opening
		setTimeout(() => {
			setDialogType(null)
		}, 100)
	}

	const renderDialogContent = () => {
		switch (dialogType) {
			case 'add':
				return <AddStudent onClose={handleCloseDialog} />
			case 'update':
				return <UpdateStudent onClose={handleCloseDialog} />
			case 'view':
				return <ViewStudent onClose={handleCloseDialog} />
			case 'lessons':
				return <ManageLessons onClose={handleCloseDialog} />
			default:
				return null
		}
	}

	const getDialogTitle = () => {
		switch (dialogType) {
			case 'add':
				return 'Add Student'
			case 'update':
				return 'Update Student'
			case 'view':
				return 'View Student'
			case 'lessons':
				return 'Manage Lessons'
			default:
				return 'Student Management'
		}
	}

	return (
		<ResponsiveDialog
			open={isDialogOpen}
			onOpenChange={setIsDialogOpen}
			title={getDialogTitle()} // Add dialog title
		>
			{renderDialogContent()}
		</ResponsiveDialog>
	)
}
