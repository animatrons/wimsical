import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { useState, useEffect } from 'react';

function Response(props) {
    return (
        <SimpleBar id="res" forceVisible="y" autoHide={false} className={props.class} >
            <div>
                {props.result}
                <span style={{visibility:'hidden'}}>{props.code}</span>
            </div>
        </SimpleBar>
    )
}

export default Response;