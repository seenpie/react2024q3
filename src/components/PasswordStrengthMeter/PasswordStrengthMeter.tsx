import { calculateStrength } from "@/utils";
import classes from "./PasswordStrengthMeter.module.css";

export const PasswordStrengthMeter = ({ value }: { value: string }) => {
  const strength = calculateStrength(value);

  return (
    <div className={classes.line}>
      {Array.from({ length: strength }).map((_, id) => (
        <div key={id} className={classes.pipe} />
      ))}
    </div>
  );
};
