import { Main } from "@/components/Main/Main";
import { Detail } from "@/components/Detail/Detail.tsx";
import Loader from "@/components/Loader/Loader.tsx";
import { Suspense } from "react";

export default async function Home({
  searchParams
}: {
  searchParams: { [key: string]: string };
}) {
  const { search, page, pokemon } = searchParams;

  return (
    <Suspense key="home" fallback={<Loader />}>
      <Main page={page} search={search}>
        {pokemon && (
          <Suspense key="detail" fallback={<Loader />}>
            <Detail name={pokemon} />
          </Suspense>
        )}
      </Main>
    </Suspense>
  );
}
