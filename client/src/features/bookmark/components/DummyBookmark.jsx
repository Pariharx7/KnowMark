import BookmarkItem from './BookmarkItem';
import { FeatureCard } from '@components/ui';
import { useFeatures } from '@features/dashboard';
import { featureIcons } from '@config/featureIcons';
import { useState } from 'react';

const DummyBookmark = ({ variant = "page" }) => {
    const dateNow = new Date();
    const [dummyData, setDummyData] = useState({
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
    });

    const { data, isLoading, error } = useFeatures();


    if (variant === "page") {

        return (
            <div className="col-span-1 px-10 py-10 ">
                <div className="h-full gap-3 py-10 flex flex-col">
                    <div className="flex justify-end items-center">
                        <div className="px-3 border-card border-2 hover:border-7 rounded-xl h-fit mx-auto animate-card">
                            <BookmarkItem
                                data={dummyData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="lg:p-2 w-full mx-auto">
                <div className="px-5 lg:px-7 grid grid-cols-1 gap-7 md:grid-cols-6 mx-0 lg:mx-auto">
                    {
                        data.features?.map((data, index) => (
                            <FeatureCard
                                index={index + 1}
                                data={data}
                                key={index}
                                Icon={featureIcons[index]}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default DummyBookmark;