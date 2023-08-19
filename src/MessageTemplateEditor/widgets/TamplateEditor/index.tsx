import { useRef, useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { ParamsList } from '../../components/ParamsList';
import { TamplateBlock } from '../../components/TamplateBlock';
import { TTamplateStruct } from '../../types';

import styles from './index.module.scss';
import { CreateRecursiveCopy} from '../../../shared/utils/CreateRecursiveCopy/CreateRecursiveCopy';

type TProps = {
    params : Array<string>;
    tamplate? : TTamplateStruct;
    callbackSave ? : (tamplate: TTamplateStruct)=>Promise<void>
    onClickPreview? : (tamplate: TTamplateStruct)=>void;
    onClickClose? : ()=>void;
}

export type ChildrenPropsFunctions = {
    DeleteIfBlock: (path:string[])=>void;
    ChangeState: (path:string[], newValue:string)=>void;
    OnChangeCursorPosition: (path:string[],selection: number|null)=>void;
}

export function TamplateEditor(props:TProps){
    let {params, tamplate, callbackSave , onClickPreview, onClickClose} = props;
    let [tamplateState, seTamplateState] = useState(tamplate||{First:""});

    let lastInputPath = useRef<Array<string>>([]);
    let lastCursorPosition = useRef<number|null>(null);


    function AddIfBlock(){
        if (lastCursorPosition.current === null) return;
        if (lastInputPath.current.length === 0) return;

        let path = lastInputPath.current;
        let pos = lastCursorPosition.current;
        let text = GetValueByPath(path);

        let copy = CreateRecursiveCopy(tamplateState!) as TTamplateStruct;
        let elem:any = copy;
        path.forEach((str,i)=>{if (i < path.length - 1) elem=elem[str];})

        let newLast = {First: text.slice(pos), IFblocks: elem.IFblocks, Last: elem.Last,}
        elem.First = text.slice(0,pos);
        elem.Last = newLast;
        elem.IFblocks = {ifConditionParam:{First:""}, Then:{First:""}, Else:{First:""}}

        seTamplateState(copy);
    }
    function ClickParams(param: string){
        let path = lastInputPath.current.length > 0 ? lastInputPath.current : ["First"];
        let oldValue = GetValueByPath(path);

        let pos = lastCursorPosition.current === null? oldValue.length : lastCursorPosition.current;
        let newValue = oldValue.slice(0,pos)+`{${param}}`+oldValue.slice(pos);

        ChangeState(path,newValue);
    }


    function DeleteIfBlock(path:string[]){
        let copy = CreateRecursiveCopy(tamplateState!) as TTamplateStruct;
        let elem:any = copy;
        path.forEach((str,i)=>{ if (i !== path.length - 1) elem=elem[str]; })

        delete elem.IFblocks;
        elem.IFblocks = elem.Last!.IFblocks;
        elem.First += elem.Last!.First;
        elem.Last = elem.Last!.Last

        seTamplateState(copy);
    }
    function ChangeState(path:string[], newValue:string){
        let copy = CreateRecursiveCopy(tamplateState!) as TTamplateStruct;
        let elem:any = copy;
        path.forEach((str,i)=>{
            if (i === path.length - 1) return elem[str]=newValue;
            elem=elem[str];
        })
        seTamplateState(copy);
    }
    function GetValueByPath(path:string[]):string{
        let elem:any = tamplateState;
        let result:string = "";

        path.forEach((str,i)=>{
            if (i === path.length - 1) return result = elem[str];
            elem=elem[str];
        })
        return result;
    }
    function OnChangeCursorPosition(path:string[],selectionPosition: number|null){
        lastInputPath.current = path;
        lastCursorPosition.current = selectionPosition;
    }


    return <div className = {styles.tamplateEditor}>
        <h1>Message Template Editor</h1>

        {/* ParamsList */}
        <ParamsList 
            params={params} 
            onClick={ClickParams}
        />

        {/* + Add If/Then/Else */}
        <div style={{display:"flex",justifyContent:"center",margin:"40px 0px 10px 0"}}>
            <div style={{margin:"5px"}}>
                <Button name='+ Add If/Then/Else' onClick={AddIfBlock}/>
            </div>
        </div>

        {/* Renderer */}
        <TamplateBlock 
            tamplate={tamplateState} 
            path={[]} 
            functions={{ChangeState,DeleteIfBlock,OnChangeCursorPosition}}
        />

        {/* Preview/Save/Close */}
        <div style={{display:"flex",justifyContent:"center",margin:"40px 0px"}}>
            <div style={{margin:"5px"}}><Button name='Preview' onClick={()=>onClickPreview?.(tamplateState)}/></div>
            <div style={{margin:"5px"}}><Button name='Save' onClick={()=>callbackSave?.(tamplateState)}/></div>
            <div style={{margin:"5px"}}><Button name='Close' onClick={onClickClose}/></div>
        </div>
    </div>
}