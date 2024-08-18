import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { CardList } from "@/components/CardList/CardList";
import classes from "./MainPage.module.css";
import { Link } from "react-router-dom";
import { AppRoutes, FormType } from "@/models";

export const MainPage = () => {
  const form = useSelector((state: RootState) => state.form);
  const { formHook, formUncontrolled } = form;

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <section>
          <Link to={AppRoutes.FORM_HOOK_ROUTE}>form hook</Link>
          <CardList cards={formHook} label={FormType.HOOK_FORM} />
        </section>
        <section>
          <Link to={AppRoutes.FORM_UNCONTROLLED_ROUTE}>form uncontrolled</Link>
          <CardList
            cards={formUncontrolled}
            label={FormType.UNCONTROLLED_FORM}
          />
        </section>
      </div>
    </div>
  );
};
