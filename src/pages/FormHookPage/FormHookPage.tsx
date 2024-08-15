import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "@/index.css";
import { Input } from "@/components/Input/Input.tsx";
import { FormData, Genders, yupSchema } from "@/models";
import { useDispatch } from "react-redux";
import { AppDispatch, setFormHookData } from "@/store";
import { parsePictureToString } from "@/utils";
import { useNavigate } from "react-router-dom";
import { AutocompleteCountry } from "@/components/AutocompleteCountry/AutocompleteCountry.tsx";

export const FormHookPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(yupSchema) });

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    console.log(data);
    const parsed = parsePictureToString(data.picture[0]);
    data.picture = parsed;
    dispatch(setFormHookData(data));
    navigate("/");
  };

  // console.log(watch("name"));

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Input<FormData>
          type="text"
          label="name"
          register={register}
          errorMessage={errors.name?.message}
        />
        <Input
          type="number"
          label="age"
          register={register}
          errorMessage={errors.age?.message}
        />
        <Input
          type="email"
          label="email"
          register={register}
          errorMessage={errors.email?.message}
        />
        <Input
          type="password"
          label="password"
          register={register}
          errorMessage={errors.password?.message}
        />
        <Input
          type="password"
          label="confirmPassword"
          register={register}
          errorMessage={errors.confirmPassword?.message}
        />
        <Input
          type="radio"
          options={[{ value: Genders.male }, { value: Genders.female }]}
          label="gender"
          register={register}
          errorMessage={errors.gender?.message}
        />
        <Input
          type="checkbox"
          label="acceptTerms"
          register={register}
          errorMessage={errors.acceptTerms?.message}
        />
        <Input
          type="file"
          label="picture"
          register={register}
          errorMessage={errors.picture?.message}
        />
        <AutocompleteCountry />
        <button type="submit">submit</button>
      </form>
    </>
  );
};
