import { useEffect, useState } from "react";
import { IPokemonData } from "../../api/api.ts";
import classes from "./Detail.module.scss";

interface IDetailProps {
  data: IPokemonData;
  onClick: () => void;
}

function Detail({ data, onClick }: IDetailProps) {
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const description =
      data.description.flavor_text_entries.find(
        (item) => item.language.name === "en"
      )?.flavor_text ?? "not found description";
    setDescription(description);
  }, [data.description.flavor_text_entries]);

  return (
    <div className={classes.wrapper}>
      <button className={classes.button_back} onClick={onClick}>
        #back
      </button>
      <div className={classes.pokemon__wrapper}>
        <div className={classes.pokemon}>
          <div className={classes.image}>
            <img src={data.image} alt={data.pokemon.name} />
          </div>
          <div className={classes.information}>
            <div className={classes.information__name}>
              Name:
              <h2>{data.pokemon.name}</h2>
            </div>
            <div>
              Description:
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
