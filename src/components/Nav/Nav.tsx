import { Link } from "react-router-dom";
import { AppRoutes } from "@/models";

export const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={AppRoutes.FORM_UNCONTROLLED_ROUTE}>uncontrolled form</Link>
        </li>
        <li>
          <Link to={AppRoutes.FORM_HOOK_ROUTE}>hook form</Link>
        </li>
      </ul>
    </nav>
  );
};
