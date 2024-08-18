import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "@/index.css";
import { FormData, Genders, yupSchema } from "@/models";
import { useDispatch } from "react-redux";
import { AppDispatch, setFormHookData } from "@/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { InputFile } from "@/components/InputFile/InputFile";
import { InputPassword } from "@/components/InputPassword/InputPassword";
import { getAutoCompleteValue } from "@/utils";
import { InputCountry } from "@/components/InputCountry/InputCountry";

export const FormHookPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue
  } = useForm<FormData>({
    resolver: yupResolver(yupSchema),
    mode: "onChange"
  });

  const [attachment, setAttachment] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    const dispatchData = {
      ...data,
      attachment
    };
    dispatch(setFormHookData(dispatchData));
    navigate("/");
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span>name:</span>
          <input type="text" {...register("name")} />
          {errors.name?.message && <span>{errors.name?.message}</span>}
        </label>

        <label>
          <span>age:</span>
          <input type="number" {...register("age")} />
          {errors.age?.message && <span>{errors.age?.message}</span>}
        </label>

        <label>
          <span>email:</span>
          <input
            type="email"
            {...register("email")}
            autoComplete={getAutoCompleteValue("email")}
          />
          {errors.email?.message && <span>{errors.email?.message}</span>}
        </label>

        <InputPassword
          text="password:"
          type="password"
          label="password"
          register={register}
          errorMessage={errors.password?.message}
          watch={watch}
        />

        <label>
          <span>confirm password:</span>
          <input
            type="password"
            autoComplete={getAutoCompleteValue("password")}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message && (
            <span>{errors.confirmPassword?.message}</span>
          )}
        </label>

        <label>
          <span>gender:</span>
          <span>
            <label>
              <input
                type="radio"
                value={Genders.FEMALE}
                {...register("gender")}
              />
              {Genders.FEMALE}
            </label>
            <label>
              <input
                type="radio"
                value={Genders.MALE}
                {...register("gender")}
              />
              {Genders.MALE}
            </label>
          </span>
          {errors.gender?.message && <span>{errors.gender?.message}</span>}
        </label>

        <label>
          <span>accept terms:</span>
          <span>
            <input type="checkbox" {...register("acceptTerms")} />I agree with
            something
          </span>
          {errors.acceptTerms?.message && (
            <span>{errors.acceptTerms?.message}</span>
          )}
        </label>

        <InputFile
          text="attachment:"
          type="file"
          label="attachment"
          register={register}
          errorMessage={errors.attachment?.message}
          callback={setAttachment}
        />

        <InputCountry
          register={register}
          label="country"
          type="text"
          text="country:"
          watch={watch}
          errorMessage={errors.country?.message}
          setValue={(value: string) =>
            setValue("country", value, { shouldValidate: true })
          }
        />

        <button type="submit" disabled={!isValid}>
          submit
        </button>
      </form>
    </>
  );
};
