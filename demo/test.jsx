import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Message,{toast} from '../src/index.jsx';

class Test extends Component{
    constructor(props){
        super(props);
        this.showToast = this.showToast.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.showRichAlert = this.showRichAlert.bind(this);
        this.showConfirm = this.showConfirm.bind(this);
    }
    showToast(){
        toast('测试toast消息测试toast消息');
    }
    showAlert(){
        Message.alert({
            title : function(){
                let styleObj = {color : 'red'};
                return (<span style={styleObj}>测试一下title</span>);
            },
            animation : 'opacity'
        });
    }
    showRichAlert(){
        Message.alert({
            title : '通知',
            content : function(){
                let styleObj = {color : 'red'};
                return (<span style={styleObj}>测试一下alert</span>);
            },
            doneLabel : function(){
                let styleObj = {color : '#ff6600'};
                return (<span style={styleObj}>关闭</span>);
            },
            done : function(){
                toast('点击关闭');
            }
        });
    }
    showConfirm(){
        //console.log(toast)
        Message.confirm({
            title : '确认要删除吗？',
            content : '请慎重执行该操作，操作后不能撤销',
            done : function(){
                Message.toast('点击yes');
            },
            cancel : function(){
                Message.toast('点击no');
            }
        })
    }
    render(){
        return(
            <ul>
                <li className="c-item" onClick={this.showToast}>toast点击</li>
                <li className="c-item" onClick={this.showAlert}>alert</li>
                <li className="c-item" onClick={this.showRichAlert}>alert富文本</li>
                <li className="c-item" onClick={this.showConfirm}>confirm</li>
            </ul>
        )
    }
}

ReactDOM.render(
    <Test />,
    document.getElementById('J_wrap')
);