import {useState} from 'react';

export const useForm = initialValues =>{
    const [values, setValues] = useState(initialValues);

    return [
        values,
        e =>{
            setValues(
                {
                    ...values,
                    inputText: e.target.value,
                }
            )
        }
    ]
}