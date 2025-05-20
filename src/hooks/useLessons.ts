import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { lessonApi } from '@/services/api'
import { toast } from 'sonner'

// Lesson Query Keys
export const lessonKeys = {
	all: ['lessons'] as const,
	details: (id: string) => [...lessonKeys.all, id] as const,
}

// Get All Lessons
export const useLessons = () => {
	return useQuery({
		queryKey: lessonKeys.all,
		queryFn: async () => {
			const response = await lessonApi.getAll()
			return response.data
		},
	})
}

// Get Lesson by ID
export const useLesson = (id: string) => {
	return useQuery({
		queryKey: lessonKeys.details(id),
		queryFn: async () => {
			const response = await lessonApi.getById(id)
			return response.data
		},
		enabled: !!id,
	})
}

// Create Lesson
export const useCreateLesson = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (newLesson: { lesson_name: string }) =>
			lessonApi.create(newLesson),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: lessonKeys.all })
			toast.success('Lesson added successfully')
		},
		onError: error => {
			toast.error('Failed to add lesson')
			console.error(error)
		},
	})
}
