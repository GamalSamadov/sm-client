import axios from 'axios'

const baseURL =
	process.env.NEXT_PUBLIC_API_URL ||
	'https://sm-api-962561856383.europe-west1.run.app/api'

export const api = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 10000, // 10 seconds timeout
})

// Request interceptor for API calls
api.interceptors.request.use(
	config => {
		// You can add authentication headers here if needed
		// For example: config.headers.Authorization = `Bearer ${getToken()}`;
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

// Response interceptor for API calls
api.interceptors.response.use(
	response => {
		return response
	},
	error => {
		console.error('API Error:', error.response?.data || error.message)
		return Promise.reject(error)
	}
)

// Student API
export const studentApi = {
	getAll: () => api.get('/students'),
	getById: (id: string) => api.get(`/students/${id}`),
	create: (data: Student) => {
		console.log('Creating student with data:', JSON.stringify(data))

		// Create a modified version of the student data for the API
		const studentData = {
			first_name: data.first_name,
			last_name: data.last_name,
			age: data.age,
			grade: data.grade,
			registration_date: data.registration_date,
		}

		// Extract lesson IDs if present
		const lessonIds = data.lessons?.map(lesson => lesson.lesson_id) || []

		// The server expects a nested structure with a 'student' property
		// and lessonIds (camelCase) outside the student object
		return api.post('/students', {
			student: studentData,
			lessonIds: lessonIds,
		})
	},
	update: (data: Student) => {
		if (!data.student_id) {
			throw new Error('Student ID is required for update')
		}

		// Create a modified version of the student data for the API
		const studentData = {
			first_name: data.first_name,
			last_name: data.last_name,
			age: data.age,
			grade: data.grade,
			registration_date: data.registration_date,
		}

		// Extract lesson IDs if present
		const lessonIds = data.lessons?.map(lesson => lesson.lesson_id) || []

		// Also use the nested structure for updates with lessonIds in camelCase
		return api.put(`/students/${data.student_id}`, {
			student: studentData,
			lessonIds: lessonIds,
		})
	},
	delete: (id: string) => api.delete(`/students/${id}`),
}

// Lesson API
export const lessonApi = {
	getAll: () => api.get('/lessons'),
	getById: (id: string) => api.get(`/lessons/${id}`),
	create: (data: { lesson_name: string }) => {
		console.log('Creating lesson with data:', JSON.stringify(data))
		// The server expects a nested structure with a 'lesson' property
		return api.post('/lessons', { lesson: { lesson_name: data.lesson_name } })
	},
	update: (data: Lesson) => {
		// Also use the nested structure for updates
		return api.put(`/lessons/${data.lesson_id}`, {
			lesson: { lesson_name: data.lesson_name },
		})
	},
	delete: (id: string) => api.delete(`/lessons/${id}`),
}

// Types
export interface Student {
	student_id?: string
	first_name: string
	last_name: string
	age: number
	grade: string
	registration_date: string
	lessons?: Lesson[]
}

export interface Lesson {
	lesson_id: string
	lesson_name: string
}

export interface StudentLesson {
	student_id: string
	lesson_id: string
}
