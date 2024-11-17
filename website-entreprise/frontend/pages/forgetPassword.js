import React from "react"
import Head from "next/head"
import ForgetPassword from "../sections/ForgetPassword"

const forgetPassword = () => {
    return (
      <>
        <Head>
          <title>Demande de réinitialisation de mot de passe </title>
        </Head>
        <ForgetPassword/>
      </>
    )
  }
  
  export default forgetPassword