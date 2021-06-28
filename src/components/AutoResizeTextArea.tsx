import { Textarea } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";
import React from "react";

export const AutoResizeTextArea = React.forwardRef((props, ref) => {
  return (
    <Textarea
      minH="unset"
      overflow="hidden"
      w="100%"
      resize="none"
      ref={ref as any}
      minRows={1}
      as={ResizeTextarea}
      {...props}
    />
  );
});
