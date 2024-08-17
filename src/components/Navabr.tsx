import { FileInput, Github, GithubIcon } from "lucide-react"
import MaxWidthWrapper from "./MaxWidthWrapper"
import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { createClient } from "@/app/utils/supabase/server";

export const Navabr = async () => {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  const user = data.user

  return (
    <nav className="inset-x-0 h-14  w-full mt-2 sticky top-0 right-0  flex items-center bg-background">
      <MaxWidthWrapper>
        <div className="flex justify-between items-center h-full -mx-8">
          <div className="text-black font-bold gap-2 flex -mx-8">
            <FileInput className="h-6 w-6 text-black" />
            <Link href="/">
              Sync
            </Link>
          </div>
          <div className="flex justify-center items-center gap-4">
            <Link className={buttonVariants({ "className": "border-gray-400 border-2", "variant": "ghost", "size": "icon" })} href={'/github.com'}>
              <GitHubLogoIcon className="h-5 w-5 text-black " />
            </Link>
            <Link href={user ? "/dashboard" : "/login"} >
              {user ?
                <Button variant={"secondary"}>DashBoard</Button> :
                <Button variant={"secondary"}>SignIn</Button>
              }
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

