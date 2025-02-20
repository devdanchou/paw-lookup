import { useState } from "react";
import clsx from "clsx";

const DogBreedField = (props) => {
    const [search, setSearch] = useState("");
    const { dogBreeds, selectedBreeds, onBreedChange } = props;

    const filteredBreeds = dogBreeds.filter((breed) =>
        breed.toLowerCase().includes(search.toLowerCase()));

    const toggleBreed = (breed) => {
        const updatedBreeds = selectedBreeds.includes(breed)
            ? selectedBreeds.filter((b) => b !== breed)
            : [...selectedBreeds, breed];

        onBreedChange(updatedBreeds);
    };

    return <div className="bg-gray-100 shadow-md p-4 rounded-b-md w-[290px]">
        <div className="flex justify-between items-center">
            {selectedBreeds.length > 0
                ? <h2 className="text-sm ml-1 text-fuchsia-700 font-bold">{selectedBreeds.length} {selectedBreeds.length === 1 ? "Breed" : "Breeds"}</h2>
                : <h2 className="ml-1 text-sm">All Dog Breeds ({dogBreeds.length})</h2>}

            <button
                className="mr-2 text-base font-bold text-fuchsia-700"
                onClick={() => onBreedChange([])}>Clear</button>
        </div>

        <div className="flex items-center relative my-3">
            <input
                type="text"
                placeholder="Search By Breed"
                className="w-full p-2 border rounded-md border text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>

        <ul className="bg-white rounded-md shadow h-64 overflow-y-auto">
            {filteredBreeds.length > 0 ? (filteredBreeds.map((breed, idx) => (
                <li
                    key={idx}
                    className="border-b p-3 flex justify-between items-center cursor-pointer hover:bg-gray-200 hover:text-fuchsia-700 "
                    onClick={() => {
                        toggleBreed(breed);
                    }}
                >
                    <span className="text-sm">{breed}</span>
                    <button
                        className={clsx("text-sm font-bold text-fuchsia-50 rounded-full w-[23px] h-[23px]",
                            selectedBreeds.includes(breed)
                                ? "bg-gray-400"
                                : "bg-fuchsia-700"
                        )}
                    >{selectedBreeds.includes(breed) ? <i className="fa-solid fa-minus"></i> : <i className="fa-solid fa-plus"></i>}</button>
                </li>
            ))
            ) : (<li className="border-b p-3 flex text-sm">No breeds found</li>)
            }
        </ul>
    </div>;
};

export default DogBreedField;