"use client"
import React, { useState } from 'react'
import Título from './Título';
import Login from './Login/Login';
import Footer from './Footer';
import CreateAcc from './CreateAcc/CreateAcc';
import ForgotPass from './ForgotPass/ForgotPass';

type Props = {}

const Interface = (props: Props) => {
	const [menu, setMenu] = useState<string>("login");
	return (
    <>
      <Título />
			{
				menu === "login" ? (
					<Login setMenu={setMenu} />
				) : menu === "create_acc" ? (
					<CreateAcc />
				) : (
					<ForgotPass />
				)
			}     
      <Footer />
    </>
  );
}

export default Interface