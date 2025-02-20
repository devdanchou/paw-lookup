import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as localStorageService from "../../services/local-storage";
import NavBar from "../../shared-components/Navbar";
import DogCard from "../../shared-components/DogCard";
import * as dogService from "../../services/dogs";



const FavoritePage = () => {
    const [matches, setMatches] = useState([]);
    const [favorites, setFavorites] = useState(localStorageService.getItem("favorites"));

    const getFavs = favorites || [];

    const navigate = useNavigate();

    const handleMatches = (updatedMatches, ) => {
        console.log({ updatedMatches });
        localStorageService.setItem("matches", updatedMatches);
        setMatches(updatedMatches);
    };

    const checkMatches = () => {
        if (favorites.length === 0) {
            localStorageService.setItem("matches", []);
        }

        if (matches.length === 0) {
            localStorageService.setItem("match", []);
        }
    };

    const generateMatch = async () => {
        await dogService.getMatch(matches)
            .then((response) => {
                return response.json();
            }).then((data) => {
                return dogService.fetchDogs([data.match.id]);
            }).then((resultResponse) => {
                return resultResponse.json();
            }).then((matchedDogData) => {
                console.log({ matchedDogData });
                localStorageService.setItem("match", matchedDogData);
            }).catch((error) => {
                console.error("Error occurred:", error);
            });
    };

    const handleFavoriteChange = (updatedFavorites) => {
        localStorageService.setItem("favorites", updatedFavorites);
        setFavorites(updatedFavorites);
    };

    const navigateToMatch = () => {
        navigate('/match');
    };

    useEffect(() => {
        checkMatches();

    }, [matches, favorites]);

    const dogItems = getFavs.map((dog, idx) => <DogCard key={idx} dog={dog} favorites={favorites} isFavoriteButton={true} matches={matches} onMatchChange={handleMatches} onFavoriteChange={handleFavoriteChange} isMatchButton={true} />);

    return <div className="flex justify-center h-screen bg-neutral-10 relative">
        <NavBar />
        <div className="mt-20">
            <button
                className="fixed top-20 left-10 mt-5 text-fuchsia-700 hover:text-fuchsia-600 p-2 text-xl font-semibold"
                onClick={(() => navigate('/searches'))}>
                <i className="fa-solid fa-arrow-left mr-2"></i>
                search</button>
            <div className="flex flex-col items-center">
                <div className="font-lato text-5xl font-medium text-fuchsia-700 mt-10 text-center">Favorites</div>
                {getFavs.length > 0 &&
                    <>
                        <div
                            className="font-lato text-xl font-medium text-fuchsia-700 mt-6 text-center mb-7">
                            Select your favorite dogs and click 'Match' to find your forever paw friend!
                        </div>
                        <button
                            className="text-white w-[25%] py-2 mt-4 mb-1 rounded-lg bg-fuchsia-700 hover:bg-fuchsia-600 text-lg"
                            onClick={async () => {
                                await generateMatch();
                                navigateToMatch();
                            }}>
                            Match
                        </button>
                    </>
                }

                {
                    getFavs.length === 0 &&
                    <div className="font-lato text-xl font-medium text-fuchsia-700 mt-6 text-center mb-7">
                        It looks like you haven't chosen any favorite dogs yet...</div>
                }
            </div>
            <div className="flex items-start justify-center flex-wrap w-full max-w-7xl mt-10 mb-10">
                {dogItems}
            </div>
        </div>
    </div>;
};

export default FavoritePage;