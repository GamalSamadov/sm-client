import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { studentApi, Student } from '@/services/api'
import { toast } from 'sonner'

// Student Query Keys
export const studentKeys = {
	all: ['students'] as const,
	details: (id: string) => [...studentKeys.all, id] as const,
}

// Get All Students
export const useStudents = () => {
	return useQuery({
		queryKey: studentKeys.all,
		queryFn: async () => {
			const response = await studentApi.getAll()
			return response.data
		},
	})
}

// Get Student by ID
export const useStudent = (id: string) => {
	return useQuery({
		queryKey: studentKeys.details(id),
		queryFn: async () => {
			const response = await studentApi.getById(id)
			return response.data
		},
		enabled: !!id,
	})
}

// Create Student
export const useCreateStudent = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (newStudent: Student) => studentApi.create(newStudent),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: studentKeys.all })
			toast.success('Student added successfully')
		},
		onError: error => {
			toast.error('Failed to add student')
			console.error(error)
		},
	})
}

// Update Student
export const useUpdateStudent = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (updatedStudent: Student) => studentApi.update(updatedStudent),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: studentKeys.all })
			if (variables.student_id) {
				queryClient.invalidateQueries({
					queryKey: studentKeys.details(variables.student_id),
				})
			}
			toast.success('Student updated successfully')
		},
		onError: error => {
			toast.error('Failed to update student')
			console.error(error)
		},
	})
}

// Delete Student
export const useDeleteStudent = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: string) => studentApi.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: studentKeys.all })
			toast.success('Student deleted successfully')
		},
		onError: error => {
			toast.error('Failed to delete student')
			console.error(error)
		},
	})
}
