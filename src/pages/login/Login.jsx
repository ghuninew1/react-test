import { useRef } from "react";
import GetData from "../../component/GetData";
import { useNavigate } from "react-router-dom";
import { UseUser } from "../../store/DataContext";

const Login = () => {
    const userRef = useRef();
    const passRef = useRef();
    const navigator = useNavigate();
    const { userCheck } = UseUser();
    
    const handleCreate = async (e) => {
        e.preventDefault();
        
        const userData = { username: userRef.current.value, password: passRef.current.value };
        try {
            await GetData.signin(userData).then((res) => {
                    localStorage.setItem("token", res.data.tokens[0].token)
                    localStorage.setItem("user", res.data.username)
                    userCheck(res.data);
                    alert("Login Success");
                    
                    setTimeout(() => {
                    navigator("/");
                } , 1000);
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
