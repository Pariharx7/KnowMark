const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center h-40">
            <div className="relative h-10 w-10">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-200"></div>
                <div className="absolute inset-0 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
            </div>
        </div>
    )
}

export default Loader;