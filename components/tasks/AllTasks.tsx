'use client'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { TrashIcon } from 'lucide-react'
import { deleteTask } from '@/lib/calls'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation'

const AllTasks = ({ tasks }: { tasks: tasksInterface[] | null }) => {
    const router = useRouter()
    const handleDelete = async (id: number) => {
        await deleteTask(id)
        router.refresh()
    }
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Completed</TableHead>
                        <TableHead className="">
                            Mark Completed
                        </TableHead>
                        <TableHead className="text-right">
                            Delete
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks?.map((task: tasksInterface) => (
                        <TableRow key={task.id}>
                            <TableCell className="font-medium"> {task.id} </TableCell>
                            <TableCell> {task.title} </TableCell>
                            <TableCell> {JSON.stringify(task.completed)} </TableCell>
                            <TableCell className="">
                                <Checkbox className='bg-slate-300' />
                            </TableCell>
                            <TableCell>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <TrashIcon
                                            className='hover:cursor-pointer'
                                            width={15}
                                        />
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your
                                                task and remove your data from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(task.id)}>Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </>
    )
}

export default AllTasks