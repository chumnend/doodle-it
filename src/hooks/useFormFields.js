import { useState } from "react";

function useFormFields (init) {
    const [fields, setFields] = useState(init);

    function updateFields (event) {
        setFields({
            ...fields,
            [event.target.id]: event.target.value
        });
    }

    return [fields, updateFields];
}

export default useFormFields;
