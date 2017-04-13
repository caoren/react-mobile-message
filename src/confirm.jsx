import React,{PropTypes,Component} from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal';
const empty = undefined;
let DefaultOptions = {
    title : empty,
    content : empty,
    animation : empty,
    btons : []
}
export default function confirm(option = {}){
    let tempDiv = document.createElement('div');
    document.body.appendChild(tempDiv);
    let tobj = {};
    for(var p in DefaultOptions){
        if(p != 'btons'){
            tobj[p] = option[p] || DefaultOptions[p];
        }
        else{
            tobj[p] = [{
                label : option.cancelLabel || '取消',
                func : option.cancel
            },
            {
                label : option.doneLabel || '确定',
                func : option.done
            }];
        }
    }
    let props = {
        ...tobj,
        container : tempDiv
    }
    ReactDOM.render(<Modal {...props} />,tempDiv);
}
