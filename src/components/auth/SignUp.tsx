import {FormEvent, useState} from 'react';


const SignUp = () => {

    const [firstname, setFirstname] = useState<string | null>(null);
    const [lastname, setLastname] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(firstname, lastname, email, password);
    }

    return (
        <div className="row justify-content-center">
            <div className="col-sm-12 col-md-6 col-lg-4">

                <h3>Signup</h3>

                <form onSubmit={handleSubmit}>

                    <div className="row g-3">
                        <div className="col-sm-6">
                            <label htmlFor="firstname" className="form-label">First name</label>
                            <input type="text" className="form-control" id="firstname" required onChange={(e) => setFirstname(e.target.value)}/>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="lastname" className="form-label">Last name</label>
                            <input type="text" className="form-control" id="lastname" required onChange={(e) => setLastname(e.target.value)}/>
                        </div>
                        <div className="col-12">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="you@example.com" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="col-12">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password"  onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>

                    <hr className="my-4" />

                    <button className="w-100 btn btn-primary btn-lg" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
