import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import Response from './Response';
import { useGetFetch } from '../hooks/useGetFetch';

function GetIt() {
    const [buttonState, setButtonState] = useState(false);
    const [inputValue, handleChange] = useForm({inputText: ''});
    const [clicked, setClicked] = useState(false);
    const [postKey, setPostKey] = useState('');

    const {data, loading, err} = useGetFetch(postKey);

    const btn_locked =  <button className="post-locked">Get</button>;
    const btn_unlocked =  
                        <button 
                            className="post"
                            onClick={()=>{setPostKey(inputValue.inputText.toUpperCase()); setClicked(true);}}>
                            Get
                        </button>;

    useEffect(()=>{
        if(inputValue.inputText.replace(/\s/g,'') !== '' & inputValue.inputText.length === 5)
            setButtonState(true);
        else {
            setButtonState(false);
            setClicked(false);
            setPostKey('');
        }
    }, [inputValue.inputText]);

    return (
        <div className="inner-form">
            <h2 className="title">{loading ? 'Use a valid 🔑 to get a post':(err ? 'Something went wrong 🤮':'💪💯 You got it 💪💯')}</h2>
            
            <input 
                type="text" 
                placeholder="caps or no caps" 
                className="textarea get"
                value={inputValue.inputText}
                onChange={handleChange}/>

            {buttonState ? btn_unlocked:btn_locked}

            {/* {(clicked & buttonState) ? (loading ? <Response class='response-normal' result='loading...'/> : <Response class='response-success-get' result={data}/>) : <Response class='response-normal' result='response'/>} */}

            {(clicked & buttonState) ? 
                (loading ? 
                    <Response class='response-normal' result='loading...'/> : (err ? <Response class='response-fail' result='Wrong key or delay expired.'/>:<Response class='response-success-get' result={data}/>)) : <Response class='response-normal' result='response'/>}

        </div>
    )
}

export default GetIt;

