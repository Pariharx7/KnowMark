import { Button } from "@components/ui";
import { Navbar } from "@layouts";
import { useNavigate } from "react-router-dom";
import { useAuthStatus } from "@hooks";
import { DummyBookmark } from '@features/bookmark'

const LandingPage = () => {
    const navigate = useNavigate();
    const { data: isAuthenticated } = useAuthStatus();

    return (
        <section className="bg-main fg-main w-full">
            <div className='p-1 gap-1 grid grid-cols-1 lg:grid-cols-2 border'>
                <div className="col-span-1 lg:col-span-2">
                    <Navbar
                        variant="secondary"
                    />
                </div>
                <div className="mt-2 col-span-1 px-20 py-10 flex flex-col gap-6 items-baseline justify-baseline">
                    <h2 className="text-3xl lg:text-7xl leading-tight">Where <br /> bookmarks <br /> become <br /> Knowledge</h2>
                    <p className="leading-loose">Don't let your favorite reads get buried in a graveyard of tabs. <br /> KnowMark organizes, summarizes and indexes your bookmarks. <br /> It securely stores your web links and lets you search inside the text of every bookmark you save.</p>
                    <div className="w-full py-10">
                        {
                            isAuthenticated
                                ?
                                <Button
                                    onClick={() => navigate("/dashboard")}
                                    label="Go to Dashboard"
                                    className="wfull md:w-2/4"
                                />
                                :
                                <Button
                                    onClick={() => navigate("/signup")}
                                    label="Get Started For Free"
                                    className="wfull md:w-2/4"
                                />
                        }
                    </div>
                </div>
                <DummyBookmark />
                <div className="col-span-1 lg:col-span-2 py-5">
                    <h3 className="text-center">Features</h3>
                    <div>
                        <DummyBookmark variant="card" />
                    </div>
                </div>
                <div className="border-t col-span-1 lg:col-span-2 grid grid-cols-2 py-5 my-10 px-7">
                    <div className="px-7">
                        <p>Knowmark</p>
                        <p>2026 c</p>
                    </div>
                    <div className="px-8 font-extralight">
                        <p><a href="/" className="hover:underline">Home</a></p>
                        <p><a href="/signup" className="hover:underline">Signup</a></p>
                        <p><a href="/signin" className="hover:underline">Signin</a></p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LandingPage;