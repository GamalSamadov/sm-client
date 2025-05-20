'use client'

import {
	createContext,
	useContext,
	ReactNode,
	useEffect,
	useCallback,
	useRef,
} from 'react'

export type KeyAction = {
	key: string
	callback: () => void
	description: string
	disabled?: boolean
}

type KeyboardShortcutsContextType = {
	registerShortcuts: (shortcuts: KeyAction[]) => string
	unregisterShortcuts: (id: string) => void
	disableAllShortcuts: () => void
	enableAllShortcuts: () => void
	updateShortcut: (id: string, key: string, updates: Partial<KeyAction>) => void
	getAllShortcuts: () => KeyAction[]
}

const KeyboardShortcutsContext = createContext<
	KeyboardShortcutsContextType | undefined
>(undefined)

type ShortcutGroup = {
	id: string
	shortcuts: KeyAction[]
	disabled: boolean
}

export function KeyboardShortcutsProvider({
	children,
}: {
	children: ReactNode
}) {
	// Use ref to store shortcuts to avoid re-renders triggering infinite loops
	const shortcutGroupsRef = useRef<ShortcutGroup[]>([])
	// We'll use this to force re-renders only when needed
	const nextIdRef = useRef(0)

	// Register a new group of shortcuts and return its ID
	const registerShortcuts = useCallback((shortcuts: KeyAction[]): string => {
		const id = `shortcut-group-${nextIdRef.current++}`
		shortcutGroupsRef.current = [
			...shortcutGroupsRef.current,
			{ id, shortcuts, disabled: false },
		]
		return id
	}, [])

	// Unregister shortcuts by ID
	const unregisterShortcuts = useCallback((id: string) => {
		shortcutGroupsRef.current = shortcutGroupsRef.current.filter(
			group => group.id !== id
		)
	}, [])

	// Disable all shortcuts
	const disableAllShortcuts = useCallback(() => {
		shortcutGroupsRef.current = shortcutGroupsRef.current.map(group => ({
			...group,
			disabled: true,
		}))
	}, [])

	// Enable all shortcuts
	const enableAllShortcuts = useCallback(() => {
		shortcutGroupsRef.current = shortcutGroupsRef.current.map(group => ({
			...group,
			disabled: false,
		}))
	}, [])

	// Update a specific shortcut in a group
	const updateShortcut = useCallback(
		(groupId: string, key: string, updates: Partial<KeyAction>) => {
			shortcutGroupsRef.current = shortcutGroupsRef.current.map(group =>
				group.id === groupId
					? {
							...group,
							shortcuts: group.shortcuts.map(shortcut =>
								shortcut.key === key ? { ...shortcut, ...updates } : shortcut
							),
					  }
					: group
			)
		},
		[]
	)

	// Get all active shortcuts
	const getAllShortcuts = useCallback(() => {
		return shortcutGroupsRef.current
			.filter(group => !group.disabled)
			.flatMap(group => group.shortcuts)
	}, [])

	// Handle keyboard events
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

			// Find all active shortcuts
			const activeShortcuts = shortcutGroupsRef.current
				.filter(group => !group.disabled)
				.flatMap(group => group.shortcuts)
				.filter(shortcut => !shortcut.disabled)

			// Find matching shortcut
			const action = activeShortcuts.find(
				shortcut => shortcut.key.toLowerCase() === key
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
	}, []) // Empty dependency array - only run once on mount/unmount

	const value = {
		registerShortcuts,
		unregisterShortcuts,
		disableAllShortcuts,
		enableAllShortcuts,
		updateShortcut,
		getAllShortcuts,
	}

	return (
		<KeyboardShortcutsContext.Provider value={value}>
			{children}
		</KeyboardShortcutsContext.Provider>
	)
}

export function useKeyboardShortcuts(shortcuts: KeyAction[]) {
	const context = useContext(KeyboardShortcutsContext)

	if (!context) {
		throw new Error(
			'useKeyboardShortcuts must be used within a KeyboardShortcutsProvider'
		)
	}

	const {
		registerShortcuts,
		unregisterShortcuts,
		disableAllShortcuts,
		enableAllShortcuts,
		updateShortcut,
	} = context

	// Store ID in a ref to keep it stable
	const idRef = useRef<string | null>(null)
	// Store shortcuts in a ref to avoid dependency issues
	const shortcutsRef = useRef(shortcuts)

	// Register shortcuts on mount and when they change
	useEffect(() => {
		// Update our ref
		shortcutsRef.current = shortcuts

		// Unregister previous shortcuts if they exist
		if (idRef.current) {
			unregisterShortcuts(idRef.current)
		}

		// Register new shortcuts
		idRef.current = registerShortcuts(shortcuts)

		return () => {
			if (idRef.current) {
				unregisterShortcuts(idRef.current)
			}
		}
		// We explicitly want to depend on the shortcuts array here
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [registerShortcuts, unregisterShortcuts, shortcuts])

	const updateSingleShortcut = useCallback(
		(key: string, updates: Partial<KeyAction>) => {
			if (idRef.current) {
				updateShortcut(idRef.current, key, updates)
			}
		},
		[updateShortcut]
	)

	return {
		shortcuts: shortcutsRef.current,
		updateShortcut: updateSingleShortcut,
		disableAllShortcuts,
		enableAllShortcuts,
	}
}
