'use client'

import { useState, useEffect } from 'react'
import { Student, Lesson } from '@/services/api'
import { useStudent, useUpdateStudent } from '@/hooks/useStudents'
import { useLessons } from '@/hooks/useLessons'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ErrorDisplay } from '@/components/ErrorDisplay'
import { AddLesson } from './AddLesson'

interface UpdateStudentProps {
	onClose: () => void
}

export function UpdateStudent({ onClose }: UpdateStudentProps) {
	const [studentId, setStudentId] = useState('')
	const [searchPerformed, setSearchPerformed] = useState(false)
	const [studentData, setStudentData] = useState<Student | null>(null)
	const [selectedLessons, setSelectedLessons] = useState<string[]>([])
	const [showAddLesson, setShowAddLesson] = useState(false)

	const { data: student, isLoading, error, refetch } = useStudent(studentId)
	const updateStudent = useUpdateStudent()
	const { data: lessons, isLoading: isLoadingLessons } = useLessons()

	useEffect(() => {
		if (student) {
			setStudentData(student)
			// Set selected lessons based on the student's current lessons
			if (student.lessons) {
				setSelectedLessons(
					student.lessons.map((lesson: Lesson) => lesson.lesson_id)
				)
			}
		}
	}, [student])

	const handleSearch = async () => {
		if (!studentId) {
			toast.error('Please enter a student ID')
			return
		}

		await refetch()
		setSearchPerformed(true)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!studentData) return

		const { name, value } = e.target
		setStudentData(prev => {
			if (!prev) return null
			return {
				...prev,
				[name]: name === 'age' ? parseInt(value) || 0 : value,
			}
		})
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

		if (!studentData) {
			toast.error('No student data to update')
			return
		}

		try {
			// Prepare student data with selected lessons
			const lessonsToAttach =
				lessons?.filter((lesson: Lesson) =>
					selectedLessons.includes(lesson.lesson_id)
				) || []

			const studentToUpdate: Student = {
				...studentData,
				lessons: lessonsToAttach,
			}

			await updateStudent.mutateAsync(studentToUpdate)
			toast.success('Student updated successfully')
			onClose()
		} catch (error) {
			console.error('Error updating student:', error)
			toast.error('Failed to update student')
		}
	}

	const handleLessonAdded = () => {
		setShowAddLesson(false)
		// The lessons list will be refreshed automatically through React Query
	}

	return (
		<Card className='w-full max-w-xl mx-auto'>
			<CardHeader>
				<CardTitle className='text-center'>Update Student</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='space-y-6'>
					<div className='flex gap-4'>
						<div className='flex-1 space-y-2'>
							<Label htmlFor='studentId'>Student ID</Label>
							<Input
								id='studentId'
								value={studentId}
								onChange={e => setStudentId(e.target.value)}
								placeholder='Enter student ID'
								disabled={searchPerformed && !!studentData}
							/>
						</div>
						<div className='flex items-end'>
							<Button
								onClick={handleSearch}
								disabled={isLoading || (searchPerformed && !!studentData)}
							>
								Search
							</Button>
						</div>
					</div>

					{searchPerformed && (
						<>
							{isLoading && <LoadingSpinner text='Loading student data...' />}

							{error && (
								<ErrorDisplay message='Student not found or error occurred.' />
							)}

							{studentData && (
								<form onSubmit={handleSubmit} className='space-y-4 mt-4'>
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
											<Label htmlFor='registration_date'>
												Registration Date*
											</Label>
											<Input
												id='registration_date'
												name='registration_date'
												type='date'
												value={studentData.registration_date.split('T')[0]}
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
													/>
												</div>
											)}

											{isLoadingLessons && (
												<LoadingSpinner text='Loading lessons...' />
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
															onClick={() =>
																handleLessonToggle(lesson.lesson_id)
															}
														>
															<div className='flex items-center gap-2'>
																<input
																	type='checkbox'
																	checked={selectedLessons.includes(
																		lesson.lesson_id
																	)}
																	onChange={() => {}} // Handled by the parent div click
																	className='h-4 w-4'
																/>
																<span>{lesson.lesson_name}</span>
															</div>
														</div>
													))}
												</div>
											) : (
												<p className='text-sm text-slate-500'>
													No lessons available
												</p>
											)}
										</div>
									</div>

									<div className='flex justify-end gap-4 mt-6'>
										<Button type='button' variant='outline' onClick={onClose}>
											Cancel
										</Button>
										<Button type='submit' disabled={updateStudent.isPending}>
											{updateStudent.isPending
												? 'Updating...'
												: 'Update Student'}
										</Button>
									</div>
								</form>
							)}
						</>
					)}
				</div>
			</CardContent>
		</Card>
	)
}
