import { Link } from "react-router-dom";
import { markdownToHtml } from "@config/utils";
import {
    HiMiniPencil,
    HiOutlineCog6Tooth, HiOutlinePencil, HiOutlinePencilSquare, HiPencil, HiPencilSquare, HiStar,
    HiTrash,
} from "react-icons/hi2";

const BookmarkItem = ({
    data,
    variant = 'page',
    onClick,
    onStar,
    onDelete,
    onEdit
}) => {
    if (variant === 'card') {
        return (
            <>
                <BookmarkCard {...data} />
            </>
        )
    }
    return (
        <>
            <FullBookmark {...data} onStar={onStar} onDelete={onDelete} onEdit={onEdit} />
        </>
    )
}

export default BookmarkItem;

const BookmarkCard = ({ id, name, url, notes }) => {
    const notesHtml = markdownToHtml(notes?.toString() || "");
    return (
        <Link to={`/bookmark/${id}`} className="group my-3 w-full relative flex flex-col justify-between items-center rounded-2xl border border-card-border bg-card-background px-2 py-13 shadow-main transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 hover:shadow-md mr-3">
            <div className="flex flex-col items-center">
                <p className="text-xs font-semibold uppercase tracking-wider">bookmark</p>
                <h2 className="mt-2 text-xl font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600">{name}</h2>
            </div>
            <div className="mt-4 flex border-t border-slate-100 pt-3 w-full max-w-xs relative">
                <p target="_blank" className="min-w-0 no-underline text-slate-500 mx-auto text-sm break-words font-medium">{url}</p>
            </div>
            <div className="w-full max-w-xs mt-4">
                <span className="text-lg font-semibold mr-3">Notes: </span>
                {notesHtml ? (
                    notesHtml.length > 15 ?
                        <div className="prose prose-slate mt-2 text-sm" dangerouslySetInnerHTML={{ __html: notesHtml.slice(0, 45) + "..." }} />
                        :
                        <div className="prose prose-slate mt-2 text-sm" dangerouslySetInnerHTML={{ __html: notesHtml }} />
                ) : (
                    <span className="italic">No notes available yet. You can edit and add notes</span>
                )}
            </div>
        </Link>
    )
}

const FullBookmark = ({ id, title, url, notes, tags, category, date, time, user, isStarred, onStar, onDelete, onEdit }) => {
    console.log("In fullbookmark usstared ", onDelete)
    const notesHtml = markdownToHtml(notes?.toString() || "");
    return (
        <article className="mx-auto max-w-3xl px-4 py-10">
            <div className="border-b border-slate-200 pt-3 pb-6 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">{title}</h1>
                <div className="my-3 w-full text-end flex items-center justify-center p-2">
                    <button className="px-2 cursor-pointer"
                        onClick={onStar}
                    >
                        <HiStar className={`size-8 md:size-10 border-2 p-1 rounded-full active:scale-95 ${isStarred ? "fill-amber-500 border-amber-500" : "fill-neutral-500 border-neutral-200"}`} />
                    </button>
                    <button className="px-2 cursor-pointer"
                        onClick={onEdit}
                    >
                        <HiOutlinePencilSquare className={`size-8 md:size-10 border-1 p-1 rounded-full active:scale-95`} />
                    </button>
                    <button className="px-2 cursor-pointer"
                        onClick={onDelete}
                    >
                        <HiTrash className={`size-8 md:size-10 border-2 p-1 rounded-full active:scale-95  fill-red-600 border-red-700`} />
                    </button>
                </div>
                <div className="mt-4 flex items-center justify-center py-1 border-t border-slate-100 pt-3">
                    <a href={url} target="_blank" className="no-underline text-sm font-medium hover:text-blue-600">{url}</a>
                </div>
            </div>
            <div className="prose prose-slate max-w-none py-8 text-lg leading-relaxed text-slate-700 flex flex-col">
                <span className="text-xl font-semibold mr-3 text-accent-foreground">Notes: </span>
                {notesHtml ? (
                    <div className="mt-2 ml-3" dangerouslySetInnerHTML={{ __html: notesHtml }} />
                ) : (
                    <span className="italic">No notes available yet. You can edit and add notes</span>
                )}
                <p className="flex flex-row gap-2"><span className="text-xl font-semibold mr-3 text-accent-foreground">Tags:  </span>{tags || <span className="italic">No tags available yet. You can edit and add notes</span>}</p>
                <p><span className="text-xl font-semibold mr-3 text-accent-foreground">Category: </span>{category || <span className="italic">No category available yet. You can edit and add notes</span>}</p>
            </div>
            <div className="prose prose-slate max-w-none py-8 text-lg leading-relaxed text-slate-700 flex flex-col">
                <p><span className="text-xl font-semibold mr-3 text-accent-foreground">Created on: </span>{date}<span className="text-xl font-semibold mx-2">at: </span>{time} <span className="text-xl font-semibold mx-2">by: </span>{user}</p>
            </div>
        </article>
    )
}