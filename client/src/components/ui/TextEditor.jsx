import { useRef, useMemo } from "react";
import { markdownToHtml } from "../../config/utils";

const TEXT_TOOLBAR_BUTTONS = [
    { label: 'B', title: 'Bold', prefix: '**', suffix: '**' },
    { label: 'I', title: 'Italic', prefix: '*', suffix: '*' },
    { label: 'H2', title: 'Heading', prefix: '## ', suffix: '' },
    { label: 'Quote', title: 'Blockquote', prefix: '> ', suffix: '' },
    { label: 'Code', title: 'Code block', prefix: '```\n', suffix: '\n```' },
    { label: 'Clear', title: 'Clear', prefix: '', suffix: '' },
];

const TextEditor = ({ error, field }) => {
    const textareaRef = useRef(null);

    const insertMarkdown = (prefix, suffix = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        if (prefix === '' && suffix === '') {
            field.onChange('');
            setTimeout(() => {
                textarea.focus();
                textarea.setSelectionRange(0, 0);
            }, 0);
            return;
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
        const cursorPos = start + prefix.length + selectedText.length;
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
                            className="px-3 py-1 bg-main border border-input rounded shadow-sm text-xs hover:bg-gray-50 cursor-pointer active:scale-94 hover:font-bold hover:scale-96"
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
                        className="w-full min-h-[300px] p-4 rounded-lg border border-input resize-none focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-background shadow-sm text-sm"
                    />
                    {error && (
                        <p className="pl-1 pt-1 text-xs font-normal leading-tight text-red-400">{error}</p>
                    )}
                </div>

                <div>
                    <p className="text-center font-semibold">Output</p>
                    <div className="min-h-[245px] p-4 rounded-lg border border-side bg-main shadow-sm overflow-auto prose max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextEditor;