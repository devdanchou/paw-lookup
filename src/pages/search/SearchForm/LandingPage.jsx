import sampleData from "../../../assets/sampledata";
import DogCard from "../../../shared-components/DogCard";

const LandingPage = () => {
    const dogItems = sampleData.map((dog, idx) => <DogCard key={idx} dog={dog} isFavoriteButton={false} />);

    return <div className="flex flex-col mt-[63px] mb-5 border-2 border-slate-200 w-full text-fuchsia-700 font-medium rounded-l-md rounded-r-md shadow-lg overflow-clip">
        <div className="flex overflow-clip">
            <div className="w-[50%] min-w-7xl font-lato flex flex-col items-center justify-center">
                <i className="fa-solid fa-paw text-8xl"></i>
                <div className="text-4xl mb-7 mt-6">Welcome to Paw Lookup!</div>
                <div className="text-xl mb-4">Discover your one-of-a-kind furry friend</div>
            </div>
            <div className="relative hidden md:flex w-full rounded-r-md">
                <img
                    className="object-cover"
                    src="https://wallpaper.forfun.com/fetch/fe/fe807ffcf638077549b49054cbc0a255.jpeg?w=1470&r=0.5625" />
                <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-fuchsia-900/20"></div>
            </div>
        </div>
        <div className="bg-purple-100 py-1"></div>
        <div className="flex flex-col justify-center items-center text-fuchsia-700 font-lato">
            <div className="text-3xl mb-2 mt-5 w-full flex flex-col justify-center py-6">
                <i className="fa-solid fa-hand-holding-heart ml-4 text-center mb-3 text-4xl"></i>
                <div className="flex justify-center">
                    Dogs available for adoption
                </div>
            </div>
            <div className="flex flex-col w-full overflow-hidden">
                <div className="bg-purple-100 py-1"></div>
                <div className="flex justify-around w-full my-4">
                    {dogItems}
                </div>
            </div>
        </div>
    </div>;
};

export default LandingPage;