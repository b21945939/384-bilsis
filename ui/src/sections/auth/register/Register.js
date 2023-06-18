import React from "react";
import Image from "react-bootstrap/esm/Image";
import RegisterForm from "./form/RegisterForm";

export default function Register() {
  return (
    <div className="h-100 w-100  position-absolute d-flex align-items-center justify-content-center flex-column">
      <div className="register bg-white d-flex flex-column align-items-center">
        <Image className="logo" src={require("../../../images/logo.png")} />
        <h1 className="text-center">Register</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
