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
        .then(res => {
            if(res !== 'Oooops')    {
                setState({data: res, loading: false, err: false});
                console.log('fetch post: posting success'+res);
                }
            else {
                setState({data: null, loading: false, err: true});
                console.log('fetch post: posting error occured'+res);
                }
            })
        .catch(error =>{
            console.log('fetch api error occured'+error);
            setState({data: null, loading: false, err: true});
            console.log(error);
        })

    }, [txt]);

    if (empty.current) return state;

    return state;
}