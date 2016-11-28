import React,{PropTypes,Component} from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Mask from './mask';

const ENTERTIME = 300;
const LEAVETIME = 300;
class Confirm extends Component{
    constructor(props){
        super(props);
        this.state = {
            show : true
        }
        this.close = this.close.bind(this);
        this.cancel = this.cancel.bind(this);
        this.done = this.done.bind(this);
        this.stopBubble = this.stopBubble.bind(this);
    }
    stopBubble(e){
        e.preventDefault();
        e.stopPropagation();
    }
    cancel(){
        let {cancel} = this.props;
        this.close();
        cancel && cancel();
    }
    close(){
        this.setState({
            show : false
        });
        window.setTimeout(() => {
            this.teardown();
        },LEAVETIME);
    }
    teardown(){
        let container = this.props.container;
        ReactDOM.unmountComponentAtNode(container);
        container.parentNode.removeChild(container);
    }
    done(){
        let {done} = this.props;
        this.close();
        done && done();
    }
    render(){
        let {show} = this.state;
        let {title,titleClassName,content,richContent,done,doneClassName,doneLabel,cancel,cancelLabel,cancelClassName} = this.props;
        let alertNode;
        if(show){
            let contNode;
            if(richContent){
                contNode = (
                    <div className="c-modal-content" dangerouslySetInnerHTML={{__html : richContent}}>
                    </div>
                );
            }
            else if(content){
                contNode = (
                    <div className="c-modal-content">
                        {content}
                    </div>
                )
            }
            let titleCls = "c-modal-title";
            if(titleClassName){
                titleCls += " " + titleClassName;
            }
            let btonCls = "c-modal-bton";
            if(doneClassName){
                btonCls += " " + doneClassName;
            }
            let cancelCls = 'c-modal-bton gray';
            if(cancelClassName){
                cancelCls += " " + cancelClassName;
            }
            alertNode = (
                <Mask onClick={this.close}>
                    <div className="c-modal" onClick={this.stopBubble}>
                        <div className={titleCls}>{title}</div>
                        {contNode}
                        <div className="c-modal-bottom">
                            <span className={cancelCls} onClick={this.cancel}>{cancelLabel}</span>
                            <span className={btonCls} onClick={this.done}>{doneLabel}</span>
                        </div>
                    </div>
                </Mask>
            );
        }
        return (
            <ReactCSSTransitionGroup component="div" transitionName="cmmask" transitionEnterTimeout={ENTERTIME}  transitionAppear={true} transitionAppearTimeout={ENTERTIME} transitionLeaveTimeout={LEAVETIME}>
                {alertNode}
            </ReactCSSTransitionGroup>
        );
    }
}
Confirm.propTypes = {
    container : PropTypes.object.isRequired,
    title : PropTypes.string.isRequired,
    titleClassName : PropTypes.string,
    content : PropTypes.string,
    richContent : PropTypes.string,
    done : PropTypes.func,
    doneClassName : PropTypes.string,
    doneLabel : PropTypes.string,
    cancel : PropTypes.func,
    cancelClassName : PropTypes.string,
    cancelLabel : PropTypes.string
}
Confirm.defaultProps = {
    cancelLabel : '取消',
    doneLabel : '确定'
}
export default function confirm(option = {}){
    let tempDiv = document.createElement('div');
    document.body.appendChild(tempDiv);
    let props = {
        ...option,
        container : tempDiv
    }
    ReactDOM.render(<Confirm {...props} />,tempDiv);
}
