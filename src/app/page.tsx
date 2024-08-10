import Home from "@/app/home-page.tsx";

export default function Page({
  searchParams
}: {
  searchParams: { [key: string]: string };
}) {
  return <Home searchParams={searchParams} />;
}
