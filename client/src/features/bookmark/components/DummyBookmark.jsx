import BookmarkItem from './BookmarkItem';

const DummyBookmark = ({ variant = "page" }) => {
    const dateNow = new Date();
    const dummyData1 = {
        id: "#1",
        title: "Knowmark Note",
        url: "https://www.knowmark.com",
        notes: "KnowMark organizes, summarizes and indexes your bookmarks",
        tags: "web, internet, knowledge",
        category: "web-app",
        date: dateNow.toLocaleDateString('en-US'),
        time: dateNow.toLocaleTimeString('en-us', { hour: 'numeric', minute: '2-digit', second: '2-digit' }),
        user: "You",
        isStarred: true
    };
    const dummyData2 = {
        id: "",
        title: "knowmark",
        url: "www.know.com",
        notes: "kowlkfjd"
    }

    if (variant === "page") {

        return (
            <div className="col-span-1 px-10 py-10 ">
                <div className="h-full gap-3 py-10 flex flex-col">
                    <div className="flex justify-end items-center">
                        <div className="px-3 border-side border-2 hover:border-7 border-white rounded-xl bg-[var(--foreground)] text-[var(--background)] h-fit mx-auto">
                            <BookmarkItem
                                data={dummyData1}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="border border-red-600 w-full mx-auto px-4">
                <marquee className="flex border border-black items-center justify-center">
                    <div className="flex flex-row">
                        <BookmarkItem
                            variant="card"
                            data={dummyData2}
                        />
                        <BookmarkItem
                            variant="card"
                            data={dummyData2}
                        />
                        <BookmarkItem
                            variant="card"
                            data={dummyData2}
                        />
                        <BookmarkItem
                            variant="card"
                            data={dummyData2}
                        />
                        <BookmarkItem
                            variant="card"
                            data={dummyData2}
                        />
                    </div>
                </marquee>
            </div>
        )
    }
}

export default DummyBookmark;