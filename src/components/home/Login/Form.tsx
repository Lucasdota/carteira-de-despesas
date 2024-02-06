import React, { ChangeEvent, FormEvent, useState } from "react";
import { FaUser, FaEye } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";

interface formDataObj {
  userEmail: string | null;
  userPass: string | null;
}

type Props = {};

const Form = (props: Props) => {
  const [emailError, setEmailError] = useState<string>("");
  const [passError, setPassError] = useState<string>("");
  const [submittedOnce, setSubmittedOnce] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	function validateForm(data: formDataObj) {
		const errors = [];

		if (data.userEmail === "") {
			setEmailError("Please enter a valid email address");
			errors.push("emailError");
		}
		if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(data.userPass!)) {
			setPassError(
        "Please enter at least one uppercase, one lowercase, one number, one special character and a minimun length of 8 characters."
      );
			errors.push("passError")
		}		

    //SEND DATA TO THE SERVER
    //if there were a server, we would send the whole data
    if (errors.length === 0) {
      // Send data to the server using Fetch API
      // fetch("https://your-server-url.com/api/submit", {
      //  method: "POST",
      //  body: JSON.stringify(data),
      //  headers: {
      //    "Content-Type": "application/json",
      //  },
      // })
      //  .then((response) => response.json())
      //  .then((responseData) => {
      // Handle successful response
      // console.log("Data sent successfully:", responseData);
      // })
      // .catch((error) => {
      // Handle error
      // console.error("Error sending data:", error);
      // });
    } else {
      // Handle validation errors
      // console.error("Validation errors:", errors);
    }
  }

  function validateEmail(e: ChangeEvent<HTMLInputElement>) {
    if (!submittedOnce) return;

    if (e.target.value === "" || !/\S+@\S+\.\S+/.test(e.target.value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  }

  function validatePassword(e: ChangeEvent<HTMLInputElement>) {
    if (!submittedOnce) return;

    // ^: Asserts the start of the string.
    // (?=.*[a-z]): Positive lookahead to ensure at least one lowercase letter.
    // (?=.*[A-Z]): Positive lookahead to ensure at least one uppercase letter.
    // (?=.*\d): Positive lookahead to ensure at least one digit.
    // (?=.*[@$!%*?&]): Positive lookahead to ensure at least one special character from the provided set.
    // [A-Za-z\d@$!%*?&]{8,}: Matches the actual password. It allows alphanumeric characters and the specified special characters and enforces a minimum length of 8 characters.
    // $: Asserts the end of the string.
    if (
      e.target.value === "" ||
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        e.target.value
      )
    ) {
      setPassError(
        "Please enter at least one uppercase, one lowercase, one number, one special character and a minimun length of 8 characters."
      );
    } else {
      setPassError("");
    }
  }

  const handleSubmit = (e: FormEvent) => {
    //start checking for errors on each action in the inputs after submitting once
    setSubmittedOnce(true);
    e.preventDefault();
    // Accessing form data
    const formData = new FormData(e.target as HTMLFormElement);
    // Creating an object with the form data
		const formDataObj: formDataObj = {
      //the FormData object can hold various types of values, including files, so we need to explicitly specify the expected types for each form field
			userEmail: formData.get("user_email") as string | null,
			userPass: formData.get("user_pass") as string | null,
    };
		console.log(formDataObj);
		validateForm(formDataObj);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-3 w-full"
    >
      {/* email */}
      <div aria-label="email" className="flex flex-col w-full">
        <label
          htmlFor="user_email"
          className="text-[.75rem] font-bold text-neutral-400 mb-1"
        >
          Seu email
        </label>
        <div className="relative flex items-center">
          <input
            onChange={validateEmail}
            id="user_email"
            name="user_email"
            type="email"
            autoComplete="email"
            aria-label="coloque seu email aqui"
            placeholder="seu@email.com"
            className="border-2 rounded tracking-wide focus:outline-neutral-500 h-8 focus:shadow-md pl-10 text-[.75rem] w-full"
          />
          <div className="absolute p-2.5 top-0.5 bottom-0.5 border-r border-neutral-100">
            <FaUser className="w-2.5 h-2.5" />
          </div>
        </div>
        <div className="h-1.5 flex mt-1 ml-2">
          {emailError && (
            <span
              role="alert"
              aria-label="email field error"
              key="emailError-span"
              className="text-red-400 text-[0.65rem] font-semibold leading-[0.75rem] md:text-[0.6rem] md:leading-[0.7rem]"
            >
              {emailError}
            </span>
          )}
        </div>
      </div>

      {/* password */}
      <div aria-label="senha" className="flex flex-col w-full">
        <label
          htmlFor="user_pass"
          className="text-[.75rem] font-bold text-neutral-400 mb-1"
        >
          Sua senha
        </label>
        <div className="relative flex items-center">
          <input
            onChange={validatePassword}
            id="user_pass"
            name="user_pass"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            aria-label="coloque sua senha aqui"
            placeholder="Senha123!"
            className="border-2 rounded tracking-wide focus:outline-neutral-500 h-8 focus:shadow-md pl-10 text-[.75rem] w-full pr-7"
          />
          <div
            aria-label="lock icon"
            className="absolute p-2.5 top-0.5 bottom-0.5 border-r border-neutral-100"
          >
            <FaLock className="w-2.5 h-2.5" />
          </div>
          <button
            id="show_pass"
            aria-label="click to show/hide password"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2.5"
          >
            <FaEye
              className={`w-3 h-3  ${
                showPassword ? "text-neutral-600" : "text-neutral-400"
              }`}
            />
          </button>
        </div>
        <div className="min-h-1.5 flex mt-1 ml-2">
          {passError && (
            <span
              role="alert"
              aria-label="password field error"
              key="passError-span"
              className="text-red-400 text-[0.65rem] font-semibold leading-[0.75rem] md:text-[0.6rem] md:leading-[0.7rem]"
            >
              {passError}
            </span>
          )}
        </div>
      </div>

      {/* sign in button */}
      <button
        type="submit"
        aria-label="clique para entrar"
        className="text-[.75rem] w-4/5 bg-gradient-to-r from-green-700 to-green-500 text-white font-bold rounded-full py-1.5 shadow mt-2"
      >
        Entrar
      </button>
    </form>
  );
};

export default Form;
