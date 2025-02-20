import { useState } from "react";
import clsx from "clsx";

const ZipCodeFields = (props) => {
    const [search, setSearch] = useState("");
    const {zipCodes, selectedZipCodes, onZipCodeChange} = props;

    const filtered = zipCodes.filter((zipcode) =>
        zipcode.toLowerCase().includes(search.toLowerCase()));

    const toggleZipCode = (zipcode) => {
        const updatedZipCodes = selectedZipCodes.includes(zipcode)
            ? selectedZipCodes.filter((z) => z !== zipcode)
            : [...selectedZipCodes, zipcode]

        onZipCodeChange(updatedZipCodes);
    };

    return <div className="bg-gray-100 shadow-md p-4 rounded-b-md w-[290px]">
                <div className="flex justify-between items-center">
        {selectedZipCodes.length > 0
            ? <h2 className="text-sm ml-1 text-fuchsia-700 font-bold">{selectedZipCodes.length} {selectedZipCodes.length === 1 ? "Zip Code" : "Zip Codes"}</h2>
            : <h2 className="text-sm ml-1 text-md">Zip Codes</h2> }

        <button
            className="mr-2 text-base font-bold text-fuchsia-700"
            onClick={() => onZipCodeChange([])}>Clear</button>
        </div>

        <div className="flex items-center relative my-3">
            <input
                type="text"
                placeholder="Search By Zip Code"
                className="w-full p-2 border rounded-md border"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
                <ul className="bg-white rounded-md shadow h-64 overflow-y-auto">
                    { filtered.length > 0 ? (filtered.map((zipcode, idx) => (
                        <li
                        key={idx}
                        className="border-b p-3 flex justify-between items-center cursor-pointer hover:bg-gray-200 hover:text-fuchsia-700 "
                        onClick={() => {
                            toggleZipCode(zipcode);
                        }}
                        >
                        <span className="text-sm">{zipcode}</span>
                        <button
                        className={clsx("text-sm font-bold text-fuchsia-50 rounded-full w-[23px] h-[23px]",
                            selectedZipCodes.includes(zipcode)
                                ? "bg-gray-400"
                                : "bg-fuchsia-700"
                        )}
                        >{selectedZipCodes.includes(zipcode) ? <i className="fa-solid fa-minus"></i> : <i className="fa-solid fa-plus"></i>}</button>
                        </li>
                        ))
                     ) : (<li className="text-sm border-b p-3 flex">No Zip Code found</li>)
                    }
                </ul>
    </div>

};

export default ZipCodeFields;