import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputBox } from "./InputBox";

const LoginForm = () => {
    const navigate = useNavigate();
    // const { loginUser } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // const result = await loginUser(formData);

        // setLoading(false);

        // if(result.success) {
        //     TransformStream.success(XPathResult.message);
        //     navigate('/');
        // } else {
        //     TransformStream.error(XPathResult.message);
        // }
    }

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="border rounded-lg w-full max-w-xl">
                <h1 className="text-red-500">Welcome Back</h1>
                <h2>Log in to continue</h2>

                <form onSubmit={handleSubmit}>

                    <div>
                        <InputBox
                            inputLabel={"Email"}
                            inputType={"text"}
                            placeholder={"enter ur emial"}
                            onChange={() => console.log("login")}
                        />
                    </div>

                    <div>
                        <a href="#">Forgot Your password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                    // className=""
                    >
                        {loading ? 'Logging In...' : 'Log In'}
                    </button>
                </form>


                <p>
                    Don't have an account?{' '}
                    <a href="#">Register</a>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;