import * as yup from "yup";

export const yupSchema = yup
  .object({
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
    gender: yup.string().required("gender is required"),
    acceptTerms: yup
      .boolean()
      .oneOf([true], "you should accept terms")
      .required("accepts terms is required"),
    picture: yup
      .mixed()
      .required("file is required")
      .test("fileSize", "file is too weight", (value) => {
        return value && value[0] && value[0].size <= 2 * 1024 * 1024;
      })
      .test("fileFormat", "format isn't supported", (value) => {
        return (
          value &&
          value[0] &&
          ["image/png", "image/jpeg"].includes(value[0].type)
        );
      })
  })
  .required();
