import { useState } from "react"

import axios from "axios";
import { useNavigate } from "react-router-dom"
import { Heading } from "../components/Auth/Heading";
import { SubHeading } from "../components/Auth/SubHeading";
import { InputBox } from "../components/Auth/InputBox";
import { Button } from "../components/Auth/Button";
import { BottomWarning } from "../components/Auth/BottomWarning";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
   
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e => {
          setFirstName(e.target.value);
        }} placeholder="John" label={"First Name"} />
        <InputBox onChange={e => {
          setUsername(e.target.value);
        }} placeholder="sanjeev@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/signup", {
              username,
              firstName,
              password
            });
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.newUser))
            navigate("/")
          }} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}