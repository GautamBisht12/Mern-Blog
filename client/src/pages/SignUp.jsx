import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const user = {
    username: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(user);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.email) {
      return setErrorMessage("All fields are required");
    }

    try {
      // set state value
      setLoading(true);
      setErrorMessage(null);

      // make api call
      const response = await axios.post("/api/auth/signup", formData);
      console.log(response);

      if (!response.data.success) {
        throw new Error(response.data.message || "API request failed");
      }
      setFormData({ username: "", email: "", password: "" });
      setLoading(false);
      if (response.data.success) {
        toast.success(response.data.message, {
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
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message);
      setLoading(false);
      setFormData({ username: "", email: "", password: "" });
      console.error("Error:", error.message || "An error occurred"); // Log the error for debugging
    }
  };

  return (
    <div className="min-h-screen mt-20">
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
            <span className="text-[28px] ml-2">Blog</span>
          </Link>
          <p className="mt-8 text-base">
            This is a MERN Stack Blog project . you can sign up with your email
            and password or with google
          </p>
        </div>
        {/* right */}
        <div className=" flex-1  ">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                value={formData.username}
              />
            </div>
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
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex items-center text-2xl gap-1  mt-5">
            <span>Already Have an account?</span>
            <Link className="text-blue-500 " to="/sign-in">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5 font-semibold" color="failure">
              {errorMessage}
            </Alert>
          )}
          {/* {successMessage && (
            <Alert className="mt-5 font-semibold" color="success">
              {successMessage}
            </Alert>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
