'use server'
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
export async function addNewTask(task: string) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/')
    }
    await supabase.from('tasks').insert({
        user_id: data.user.id,
        title: task,
        completed: 'FALSE'
    })
    return true
}
export async function deleteTask(id: number) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/')
    }
    await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
        .select()
    return true
}