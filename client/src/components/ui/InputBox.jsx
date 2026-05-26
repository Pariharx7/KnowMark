const InputBox = ({ label, type, placeholder, props, id, error }) => {
    return (
        <div className="flex flex-col space-y-1">
            <label htmlFor={id} className="w-full text-sm font-medium text-gray-400">{label}</label>

            <input
                {...props}
                type={type}
                placeholder={placeholder}
                id={id}
                className="ring-offset-backgroundoutline-none flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-800 dark:placeholder:text-[#9CA3AF]"
            />
            {
                error && (
                    <p className="pl-1 pt-1 text-xs font-normal leading-tight text-red-400">
                        {error}
                    </p>
                )
            }
        </div>
    );
}

export default InputBox;