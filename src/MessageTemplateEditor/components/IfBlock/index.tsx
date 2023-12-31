import { memo } from 'react';
import { Button } from '../../../shared/components/Button';
import { IFBlockStruct } from '../../types';
import { TamplateBlock } from '../TamplateBlock';
import styles from './index.module.scss';
import { ChildrenPropsFunctions } from '../../widgets/TamplateEditor';
import { RecursiveIsEqual } from '../../../shared/utils/RecursiveIsEqual/RecursiveIsEqual';
import { MouseHoverHint } from '../../../shared/components/MouseHoverHint';

type TProps = {
    ifParams: IFBlockStruct;
    path: string[];
    functions: ChildrenPropsFunctions;
}

export const IfBlock = memo((props:TProps)=>{
    let {ifParams, path} = props;
    let {DeleteIfBlock} = props.functions; 

    const {IfConditionParam, Then, Else} = ifParams;
    let myPath = [...path, "IfConditionParam"];


    function DeleteClick(){
        DeleteIfBlock?.(path);
    }


    return <div className={styles.Conteiner}>
        {/* if */}
        <div>
            <div style={{paddingTop:"7px"}}>
                <span>
                    <MouseHoverHint text='Если это поле не пустое то текст возмут из "Then" иначе из "Else"'>
                        {"If"}
                    </MouseHoverHint>
                </span>
                <MouseHoverHint text='Удалить условный блок'>
                    <Button name={"delete"} onClick={DeleteClick}/>
                </MouseHoverHint>
            </div>
            <div>
                <TamplateBlock 
                    tamplate={IfConditionParam} 
                    path={myPath} 
                    functions={props.functions}
                />
            </div>
        </div>

        {/* Then */}
        <div>
            <div>
                <span>
                    <MouseHoverHint text='Если поле "If" не пустое то в сообщение попадет этот блок'>
                        {"Then"}
                    </MouseHoverHint>
                </span>
            </div>
            <div>
                <TamplateBlock 
                    tamplate={Then} 
                    path={[...path,"Then"]} 
                    functions={props.functions}
                />
            </div>
        </div>

        {/* Else */}
        <div>
            <div>
                <span>
                    <MouseHoverHint text='Если поле "If" пустое то в сообщение попадет этот блок'>
                        {"Else"}
                    </MouseHoverHint>
                </span>
            </div>
            <div>
                <TamplateBlock 
                    tamplate={Else} 
                    path={[...path,"Else"]}
                    functions={props.functions}
                />
            </div>
        </div>
    </div>
},(prevProps,nextProps)=>RecursiveIsEqual(prevProps.ifParams,nextProps.ifParams));