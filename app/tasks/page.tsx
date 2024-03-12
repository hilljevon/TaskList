import AuthButton from '@/components/AuthButton'
import AllTasks from '@/components/tasks/AllTasks'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

import TaskSheet from '@/components/tasks/TaskSheet'

const page = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/')
    }
    const { data: tasks } = await supabase.from('tasks').select()
    return (
        <>
            <div className="flex-1 w-full flex flex-col gap-10 items-center">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                    <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                        <Button>
                            <Link
                                href='/'
                            >
                                Home
                            </Link>
                        </Button>
                        <AuthButton />
                    </div>
                </nav>
                <TaskSheet />
                <div className='max-w-5xl flex items-center justify-center'>
                    <AllTasks tasks={tasks} />
                </div>
            </div>
        </>
    )
}

export default page