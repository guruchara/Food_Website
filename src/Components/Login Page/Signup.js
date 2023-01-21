import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/login.css';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider';
import { useForm } from 'react-hook-form';
import { emailData } from '../../Firebase/firebase';
// import { emailPassword } from '../../Firebase/firebase';

function Signup(props) {
    // react-router-dom
    const history = useHistory();
    const { signUp } = useAuth()
    const [name, nameSet] = useState("");
    const [password, passwordSet] = useState("");
    const [email, emailSet] = useState("");
    const [confirm, setConfirm] = useState("");
    

    const { register, handleSubmit, watch, reset, onChange, formState: { errors } } = useForm({ mode: 'onChange', shouldUseNativeValidation: true, reValidateMode: 'onChange', });

    const onSubmit = (data) => {
        try {
            console.log("sending request");
            // do signup


            console.log("data 27",data)
            
        //    emailData(data.email,data.password)
            // createUserWithEmailAndPassword

            // emailPassword()
            
            // console.log("name",name)
            // console.log("password",password)
            
            // await axios.post("http://localhost:4000/home/guru",{
            //     payload:{
            //         "username":"rs",
            //         "password":"124345",
            //         "email":"gurucharanchouhan17@gmail.com"
            //     }
            // })
            // await signUp(name, password, email, confirm);
            // send user to login 
            history.push("/login");
        }
        catch (err) {
            console.log(err);
        }
    }
// click


    return (


        <div className="rectangleForm">
        <div className="formContainer">
          

            <form className="form" onSubmit={handleSubmit(onSubmit)}>

                <div className="formGroup">
                    <label htmlFor="name">name</label>
                    <input type="text" name="name" className="inputBox" placeholder="your name"  {...register("name")} />
                </div>

                <div className="formGroup">
                    <label htmlFor="email">e-mail id*</label>
                    <input type="text" name="email" className="inputBox" placeholder="e-mail id"  {...register("email",{required:true})} />
                </div>

                <div className="styles.formGroup">
                    <label htmlFor="phone number">phone number*</label>
                    <input type="tel" name="phoneNumber" className={`${"inputBox"} ${errors.phone ? "isInValid" : ''}`} placeholder="phone number*" {...register("phone", { required: true, minLength: 10, maxLength: 10, pattern: /^[0-9]+$/ })} />
                </div>

                <div className="formGroup">
                    <label htmlFor="password">password*</label>
                    <input type="tel" name="password" className="inputBox" placeholder="6 digit pincode" {...register("password*", { minLength: 6, maxLength: 6, pattern: /^(\d{4}|\d{6})$/ })} />
                </div>

                

                <div className="requestCallButton">
                    <button type="submit">submit</button>
                </div>

            </form>
        </div>

    </div>


        // <div className="container-grey">
        //     <div className="form-container">
        //         <div className='h1Box'>
        //             <h1 className='h1'>SIGN UP</h1>
        //             <div className="line"></div>
        //         </div>
        //         <div className="loginBox">
        //             <div className="entryBox">
        //                 <div className="entryText">Name</div>
        //                 <input className="name input" type="text" name="Name" placeholder="Your Name" required="" onChange={(e) => nameSet(e.target.value)} />
        //             </div>
        //             <div className="entryBox">
        //                 <div className="entryText">Email</div>
        //                 <input className="email input" type="email" name="Email" placeholder="Your Email" required="" onChange={(e) => emailSet(e.target.value)} />
        //             </div>
        //             <div className="entryBox">
        //                 <div className="entryText">Password</div>
        //                 <input className="password input" type="password" name="Password" placeholder="**********" onChange={(e) => passwordSet(e.target.value)} />
        //             </div>
        //             <div className="entryBox">
        //                 <div className="entryText">Confirm  Password</div>
        //                 <input className="confirmPassword input" type="password" name="ConfirmPassword" placeholder="**********" onChange={(e) => setConfirm(e.target.value)} />
        //             </div>
        //             <button className="loginBtn  form-button" type="submit" onClick={handleSignup}>
        //                 Sign Up
        //             </button>

        //         </div>
        //     </div>
        // </div>
    )
}

export default Signup;


