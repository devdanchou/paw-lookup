const Field = (props) => {
    const { label, type, value, onChange, required, min, max } = props;

    return (
        <div className="flex flex-col my-4 pb-1">
            <label
                className="pl-1 text-slate-500 mb-1"
                htmlFor={label}>
                {label}
            </label>
            <input
                id={type}
                value={value}
                type={type}
                onChange={onChange}
                className="w-64 px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 focus:outline-fuchsia-700"
                required={required}
                {...(min !== undefined ? { min } : {})}
                {...(max !== undefined ? { max } : {})}
            />
        </div>
    );
};

export default Field;