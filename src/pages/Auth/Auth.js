import React, { useState } from "react";
import { FormInput, LoaderButton } from "../../components";
import { Auth as Authlib } from "../../services";
import { useFormFields } from "../../hooks";
import "./Auth.scss";

function Auth (props) {
    const [activeTab, setActiveTab] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [fields, updateFields] = useFormFields({
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });
    
    function validateForm () {
        if(activeTab === 1) {
            return (
                fields.username.length > 0 &&
                fields.email.length  > 0 &&
                fields.password.length > 0 &&
                fields.password === fields.confirmPassword 
            );
        }
        
        return (
            fields.username.length > 0 &&
            fields.password.length > 0 
        );
    }
    
    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        
        try {
            let user;
            if(activeTab === 1) {
                user = await Authlib.register(fields.email, fields.username, fields.password);
            } else {
                user = await Authlib.login(fields.username, fields.password);
            }
            
            props.setUser(user);
            props.hasLoggedIn(true);
            props.history.push("/console");
        } catch(err) {
            alert(err);
            setIsLoading(false);
        }
    }
    
    return (
        <div className="Auth">
            <section className="Auth-left">
                <h1>Doodle It</h1>
                <p>
                Phasellus et luctus nibh, vel ornare leo. Morbi nec feugiat nibh.
                Ut lacinia tempus dui, sed dignissim eros. Vivamus condimentum nec
                metus vitae pretium. Integer sed risus vel mi dignissim faucibus sed
                vitae sapien. Vestibulum ante ipsum primis in faucibus orci luctus et
                ultrices posuere cubilia Curae; Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Donec posuere turpis sit amet pharetra tincidunt. Nullam
                dictum pharetra sapien id imperdiet. Mauris viverra odio et tortor interdum
                lacinia ut nec metus. Maecenas sollicitudin ligula cursus, egestas mi ac,
                mollis tortor.
                </p>
            </section>
            <section className="Auth-right">
                <section className="Auth-form-container">
                    <header>
                        <button 
                            className="Auth-form-tab"  
                            disabled={activeTab === 0} 
                            onClick={() => setActiveTab(0)}
                        >
                            Login
                        </button>
                        <button 
                            className="Auth-form-tab" 
                            disabled={activeTab === 1} 
                            onClick={() => setActiveTab(1)}
                        >
                            Register
                        </button>
                        <h1>
                            {activeTab === 1 ? "Let's get started!" : "Welcome back!"}
                        </h1>
                    </header>
                    <form className="Auth-form" onSubmit={handleSubmit}>
                        <FormInput 
                            className="Auth-form-input"
                            id="username"
                            type="text"
                            value={fields.username}
                            placeholder="Enter Username..."
                            onChange={updateFields}
                            label="Username"
                        />
                        {activeTab === 1 &&
                            <FormInput
                                className="Auth-form-input"
                                id="email"
                                type="email"
                                value={fields.email}
                                placeholder="Enter Email..."
                                onChange={updateFields}
                                label="Email"
                            />
                        }
                        <FormInput 
                            className="Auth-form-input"
                            type="password"
                            id="password"
                            value={fields.password}
                            placeholder="Enter Password..."
                            onChange={updateFields}
                            label="Password"
                        />
                        {activeTab === 1 &&
                            <FormInput
                                className="Auth-form-input"
                                type="password"
                                id="confirmPassword"
                                value={fields.confirmPassword}
                                placeholder="Confirm Password..."
                                onChange={updateFields}
                                label="Confirm Password"
                            />
                        }
                        <LoaderButton 
                            isLoading={isLoading}
                            disabled={!validateForm() || isLoading}
                        >
                            {activeTab === 1 ? "Register" : "Login"}
                        </LoaderButton>
                    </form>
                </section>
            </section>
        </div>
    );
}

export default Auth;
