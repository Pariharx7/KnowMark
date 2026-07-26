const TagInput = ({ props, tags, setTags, error }) => {
    const { onChange: registerOnChange, ...restProps } = props || {};

    const handleChange = (e) => {
        const value = e.target.value;

        if (!value.trim()) {
            setTags([]);
            if (registerOnChange) registerOnChange(e);
            return;
        }

        const rawArray = value.split(',').map(item => item.trim()).filter(Boolean);

        const limitedArray = rawArray.slice(0, 4);

        setTags(limitedArray);
        if (registerOnChange) registerOnChange(e);
    };

    return (
        <div className="w-full">
            <label className="block font-semibold text-gray-700 mb-1 h-15 text-center md:text-left text-xl">Tags(Max 4, Optional)</label>
            <input
                {...restProps}
                type="text"
                placeholder="e.g tech, react, tailwindcss"
                // value={tags.join(', ')}
                onChange={handleChange}
                className="w-full px-3 h-20 py-1 text-xl border border-gray-300 rounded-lg shadow-sm"
            />
            <p className="mt-1 text-xs text-gray-500">Seperated by commas</p>
            {
                error && (
                    <p className="pl-1 pt-1 text-xs font-normal leading-tight text-red-400">
                        {error}
                    </p>
                )
            }
        </div>
    )

}

export default TagInput;