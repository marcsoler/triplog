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
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Sign Up</h1>
                    <div className="form-floating">
                        <input type="firstname" className="form-control" id="floatingInput" placeholder="First name"
                               onChange={(e) => setFirstname(e.target.value)}/>
                        <label htmlFor="floatingInput">First name</label>
                    </div>
                    <div className="form-floating">
                        <input type="lastname" className="form-control" id="floatingInput" placeholder="Last name"
                               onChange={(e) => setLastname(e.target.value)}/>
                        <label htmlFor="floatingInput">Last name</label>
                    </div>
                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                               onChange={(e) => setEmail(e.target.value)}/>
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                               onChange={(e) => setPassword(e.target.value)}/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
