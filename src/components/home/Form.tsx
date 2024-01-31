import React from 'react'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";

type Props = {}

const Form = (props: Props) => {
	return (
		<form className="flex flex-col items-center justify-center gap-6 w-full">
				{/* email */}
				<div aria-label="email" className="flex flex-col gap-1 w-full">
					<label className="text-[.75rem] font-bold text-neutral-400">
						Seu email
					</label>
					<div className="relative flex items-center">
						<input
							aria-label="coloque seu email aqui"
							placeholder="john@doe.com"
							className="border-2 rounded tracking-wide focus:outline-neutral-500 h-8 focus:shadow-md indent-10 text-[.75rem] w-full"
						/>
						<div className="absolute p-2.5 top-0.5 bottom-0.5 border-r border-neutral-100">
							<FaUser className="w-2.5 h-2.5" />
						</div>
					</div>
				</div>
				{/* password */}
				<div aria-label="senha" className="flex flex-col gap-1 w-full">
					<label className="text-[.75rem] font-bold text-neutral-400">
						Sua senha
					</label>
					<div className="relative flex items-center">
						<input
							aria-label="coloque sua senha aqui"
							placeholder="johndoe123"
							className="border-2 rounded tracking-wide focus:outline-neutral-500 h-8 focus:shadow-md indent-10 text-[.75rem] w-full"
						/>
						<div className="absolute p-2.5 top-0.5 bottom-0.5 border-r border-neutral-100">
							<FaLock className="w-2.5 h-2.5" />
						</div>
					</div>
				</div>
				{/* sign in button */}
				<button
					type="submit"
					aria-label="clique para entrar"
					className="text-[.75rem] w-4/5 bg-gradient-to-r from-green-700 to-green-500 text-white font-bold rounded-full py-1.5 hover:brightness-105 active:brightness-95 shadow"
				>
					Entrar
				</button>
		</form>		
  );
}

export default Form