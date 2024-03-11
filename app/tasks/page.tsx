import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/')
    }
    const { data: tasks } = await supabase.from('tasks').select()
    return <pre>{JSON.stringify(tasks, null, 2)}</pre>
}

export default page