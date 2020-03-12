import axios from "axios";
import config from "../../config";

async function create (userId, payload) {
    try {
        let url = `${config.prefix}/v1/doodle?apiKey=${config.key}&userId=${userId}`;
        let { data } = await axios.post(url, payload);
        return data;
    } catch(e) {
        try {
            e.message = e.response.data.message;
        } catch(e) {
            e.message = "Something went wrong, try again later";
        } finally {
            throw e;
        }  
    }
} 

export default create;
