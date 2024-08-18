import * as yup from "yup";
import { countriesList } from "./countriesList";
import { Genders } from "./enums";

export const yupSchema = yup
  .object()
  .shape({
    name: yup
      .string()
      .matches(
        /^[A-Z][A-Za-z\s]*$/,
        "Name must start with an uppercase letter and contain only English letters and spaces"
      )
      .required("name is required"),

    age: yup
      .number()
      .transform((value, originalValue) =>
        originalValue.trim() === "" ? null : value
      )
      .nullable()
      .positive()
      .required("age is required"),

    email: yup.string().email("incorrect email").required("email is required"),

    password: yup
      .string()
      .required("password is required")
      .matches(/[0-9]/, "should contain at least 1 number")
      .matches(/[A-Z]/, "should contain at least 1 uppercased letter")
      .matches(/[a-z]/, "should contain at least 1 lowercase letter")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "should contain at least 1 special character"
      ),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "passwords aren't equal")
      .required("confirm is required"),

    gender: yup
      .string()
      .oneOf([Genders.FEMALE, Genders.MALE])
      .required("gender is required"),

    acceptTerms: yup
      .boolean()
      .oneOf([true], "you should accept terms")
      .required("accepts terms is required"),

    country: yup
      .string()
      .oneOf(countriesList, "you should type an available country")
      .required("country is required"),

    attachment: yup
      .mixed<File>()
      .required("file is required")
      .transform((value) => {
        return value instanceof FileList ? value[0] : value;
      })
      .test(
        "fileFormat",
        "format isn't supported",
        (value) =>
          value &&
          value instanceof File &&
          ["image/jpeg", "image/png"].includes(value.type)
      )
      .test(
        "fileSize",
        "file is too large",
        (value) =>
          value && value instanceof File && value.size <= 2 * 1024 * 1024
      )
  })
  .required();
