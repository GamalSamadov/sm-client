'use client'

import { useState } from 'react'
import { useStudent, useDeleteStudent } from '@/hooks/useStudents'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ErrorDisplay } from '@/components/ErrorDisplay'

interface DeleteStudentProps {
	onClose: () => void
}

export function DeleteStudent({ onClose }: DeleteStudentProps) {
	const [studentNumber, setStudentNumber] = useState('')
	const [searchPerformed, setSearchPerformed] = useState(false)

	const { data: student, isLoading, error, refetch } = useStudent(studentNumber)
	const deleteStudent = useDeleteStudent()

	const handleSearch = async () => {
		if (!studentNumber) {
			toast.error('Please enter a student number')
			return
		}

		await refetch()
		setSearchPerformed(true)
	}

	const handleDelete = async () => {
		if (!student || !student.id) {
			toast.error('Cannot delete: Student not found')
			return
		}

		try {
			await deleteStudent.mutateAsync(student.id)
			onClose()
		} catch (error) {
			console.error('Error deleting student:', error)
		}
	}

	return (
		<Card className='w-full max-w-xl mx-auto'>
			<CardHeader>
				<CardTitle className='text-center'>Delete Student</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='space-y-6'>
					<div className='flex gap-4'>
						<div className='flex-1 space-y-2'>
							<Label htmlFor='studentNumber'>Student Number</Label>
							<Input
								id='studentNumber'
								value={studentNumber}
								onChange={e => setStudentNumber(e.target.value)}
								placeholder='Enter student number'
							/>
						</div>
						<div className='flex items-end'>
							<Button onClick={handleSearch} disabled={isLoading}>
								Search
							</Button>
						</div>
					</div>

					{searchPerformed && (
						<>
							{isLoading && <LoadingSpinner text='Searching for student...' />}

							{error && (
								<ErrorDisplay message='Student not found or error occurred.' />
							)}

							{student && (
								<div className='space-y-4 mt-4'>
									<h3 className='font-medium text-lg'>Student Information</h3>
									<div className='grid grid-cols-2 gap-4'>
										<div>
											<p className='text-sm font-medium'>Student Number:</p>
											<p>{student.studentNumber}</p>
										</div>
										<div>
											<p className='text-sm font-medium'>Name:</p>
											<p>
												{student.firstName} {student.lastName}
											</p>
										</div>
										<div>
											<p className='text-sm font-medium'>Age:</p>
											<p>{student.age}</p>
										</div>
										<div>
											<p className='text-sm font-medium'>Class:</p>
											<p>{student.className}</p>
										</div>
									</div>

									<div className='border-t pt-4 mt-4'>
										<div className='bg-red-50 text-red-700 p-4 rounded-md mb-4'>
											<p className='font-bold'>Warning!</p>
											<p>
												This action cannot be undone. This will permanently
												delete the student and all associated data.
											</p>
										</div>
										<div className='flex justify-end gap-4'>
											<Button variant='outline' onClick={onClose}>
												Cancel
											</Button>
											<Button
												variant='destructive'
												onClick={handleDelete}
												disabled={deleteStudent.isPending}
											>
												{deleteStudent.isPending
													? 'Deleting...'
													: 'Delete Student'}
											</Button>
										</div>
									</div>
								</div>
							)}
						</>
					)}
				</div>
			</CardContent>
		</Card>
	)
}
