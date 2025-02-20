import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import FormContainer from "./FormContainer";
import * as authService from "../../services/auth";
import * as localStorageService from "../../services/local-storage";

const LoginPage = () => {

    const navigate = useNavigate();

    return <div className="flex items-center justify-between h-screen">
        <div className="relative hidden md:flex w-[52%] border-r border-fuchsia-100">
            <img
                className="object-cover h-screen w-full"
                src="https://wallpaper.forfun.com/fetch/6d/6d3114072fd3a06f3959f496b3db0998.jpeg?w=1470&r=0.5625" />
            <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-fuchsia-900/20"></div>
        </div>
        <div className="flex justify-center flex-1">
            <FormContainer>
                <LoginForm
                    fields={[
                        {
                            label: "Username",
                            type: "text"
                        },
                        {
                            label: "Email",
                            type: "email"
                        }
                    ]}
                    buttonLabel={"Login"}
                    onSubmit={async (values) => {
                        await authService.loginUser({
                            name: values.Username,
                            email: values.Email
                        }).then((response) => {
                            if (response.status === 200) {
                                localStorageService.setItem("username", values.Username);
                                localStorageService.setItem("matches", []);
                                navigate('/searches');
                            } else {
                                console.error(`Request failed with status: ${response.status}`);
                            }
                        });
                    }} />
            </FormContainer>
        </div>
    </div>;
};


export default LoginPage;