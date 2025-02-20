import { useState, useEffect } from "react";
import DogCard from "../../shared-components/DogCard";
import * as localStorageService from "../../services/local-storage";


const ResultsPage = (props) => {
    const { dogData } = props;
    const [favorites, setFavorites] = useState(() => {
        return [] || localStorageService.getItem("favorites");
    });


    const handleFavoriteChange = (updatedFavorites) => {
        setFavorites(updatedFavorites);
    };

    useEffect(() => {
        localStorageService.setItem("favorites", favorites);
    }, [favorites]);

    const dogItems = dogData.map((dog, idx) => <DogCard key={idx} dog={dog} isFavoriteButton={true} favorites={favorites} onFavoriteChange={handleFavoriteChange} isMatchButton={false}/>);

    return <div className="flex flex-wrap items-center justify-center mt-10">
        {dogItems}
    </div>;
};

export default ResultsPage;