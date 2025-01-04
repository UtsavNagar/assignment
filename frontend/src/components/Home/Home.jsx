import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase/firebase";

export default function Home() {
    const [userName, setUserName] = useState("");

    const getUserData=()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                setUserName(user.displayName)
            }else{
                setUserName("")
            }
        })
    }

    useEffect(()=>{
        getUserData()
    },[])
    return (
        <div>
            <Link to={"/login"}>LogIn</Link>
            <br/>
            <br/>
            <br/>
            <Link to={"/signup"}>Signup</Link>
            <br/>
            <br/>
            <br/>
            <h1>
                {userName ?
                `well-come ${userName}`
                :
                "Please Log in"
                }
            </h1>
        </div>
    )
}