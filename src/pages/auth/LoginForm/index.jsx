import { useState } from "react";
import Field from "../../../shared-components/Field";

const LoginForm = (props) => {
    const { fields, buttonLabel, onSubmit } = props;
    const [values, setValues] = useState(() => {
        const initialState = {};
        for (let field of fields) {
            initialState[field.label] = "";
        }

        return initialState;
    });

    return <form
        className="font-lato px-4 py-6 m-4 border rounded-lg border-slate-200 shadow-md"
        onSubmit={async (e) => {
            e.preventDefault();
            await onSubmit(values);
        }}>
        <h1 className="text-xl mt-1 text-slate-500 text-center font-medium">
            {buttonLabel}
        </h1>
        {fields.map((field) => (
            <Field
                key={field.label}
                label={field.label}
                type={field.type}
                value={values[field.label]}
                onChange={(e) => {
                    setValues({ ...values, [field.label]: e.target.value });
                }}
                required={true}
            />
        ))}
        <button className="text-white w-full py-2 mt-4 mb-1 rounded-lg bg-fuchsia-700 hover:bg-fuchsia-600 text-lg">
            {buttonLabel}
        </button>
    </form>;
};

export default LoginForm;