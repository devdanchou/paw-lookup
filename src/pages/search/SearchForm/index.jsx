import { useState } from "react";
import clsx from "clsx";
import Chevron from "../../../shared-components/Chevron";
import DogBreedField from "./DogBreedField";
import Field from "../../../shared-components/Field";
import ZipCodeFields from "./ZipCodeField";

const SearchForm = (props) => {
    const { dogBreeds, zipCodes, ageFields, required, onSubmit, onHandleValues, fetchData } = props;
    const [isDogBreedListOpen, setIsDogBreedListOpen] = useState(false);
    const [isAgeInputOpen, setIsAgeInputOpen] = useState(false);
    const [isLocationInputOpen, setIsLocationInputOpen] = useState(false);

    const [values, setValues] = useState(() => {
        const initialState = {};

        for (let field of ageFields) {
            initialState[field.id] = field.value || "";
            initialState["selectedBreeds"] = [];
            initialState["selectedZipCodes"] = [];
        }

        return initialState;
    });

    const handleBreedChange = (selectedBreeds) => {
        setValues((prevValues) => ({
            ...prevValues,
            selectedBreeds,
        }));
    };
    const handleZipCodeChange = (selectedZipCodes) => {
        setValues((prevValues) => ({
            ...prevValues,
            selectedZipCodes,
        }));
    };

    return <form
        className="font-lato text-slate-500 text-md w-[350px] border-b border-x border-slate-200 shadow-md pt-1 pb-10 bg-neutral-50 rounded-b-md px-4"
        onSubmit={async (e) => {
            // onHandleValues(values);
            e.preventDefault();
        }}>
        <div className="flex justify-center items-center pb-3">
            <h1 className="text-2xl font-semibold text-fuchsia-700 text-center mr-2 pb-1">Filter</h1>
        </div>
        <div className="mb-3 flex flex-col justify-center items-center pb-2">
            <div className="w-[290px]">
                <Chevron label={"Breed"} isOpen={isDogBreedListOpen} onToggle={() => setIsDogBreedListOpen(!isDogBreedListOpen)} />
                {isDogBreedListOpen && <DogBreedField dogBreeds={dogBreeds} selectedBreeds={values.selectedBreeds} onBreedChange={handleBreedChange} />}
            </div>
        </div>
        <div className="mb-2 rounded-t-md flex flex-col justify-center items-center">
            <div className="w-[290px]">
                <Chevron label={"Age Range"} isOpen={isAgeInputOpen} onToggle={() => setIsAgeInputOpen(!isAgeInputOpen)} />
                <div className={clsx("flex flex-col justify-center pb-3 pl-5", isAgeInputOpen && "border-x border-b border-slate-200 bg-neutral-50 rounded-b-md")}>
                    {isAgeInputOpen && ageFields.map((field) => (
                        <Field
                            key={field.label}
                            label={field.label}
                            type={field.type}
                            value={field.startAge}
                            min={field.min}
                            max={field.max}
                            onChange={(e) => {
                                setValues({ ...values, [field.id]: e.target.value });
                                field.onChange(e);
                            }}
                            required={required}
                        />
                    ))}
                </div>
            </div>
        </div>
        <div className="mb-3 rounded-t-md flex flex-col justify-center items-center">
            <div className="w-[290px]">
                <Chevron label={"Location"} isOpen={isLocationInputOpen} onToggle={() => setIsLocationInputOpen(!isLocationInputOpen)} />
                {isLocationInputOpen && <ZipCodeFields zipCodes={zipCodes} selectedZipCodes={values.selectedZipCodes} onZipCodeChange={handleZipCodeChange} />}
            </div>
        </div>
        <div className="flex justify-center">
            <button
                className="text-white py-2 mt-4 mb-1 rounded-lg bg-fuchsia-700 hover:bg-fuchsia-600 text-lg w-[290px]"
                onClick={async (e) => {
                    e.preventDefault();
                    const updatedValues = {
                        selectedBreeds: values.selectedBreeds.length ? values.selectedBreeds : [],
                        selectedZipCodes: values.selectedZipCodes.length ? values.selectedZipCodes : [],
                        startAge: values.startAge ?? 1,
                        endAge: values.endAge ?? 20,
                    };
                    onHandleValues(updatedValues);
                    await onSubmit(values);
                }}
            >
                Search
            </button>
        </div>

    </form>;
};

export default SearchForm;