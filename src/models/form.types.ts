import { Genders } from "@/models";

export type FormState = {
  formHook: FormData[];
  formUncontrolled: FormData[];
};

export type FormData = {
  name: number;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: Genders;
  acceptTerms: boolean;
  picture: FileList;
  country: string;
};
