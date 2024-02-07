import React from 'react'
import Form from './Form'

type Props = {}

const CreateAcc = (props: Props) => {
	return (
    <section
      aria-label="area de login"
      className="flex flex-col items-center justify-center p-6 bg-white rounded shadow-lg gap-6 w-96 xs:w-72"
    >
			<h2 className='text-neutral-600 font-bold'>Crie sua conta</h2>
      <Form />
    </section>
  );
}

export default CreateAcc