import { useRef } from "react";
import GetData from "../../component/GetData";
import { useNavigate } from "react-router-dom";
import { UseUser } from "../../store/DataContext";
import { Link } from "react-router-dom";

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
                localStorage.setItem("token", res.data.tokens[0].token);
                localStorage.setItem("user", res.data.username);
                userCheck(res.data);
                alert("Login Success ");
                navigator("/");
            });
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <>
            <div className="container-fluid px-4 py-5 mx-auto">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-sm-8 col-10">
                        <div className="card shadow-sm p-3 bg-dark-subtle ">
                            <form className="card-body" onSubmit={handleCreate}>
                                <div className="form-floating mb-3 input-group mx-0">
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
                                <div className="form-floating mb-3 input-group mx-0">
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
                                    className="w-100 mb-2 btn btn-lg rounded-3 btn-success"
                                    type="submit"
                                >
                                    Sign in
                                </button>
                                <small className="text-body-secondary">
                                    Don&apos;t have an account yet?
                                    <Link to="/signup" className="text-decoration-none">
                                        {" "}
                                        Sign up
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
                                    Sign in with Twitter
                                </button>
                                <button
                                    className="w-100 py-2 mb-2 btn btn-primary rounded-3"
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
