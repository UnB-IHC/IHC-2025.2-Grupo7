// /components/MarkdownView.tsx
"use client";

import ReactMarkdown from "react-markdown";

export default function MarkdownView({ content }: { content: string }) {
  return (
    <div className="w-full whitespace-pre-wrap break-words">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}