
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { usePostFetch } from '../hooks/usePostFetch';
import Response from './Response';

function PostIt() {
    const [clicked, setClicked] = useState(false);
    const [buttonState, setButtonState] = useState(false);
    const [inputValue, handleChange] = useForm({inputText: ''});
    const [toBePosted, setToBePosted] = useState('');
    const [postSuccess, setPostSuccess] = useState(false);

    var {data, loading, err} = usePostFetch(toBePosted);

    const btn_locked =  <button className="post-locked">Post</button>;
    const btn_unlocked =  
                        <button 
                            className="post" 
                            onClick={()=>{setToBePosted(inputValue.inputText);setClicked(true)}}>
                                Post
                        </button>;
    
    useEffect(()=>{
        if(inputValue.inputText.replace(/\s/g,'') !== '')
            setButtonState(true);
        else {
            setButtonState(false);
            setClicked(false);
            setToBePosted('');
        };
    }, [inputValue.inputText]);

    return (
        <div className="inner-form">
            <h2 className="title">{loading ? 'Upload some text 📋':(err ? 'Something went wrong 🤮':'Your text is safe for the next 5min, get it using the key bellow, hurry ⏲️.')}</h2>

            <textarea 
                placeholder="Your text." 
                value={inputValue.inputText} 
                className="textarea"
                onChange={handleChange}/>

            {buttonState ? btn_unlocked:btn_locked}

            
                
            {(clicked & buttonState) ? 
                (loading ? 
                    <Response class='response-normal' result='loading...'/> : (err ? <Response class='response-fail' result='Something went really wrong.'/>:<Response class='response-success' result={data}/>)) : <Response class='response-normal' result='response'/>}
                
            
        </div>
    )
}

export default PostIt;