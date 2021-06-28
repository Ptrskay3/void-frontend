import React from "react";
import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from "remark-math";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import CodeBlock from "./CodeBlock";

const _mapProps = (props: any) => ({
  ...props,
  escapeHtml: true,
  plugins: [RemarkMathPlugin],
  renderers: {
    ...props.renderers,
    code: CodeBlock,
    math: ({ value }: any) => <BlockMath>{value}</BlockMath>,
    inlineMath: ({ value }: any) => <InlineMath>{value}</InlineMath>,
  },
});

const MathInputArea = (props: any) => <ReactMarkdown {..._mapProps(props)} />;

export default MathInputArea;
