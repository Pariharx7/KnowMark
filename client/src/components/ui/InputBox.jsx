import { cn } from "@config/utils";

const InputBox = ({ label, type, placeholder, props, id, error, className, variant = "primary" }) => {
    const variants = {
        primary: "h-10 py-2 text-sm",
        secondary: "h-20 py-1 text-xl"
    }
    return (
        <div>
            <div className="flex flex-col space-y-1">
                <label
                    htmlFor={id}
                    className={cn("w-full py-1 font-medium text-gray-400",
                        `${variant === "primary" ? `h-10` : `h-15 text-center md:text-left text-xl`}`,
                    )}>
                    {label}
                </label>

                <input
                    {...props}
                    type={type}
                    placeholder={placeholder}
                    id={id}
                    className={cn("ring-offset-backgroundoutline-none flex w-full rounded-md border border-input bg-background px-3 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-800 dark:placeholder:text-[#9CA3AF]",
                        `${variant === "primary" ? `${variants.primary}` : `${variants.secondary}`}`,
                        className)}
                />
                {
                    error && (
                        <p className="pl-1 pt-1 text-xs font-normal leading-tight text-red-400">
                            {error}
                        </p>
                    )
                }
            </div>
        </div>
    );
}

export default InputBox;