'use client'

import { useState } from 'react'
import { Student, Lesson } from '@/services/api'
import { useCreateStudent } from '@/hooks/useStudents'
import { useLessons } from '@/hooks/useLessons'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ErrorDisplay } from '@/components/ErrorDisplay'
import { AddLesson } from './AddLesson'

interface AddStudentProps {
	onClose: () => void
}

export function AddStudent({ onClose }: AddStudentProps) {
	const [studentData, setStudentData] = useState<Student>({
		first_name: '',
		last_name: '',
		age: 0,
		grade: '',
		registration_date: new Date().toISOString().split('T')[0],
		lessons: [],
	})

	const [selectedLessons, setSelectedLessons] = useState<string[]>([])
	const [showAddLesson, setShowAddLesson] = useState(false)
	const [showApiTest, setShowApiTest] = useState(false) // Add state for API test component

	const createStudent = useCreateStudent()
	const {
		data: lessons,
		isLoading: isLoadingLessons,
		error: lessonsError,
	} = useLessons()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setStudentData(prev => ({
			...prev,
			[name]: name === 'age' ? parseInt(value) || 0 : value,
		}))
	}

	const handleLessonToggle = (lessonId: string) => {
		setSelectedLessons(prev => {
			if (prev.includes(lessonId)) {
				return prev.filter(id => id !== lessonId)
			} else {
				return [...prev, lessonId]
			}
		})
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!studentData.first_name || !studentData.last_name) {
			toast.error('Please fill all required fields')
			return
		}

		try {
			// Prepare student data with selected lessons
			const lessonsToAttach =
				lessons?.filter((lesson: Lesson) =>
					selectedLessons.includes(lesson.lesson_id)
				) || []

			const studentToCreate: Student = {
				...studentData,
				lessons: lessonsToAttach,
			}

			await createStudent.mutateAsync(studentToCreate)
			toast.success('Student added successfully')
			onClose()
		} catch (error) {
			console.error('Error adding student:', error)
			toast.error('Failed to add student. Please try again.')
		}
	}

	const handleLessonAdded = () => {
		setShowAddLesson(false)
		// The lessons list will be refreshed automatically through React Query
	}

	return (
		<Card className='w-full max-w-xl mx-auto'>
			<CardHeader>
				<CardTitle className='text-center'>Add New Student</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div className='grid grid-cols-2 gap-4'>
						<div className='space-y-2'>
							<Label htmlFor='first_name'>First Name*</Label>
							<Input
								id='first_name'
								name='first_name'
								value={studentData.first_name}
								onChange={handleChange}
								required
							/>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='last_name'>Last Name*</Label>
							<Input
								id='last_name'
								name='last_name'
								value={studentData.last_name}
								onChange={handleChange}
								required
							/>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='age'>Age*</Label>
							<Input
								id='age'
								name='age'
								type='number'
								value={studentData.age || ''}
								onChange={handleChange}
								required
							/>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='grade'>Grade*</Label>
							<Input
								id='grade'
								name='grade'
								value={studentData.grade}
								onChange={handleChange}
								required
							/>
						</div>

						<div className='space-y-2 col-span-2'>
							<Label htmlFor='registration_date'>Registration Date*</Label>
							<Input
								id='registration_date'
								name='registration_date'
								type='date'
								value={studentData.registration_date}
								onChange={handleChange}
								required
							/>
						</div>
					</div>

					<div className='space-y-4 mt-6'>
						<div>
							<div className='flex justify-between items-center mb-2'>
								<h3 className='text-lg font-semibold'>Lessons</h3>
								<Button
									type='button'
									size='sm'
									onClick={() => setShowAddLesson(!showAddLesson)}
								>
									{showAddLesson ? 'Cancel' : 'Add New Lesson'}
								</Button>
							</div>

							{showAddLesson && (
								<div className='mb-4 p-3 border rounded-md bg-slate-50'>
									<AddLesson
										isInline={true}
										onSuccess={handleLessonAdded}
										onCancel={() => setShowAddLesson(false)}
										noForm={true} // Add this prop to prevent nested form
									/>
								</div>
							)}

							{isLoadingLessons && <LoadingSpinner text='Loading lessons...' />}
							{lessonsError && (
								<ErrorDisplay message='Failed to load lessons' />
							)}

							{lessons && lessons.length > 0 ? (
								<div className='grid grid-cols-2 gap-2 mt-2'>
									{lessons.map((lesson: Lesson) => (
										<div
											key={lesson.lesson_id}
											className={`p-2 border rounded cursor-pointer ${
												selectedLessons.includes(lesson.lesson_id)
													? 'bg-blue-100 border-blue-300'
													: 'hover:bg-slate-50'
											}`}
											onClick={() => handleLessonToggle(lesson.lesson_id)}
										>
											<div className='flex items-center gap-2'>
												<input
													type='checkbox'
													checked={selectedLessons.includes(lesson.lesson_id)}
													onChange={() => {}} // Handled by the parent div click
													className='h-4 w-4'
												/>
												<span>{lesson.lesson_name}</span>
											</div>
										</div>
									))}
								</div>
							) : (
								<p className='text-sm text-slate-500'>No lessons available</p>
							)}
						</div>
					</div>

					<div className='flex justify-end gap-4 mt-6'>
						<Button type='button' variant='outline' onClick={onClose}>
							Cancel
						</Button>
						<Button type='submit' disabled={createStudent.isPending}>
							{createStudent.isPending ? 'Adding...' : 'Add Student'}
						</Button>
					</div>
				</form>

				<div className='mt-6 text-center'>
					<Button
						variant='outline'
						onClick={() => setShowApiTest(!showApiTest)}
					>
						{showApiTest
							? 'Hide API Troubleshooting'
							: 'Show API Troubleshooting'}
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
