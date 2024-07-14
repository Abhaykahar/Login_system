import { collection, getDocs, getFirestore } from 'firebase/firestore';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../FirebseConfig';

const db=getFirestore(app)

function Login() {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const navigate=useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{
            let record=collection(db,'Login');
            const user=await getDocs(record);
            let data=user.docs.map(val =>({
                id:val.id,
                ...val.data()
            }))
            let login=data.filter(val => val.email === email && val.password === password);
            if(login.length === 0){
                alert("email and password not find...");
                setEmail("");
                setPassword("");
            }else{
                navigate('/home');
            }
        }catch(err){
            console.log(err);
            return false;
        }
    }
    return (
        <div>
            <div className="conatiner mt-5">
                <div className="row">
                    <div className="col-lg-6 mx-auto mt-5 border p-5">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" onChange={(e)=>setEmail (e.target.value)} value={email} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control mb-4" onChange={(e)=> setPassword(e.target.value)} value={password}  />

                            </div>

<div className="mb-3 form-check">
  <label className="form-check-label" htmlFor="exampleCheck1">
  <p style={{marginLeft:'400px'}} className=''>you'r not account <Link to="/register">Register</Link></p>

  </label>
</div>

                           
                            <button type="submit" className="btn btn-primary mx-auto d-block">Submit</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
