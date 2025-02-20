const MatchContainer = () => {
    return <div className="w-full border-t border-x border-slate-200 shadow-md rounded-t-md pt-7 bg-neutral-50 mt-10">
        <div className="flex flex-col items-center font-lato text-fuchsia-700 relative">
            <div className="px-2 py-1 bg-white rounded-full absolute right-12 top-6">
                <i className="text-2xl fa-solid fa-heart"></i>
            </div>
            <div className="flex justify-center m-1 rounded-lg shadow-md overflow-clip w-[85%] pt-3">
                <img
                    className="object-cover rounded-md"
                    src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4NTk3ODkxLWltYWdlLWt3dnhsc2hnLmpwZw.jpg" />
            </div>
            <div className="m-1 flex flex-col justify-center pb-4">
                <h1 className="text-3xl font-semibold mt-5 mb-5 text-center">Your Paw Match Awaits</h1>
                <h2 className="text-md font-medium text-center">Search our database of available dogs!</h2>
            </div>
        </div>
    </div>;
};

export default MatchContainer;