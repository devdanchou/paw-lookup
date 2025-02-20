import {useState, useEffect} from "react";
import NavBar from "../../shared-components/Navbar";
import { useNavigate } from "react-router-dom";
import * as localStorageService from "../../services/local-storage";
import MatchProfile from "./MatchProfile";


const MatchPage = () => {
    const [matchDog, setMatchDog] = useState([]);
    const navigate = useNavigate();

    const storedMatchDog = localStorageService.getItem("match");
    console.log({storedMatchDog})
    console.log({matchDog});

    const getMatchedDog = () => {
        setMatchDog(storedMatchDog);
    }


   const matchedDog =  matchDog.map((dog, idx) => <MatchProfile key={idx} dog={dog}/>);

    useEffect(() => {
        console.log({matchDog})
         getMatchedDog();
    }, []);

    return <div className="flex justify-center min-h-screen bg-neutral-10">
        <NavBar />
        <div className="fixed top-20 left-10">
        <button
            className="mt-5 text-fuchsia-700 hover:text-fuchsia-600 p-2 text-xl font-semibold"
            onClick={(() => navigate('/searches'))}>
                <i className="fa-solid fa-arrow-left mr-2"></i>
                searches</button>
        <button
            className="mt-5 text-fuchsia-700 hover:text-fuchsia-600 p-2 text-xl font-semibold"
            onClick={(() => navigate('/favorites'))}>
                <i className="fa-solid fa-arrow-left mr-2"></i>
               favorites</button>
        </div>
        <div className="mt-20 w-full flex justify-center">
                <div className="mt-20">
                {matchedDog}
                </div>
        </div>
    </div>
};

export default MatchPage;