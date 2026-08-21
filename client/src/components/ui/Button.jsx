import { cn } from "@config/utils";

const Button = ({
    type = 'button',
    onClick,
    variant = 'primary',
    label,
    Icon,
    corners = 'md',
    fullWidth = false,
    isDisabled = false,
    iconPosition = 'left',
    className
}) => {
    const baseClasses = `inline-flex items-center justify-center text-sm font-medium dark:shadow-2xl transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-80 px-6 py-3 cursor-pointer dark:hover:text-black`;

    const variantClasses = {
        tertiary: `h-11 border border-input ring-primary/70 md:text-xs bg-blue-500 hover:border-gray-300 hover:bg-white hover:text-blue-500 focus:ring-2 focus-visible:ring-2 focus-visible:ring-ring dark:border-dark-800 dark:text-gray-200 dark:ring-primary/70 dark:hover:border-dark-800 dark:hover:bg-background/50 dark:focus:ring-offset-dark-800`,
        secondary: `border border-input text-gray-600 ring-primary/70 hover:border-gray-300 hover:bg-gray-50 focus:ring-2 focus-visible:ring-2 focus-visible:ring-ring dark:border-dark-800 dark:text-gray-200 dark:ring-primary/70 dark:hover:border-dark-800 dark:hover:bg-background/50 dark:focus:ring-offset-dark-800`,
        primary: `bg-btn text-foreground hover:invert`,
        hero: `bg-transparent from-primary to-primary-700 hover:shadow-primary/60 bg-gradient-to-r px-8 py-4 hover:to-indigo-600 text-lg lg:text-xl text-white hover:text-white`,
    };

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${corners && `rounded-${corners}`} ${fullWidth && 'w-full'}`;

    const placeIcon = `${iconPosition === 'left' ? 'flex-row-reverse' : ''}`;

    return (
        <button
            type={type}
            onClick={onClick || (() => { })}
            className={cn(`${combinedClasses} flex items-center cursor-pointer shadow-main`, className)}
            disabled={isDisabled}
        >
            <span
                className={`flex items-center space-x-1 font-montserrat ${placeIcon}`}
            >
                <span>{label || 'label Goes Here'}</span>
                {Icon && <Icon className="mr-1.5 h-5 lg:h-6" />}
            </span>
        </button>
    );
}

export default Button;