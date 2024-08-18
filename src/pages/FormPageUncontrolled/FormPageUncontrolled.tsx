import { FormEvent, useState } from "react";
import "@/layouts/index.css";
import { Genders, ParsedFormData, ValidationErrors, yupSchema } from "@/models";
import { InputPasswordUncontrolled } from "@/components/InputPasswordUncontrolled/InputPasswordUncontrolled";
import { InputFile } from "@/components/InputFile/InputFile";
import { getAutoCompleteValue } from "@/utils";
import { useDispatch } from "react-redux";
import { AppDispatch, setFormUncontrolledData } from "@/store";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { InputCountryUncontrolled } from "@/components/InputCountryUncontrolled/InputCountryUncontrolled";

export const FormPageUncontrolled = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [attachment, setAttachment] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    const yupData = {
      ...data,
      acceptTerms: data.acceptTerms === "on" && true
    };

    try {
      const res = yupSchema.validateSync(yupData, { abortEarly: false });
      const dispatchData = {
        ...res,
        attachment
      } as ParsedFormData;

      dispatch(setFormUncontrolledData(dispatchData));
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof yup.ValidationError) {
        const errorsList: Record<string, { message: string }> = {};

        error.inner.forEach(({ path, message }) => {
          if (path) {
            errorsList[path] = { message };
          }
        });

        setErrors(errorsList);
      }
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          <span>name:</span>
          <input type="text" name="name" />
          {errors.name?.message && <span>{errors.name?.message}</span>}
        </label>

        <label>
          <span>age:</span>
          <input type="number" name="age" />
          {errors.age?.message && <span>{errors.age?.message}</span>}
        </label>

        <label>
          <span>email:</span>
          <input
            type="email"
            name="email"
            autoComplete={getAutoCompleteValue("email")}
          />
          {errors.email?.message && <span>{errors.email?.message}</span>}
        </label>

        <InputPasswordUncontrolled
          type="password"
          text="password:"
          label="password"
          errorMessage={errors.password?.message}
        />

        <label>
          <span>confirm password:</span>
          <input
            type="password"
            name="confirmPassword"
            autoComplete={getAutoCompleteValue("password")}
          />
          {errors.confirmPassword?.message && (
            <span>{errors.confirmPassword?.message}</span>
          )}
        </label>

        <label>
          <span>gender:</span>
          <span>
            <label>
              <input type="radio" value={Genders.FEMALE} name="gender" />
              {Genders.FEMALE}
            </label>
            <label>
              <input type="radio" value={Genders.MALE} name="gender" />
              {Genders.MALE}
            </label>
          </span>
          {errors.gender?.message && <span>{errors.gender?.message}</span>}
        </label>

        <label>
          <span>accept terms:</span>
          <span>
            <input type="checkbox" name="acceptTerms" />I agree with something
          </span>
          {errors.acceptTerms?.message && (
            <span>{errors.acceptTerms?.message}</span>
          )}
        </label>

        <InputFile
          text="attachment:"
          label="attachment"
          type="file"
          errorMessage={errors.attachment?.message}
          callback={setAttachment}
        />

        <InputCountryUncontrolled errorMessage={errors.country?.message} />

        <button type="submit">submit</button>
      </form>
    </>
  );
};
