import { useCallback, useEffect, useState } from "react";
import classes from "./Detail.module.scss";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { getPokemonByName, IPokemonData } from "../../api/api";
import Loader from "../Loader/Loader";

function Detail() {
  const [description, setDescription] = useState<string>("");
  const [data, setData] = useState<IPokemonData>();
  const { pokemonId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    const path = searchParams ? `/?${searchParams}` : "/";
    navigate(path);
  }, [navigate, searchParams]);

  useEffect(() => {
    const fetchData = async (pokemonName: string) => {
      setLoading(true);
      const data = await getPokemonByName(pokemonName);

      if (data) {
        setData(data);
        const description =
          data.description.flavor_text_entries.find(
            (item) => item.language.name === "en"
          )?.flavor_text ?? "not found description";
        setDescription(description);
      }
      setLoading(false);
    };
    if (pokemonId) {
      fetchData(pokemonId);
    }
  }, [pokemonId]);

  if (loading) {
    return (
      <aside className={classes.wrapper}>
        <Loader />;
      </aside>
    );
  }

  if (!data) {
    return (
      <aside className={classes.wrapper}>
        <div>not found</div>;
      </aside>
    );
  }

  return (
    <aside className={classes.wrapper}>
      <button className={classes.button} onClick={handleClose}>
        #close
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
    </aside>
  );
}

export default Detail;
