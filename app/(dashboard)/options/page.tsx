import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import OptionsClient from "./components/OptionsClient";

const Page = async () => {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }
 return (
  
  <OptionsClient/>
)
};

export default Page;
