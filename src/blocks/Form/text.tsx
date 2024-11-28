import type { TextField } from "@payloadcms/plugin-form-builder/types";
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Error } from "./error";
import { Width } from "./width";

export const Text = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required,
  width,
}: TextField & {
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any;
    }>
  >;
  register: UseFormRegister<FieldValues>;
}) => {
  return (
    <Width width={width}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        defaultValue={defaultValue}
        id={name}
        type="text"
        {...register(name, { required })}
      />
      {required && errors[name] && <Error />}
    </Width>
  );
};
