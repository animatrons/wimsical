import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { useState, useEffect } from 'react';

function Response(props) {
    return (
        <SimpleBar id="res" forceVisible="x" autoHide={false} className={props.class} >
                {/* <div className="result"> */}
                    {props.result}
                {/* </div> */}
        </SimpleBar>
    )
}

export default Response;