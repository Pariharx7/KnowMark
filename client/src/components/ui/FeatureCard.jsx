const FeatureCard = ({ Icon, index, data }) => {
    return (
        <div
            className="group my-3 w-full relative flex flex-col justify-between items-center rounded-2xl border border-card bg-card-background py-13 shadow-main transition-all duration-500 hover:-translate-y-7 hover:-translate-x-10 hover:-translate-z-11 hover:border-blue-500 hover:shadow-md lg:mr-3 min-w-xs md:min-w-sm px-4 gap-3 lg:mx-6 hover:z-100 hover:w-lg">
            <div className="flex flex-col items-center justify-center">
                <p className="text-xs font-semibold uppercase tracking-wider">
                    <
                        Icon
                        className="size-9 flex-none transition-colors dark:filter group-hover:text-blue-600"
                    />
                </p>
                <h2 className="mt-2 text-xl font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 text-center">{data?.title}</h2>
            </div>
            <div className="w-full max-w-xs mt-4">
                <span className="italic">{data?.description}</span>
            </div>
        </div>
    )
}

export default FeatureCard;