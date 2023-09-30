import axios from "axios";
import { useState } from "react";


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = import.meta.env.VITE_API_URL;
        const option = { headers: { "Content-Type": "application/json" } };
        const body = { name, email, password };
        try {
            await axios.post(`${url}register`, body, option).then((res) => {
                // localStorage.setItem("user", JSON.stringify(res.data));
                alert("Register success " + res.data)
                window.location.href = "/login";
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="modal modal-sheet d-block mt-5 " tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-header p-5 pb-4 border-bottom-0">
                            <h1 className="fw-bold mb-0 fs-2">Sign up for free</h1>
                            {/* <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button> */}
                        </div>

                        <div className="modal-body p-5 pt-2">
                            <form className="" action="/register" method="POST" onSubmit={handleSubmit}>
                                <div className="form-floating mb-0 input-group gap-2">
                                    <div className="form-floating mb-3 input-group mx-0">
                                        <input
                                            type="username"
                                            name="username"
                                            value={name}
                                            className="form-control rounded-3 input-group"
                                            placeholder="name@example.com"
                                            onChange={(e) => setName(e.target.value)}
                                            
                                        />
                                        <label htmlFor="floatingInput">username</label>
                                    </div>
                                    <div className="form-floating mb-3 input-group mx-0">
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            className="form-control rounded-3 input-group"
                                            placeholder="example.com"
                                            onChange={(e) => setEmail(e.target.value)}
                                            
                                        />

                                        <label htmlFor="floatingInput">Email </label>
                                    </div>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        className="form-control rounded-3"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        
                                    />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <button
                                    className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                                    type="submit"
                                >
                                    Sign up
                                </button>
                                <small className="text-body-secondary">
                                    By clicking Sign up, you agree to the terms of use.
                                </small>

                                <hr className="my-4" />
                                <h2 className="fs-5 fw-bold mb-3">Or use a third-party</h2>
                                <button
                                    className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3"
                                    type="submit"
                                >
                                    <svg className="bi me-1" width="16" height="16">
                                        <use xlinkHref="#twitter" />
                                    </svg>
                                    Sign up with Twitter
                                </button>
                                <button
                                    className="w-100 py-2 mb-2 btn btn-outline-primary rounded-3"
                                    type="submit"
                                >
                                    <svg className="bi me-1" width="16" height="16">
                                        <use xlinkHref="#facebook" />
                                    </svg>
                                    Sign up with Facebook
                                </button>
                                {/* <button
                                    className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3"
                                    type="submit"
                                >
                                    <svg className="bi me-1" width="16" height="16">
                                        <use xlinkHref="#github" />
                                    </svg>
                                    Sign up with GitHub
                                </button> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
