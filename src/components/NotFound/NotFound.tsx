import Link from "next/link";
import { Layout } from "../Layout/Layout.tsx";

export function NotFound() {
  return (
    <Layout>
      <div>Not Found</div>
      <Link href="/">back</Link>
    </Layout>
  );
}
