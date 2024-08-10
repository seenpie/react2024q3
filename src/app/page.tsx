import Home from "@/app/home-page.tsx";
import { ISearchParams } from "@/app/interfaces.ts";

export default function Page({
  searchParams
}: {
  searchParams: ISearchParams;
}) {
  return <Home searchParams={searchParams} />;
}
