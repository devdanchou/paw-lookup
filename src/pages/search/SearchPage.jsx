import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import * as dogService from "../../services/dogs";
import zipcodes from "./../../assets/zipcodes";
import ResultsPage from "../results/ResultsPage";
import MatchContainer from "./MatchContainer";
import NavBar from "../../shared-components/Navbar";
import Chevron from "../../shared-components/Chevron";
import SortField from "../results/SortField";
import LandingPage from "./SearchForm/LandingPage";

const BASE_URL = "https://frontend-take-home-service.fetch.com";

const SearchPage = () => {
    const [dogBreeds, setDogBreeds] = useState([]);
    const [startAge, setStartAge] = useState(1);
    const [endAge, setEndAge] = useState(20);
    const [dogData, setDogData] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [sortOption, setSortOption] = useState("asc");
    const [isSortListOpen, setIsSortListOpen] = useState(false);
    const [initialValues, setInitalValues] = useState(null);

    const fetchData = async () => {
        await dogService.getSearch({
            breeds: initialValues?.selectedBreeds,
            zipCodes: initialValues?.selectedZipCodes,
            ageMin: initialValues?.startAge,
            ageMax: initialValues?.endAge,
            sort: `breed:${sortOption}`
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setNextPage(data.next ? `${BASE_URL}${data.next}` : null);
            setPrevPage(data.prev ? `${BASE_URL}${data.prev}` : null);
            return dogService.fetchDogs(data.resultIds);
        }).then((resultResponse) => {
            return resultResponse.json();
        }).then((dogData) => {
            setDogData(dogData);
        }).catch((error) => {
            console.error("Error occurred:", error);
        });
    };

    const handlePaginate = async (url) => {
        const response = await dogService.paginateSearch(url);
        const data = await response.json();
        setNextPage(data.next ? `${BASE_URL}${data.next}` : null);
        setPrevPage(data.prev ? `${BASE_URL}${data.prev}` : null);
        const dogResponse = await dogService.fetchDogs(data.resultIds);
        const dogData = await dogResponse.json();
        setDogData(dogData);
    };

    const selectSortOption = (option) => {
        setSortOption(option);
    };

    const handleValues = (values) => {
        setInitalValues(values);
    };

    useEffect(() => {
        (async () => {
            const response = await dogService.getBreeds();
            const data = await response.json();
            setDogBreeds(data);

        })();
    }, [dogData]);

    useEffect(() => {
        fetchData().then(data => setDogBreeds(data));
    }, [sortOption, initialValues]);

    return <div className="flex flex-col justify-center min-h-screen w-full bg-neutral-100">
        <NavBar />
        <div className="flex mt-20 mx-12">
            <div className="mr-10 w-full max-w-md flex flex-col items-center px-2 pb-4 m-2 pt-5">
                <MatchContainer />
                <SearchForm
                    dogBreeds={dogBreeds || []}
                    zipCodes={zipcodes || []}
                    ageFields={[
                        {
                            id: "startAge",
                            label: "Start Age",
                            type: "number",
                            min: 1,
                            max: endAge || 20,
                            value: startAge,
                            onChange: (e) => {
                                const startAgeNum = Number(e.target.value);

                                if (endAge !== undefined && startAgeNum > endAge) {
                                    setEndAge(startAgeNum);
                                }
                                setStartAge(startAgeNum);
                            }
                        },
                        {
                            id: "endAge",
                            label: "End Age",
                            type: "number",
                            min: startAge || 1,
                            max: 20,
                            value: endAge,
                            onChange: (e) => {
                                const endAgeNum = Number(e.target.value);

                                if (startAge !== undefined && endAgeNum < startAge) {
                                    setStartAge(endAgeNum);
                                }
                                setEndAge(endAgeNum);
                            }
                        }
                    ]}
                    onHandleValues={handleValues}
                    onSubmit={fetchData}
                />
            </div>
            {dogData.length > 0 && <div className="flex flex-col">
                <div className="w-full flex-1 max-w-8xl mx-6 pt-6">
                    <ResultsPage dogData={dogData} />
                </div>
                {
                    dogData.length > 0 &&
                    <div className="w-full mx-6 flex justify-center items-center py-4 mb-8">
                        <button
                            onClick={() => handlePaginate(prevPage)}
                            disabled={!prevPage}
                            className="font-lato text-white w-[10%] py-2 mt-4 mb-1 rounded-lg bg-fuchsia-700 hover:bg-fuchsia-600 text-lg w-[120px] mr-10">
                            <i className="fa-solid fa-arrow-left mr-2 text-lg"></i>
                            Previous
                        </button>
                        <button
                            onClick={() => handlePaginate(nextPage)}
                            disabled={!nextPage}
                            className="font-lato text-white w-[10%] py-2 mt-4 mb-1 rounded-lg bg-fuchsia-700 hover:bg-fuchsia-600 text-lg w-[120px]">
                            Next
                            <i className="fa-solid fa-arrow-right ml-2 text-lg"></i>
                        </button>
                    </div>
                }
            </div>}

            {
                dogData.length === 0 && <LandingPage />
            }

            <div className="flex flex-col items-center flex-1 justify-start right-5 mt-12">
                {dogData.length > 0 && <div className="w-[195px] text-gray-500 mt-6 mr-10  border border-gray-200 rounded-md">
                    <Chevron label={"Sort: Breed"} isOpen={isSortListOpen} onToggle={() => setIsSortListOpen(!isSortListOpen)} option={`(${sortOption})`} />
                    {isSortListOpen && <SortField onSelectSort={selectSortOption} />}
                </div>}
            </div>
        </div>

    </div>;
};

export default SearchPage;