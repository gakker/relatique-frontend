import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { resetState, signUp } from "@/features/auth";
import { AppDispatch, RootState } from "@/features/store";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, isSuccess, isError, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSignUp = async () => {
    dispatch(signUp({ name, email, password }));
  };

  if (isSuccess) {
    router.push("/");
  }

  if (isError) {
    MySwal.fire({
      title: "Error",
      text: errorMessage,
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Ok",
    }).then((result: any) => {
      dispatch(resetState());
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-green-400 to-blue-600">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg transform transition-all hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-2 border text-black rounded-lg focus:ring focus:ring-green-300 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border text-black rounded-lg focus:ring focus:ring-green-300 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border text-black rounded-lg focus:ring focus:ring-green-300 focus:outline-none"
              placeholder="Create a password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring focus:ring-green-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-green-600 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
