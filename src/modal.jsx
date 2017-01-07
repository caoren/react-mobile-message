import "../assets/modal.css";
import React,{PropTypes,Component} from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const ENTERTIME = 300;
const LEAVETIME = 300;
class Modal extends Component{
    constructor(props){
        super(props);
        this.state = {
            show : true
        }
        this.close = this.close.bind(this);
        this.stopBubble = this.stopBubble.bind(this);
    }
    stopBubble(e){
        e.preventDefault();
        e.stopPropagation();
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
    render(){
        let self = this;
        let {show} = self.state;
        let {title,titleStyle,content,richContent,btons} = self.props;
        let ModalNode;
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
            let btonNodes = btons.map(function(item,n){
                let func = function(){
                    self.close();
                    item.func && item.func();
                }
                return (
                    <span className="c-modal-bton" style={item.style} key={n} onClick={func}>{item.label}</span>
                )
            });
            ModalNode = (
                <div className="cm-mask" onClick={self.close}>
                    <div className="c-modal" style={titleStyle} onClick={self.stopBubble}>
                        <div className="c-modal-title">{title}</div>
                        {contNode}
                        <div className="c-modal-bottom">
                            {btonNodes}
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <ReactCSSTransitionGroup component="div" transitionName="cmmask" transitionEnterTimeout={ENTERTIME}  transitionAppear={true} transitionAppearTimeout={ENTERTIME} transitionLeaveTimeout={LEAVETIME}>
                {ModalNode}
            </ReactCSSTransitionGroup>
        );
    }
}
Modal.propTypes = {
    container : PropTypes.object.isRequired,
    title : PropTypes.string.isRequired,
    titleStyle : PropTypes.object,
    content : PropTypes.string,
    richContent : PropTypes.string,
    btons : PropTypes.arrayOf(PropTypes.shape({
                label : PropTypes.string,
                func : PropTypes.func,
                style : PropTypes.object
            })).isRequired
}
export default Modal
