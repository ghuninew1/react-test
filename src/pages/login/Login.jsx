import axios from "axios";
import { useState } from "react";

const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleCreate = async (e) => {
        e.preventDefault();
        const user = { name, password };
        const url = import.meta.env.VITE_API_URL;
        const option = { headers: { "Content-Type": "application/json" } };
        try {
            await axios.post(`${url}login`, user, option).then((res) => {
                console.log(res.data);
                localStorage.setItem("token", JSON.stringify(res.data.token));
                alert("Login success " + res.data);
                window.location.href = "/";
            });
        } catch (error) {
            console.log(error);
        }
        
    };
    return (
        <>
            <div className="modal modal-sheet d-block mt-5 pt-5" tabIndex="-1">
                <div className="modal-dialog" role="document">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-header p-5 pb-4 border-bottom-0">
                            {/* <h1 className="fw-bold mb-0 fs-2">Log In</h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button> */}
                        </div>

                        <div className="modal-body p-5 pt-0 ">
                            <form className="" action="/login" method="POST" onSubmit={handleCreate}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="username"
                                        className="form-control rounded-3"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput">Email or username</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        className="form-control rounded-3"
                                        id="floatingPassword"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <button
                                    className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                                    type="submit"
                                >
                                    Sign in
                                </button>
                                <small className="text-body-secondary">
                                    By clicking Sign in, you agree to the terms of use.
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
                                    Sign in with Twitter
                                </button>
                                <button
                                    className="w-100 py-2 mb-2 btn btn-outline-primary rounded-3"
                                    type="submit"
                                >
                                    <svg className="bi me-1" width="16" height="16">
                                        <use xlinkHref="#facebook" />
                                    </svg>
                                    Sign in with Facebook
                                </button>
                                <button
                                    className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3"
                                    type="submit"
                                >
                                    <svg className="bi me-1" width="16" height="16">
                                        <use xlinkHref="#github" />
                                    </svg>
                                    Sign in with GitHub
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
