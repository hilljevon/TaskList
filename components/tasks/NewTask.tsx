"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { addNewTask } from "@/lib/calls"
import { useRouter } from "next/navigation"
const formSchema = z.object({
    task: z.string().min(2, {
        message: "Task must be at least 2 characters",
    }),
})
const NewTask = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            task: "",
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        await addNewTask(values.task)
        router.refresh()
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="task"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        placeholder="Add task here"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">
                        Submit
                    </Button>
                </form>
            </Form>
        </>
    )
}

export default NewTask