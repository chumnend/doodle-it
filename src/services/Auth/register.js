import axios from "axios";
import config from "../../config";

async function register (email, username, password) {
    try {
        let url = `${config.prefix}/v1/auth/register?apiKey=${config.key}`;
        let payload = { email, username, password };
        
        let { data } = await axios.post(url, payload);
        let { token, ...user } = data;
        
        // set token 
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        window.localStorage.setItem("jwtToken", token); 
        
        return user;
    } catch(err) {
        try {
            err.message = err.response.data.message;
        } catch(e) {
            err.message = "Something went wrong, try again later";
        } finally {
            throw err;
        }
    }
}

export default register;
