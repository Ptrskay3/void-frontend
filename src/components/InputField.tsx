import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes, useRef } from "react";
import { AutoResizeTextArea } from "./AutoResizeTextArea";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea = false,
  size: _, // rename unused
  ...props
}) => {
  const ref = useRef(null);
  let InputOrTextArea = Input;
  if (textarea) {
    InputOrTextArea = AutoResizeTextArea as any;
  }
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextArea
        ref={ref}
        {...field}
        id={field.name}
        placeholder={props.placeholder}
        {...props}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
