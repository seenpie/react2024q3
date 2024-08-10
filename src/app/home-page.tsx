import { Main } from "@/components/Main/Main";
import { Detail } from "@/components/Detail/Detail.tsx";
import Loader from "@/components/Loader/Loader.tsx";
import { Suspense } from "react";
import { ISearchParams } from "@/app/interfaces.ts";

export default async function Home({
  searchParams
}: {
  searchParams: ISearchParams;
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
