import { auth } from "@/lib/auth";
import AnalyticsClient from "./components/AnalyticsClient";
import { redirect } from "next/navigation";


const Page = async () => {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }
    return <AnalyticsClient/>
};

export default Page;
