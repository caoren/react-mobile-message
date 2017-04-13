if(typeof window != 'undefined'){
    require('../assets/modal.css');
}
import React,{PropTypes,Component} from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
        let MaskNode;
        let ModalNode;
        if(show){
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
            MaskNode = (
                <div className="cm-mask" onClick={self.close}></div>
            );
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
            )
        }
        let transitionName = animation == 'scale' ? 'cmmodal-scale' : 'cmmask'
        return (
            <div>
                <ReactCSSTransitionGroup component="div" transitionName="cmmask" transitionEnterTimeout={COMMONTIME}  transitionAppear={true} transitionAppearTimeout={COMMONTIME} transitionLeaveTimeout={COMMONTIME}>
                    {MaskNode}
                </ReactCSSTransitionGroup>
                <ReactCSSTransitionGroup component="div" transitionName={transitionName} transitionEnterTimeout={COMMONTIME}  transitionAppear={true} transitionAppearTimeout={COMMONTIME} transitionLeaveTimeout={COMMONTIME}>
                    {ModalNode}
                </ReactCSSTransitionGroup>
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
