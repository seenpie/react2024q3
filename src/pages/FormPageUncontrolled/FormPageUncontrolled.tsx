import { FormEvent, useRef } from "react";
import "../../layouts/index.css";

export const FormPageUncontrolled = () => {
  const ref = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(`Submitted value: ${ref.current?.value}`);
  };

  return (
    <main className="page">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" ref={ref} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};
