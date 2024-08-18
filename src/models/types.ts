import { PayloadAction } from "@reduxjs/toolkit";
import { HTMLInputTypeAttribute, ReactNode } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister
} from "react-hook-form";
import { Genders } from "@/models";

export type FormPayloadAction = PayloadAction<ParsedFormData>;

export type FormState = {
  formHook: ParsedFormData[];
  formUncontrolled: ParsedFormData[];
};

export type FormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: Genders;
  acceptTerms: NonNullable<boolean | undefined>;
  country: string;
  attachment: File;
};

export type ParsedFormData = Omit<FormData, "attachment"> & {
  attachment: string;
};

export type FileInputProps = Omit<
  InputProps<FormData>,
  "options" | "children"
> & {
  callback: (value: string) => void;
};

export type InputProps<T extends FieldValues> = {
  text: string;
  label: Path<T>;
  register: UseFormRegister<T>;
  errorMessage: string | undefined;
  type: HTMLInputTypeAttribute;
  options?: { value: string }[];
  children?: ReactNode;
};

export type ValidationErrors = {
  name?: FieldError;
  age?: FieldError;
  email?: FieldError;
  password?: FieldError;
  confirmPassword?: FieldError;
  acceptTerms?: FieldError;
  attachment?: FieldError;
  country?: FieldError;
  gender?: FieldError;
};
