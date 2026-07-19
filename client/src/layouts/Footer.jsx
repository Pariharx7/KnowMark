import { FaRegCopyright } from "react-icons/fa"

const Footer = () => {
    return (
        <div className="border-t lg:hidden flex justify-center items-center gap-2 text-neutral-600">
            KnowMark <FaRegCopyright className="mt-1 fill-neutral-600" /> 2026
        </div>
    )
}

export default Footer;