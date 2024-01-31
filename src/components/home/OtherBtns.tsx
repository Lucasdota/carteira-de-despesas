import React from 'react'

type Props = {}

const OtherBtns = (props: Props) => {
	return (
    <div className="flex w-[90%] justify-between items-center text-blue-700 font-bold text-[.75rem]">
      <button className="underline active:text-blue-800 visited:text-blue-900">
        Não tem uma conta?
      </button>
      <button className="underline active:text-blue-800 visited:text-blue-900">
        Esqueceu sua senha?
      </button>
    </div>
  );
}

export default OtherBtns