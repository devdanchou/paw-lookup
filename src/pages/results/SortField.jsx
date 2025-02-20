const SORT_OPTIONS = [
    {desc: "Sort Asc", img: <i className="text-base fa-solid fa-arrow-up-short-wide w-[25px] ml-2"></i>, choice: "asc" },
    {desc: "Sort Desc", img: <i className="text-base fa-solid fa-arrow-up-wide-short w-[25px] ml-2"></i>, choice:"desc" }];


const SortField = (props) => {

    const {onSelectSort} = props;

    return <div className="bg-gray-100 shadow-md p-4 rounded-b-md w-full border border-gray-200 flex justify-center">
        <ul className="bg-white rounded-md shadow w-[92%]">
        {SORT_OPTIONS.map((sort, idx) => (
            <li
                key={idx}
                className="border-b p-3 flex justify-between items-center cursor-pointer hover:bg-gray-200 hover:text-fuchsia-700 w-full"
                onClick={() => onSelectSort(sort.choice)}
                >
                {sort.img}
                <span className="font-lato text-sm">{sort.desc}</span>
            </li>
        ))}
        </ul>
    </div>
};

export default SortField;