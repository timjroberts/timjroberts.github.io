import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierForestLight as style } from "react-syntax-highlighter/dist/esm/styles/hljs";

export type CodeProps = {
  lang: string;
  code: string;
};

export const Code: React.FC<CodeProps> = ({ lang, code }: CodeProps) => {
  return (
    <SyntaxHighlighter customStyle={{fontSize: "smaller"}} language={lang} style={style}>
      {code}
    </SyntaxHighlighter>
  );
}