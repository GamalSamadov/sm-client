'use client'

import { KeyboardManager } from '@/components/KeyboardManager'
import { HelpDialog } from '@/components/HelpDialog'
import { StudentList } from '@/components/student/StudentList'

export default function Home() {
	return (
		<div className='flex flex-col min-h-screen p-6 bg-slate-50'>
			<KeyboardManager />
			<HelpDialog />

			<div className='container mx-auto max-w-6xl'>
				<header className='mb-8 text-center'>
					<h1 className='text-3xl font-bold text-slate-800 mb-2'>
						Student Management System
					</h1>
					<p className='text-slate-600'>
						Use keyboard shortcuts:{' '}
						<code className='bg-slate-100 px-1 rounded'>a</code> to add,
						<code className='bg-slate-100 px-1 rounded'>u</code> to update,
						<code className='bg-slate-100 px-1 rounded'>s</code> to view
						details,
						<code className='bg-slate-100 px-1 rounded'>l</code> to manage
						lessons
					</p>
				</header>

				<main>
					<StudentList />
				</main>

				<footer className='mt-8 text-center text-sm text-slate-500'>
					<p>Student Management System © {new Date().getFullYear()}</p>
				</footer>
			</div>
		</div>
	)
}
