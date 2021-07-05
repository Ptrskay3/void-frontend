import { Textarea, Tooltip } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";
import React from "react";

export const AutoResizeTextArea = React.forwardRef((props, ref) => {
  return (
    <Tooltip
      hasArrow
      label="LaTex expressions can be inserted inside double dollar signs, e.g. $\bold{F}$. Markdown syntax is also supported. For example, insert a code snippet enclosed in two backticks:
      `print('Hello, World!')`"
      bg="red.600"
      placement="bottom-end"
      IsOpen
    >
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
    </Tooltip>
  );
});
