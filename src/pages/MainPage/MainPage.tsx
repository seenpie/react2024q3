import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { CardList } from "@/components/CardList/CardList";
import classes from "./MainPage.module.css";
import { Link } from "react-router-dom";
import { AppRoutes } from "@/models";

export const MainPage = () => {
  const form = useSelector((state: RootState) => state.form);
  const { formHook, formUncontrolled } = form;

  return (
    <div className={classes.wrapper}>
      <h1>main page</h1>
      <div className={classes.content}>
        <section>
          <Link to={AppRoutes.FORM_HOOK_ROUTE}>form hook</Link>
          <CardList cards={formHook} label="form hook" />
        </section>
        <section>
          <Link to={AppRoutes.FORM_UNCONTROLLED_ROUTE}>form uncontrolled</Link>
          <CardList cards={formUncontrolled} label="form uncontrolled" />
        </section>
      </div>
    </div>
  );
};
