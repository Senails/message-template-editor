import { useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { MyInput } from '../../../shared/components/MyInput';
import styles from './index.module.scss';
import { MessageGenerator } from '../../utils/MessageGenerator';
import { TTamplateConfig } from '../../types';
import { MyTextArea } from '../../../shared/components/MyTextArea';
import { MouseHoverHint } from '../../../shared/components/MouseHoverHint';

type TProps = {
    params: Array<string>;
    tamplate: TTamplateConfig;
    onCloseClick?: ()=>void;
}

export function TamplatePreviewer({params, tamplate, onCloseClick}:TProps){
    let [paramsState, setParamsState] = useState(params.map((str) => [str, ""]));


    function ChangeParams(paramID: number, value: string){
        let newState = paramsState.map((elem, i) => i === paramID ? [elem[0], value] : [...elem]);
        setParamsState(newState);
    }
    function ComposeMessage(){
        let obj:{[key: string] : string;} = {};
        paramsState.forEach((elem)=>{
            obj[elem[0]] = elem[1];
        })
        return MessageGenerator(obj, tamplate);
    }
    
    
    return <div className={styles.TamplatePreviewer}>
        <div style={{height: "25px"}}></div>
        <h1>Message Preview</h1>

        {/* Message Text */}
        <div className={styles.resultMessage}>
            <MyTextArea 
                value={ComposeMessage()}
                disabled={true}
            />
        </div>

        {/* Variables: */}
        <div className={styles.variablesConteiner}>
            <p>Variables:</p>
            {paramsState.map((elem, i)=><div style={{width: "200px"}} key = {i}>
                <MyInput 
                value = {elem[1]}
                name={elem[1]}
                placeholder = {elem[0]} 
                onChange={(newValue) => ChangeParams(i, newValue)} 
                />
            </div>)
            }
        </div>

        {/* close button */}
        <div style={{display: "flex", justifyContent: "center"}}>
            <MouseHoverHint text='Закрыть превью'>
                <Button name='Close' onClick={onCloseClick}/>
            </MouseHoverHint>
        </div>
        <div style={{height: "25px"}}></div>
    </div>
}