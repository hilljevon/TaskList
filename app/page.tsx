import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function Index() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  if (!error || data?.user) {
    const { data: tasks } = await supabase.from('tasks').select()
    console.log('MY TASKS HERE', tasks)
  }
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
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
      {!error ? (
        <h1>We have a user!</h1>
      ) : (
        <h1>{`We don't have a user :(`}</h1>
      )}
    </div>
  );
}
