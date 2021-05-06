import {useState, useEffect, useRef} from 'react';

export const useGetFetch = (key) => {
    const [state, setState] = useState({data: null, loading: true, err: false});
    const empty = useRef(false);

    useEffect(()=>{
        setState({data: null, loading: true, err: false});

        if (key.replace(/\s/g,'') === '' & key.length !== 5) {empty.current = true;return;}
        fetch(`/api/data/${key}`)
        .then(res => res.text())
        .then(res =>{
            if (res === 'Oooops') setState({data: null, loading: false, err: true});
            else setState({data: res, loading: false, err: false});
        })
    }, [key]);

    if (empty.current) return state;

    return state;
}