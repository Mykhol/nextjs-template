import { Navbar } from "@/components/navbar/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth/Auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default async function Page() {
  const session = await auth();

  return (
    <div>
      <Navbar />
      <div className="p-10 flex w-full">
        <div className={"w-1/3"}>
          <h1 className="text-3xl font-semibold">Account</h1>
          <Button asChild variant={"link"} className={"p-0"}>
            <Link href={"#general"}>General</Link>
          </Button>
        </div>
        <div className={"w-full"}>
          <Card className={"w-full p-2"} id={"general"}>
            <CardHeader>
              <CardTitle>General</CardTitle>
              <CardDescription>General account settings</CardDescription>
            </CardHeader>
            <CardContent className={"flex flex-col gap-4"}>
              <div>
                <Label>Name</Label>
                <Input defaultValue={session?.user?.name || undefined} />
              </div>

              <div>
                <Label>Email</Label>
                <Input defaultValue={session?.user?.email || undefined} />
              </div>

              <div className={"flex items-center gap-4"}>
                {session?.user?.image && (
                  <Avatar>
                    <AvatarImage src={session?.user?.image} />
                  </Avatar>
                )}
                <div>
                  <Label>Profile Image</Label>
                  <Input type={"file"} />
                </div>
              </div>

              <div>
                <Button>Save</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
