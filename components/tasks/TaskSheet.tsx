'use client'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import NewTask from '@/components/tasks/NewTask'
const TaskSheet = () => {
    return (
        <>
            <Sheet>
                <SheetTrigger >
                    <p className='border rounded-lg p-3 hover:bg-slate-600 hover:text-white'>
                        New Task
                    </p>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Add New Task</SheetTitle>
                        <SheetDescription>
                            <NewTask />
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default TaskSheet