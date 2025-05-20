'use client'

import { useState } from 'react'
import { useLessons, useCreateLesson } from '@/hooks/useLessons'
import { Lesson } from '@/services/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ErrorDisplay } from '@/components/ErrorDisplay'
import { toast } from 'sonner'

interface ManageLessonsProps {
	onClose?: () => void
}

export function ManageLessons({ onClose }: ManageLessonsProps) {
	const [lessonName, setLessonName] = useState('')
	const { data: lessons, isLoading, error } = useLessons()
	const createLesson = useCreateLesson()
	const [showApiTest, setShowApiTest] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!lessonName.trim()) {
			toast.error('Please enter a lesson name')
			return
		}

		try {
			const newLesson = {
				lesson_name: lessonName.trim(),
			}

			await createLesson.mutateAsync(newLesson)
			setLessonName('')
			toast.success('Lesson added successfully')
		} catch (error) {
			console.error('Error adding lesson:', error)
			// Error toast is handled by the hook
		}
	}

	return (
		<Card className='w-full max-w-2xl mx-auto'>
			<CardHeader>
				<CardTitle className='text-center'>Manage Lessons</CardTitle>
			</CardHeader>
			<CardContent className='space-y-6'>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div className='flex gap-4'>
						<div className='flex-1 space-y-2'>
							<Label htmlFor='lesson_name'>New Lesson Name</Label>
							<Input
								id='lesson_name'
								value={lessonName}
								onChange={e => setLessonName(e.target.value)}
								placeholder='Enter lesson name'
								required
							/>
						</div>
						<div className='flex items-end'>
							<Button type='submit' disabled={createLesson.isPending}>
								{createLesson.isPending ? 'Adding...' : 'Add Lesson'}
							</Button>
						</div>
					</div>
				</form>

				<div className='mt-6'>
					<h3 className='text-lg font-semibold mb-4'>Available Lessons</h3>

					{isLoading && <LoadingSpinner text='Loading lessons...' />}
					{error && <ErrorDisplay message='Failed to load lessons' />}

					{lessons && lessons.length > 0 ? (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Lesson ID</TableHead>
									<TableHead>Lesson Name</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{lessons.map((lesson: Lesson) => (
									<TableRow key={lesson.lesson_id}>
										<TableCell className='font-mono text-sm'>
											{lesson.lesson_id}
										</TableCell>
										<TableCell>{lesson.lesson_name}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					) : (
						<p className='text-center py-4 text-slate-500'>
							No lessons available
						</p>
					)}
				</div>

				<div className='mt-4 text-center'>
					<Button
						variant='outline'
						onClick={() => setShowApiTest(!showApiTest)}
					>
						{showApiTest ? 'Hide Troubleshooting' : 'Show API Troubleshooting'}
					</Button>
				</div>

				{onClose && (
					<div className='flex justify-end mt-6'>
						<Button onClick={onClose}>Close</Button>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
