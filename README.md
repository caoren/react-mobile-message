# react-mobile-message

> 移动端react的消息弹层组件.
## 使用
```js
import "react-mobile-message/assets/toast.css"
import "react-mobile-message/assets/modal.css"
import Message from '../src/index.jsx';
Message.toast('测试toast消息测试toast消息');
Message.alert({
    title : function(){
        let styleObj = {color : 'red'};
        return (<span style={styleObj}>测试一下title</span>);
    },
    animation : 'opacity'
});
```
## 预览
[点击查看demo](https://caoren.github.io/react-mobile-message/demo/)

## License
Copyright (c) 2016 [Cao Ren](https://github.com/caoren) under the MIT License.