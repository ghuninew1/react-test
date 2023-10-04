import { useEffect, useRef } from "react";
import GetData from "../../component/GetData";
import { useNavigate } from "react-router-dom";
import { UseUser } from "../../store/DataContext";

const Login = () => {
    const {user} = UseUser();
    const { userCheck } = UseUser();
    const userRef = useRef();
    const passRef = useRef();
    const navigator = useNavigate();

    useEffect(() => {
        if (user) {
            navigator("/");
        } else {
            navigator("/signin");
        } 
    }, [user, navigator]);

    const handleCreate = (e) => {
        e.preventDefault();
        // const data = new FormData(e.currentTarget);
        // const userData = { username: data.get("username"), password: data.get("password") };
        const userData = { username: userRef.current.value, password: passRef.current.value };
        try {
            GetData.signin(userData).then((res) => {
                if (res.data) {
                    userCheck(res.data);
                    localStorage.setItem("token", res.data.tokens.token);
                    navigator("/");
                } else {
                    localStorage.removeItem("token");
                    userCheck(null);
                    navigator("/signin");
                }
            });
        } catch (error) {
            console.log("error", error);
        }


        
    }
    return (
        <>
            <div className=" modal modal-md modal-sheet d-block mt-5 " role="dialog">
                <div className="modal-dialog" >
                    <div className="modal-content rounded-4 shadow" >
                        <div className="modal-header p-5 pb-4 border-bottom-0">
                            {/* <h1 className="fw-bold mb-0 fs-2">Log In</h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button> */}
                        </div>

                        <div className="modal-body p-5 pt-0 " >
                            <form
                                className="form-signin"
                                onSubmit={handleCreate}
                            >
                                <div className="form-floating mb-3">
                                    <input
                                        type="username"
                                        name="username"
                                        className="form-control rounded-3"
                                        placeholder="name@example.com"
                                        id="userRef"
                                        ref={userRef}

                                    />
                                    <label htmlFor="userRef">Email or username</label>
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
                                    <label htmlFor="passRef" >Password</label>
   
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
                                {/* <button
                                    className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3"
                                    type="submit"
                                >
                                    <svg className="bi me-1" width="16" height="16">
                                        <use xlinkHref="#github" />
                                    </svg>
                                    Sign in with GitHub
                                </button> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
