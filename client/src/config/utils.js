import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const escapeHtml = (unsafe) =>
  unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");

const buildList = (items, ordered) => {
  const tag = ordered ? "ol" : "ul";
  return `<${tag} class="ml-6 mb-4 ${ordered ? "list-decimal" : "list-disc"}">${items
    .map((item) => `<li>${item}</li>`)
    .join("")}</${tag}>`;
};

function markdownToHtml(md = "") {
  if (!md) return "";

  let html = escapeHtml(md);

  const codeBlocks = [];
  html = html.replace(/```([\s\S]*?)```/g, (match, p1) => {
    const placeholder = `@@CODE_BLOCK_${codeBlocks.length}@@`;
    codeBlocks.push(
      `<pre class="bg-gray-900 text-white p-3 rounded overflow-auto"><code>${escapeHtml(
        p1,
      )}</code></pre>`,
    );
    return placeholder;
  });

  html = html.replace(/^(#{1,6})\s*(.*)$/gim, (_, hashes, content) => {
    const level = Math.min(6, hashes.length);
    const classes =
      level === 1
        ? "text-3xl font-bold"
        : level === 2
        ? "text-2xl font-semibold"
        : "text-xl font-semibold";
    return `<h${level} class="${classes}">${content}</h${level}>`;
  });
  html = html.replace(
    /^> (.*)$/gim,
    '<blockquote class="border-l-4 border-slate-300 pl-4 italic text-slate-600">$1</blockquote>',
  );

  html = html.replace(/^(?:[-*]\s+.*(?:\r?\n|$))+/gm, (match) => {
    const items = match
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => line.replace(/^[-*]\s+/, ""));
    return buildList(items, false);
  });

  html = html.replace(/^(?:\d+\.\s+.*(?:\r?\n|$))+/gm, (match) => {
    const items = match
      .trim()
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => line.replace(/^\d+\.\s+/, ""));
    return buildList(items, true);
  });

  html = html.replace(
    /`([^`]+)`/g,
    '<code class="bg-gray-100 px-1 rounded">$1</code>',
  );
  html = html.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/gim, "<em>$1</em>");

  html = html
    .split(/\n\n+/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (/^<(h\d|ul|ol|blockquote|pre|code)/i.test(trimmed)) {
        return trimmed;
      }
      return trimmed
        .split(/\n/)
        .map((line) => (line ? `<p class="mb-2">${line}</p>` : ""))
        .join("");
    })
    .join("");

  codeBlocks.forEach((replacement, index) => {
    html = html.replace(`@@CODE_BLOCK_${index}@@`, replacement);
  });

  return html;
}

export { cn, markdownToHtml };
