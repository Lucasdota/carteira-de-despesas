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
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        data.userPass!
      )
    ) {
      setPassError(
        "Please enter at least one uppercase, one lowercase, one number, one special character and a minimun length of 8 characters."
      );
      errors.push("passError");
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

  return <div>Form</div>;
};

export default Form;
