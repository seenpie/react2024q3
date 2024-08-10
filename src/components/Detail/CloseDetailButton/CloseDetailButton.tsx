"use client";

import { useCloseDetailButton } from "@/components/Detail/CloseDetailButton/CloseDetailButton.hooks.ts";

export function CloseDetailButton({ className }: { className?: string }) {
  const { handleClose } = useCloseDetailButton();

  return (
    <button className={className} onClick={handleClose}>
      #close
    </button>
  );
}
