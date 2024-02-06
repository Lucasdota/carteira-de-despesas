import Image from 'next/image';
import React from 'react'
import ListIcon from "../../../public/list.png";

type Props = {}

const Título = (props: Props) => {
	return (
    <section
      aria-label="título"
      className="flex flex-col items-center gap-6"
    >
      <div className="flex items-center gap-1">
        <Image
          src={ListIcon}
          width={24}
          height={24}
          alt="logo do site, uma caderneta de despesas"
        />
        <h1 className="text-lg font-bold">Notarium</h1>
      </div>
      <h2 className="text-2xl font-bold drop-shadow-sm text-center">
        Carteira de Despesas
      </h2>
    </section>
  );
}

export default Título