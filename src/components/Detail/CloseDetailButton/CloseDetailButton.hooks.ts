import { useRouter, useSearchParams } from "next/navigation";

export function useCloseDetailButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClose = () => {
    const { page, search } = {
      page: searchParams?.get("page"),
      search: searchParams?.get("search")
    };
    const newQuery = new URLSearchParams({
      ...(page && { page }),
      ...(search && { search })
    }).toString();
    router.replace(`?${newQuery}`);
  };

  return { handleClose };
}
