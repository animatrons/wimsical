
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { useState, useEffect } from 'react';

function GetIt() {
    const [resRes, setRes] = useState('');
    useEffect(() => {
        if (resRes === '') {
            document.getElementById('res').classList.remove('response-success');
            document.getElementById('res').classList.remove('response-fail');
            document.getElementById('res').classList.add('response-normal');
        }
        else if (resRes === true) {
            document.getElementById('res').classList.remove('response-fail');
            document.getElementById('res').classList.remove('response-normal');
            document.getElementById('res').classList.add('response-success');
        }
        else if (resRes === false) {
            document.getElementById('res').classList.remove('response-success');
            document.getElementById('res').classList.remove('response-normal');
            document.getElementById('res').classList.add('response-fail');
        }
    }, [resRes]);
    return (
        <div className="inner-form">
            <h2 className="title">Post some text</h2>

            <textarea className="textarea"></textarea>
            <button className="post">Post</button>

            <SimpleBar id="res" forceVisible="y" autoHide={false} className="response" >
                <div  >
                    response
                </div>
            </SimpleBar>
        </div>
    )
}

export default GetIt;