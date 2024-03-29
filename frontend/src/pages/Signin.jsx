import axios from "axios"
import { BottomWarning } from "../components/Auth/BottomWarning"
import { Button } from "../components/Auth/Button"
import { Heading } from "../components/Auth/Heading"
import { InputBox } from "../components/Auth/InputBox"
import { SubHeading } from "../components/Auth/SubHeading"
import '../index.css'
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const Signin = () => {
    const [firstName, setFirstName] = useState("");
   
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your infromation to login to your account"} />
      
        <InputBox onChange={e => {
          setUsername(e.target.value);
        }} placeholder="sanjeev@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/signin", {
              username,
              password
            });
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate("/")
          }} label={"Sign-in"} />
        </div>
        <BottomWarning label={"Don't have an account sign up"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}