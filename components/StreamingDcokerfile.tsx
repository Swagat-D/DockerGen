"use client";
import { useEffect, useState } from "react";

export default function StreamingDockerfile({ fullText }: { fullText: string }) {
  const [streamed, setStreamed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setStreamed((prev) => prev + fullText[i]);
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 15); // Typing speed

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <pre className="whitespace-pre-wrap font-mono text-sm bg-secondary/10 backdrop-blur-sm text-foreground p-4 rounded-md border border-border shadow-md">
      {streamed}
      {streamed.length < fullText.length && <span className="animate-pulse">|</span>}
    </pre>
  );
}