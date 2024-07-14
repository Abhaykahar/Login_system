import { addDoc, collection, getFirestore } from 'firebase/firestore';
import React, { useState } from 'react'
import { app } from '../FirebseConfig';
import { Link } from 'react-router-dom';

function Register() {

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [phone,setPhone]=useState("");
    const [city,setCity]=useState("");
    const [gender,setGender]=useState("");

    const db=getFirestore(app)

    const handleSubmit = async(e)=>{
        e.preventDefault();


        if(!name || !email || !password || !phone || !city  || !gender){
            alert("all fill reuired...");
            return false;
        }


       try{
        await addDoc(collection(db,"Login"),{
            name:name,
            phone:phone,
            email:email,
            password:password,
            gender:gender,
            city:city
        })
        alert("sucessfully add user...");

        setName("");
        setCity("");
        setEmail("");
        setGender("");
        setPassword("");
        setPhone("")
       }catch(err){
            console.log(err);
            return false;
       }

    }
    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-8 mx-auto mt-5 border p-5">
                        <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                <input type="text" className="form-control" onChange={(e)=> setName(e.target.value)} value={name} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" onChange={(e)=> setEmail(e.target.value)} value={email} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" onChange={(e)=> setPassword(e.target.value)} value={password} />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Phone</label>
                                <input type="text" className="form-control" onChange={(e)=> setPhone(e.target.value)} value={phone} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">City</label>
                                <input type="text" className="form-control" onChange={(e)=> setCity(e.target.value)} value={city} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Gender</label><br />
                                <input type="radio" name='male' value="male" onChange={(e)=> setGender(e.target.value)} checked={gender === "male"} /> Male
                                <input type="radio" name='female' value="female" className='ms-2' onChange={(e)=> setGender(e.target.value)} checked={gender === "female"}  /> Female
                            </div>

                            
                           
                            <button type="submit" className="btn btn-primary d-block mx-auto">Submit</button>

                            <div className="mb-3 form-check">
  <label className="form-check-label" htmlFor="exampleCheck1">
  <p style={{marginLeft:'500px'}} className=''>you'r all reddy  account <Link to="/">Login</Link></p>

  </label>
</div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
