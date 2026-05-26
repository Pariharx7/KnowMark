import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu"

const PasswordBox = ({ props, label, type, placeholder, error, id }) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col space-y-1">
            <label htmlFor={id} className="w-full text-sm font-medium text-gray-400">{label}</label>

            <div className="flex rounded-md border border-input bg-background dark:border-dark-800">
                <input
                    {...props}
                    type={showPassword ? 'text' : type}
                    placeholder={placeholder}
                    id={id}
                    className="ring-offset-backgroundoutline-none flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-800 dark:placeholder:text-[#9CA3AF]"
                />
                {showPassword ? <LuEyeOff className="h-10 p-2 pr-3 dark:invert dark:filter cursor-pointer" /> : <LuEye className="h-10 p-2 pr-3 dark:invert dark:filter cursor-pointer" />}
            </div>
            {
                error && (
                    <p className="pl-1 pt-1 text-xs font-normal leading-tight">{error}</p>
                )
            }
        </div>
    );
}

export default PasswordBox;