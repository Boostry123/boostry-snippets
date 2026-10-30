import { useState } from "react";

type FormItem = "text" | "email" | "password" | "checkbox" | "file";
type FormValue = Record<string, string | boolean | File | null>;
interface FormProps {
  forms: Record<string, FormItem>;
  onSubmit: (form: FormValue) => void;
  buttonTitle?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  checkboxClassName?: string;
}

export default function DynamicForm({
  forms,
  onSubmit,
  buttonTitle = "Submit",
  className = "",
  labelClassName = "",
  inputClassName = "",
  checkboxClassName = "",
}: FormProps) {
  const [form, setForm] = useState<FormValue>(() =>
    Object.fromEntries(
      Object.entries(forms).map(([label, type]) =>
        type === "checkbox"
          ? [label, false]
          : type === "file"
            ? [label, null]
            : [label, ""],
      ),
    ),
  );

  return (
    <form
      className={`flex flex-col gap-4 p-4 border rounded ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      {Object.entries(forms).map(([label, type]) => {
        const itemIsCheckbox = type === "checkbox";
        const itemIsFile = type === "file";
        return (
          <div key={label}>
            <label
              className={`flex ${itemIsCheckbox ? "items-center gap-2" : "flex-col gap-1"} ${labelClassName}`}
            >
              {label}:
              <input
                className={`${itemIsCheckbox ? checkboxClassName : `border rounded px-2 py-1 ${inputClassName}`}`}
                name={label}
                type={type}
                onChange={(e) =>
                  setForm((prev) => {
                    return {
                      ...prev,
                      [label]: itemIsCheckbox
                        ? e.target.checked
                        : itemIsFile
                          ? (e.target.files?.[0] ?? null)
                          : e.target.value,
                    };
                  })
                }
              ></input>
            </label>
          </div>
        );
      })}
      <div>
        <button type={"submit"} className="border rounded px-4 py-2">
          {buttonTitle}
        </button>
      </div>
    </form>
  );
}
