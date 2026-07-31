import { useRef, useMemo } from "react";

const TEXT_TOOLBAR_BUTTONS = [
    { label: 'B', title: 'Bold', prefix: '**', suffix: '**' },
    { label: 'I', title: 'Italic', prefix: '*', suffix: '*' },
    { label: 'H2', title: 'Heading', prefix: '## ', suffix: '' },
    { label: 'Quote', title: 'Blockquote', prefix: '> ', suffix: '' },
    { label: 'Code', title: 'Code block', prefix: '```\n', suffix: '\n```' },
    { label: 'Clear', title: 'Clear', prefix: '', suffix: '' },
];

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function markdownToHtml(md = '') {
    if (!md) return '';
    let html = escapeHtml(md);

    // Code blocks ``` ```
    html = html.replace(/```([\s\S]*?)```/g, (m, p1) => `<pre class="bg-gray-900 text-white p-3 rounded overflow-auto"><code>${escapeHtml(p1)}</code></pre>`);

    // Inline code `code`
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>');

    // Headings
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold">$1</h1>');

    // Bold and italic
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

    // Paragraphs
    html = html.replace(/^(?!<h|<ul|<pre|<li|<code|<img)(.+)$/gim, '<p class="mb-2">$1</p>');

    return html;
}

const TextEditor = ({ error, field }) => {
    const textareaRef = useRef(null);

    const insertMarkdown = (prefix, suffix = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        if (prefix === '' && suffix === '') {
            field.value = '';
        }

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = (field.value || '').slice(start, end) || '';
        const newValue =
            (field.value || '').slice(0, start) +
            prefix +
            selectedText +
            suffix +
            (field.value || '').slice(end);

        field.onChange(newValue);
        // move cursor to end of inserted content
        const cursorPos = start + prefix.length + selectedText.length + suffix.length;
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(cursorPos, cursorPos);
        }, 0);
    };

    const previewHtml = useMemo(() => markdownToHtml(field.value), [field.value]);

    return (
        <div className="w-full px-3 py-5 text-sm">
            <div className="flex md:flex-col items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">Notes</h2>
                <div className="flex gap-2">
                    {TEXT_TOOLBAR_BUTTONS.map((btn) => (
                        <button
                            key={btn.label}
                            type="button"
                            title={btn.title}
                            onClick={() => insertMarkdown(btn.prefix, btn.suffix)}
                            className="px-3 py-1 bg-white border border-gray-200 rounded shadow-sm text-xs hover:bg-gray-50 cursor-pointer active:scale-94 hover:font-bold hover:scale-96"
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div>
                    <textarea
                        ref={textareaRef}
                        name={field.name}
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e.target.value)}
                        onBlur={field.onBlur}
                        placeholder="Write your notes in Markdown..."
                        className="w-full min-h-[300px] p-4 rounded-lg border border-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white shadow-sm text-sm"
                    />
                    {error && (
                        <p className="pl-1 pt-1 text-xs font-normal leading-tight text-red-400">{error}</p>
                    )}
                </div>

                <div>
                    <div className="min-h-[250px] p-4 rounded-lg border border-gray-100 bg-gray-50 shadow-sm overflow-auto prose max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextEditor;