import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/auth";
import * as localStorageService from "./../services/local-storage";

const NavBar = () => {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const username = localStorageService.getItem("username");

    const navigate = useNavigate();

    const navigateToSearchPage = () => {
        navigate("/searches");
    };

    const navigateFavoritesPage = () => {
        navigate("/favorites");
    };

    const handleSignOut = async () => {
        await authService.logoutUser();
        localStorageService.setItem("favorites", []);
        localStorageService.setItem("match", []);
        localStorageService.setItem("matches", []);
        localStorageService.setItem("username", "");
        navigate("/");
    };

    return (
        <nav
            className="flex justify-center bg-fuchsia-700 font-lato w-full fixed top-0 z-10"
            onMouseLeave={() => setUserMenuOpen(false)}
        >
            <div className="flex items-center justify-between w-full max-w-5-xl px-8 py-1">
                <div className="flex items-center text-2xl text-white font-lato">
                    <i className="fa-solid fa-paw text-4xl mr-3"></i>
                    <div className="flex flex-col">
                        <div className="text-lg font-lato font-medium text-left">Paw</div>
                        <div className="text-lg font-lato font-medium">Lookup</div>
                    </div>
                </div>
                <div className="flex justify-end flex-1">
                    <div className="flex">
                        <div className="mr-10 text-lg text-white hover:text-fuchsia-300">
                            <button
                                className='flex items-center'
                                onClick={navigateToSearchPage}>
                                <i className="fa-solid fa-house mr-2"></i>
                                Home
                            </button>
                        </div>
                        <div className="mr-10 text-lg text-white hover:text-fuchsia-300">
                            <button
                                className='flex items-center'
                                onClick={navigateFavoritesPage}>
                                <i className="fa-regular fa-heart mr-2 font-bold"></i>
                                Favorites
                            </button>
                        </div>
                        <div className="relative min-w-24 text-lg text-white hover:text-fuchsia-300">
                            <button className="flex items-center"
                                onClick={() => setUserMenuOpen(true)}>
                                <i className="mr-2 text-xl fa-solid fa-user"></i>
                                {username}
                            </button>
                        </div>
                        {
                            userMenuOpen && <div className="absolute top-5 right-4 mt-10 bg-white rounded-md shadow-md">
                                <button
                                    className="px-4 py-3 text-slate-500 hover:text-fuchsia-700"
                                    onClick={handleSignOut}
                                >
                                    <i className="mr-2 fa-solid fa-arrow-right-from-bracket"></i>
                                    sign out
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;