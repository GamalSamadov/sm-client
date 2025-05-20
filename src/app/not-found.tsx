'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function NotFound() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen p-6 bg-slate-50'>
			<Card className='w-full max-w-md shadow-lg'>
				<CardHeader className='text-center bg-slate-100 rounded-t-lg'>
					<CardTitle className='text-2xl font-bold text-slate-800'>
						404 - Page Not Found
					</CardTitle>
				</CardHeader>
				<CardContent className='p-8 text-center'>
					<div className='mb-6'>
						<p className='text-4xl font-bold text-slate-400 mb-4'>404</p>
						<p className='text-lg text-slate-700 mb-6'>
							The page you were looking for does not exist.
						</p>
					</div>

					<Link href='/'>
						<Button>Return to Home</Button>
					</Link>
				</CardContent>
			</Card>
		</div>
	)
}
