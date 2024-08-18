import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout/MainLayout.tsx";
import { MainPage } from "../pages/MainPage/MainPage.tsx";
import { FormPageUncontrolled } from "../pages/FormPageUncontrolled/FormPageUncontrolled.tsx";
import { FormHookPage } from "@/pages/FormHookPage/FormHookPage.tsx";
import { AppRoutes } from "@/models";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.HOME_ROUTE} element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route
            path={AppRoutes.FORM_UNCONTROLLED_ROUTE}
            element={<FormPageUncontrolled />}
          />
          <Route path={AppRoutes.FORM_HOOK_ROUTE} element={<FormHookPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
