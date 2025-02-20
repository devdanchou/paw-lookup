const MatchProfile = (props) => {
    const {dog} = props;

    console.log({dog})

    return <div className="flex w-full h-screen text-fuchsia-700 overflow-clip">
             <div className="flex flex-col items-center">
                <div className="text-8xl font-dancing font-medium">It's a pawfect match!</div>
                <div className="mt-5  mb-10 font-lato text-4xl font-medium text-center">You matched with {dog.name}</div>
                    <img
                        className="object-cover w-[500px] h-[500px] rounded-full text-center border-4 border-fuchsia-800"
                        src={dog.img}/>
            </div>


        </div>
};

export default MatchProfile;