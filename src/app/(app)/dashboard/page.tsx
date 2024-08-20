import { createClient } from "@/app/utils/supabase/server";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default async function Dashboard() {
  const supabase = createClient()

  const { data, } = await supabase.auth.getUser()
  const user = data?.user
  return (
    <MaxWidthWrapper>
      <main className="flex-1 px-4 py-10 md:py-16 max-w-4xl xl:max-w-6xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500 bg-clip-text text-transparent">Dashboard</h1>
          <p className="text-muted-foreground font-medium ">
            Welcome back{" "}
            {user ? (
              user?.user_metadata.full_name + " 👋"
            ) : (
              <span className="animate-pulse">...</span>
            )}
          </p>
        </div>
        <div className="grid  gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Monthly Generations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {isLoading ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    user?.uploadCounts.length
                  )}{" "}
                  /{" "}
                  {user?.Unlimited
                    ? "Unlimited"
                    : process.env.NEXT_PUBLIC_GENERATION_LIMIT}
                </p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Pro plan coming soon...
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </MaxWidthWrapper >
  )
}

