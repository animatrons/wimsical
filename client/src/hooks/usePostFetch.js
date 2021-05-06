import {useState, useEffect, useRef} from 'react';

export const usePostFetch = (txt) => {
    const [state, setState] = useState({data: null, loading: true});
    const empty = useRef(false);

    useEffect(()=>{
        setState({data: null, loading: true});

        if (txt.replace(/\s/g,'') === '') {empty.current = true;return ;}
        
        fetch('/api/data',{
            method: 'post',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({text: txt})
        })
        .then(res => res.text())
        .then(res =>
            setState({data: res, loading: false}))

    }, [txt]);

    if (empty.current) return state;

    return state;
}