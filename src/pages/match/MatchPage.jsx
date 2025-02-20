import {useState, useEffect} from "react";
import NavBar from "../../shared-components/Navbar";
import { useNavigate } from "react-router-dom";
import * as localStorageService from "../../services/local-storage";
import MatchProfile from "./MatchProfile";


const MatchPage = () => {
    const [matchDog, setMatchDog] = useState([]);
    const navigate = useNavigate();

    const storedMatchDog = localStorageService.getItem("match");

    const getMatchedDog = () => {
        setMatchDog(storedMatchDog);
    }


   const matchedDog =  matchDog.map((dog, idx) => <MatchProfile key={idx} dog={dog}/>);

    useEffect(() => {
         getMatchedDog();
    }, []);

    return <div className="flex justify-center min-h-screen bg-neutral-10">
        <NavBar />
        <div className="mt-20 w-full flex justify-center">
                <div className="mt-20">
                {matchedDog}
                </div>
        </div>
    </div>
};

export default MatchPage;