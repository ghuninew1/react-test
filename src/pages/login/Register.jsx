import GetData from "../../component/GetData";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnMessage } from "../../component/utils";

const Register = () => {
    const userRef = useRef();
    const passRef = useRef();
    const emailRef = useRef();
    const navigator = useNavigate();
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            username: userRef.current.value,
            email: emailRef.current.value,
            password: passRef.current.value,
        };
        try {
            await GetData.signup(body).then((res) => {
                setMessage({ message: "Register Success " + res.data, variant: "success" });
                setTimeout(() => {
                    setMessage("");
                    navigator("/signin");
                }, 1000);
                
            });
        } catch (error) {
            setMessage({ message: "Register Fail", variant: "danger" });
        }
    };
    return (
        <>
            <div className="modal modal-md modal-sheet d-block mt-5 " role="dialog">
                {message &&
                    OnMessage({
                        message: message.message,
                        variant: message.variant,
                        onClose: () => setMessage(""),
                    })}
                    
                <div className="modal-dialog" role="document">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-body p-5 pt-2">
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-0 input-group gap-2">
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
                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control rounded-3"
                                        placeholder="Password"
                                        id="passRef"
                                        ref={passRef}
                                    />
                                    <label htmlFor="passRef">Password</label>
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
