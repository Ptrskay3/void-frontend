import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ value, language, ...props }: any) => {
  return (
    <SyntaxHighlighter language={language} {...props}>
      {/* it doesn't auto-escape ``` or ~~~, so this is the workaround*/}
      {value || ""}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
