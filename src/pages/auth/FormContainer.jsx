const FormContainer = (props) => {
    const { children } = props;

    return <div className="flex flex-col items-center py-2 mb-20">
        <div className="flex items-center text-fuchsia-700 mb-5">
            <i className="fa-solid fa-paw text-8xl mr-3"></i>
            <div className="flex flex-col">
                <div className="text-4xl font-lato font-medium">Paw</div>
                <div className="text-4xl font-lato font-medium">Lookup</div>
            </div>
        </div>
        {children}
    </div>;
};

export default FormContainer;