const FeatureCard = ({ Icon, index, data }) => {
    // console.log("Gulabi labon se ", Icon);
    return (
        <div
            className="group my-3 w-full relative flex flex-col justify-between items-center rounded-2xl border border-card-border bg-card-background py-13 shadow-main transition-all duration-500 hover:-translate-y-7 hover:-translate-x-10 hover:-translate-z-11 hover:border-blue-500 hover:shadow-md lg:mr-3 min-w-sm gap-3 lg:mx-6 hover:z-100">
            <div className="flex flex-col items-center">
                <p className="text-xs font-semibold uppercase tracking-wider">bookmark {index}</p>
                <p className="text-xs font-semibold uppercase tracking-wider">
                    <
                        Icon
                        className="size-9 flex-none transition-colors dark:filter"
                    />
                </p>
                <h2 className="mt-2 text-xl font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600">{data?.title}</h2>
            </div>
            <div className="w-full max-w-xs mt-4">
                <span className="italic">{data?.description}</span>
            </div>
        </div>
    )
}

export default FeatureCard;