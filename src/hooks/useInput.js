import { useState } from "react";

function useInput (init = "") {
    const [state, setState] = useState(init);
    
    const change = (e) => {
        setState(e.target.value);
    };
    
    const clear = () => {
        setState("");
    };
    
    return [state, change, clear];
}

export default useInput;
