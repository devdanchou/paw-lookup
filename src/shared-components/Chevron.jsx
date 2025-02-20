import clsx from "clsx";

const Chevron = (props) => {
    const { label, onToggle, isOpen, option } = props;

    return (
        <div className="flex justify-center w-full cursor-pointer">
            <div className={clsx("flex justify-between bg-gray-100  px-2 py-3 border border-slate-200 w-full",
                isOpen ? "rounded-t-md" : "rounded-md")}
                onClick={onToggle}>
                <label className="text-base font-medium ml-2">{label} {option}</label>
                <button
                    className="font-bold mr-2">
                    <i className={clsx("fa-solid",
                        isOpen ? "fa-chevron-down text-fuchsia-700" : "fa-chevron-up")}></i>
                </button>
            </div>
        </div>
    );
};

export default Chevron;