import React from 'react'

type Props = {
  setMenu: (value: string) => void;
};

const OtherBtns = ({ setMenu }: Props) => {
  return (
    <div className="flex w-[90%] justify-between items-center text-blue-700 font-bold text-[.75rem]">
      <button onClick={() => setMenu("create_acc")} className="underline active:text-blue-800 visited:text-blue-900">
        Não tem uma conta?
      </button>
      <button onClick={() => setMenu("forgot_pass")} className="underline active:text-blue-800 visited:text-blue-900">
        Esqueceu sua senha?
      </button>
    </div>
  );
};

export default OtherBtns