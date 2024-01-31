"use client"
import React from 'react'
import Form from './Form';
import OtherBtns from './OtherBtns';

type Props = {}

const Login = (props: Props) => {
	return (
    <section
      aria-label="area de login"
      className="flex flex-col items-center justify-center p-6 bg-white rounded shadow-lg gap-6 w-96 sm:w-72"
    >
      <Form />
      <OtherBtns />
    </section>
  );
}

export default Login;