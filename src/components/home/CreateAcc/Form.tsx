import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaUser, FaEye } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";

interface formDataObj {
  userEmail: string | null;
  userPass: string | null;
  passConfirm: string | null;
}

interface formValidated {
  userEmail: boolean;
  userPass: boolean;
}

const Form = () => {
  const [emailError, setEmailError] = useState<string>("");
  const [passError, setPassError] = useState<string>("");
  const [confirmError, setConfirmError] = useState<string>("");
  const [submittedOnce, setSubmittedOnce] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>("");

	function validateForm(data: formDataObj) {
    const errors = [];

    if (data.userEmail === "") {
      setEmailError("Entre um email válido.");
      errors.push("emailError");
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        data.userPass!
      )
    ) {
      setPassError(
        "Por favor entre pelo menos uma letra maiúscula, uma minúscula, um número e um caratere especial, e no mínimo 8 caracteres."
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    //checa os inputs a cada interação quando já deu submit uma vez
    setSubmittedOnce(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const formDataObj: formDataObj = {
      userEmail: formData.get("user_email") as string | null,
      userPass: formData.get("user_pass") as string | null,
      passConfirm: formData.get("pass_confirm") as string | null,
    };

		// VALIDAR INPUTS
		//email
		let emailValidated = false;
		if (
      formDataObj.userEmail === "" ||
      !/\S+@\S+\.\S+/.test(formDataObj.userEmail!)
    ) {	
			console.log("teste");		
      setEmailError("Entre um email válido.");
    } else {			
      setEmailError("");
      emailValidated = true;
    }
		//password
		let passValidated = false;
		if (
      formDataObj.userPass === "" ||
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formDataObj.userPass!
      )
    ) {
      setPassError(
        "Por favor entre pelo menos uma letra maiúscula, uma minúscula, um número e um caratere especial, e no mínimo 8 caracteres."
      );
    } else {
      setPassError("");
      passValidated = true;
    }	
		
    // somente envia para o servidor se os inputs já foram válidados
    if (emailValidated && passValidated) {
      console.log(formDataObj);
      validateForm(formDataObj);
    }
  }; 

  function validateEmailOnChange(e: ChangeEvent<HTMLInputElement>) {
    if (!submittedOnce) return;

    if (e.target.value === "" || !/\S+@\S+\.\S+/.test(e.target.value)) {
      setEmailError("Entre um email válido.");
    } else {
      setEmailError("");
    }
  }

  function validatePasswordOnChange(e: ChangeEvent<HTMLInputElement>) {
		// para comparar as senhas
		setPasswordValue(e.target.value);
    if (!submittedOnce) return;   
    // ^: no começa da string.
    // (?=.*[a-z]): pelo menos um lowercase.
    // (?=.*[A-Z]): pelo menos um uppercase.
    // (?=.*\d): pelo menos um número.
    // (?=.*[@$!%*?&]): pelo menos um caractere especial.
    // [A-Za-z\d@$!%*?&]{8,}: verifica o atual valor se tem pelo menos 8 caracteres.
    // $: no fim da string.
    if (
      e.target.value === "" ||
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        e.target.value
      )
    ) {
      setPassError(
        "Por favor entre pelo menos uma letra maiúscula, uma minúscula, um número e um caratere especial, e no mínimo 8 caracteres."
      );
    } else {
      setPassError("");
    }
  }

	function validateConfirmPassOnChange(e: ChangeEvent<HTMLInputElement>) {
    setConfirmPasswordValue(e.target.value)
  }

	//usado para explicitar o erro quando senhas não são iguais a cada interação
	useEffect(() => {
    if (!submittedOnce) return;

    if (passwordValue !== confirmPasswordValue) {
      setConfirmError("Senhas não são iguais.");
    } else {
      setConfirmError("");
    }
  }, [passwordValue, submittedOnce, confirmPasswordValue]); 

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
            id="user_email"
            name="user_email"
            type="email"
            autoComplete="email"
            aria-label="coloque seu email aqui"
            placeholder="seu@email.com"
            required
            onChange={validateEmailOnChange}
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
            id="user_pass"
            name="user_pass"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            aria-label="coloque sua senha aqui"
            placeholder="Senha123!"
            required
            onChange={validatePasswordOnChange}
            className="border-2 rounded tracking-wide focus:outline-neutral-500 h-8 focus:shadow-md pl-10 text-[.75rem] w-full pr-7"
          />
          <div
            aria-label="lock icon"
            className="absolute p-2.5 top-0.5 bottom-0.5 border-r border-neutral-100"
          >
            <FaLock className="w-2.5 h-2.5" />
          </div>
          <div
            role="button"
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
          </div>
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

      {/* confirm password */}
      <div aria-label="senha" className="flex flex-col w-full">
        <label
          htmlFor="pass_confirm"
          className="text-[.75rem] font-bold text-neutral-400 mb-1"
        >
          Confirme a senha
        </label>
        <div className="relative flex items-center">
          <input
            id="pass_confirm"
            name="pass_confirm"
            type={showConfirm ? "text" : "password"}
            aria-label="confirme sua senha aqui"
            placeholder="Senha123!"
            required
            autoComplete="new-password"
            onChange={validateConfirmPassOnChange}
            className="border-2 rounded tracking-wide focus:outline-neutral-500 h-8 focus:shadow-md pl-10 text-[.75rem] w-full pr-7"
          />
          <div
            aria-label="lock icon"
            className="absolute p-2.5 top-0.5 bottom-0.5 border-r border-neutral-100"
          >
            <FaLock className="w-2.5 h-2.5" />
          </div>
          <div
            role="button"
            id="show_pass_confirm"
            aria-label="click to show/hide password"
            onClick={() => setShowConfirm((prev) => !prev)}
            className="absolute right-2.5"
          >
            <FaEye
              className={`w-3 h-3  ${
                showConfirm ? "text-neutral-600" : "text-neutral-400"
              }`}
            />
          </div>
        </div>
        <div className="min-h-1.5 flex mt-1 ml-2">
          {confirmError && (
            <span
              role="alert"
              aria-label="confirm password field error"
              key="confirmError-span"
              className="text-red-400 text-[0.65rem] font-semibold leading-[0.75rem] md:text-[0.6rem] md:leading-[0.7rem]"
            >
              {confirmError}
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
        Criar
      </button>
    </form>
  );
};

export default Form;
