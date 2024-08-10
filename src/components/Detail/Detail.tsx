import classes from "./Detail.module.scss";
import { getPokemonImage } from "@/helpers";
import { ISelectedItemData } from "@/state/pageData/interfaces.ts";
import { CloseDetailButton } from "@/components/Detail/CloseDetailButton/CloseDetailButton.tsx";
import Image from "next/image";
import { getPokemonByName } from "@/services";

export async function Detail({ name }: { name: string }) {
  const data = await getPokemonByName(name);

  if (!data) {
    return (
      <aside className={classes.wrapper}>
        <div className={classes.notFound}>not found</div>
      </aside>
    );
  }

  const parsedPokemonData: ISelectedItemData | null = {
    name: data.name,
    height: data.height,
    weight: data.weight,
    experience: data.base_experience,
    type: data.types[0].type.name,
    image: getPokemonImage(data.name)
  };

  return (
    <aside className={classes.wrapper}>
      <CloseDetailButton className={classes.button} />
      <div className={classes.pokemon__wrapper}>
        <div className={classes.pokemon}>
          <div className={classes.image}>
            <Image
              src={parsedPokemonData.image}
              alt={parsedPokemonData.name}
              width={350}
              height={350}
              loading="eager"
            />
          </div>
          <div className={classes.information}>
            <div className={classes.information__name}>
              Name:
              <h2>{parsedPokemonData.name}</h2>
            </div>
            <div className={classes.detailInfo}>
              Info:
              <div>height: {parsedPokemonData.height}</div>
              <div>weight: {parsedPokemonData.weight}</div>
              <div>experience: {parsedPokemonData.experience}</div>
              <div>type: {parsedPokemonData.type}</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
