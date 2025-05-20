'use client'

import { useEffect, useCallback, useRef } from 'react'

type KeyAction = {
	key: string
	callback: () => void
	description: string
	disabled?: boolean
}

export function useKeyboardShortcuts(shortcuts: KeyAction[]) {
	// Store shortcuts in a ref to avoid dependency issues
	const shortcutsRef = useRef<KeyAction[]>([])

	// Update shortcuts ref when they change, but don't trigger re-renders
	useEffect(() => {
		shortcutsRef.current = shortcuts
	}, [shortcuts])

	// Handle key press events
	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			// Skip if event target is an input, textarea, or select
			if (
				event.target instanceof HTMLInputElement ||
				event.target instanceof HTMLTextAreaElement ||
				event.target instanceof HTMLSelectElement
			) {
				return
			}

			const key = event.key.toLowerCase()

			// Find the action for this key
			const action = shortcutsRef.current.find(
				shortcut => shortcut.key.toLowerCase() === key && !shortcut.disabled
			)

			if (action) {
				event.preventDefault()
				action.callback()
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, []) // Empty dependency array - only run on mount/unmount

	const updateShortcut = useCallback(
		(key: string, updates: Partial<KeyAction>) => {
			shortcutsRef.current = shortcutsRef.current.map(shortcut =>
				shortcut.key === key ? { ...shortcut, ...updates } : shortcut
			)
		},
		[]
	)

	const disableAllShortcuts = useCallback(() => {
		shortcutsRef.current = shortcutsRef.current.map(shortcut => ({
			...shortcut,
			disabled: true,
		}))
	}, [])

	const enableAllShortcuts = useCallback(() => {
		shortcutsRef.current = shortcutsRef.current.map(shortcut => ({
			...shortcut,
			disabled: false,
		}))
	}, [])

	return {
		shortcuts: shortcutsRef.current,
		updateShortcut,
		disableAllShortcuts,
		enableAllShortcuts,
	}
}
