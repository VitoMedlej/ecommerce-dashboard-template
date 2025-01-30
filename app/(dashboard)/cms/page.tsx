import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import CmsClient from "./components/CmsClient"



const Page = async () => {
    const session = await auth();

    if (!session) {
      redirect('/login');
    }
return (
    <CmsClient/>
)
}

export default Page