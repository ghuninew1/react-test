import GetData from "../../component/GetData";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IsData } from "../../component/utils";
import { Link } from "react-router-dom";

const Register = () => {
    const userRef = useRef();
    const passRef = useRef();
    const passConfirmRef = useRef();
    const emailRef = useRef();
    const navigator = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            username: userRef.current.value,
            email: emailRef.current.value,
            password: passRef.current.value,
        };
        try {
            await GetData.signup(body).then((res) => {
                alert("Register Success " + res.data.username);
                navigator("/signin");
            });
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    return (
        <>
            <div className="container-fluid px-4 py-5 mx-auto">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-sm-8 col-10">
                        <div className="card shadow-sm p-3 bg-dark-subtle ">
                            <form onSubmit={handleSubmit} className="card-body">
                                <div className="form-floating mb-0 input-group gap-1">
                                    <div className="form-floating mb-3 input-group mx-0">
                                        <input
                                            type="username"
                                            name="username"
                                            className="form-control rounded-3 input-group"
                                            placeholder="username"
                                            id="userRef"
                                            ref={userRef}
                                        />
                                        <label htmlFor="userRef">username</label>
                                    </div>
                                    <div className="form-floating mb-3 input-group mx-0">
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control rounded-3 input-group"
                                            placeholder="name@example.com"
                                            id="emailRef"
                                            ref={emailRef}
                                        />
                                        <label htmlFor="emailRef">Email </label>
                                    </div>
                                </div>
                                <div className="input-group mb-3 gap-1">
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control rounded-3 input-group py-2"
                                        placeholder="Password"
                                        id="pass"
                                        ref={passRef}
                                    />
                                    <input
                                        type="password"
                                        name="confirm"
                                        className="form-control rounded-3 input-group py-2"
                                        placeholder="Password Confirm"
                                        id="confirm"
                                        onInput={(e) => {
                                            if (e.target.value !== passRef.current.value) {
                                                e.target.setCustomValidity(
                                                    "Password does not match"
                                                );
                                            } else {
                                                e.target.setCustomValidity("");
                                            }
                                        }}
                                        checked={passConfirmRef.current?.value}
                                        ref={passConfirmRef}
                                    />
                                </div>
                                <button
                                    className="w-100 mb-2 btn btn-lg rounded-3 btn-success"
                                    type="submit"
                                >
                                    Sign up
                                </button>
                                <small className="text-body-secondary">
                                    By clicking Sign up, you agree to the terms of use.
                                    <Link to="/signin" className="text-decoration-none">
                                        Sign in
                                    </Link>
                                </small>
                                <hr className="my-4" />
                                <h2 className="fs-5 fw-bold mb-3">Or use a third-party</h2>
                                <button
                                    className="w-100 py-2 mb-2 btn btn-secondary rounded-3"
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
