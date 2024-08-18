import { HTMLInputTypeAttribute } from "react";

export const getAutoCompleteValue = (type: HTMLInputTypeAttribute) => {
  switch (type) {
    case "password":
      return "new-password";
    case "email":
      return "username";
  }
};
