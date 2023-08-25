import { CreateTrotling, Trotling } from '../../utils/CreateTrottling/CreateTrotling';
import styles from './index.module.scss';

type HintPosition = {
    top: string,
    bottom: string,
    left: string,
    right: string,
}

export class HintManager{
    private static _distanceAboutMouse: number = 5;
    private static _cssClass: string = styles.Hint;

    private static _elem: HTMLElement|null = null;
    private static _setTimeoutTocken: NodeJS.Timeout|null = null;

    private static _posIsTop: boolean = false;
    private static _posIsLeft: boolean = false;

    private static _trotlingShow: Trotling = CreateTrotling(Math.ceil(1000 / 60));
    private static _trotlingHide: Trotling = CreateTrotling(Math.ceil(1000 / 60));


    public static Show(text: string, x: number, y: number){
        this._trotlingShow(() => this._Show(text, x, y));
    }

    public static Hide(){
        this._trotlingHide(() => this._Hide());
    } 


    private static _Show(text: string, x: number, y: number){
        let elem = this._GetHintElement();
        if (this._setTimeoutTocken) clearTimeout(this._setTimeoutTocken);
        if (!elem) return;

        elem.innerHTML = text;
        elem.style.opacity = "1";
        elem.style.transition = "none";
    
        let pos = this._CalculateHintPosition(x, y);
    
        elem.style.top = pos.top;
        elem.style.bottom = pos.bottom;
        elem.style.left = pos.left;
        elem.style.right = pos.right;
    }
    
    private static _Hide(){
        let elem = this._GetHintElement();
        if (!elem) return;
        elem.style.transition = "opacity 0.5s";
        elem.style.opacity = "0";
    
        this._setTimeoutTocken = setTimeout(()=>{
            if (!elem) return;
            elem.style.top = `-100%`;
            elem.style.bottom = `auto`;
            this._setTimeoutTocken = null;
        },500);
    }  

    private static _CalculateHintPosition(x:number,y:number):HintPosition{
        let docW = document.documentElement.clientWidth;
        let docH = document.documentElement.clientHeight;
        let isTop = (y * (this._posIsTop ? 1.2 : 1) > (docH - y) * (this._posIsTop ? 1 : 1.2));
        let isLeft = (x * (this._posIsLeft ? 1.2 : 1) > (docW - x) * (this._posIsLeft ? 1 : 1.2));
    
        this._posIsTop = isTop;
        this._posIsLeft = isLeft;
    
        return {
            top: isTop ? `auto` : `${y + 5 + this._distanceAboutMouse}px`,
            bottom: isTop ? `${docH - y + this._distanceAboutMouse}px` : `auto`,
            left: isLeft ? `auto` : `${x + 5 + this._distanceAboutMouse}px`,
            right: isLeft ? `${docW - x + this._distanceAboutMouse}px` : `auto`,
        }
    }

    private static _GetHintElement():HTMLElement|null{
        if (this._elem) return this._elem;
        this._elem = document.querySelector("." + this._cssClass);

        if (this._elem) return this._elem;
        this._elem = this._CreateHintElement();

        return this._elem;
    }

    private static _CreateHintElement():HTMLElement|null{
        let elem = document.createElement("span");
        elem.classList.add(this._cssClass);
        elem.classList.add("noselect");
    
        elem.addEventListener("mouseenter",()=>{
            elem.style.top = `-100%`;
            elem.style.bottom = `auto`;
        });
    
        document.body.appendChild(elem);
        return elem;
    }
}