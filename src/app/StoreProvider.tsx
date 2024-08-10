"use client";

import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { AppState, makeStore } from "@/state";

export function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppState>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
