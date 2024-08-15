import { NavLink } from "react-router-dom";
import { AppRoutes } from "@/models";

export const Header = () => {
  return (
    <header>
      <NavLink to={AppRoutes.HOME_ROUTE}>main</NavLink>
      <NavLink to={AppRoutes.FORM_HOOK_ROUTE}>hook-form</NavLink>
      <NavLink to={AppRoutes.FORM_UNCONTROLLED_ROUTE}>
        uncontrolled form
      </NavLink>
    </header>
  );
};
