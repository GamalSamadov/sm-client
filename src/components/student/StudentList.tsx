'use client'

import { useState } from 'react'
import { useStudents, useDeleteStudent } from '@/hooks/useStudents'
import { Student } from '@/services/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ErrorDisplay } from '@/components/ErrorDisplay'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/ui/dialog'
import { toast } from 'sonner'

export function StudentList() {
	const { data: students = [], isLoading, error } = useStudents()
	const deleteStudent = useDeleteStudent()
	const [studentToDelete, setStudentToDelete] = useState<string | null>(null)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

	const handleDeleteClick = (studentId: string) => {
		setStudentToDelete(studentId)
		setIsDeleteDialogOpen(true)
	}

	const confirmDelete = async () => {
		if (!studentToDelete) return

		try {
			await deleteStudent.mutateAsync(studentToDelete)
			setIsDeleteDialogOpen(false)
			setStudentToDelete(null)
		} catch (error) {
			console.error('Error deleting student:', error)
			toast.error('Failed to delete student')
		}
	}

	const cancelDelete = () => {
		setIsDeleteDialogOpen(false)
		setStudentToDelete(null)
	}

	if (isLoading) return <LoadingSpinner text='Loading students...' />
	if (error) return <ErrorDisplay message='Error loading students' />

	return (
		<>
			<Card className='w-full shadow-sm'>
				<CardHeader className='bg-slate-50 pb-4'>
					<CardTitle>Student List</CardTitle>
				</CardHeader>
				<CardContent>
					{!students || students.length === 0 ? (
						<p className='text-center py-8 text-slate-500'>
							No students found. Add a new student by pressing &apos;a&apos;.
						</p>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>ID</TableHead>
									<TableHead>Name</TableHead>
									<TableHead>Age</TableHead>
									<TableHead>Grade</TableHead>
									<TableHead>Registration Date</TableHead>
									<TableHead>Lessons</TableHead>
									<TableHead className='text-right'>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{students.map((student: Student) => (
									<TableRow key={student.student_id}>
										<TableCell className='font-medium'>
											{student.student_id}
										</TableCell>
										<TableCell>
											{student.first_name} {student.last_name}
										</TableCell>
										<TableCell>{student.age}</TableCell>
										<TableCell>{student.grade}</TableCell>
										<TableCell>
											{new Date(student.registration_date).toLocaleDateString()}
										</TableCell>
										<TableCell>
											{student.lessons && student.lessons.length > 0
												? student.lessons
														.map(lesson => lesson.lesson_name)
														.join(', ')
												: 'None'}
										</TableCell>
										<TableCell className='text-right'>
											<Button
												variant='destructive'
												size='sm'
												onClick={() => handleDeleteClick(student.student_id!)}
											>
												Delete
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>

			<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm Deletion</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete this student? This action cannot
							be undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button variant='outline' onClick={cancelDelete}>
							Cancel
						</Button>
						<Button
							variant='destructive'
							onClick={confirmDelete}
							disabled={deleteStudent.isPending}
						>
							{deleteStudent.isPending ? 'Deleting...' : 'Delete'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}
