import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';

const COMMONTIME = 200;
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
        },COMMONTIME);
    }
    teardown(){
        let container = this.props.container;
        ReactDOM.unmountComponentAtNode(container);
        container.parentNode.removeChild(container);
    }
    render(){
        let self = this;
        let {show} = self.state;
        let {title, content, btons, animation} = self.props;
        let ModalNode;
        let btonNodes = btons.map(function(item,n){
            let func = function(){
                self.close();
                item.func && item.func();
            }
            let label = item.label;
            return (
                <span className="c-modal-bton" key={n} onClick={func}>{typeof label == 'string' ? label : (label())}</span>
            )
        });
        let contNode;
        if(content){
            contNode = (
                <div className="c-modal-content">
                    {typeof content == 'string' ? content : (content())}
                </div>
            );
        }
        ModalNode = (
            <div className="c-modal-wrap" onClick={self.close}>
                <div className="c-modal" onClick={self.stopBubble}>
                    <div className="c-modal-title">
                        {typeof title == 'string' ? title : (title())}
                    </div>
                    {contNode}
                    <div className="c-modal-bottom">
                        {btonNodes}
                    </div>
                </div>
            </div>
        );
        let transitionName = animation == 'scale' ? 'cmmodal-scale' : 'cmmask'
        return (
            <div>
                <CSSTransition in={show} classNames="cmmask" timeout={COMMONTIME} appear={true} enter={true} exit={true}>
                    <div className="cm-mask" onClick={self.close}></div>
                </CSSTransition>
                <CSSTransition in={show} classNames={transitionName} timeout={COMMONTIME} appear={true} enter={true} exit={true}>
                    {ModalNode}
                </CSSTransition>
            </div>
        );
    }
}
Modal.propTypes = {
    container : PropTypes.object.isRequired,
    animation : PropTypes.string,
    title : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
    ]).isRequired,
    content : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
    ]),
    btons : PropTypes.arrayOf(PropTypes.shape({
                label : PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.func
                ]),
                func : PropTypes.func
            })).isRequired
}
Modal.defaultProps = {
    animation : 'scale'
}
export default Modal
