import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import * as localStorageService from "../services/local-storage";

const DogCard = (props) => {
    const { dog, favorites, onFavoriteChange, isFavoriteButton, matches, onMatchChange, isMatchButton, isFavPage } = props;


    const [isFavorite, setIsFavorite] = useState(false);
    const [isMatch, setIsMatch] = useState(false);
    const navigate = useNavigate();
    const getAgeGroup = (dogAge) => {
        switch (true) {
            case (dogAge <= 2):
                return "Puppy";
            case (dogAge <= 5):
                return "Young";
            case (dogAge <= 8):
                return "Adult";
            default:
                return "Senior";
        }
    };

    const handleMatch = (dog,) => {
        setIsMatch(!isMatch);

        const isCurrDogMatch = matches.some((d) => d.id === dog.id);
        const updatedMatches = isCurrDogMatch
            ? matches.filter((d) => d.id !== dog.id)
            : [...matches, dog];

        localStorageService.setItem("matches", updatedMatches);
        onMatchChange(updatedMatches);
    };

    const handleFavorite = (dog) => {
        setIsFavorite(!isFavorite);

        const isCurrDogFav = favorites.some((d) => d.id === dog.id);
        const updatedFavorites = isCurrDogFav
            ? favorites.filter((d) => d.id !== dog.id)
            : [...favorites, dog];

        onFavoriteChange(updatedFavorites);
    };

    return <div
        className={clsx("border border-neutral-200 flex flex-col overflow-clip m-3 pb-2 rounded-md shadow-md font-redHat w-80 relative bg-neutral-50", isMatch && "cursor-pointer border-4 border-purple-500")}
        onClick={isMatchButton ? () => handleMatch(dog) : undefined}>
        {isFavoriteButton && !isFavPage
            && <button
                className="absolute top-2 right-2 px-2 py-1 bg-white rounded-full"
                onClick={() => {
                    handleFavorite(dog);
                }}>
                <i className={clsx("text-lg fa-regular fa-heart text-fuchsia-700", isFavorite && "font-bold animate-pulse-2s")}></i></button>
        }

        {isFavoriteButton && isFavPage
            && <button
                className="absolute top-2 right-2 px-2 py-1 bg-white rounded-full"
                onClick={() => {
                    handleFavorite(dog);
                }}>
                <i className={clsx("text-lg fa-regular fa-heart font-bold text-fuchsia-700")}></i></button>
        }

        <img
            className={clsx("object-cover h-64", isMatch && "cursor-pointer")}
            src={dog.img}
            alt="Dog profile pic" />
        <div className="flex justify-center pt-2 text-fuchsia-700 font-semibold text-xl">{dog.name}</div>
        <div className="flex justify-around items-center py-2 mx-1 text-slate-600 font-medium">
            <div className="flex items-center">
                <i className="fa-solid fa-dog text-md"></i>
                <div className="ml-2">{getAgeGroup(dog.age)}</div>
            </div>
            <div className="text-md">{dog.breed}</div>
        </div>
    </div>;
};

export default DogCard;