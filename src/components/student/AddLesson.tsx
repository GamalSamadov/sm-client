'use client'

import { useState } from 'react'
import { useCreateLesson } from '@/hooks/useLessons'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

interface AddLessonProps {
	onSuccess?: () => void
	onCancel?: () => void
	isInline?: boolean
	noForm?: boolean // New prop to indicate if form element should be omitted
}

export function AddLesson({
	onSuccess,
	onCancel,
	isInline = false,
	noForm = false, // Default to false to maintain backward compatibility
}: AddLessonProps) {
	const [lessonName, setLessonName] = useState('')
	const createLesson = useCreateLesson()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!lessonName.trim()) {
			toast.error('Please enter a lesson name')
			return
		}

		try {
			// Use the correct format with a nested lesson property
			const newLesson = {
				lesson_name: lessonName.trim(),
			}

			await createLesson.mutateAsync(newLesson)
			setLessonName('')
			if (onSuccess) onSuccess()
		} catch (error) {
			console.error('Error adding lesson:', error)
			// The error toast is handled by the hook
		}
	}

	// Extract the form content for reuse
	const formContent = (
		<>
			<div className={isInline ? 'flex-1' : 'space-y-2'}>
				<Label htmlFor='lesson_name'>Lesson Name*</Label>
				<Input
					id='lesson_name'
					value={lessonName}
					onChange={e => setLessonName(e.target.value)}
					placeholder='Enter lesson name'
					required
				/>
			</div>
			<div className={isInline ? 'flex gap-2' : 'flex justify-end gap-2 mt-4'}>
				{onCancel && (
					<Button type='button' variant='outline' onClick={onCancel}>
						Cancel
					</Button>
				)}
				<Button
					type={noForm ? 'button' : 'submit'}
					disabled={createLesson.isPending}
					onClick={noForm ? handleSubmit : undefined}
				>
					{createLesson.isPending ? 'Adding...' : 'Add Lesson'}
				</Button>
			</div>
		</>
	)

	// Decide whether to wrap in a form or not
	const content = noForm ? (
		<div className={isInline ? 'flex gap-2 items-end' : 'space-y-4'}>
			{formContent}
		</div>
	) : (
		<form
			onSubmit={handleSubmit}
			className={isInline ? 'flex gap-2 items-end' : 'space-y-4'}
		>
			{formContent}
		</form>
	)

	if (isInline) {
		return content
	}

	return (
		<Card className='w-full max-w-md mx-auto'>
			<CardHeader>
				<CardTitle className='text-center'>Add New Lesson</CardTitle>
			</CardHeader>
			<CardContent>{content}</CardContent>
		</Card>
	)
}
