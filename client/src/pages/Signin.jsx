/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  signInSuccess,
  signInFailure,
  signInStart,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const Signin = () => {
  const user = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(user);
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password || !formData.email) {
      return dispatch(signInFailure("All fields are required"));
    }
    console.log(formData);
    try {
      // set states value
      dispatch(signInStart());

      // make api call
      const response = await axios.post("/api/auth/signin", formData);

      if (!response.data.success) {
        // throw new Error(response.data.message || "API request failed");
        console.log(response.data.message);
        dispatch(signInFailure(response.data.message));
      }
      console.log("Success:", response.data);

      console.log(response);
      console.log(response.data);

      if (response.data.success) {
        dispatch(signInSuccess(response.data.user));
        toast.success("Login Successfull", {
          duration: 4000, // milliseconds
          position: "top-right",
          style: {
            marginTop: "80px",
            border: "2px solid green",
            padding: "16px",
            color: "green",
            background: "lightgreen",
          },
        });
        setFormData({ email: "", password: "" });
        navigate("/");
      }

      console.log(formData, "after clearing");
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(error.response?.data.message));
      setFormData({ email: "", password: "" });
    }
  };

  return (
    <>
      <div className="min-h-[75vh] mt-10 py-10 md:mt-20">
        <div className="flex  p-3 max-w-3xl mx-auto flex-col md:flex-row  md:items-center gap-5">
          {/* left */}
          <div className="flex-1 px-2">
            <Link
              to="/"
              className="text-4xl sm:text-xl font-bold dark:text-white "
            >
              <span className="px-6 text-3xl rounded-lg py-4 bg-gradient-to-r from-[#6f34a7] to-[#FF6978] text-white">
                Bisht G's
              </span>
              <span className="text-[28px]">Blog</span>
            </Link>
            <p className="mt-8 text-base">
              This is a MERN Stack Blog project . you can sign up with your
              email and password or with google
            </p>
          </div>
          {/* right */}
          <div className=" flex-1  ">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <Label value="Email" />
                <TextInput
                  type="email"
                  placeholder="demo@gmail.com"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div>
                <Label value="Password" />
                <TextInput
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  minLength={6}
                />
              </div>
              <Button
                gradientDuoTone="purpleToPink"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <div
                    className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"
                  >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
              <OAuth />
            </form>
            <div className="flex gap-2 text-2xl  mt-5">
              <span>Don't have an account?</span>
              <Link className="text-blue-500" to="/sign-up">
                Sign Up
              </Link>
            </div>
            {errorMessage && (
              <Alert className="mt-5 font-semibold" color="failure">
                {errorMessage}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
