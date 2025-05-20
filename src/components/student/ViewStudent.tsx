'use client'

import { useState } from 'react'
import { useStudent } from '@/hooks/useStudents'
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
import { toast } from 'sonner'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { ErrorDisplay } from '@/components/ErrorDisplay'

interface ViewStudentProps {
	onClose: () => void
}

export function ViewStudent({ onClose }: ViewStudentProps) {
	const [studentId, setStudentId] = useState<string>('')
	const [searchPerformed, setSearchPerformed] = useState<boolean>(false)

	const { data: student, isLoading, error, refetch } = useStudent(studentId)

	const handleSearch = async () => {
		if (!studentId) {
			toast.error('Please enter a student ID')
			return
		}

		await refetch()
		setSearchPerformed(true)
	}

	return (
		<Card className='w-full max-w-xl mx-auto'>
			<CardHeader>
				<CardTitle className='text-center'>View Student</CardTitle>
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
							{isLoading && <LoadingSpinner text='Loading student data...' />}

							{error && (
								<ErrorDisplay message='Student not found or error occurred.' />
							)}

							{student && (
								<div className='space-y-6 mt-6'>
									<h3 className='font-semibold text-lg'>Student Information</h3>

									<div className='grid grid-cols-2 gap-4'>
										<div>
											<p className='text-sm font-medium'>Student ID:</p>
											<p>{student.student_id}</p>
										</div>
										<div>
											<p className='text-sm font-medium'>Name:</p>
											<p>
												{student.first_name} {student.last_name}
											</p>
										</div>
										<div>
											<p className='text-sm font-medium'>Age:</p>
											<p>{student.age}</p>
										</div>
										<div>
											<p className='text-sm font-medium'>Grade:</p>
											<p>{student.grade}</p>
										</div>
										<div className='col-span-2'>
											<p className='text-sm font-medium'>Registration Date:</p>
											<p>
												{new Date(
													student.registration_date
												).toLocaleDateString()}
											</p>
										</div>
									</div>

									<div className='mt-6'>
										<h3 className='font-semibold text-lg mb-3'>
											Enrolled Lessons
										</h3>

										{student.lessons && student.lessons.length > 0 ? (
											<Table>
												<TableHeader>
													<TableRow>
														<TableHead>Lesson ID</TableHead>
														<TableHead>Lesson Name</TableHead>
													</TableRow>
												</TableHeader>
												<TableBody>
													{student.lessons.map((lesson: Lesson) => (
														<TableRow key={lesson.lesson_id}>
															<TableCell>{lesson.lesson_id}</TableCell>
															<TableCell>{lesson.lesson_name}</TableCell>
														</TableRow>
													))}
												</TableBody>
											</Table>
										) : (
											<p className='text-slate-500 italic'>
												No lessons enrolled
											</p>
										)}
									</div>

									<div className='flex justify-end mt-6'>
										<Button onClick={onClose}>Close</Button>
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
