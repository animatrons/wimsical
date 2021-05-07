import {useState, useEffect, useRef} from 'react';

export const usePostFetch = (txt) => {
    const [state, setState] = useState({data: null, loading: true, err: false});
    const empty = useRef(false);

    useEffect(()=>{
        setState({data: null, loading: true, err: false});

        if (txt.replace(/\s/g,'') === '') {empty.current = true;return ;}
        
        fetch('/api/data',{
            method: 'post',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({text: txt})
        })
        .then(res => res.text())
        .then(res =>
            setState({data: res, loading: false, err: false}))
        .catch(err =>{
            setState({data: null, loading: false, err: true});
            console.log(err);
        })

    }, [txt]);

    if (empty.current) return state;

    return state;
}