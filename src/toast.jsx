import '../assets/toast.css';
import React,{PropTypes,Component} from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const ENTERTIME = 300;
const LEAVETIME = 300;
class Toast extends Component{
    constructor(props){
        super(props)
        this.state = {
            show : true
        }
    }
    close(){
        window.setTimeout(() => {
            this.setState({
                show : false
            });
            window.setTimeout(() => {
                this.teardown();
            },LEAVETIME);
        },this.props.timeout);
    }
    teardown(){
        let container = this.props.container;
        ReactDOM.unmountComponentAtNode(container);
        container.parentNode.removeChild(container);
    }
    componentDidMount(){
        this.close();
    }
    render(){
        let {show} = this.state;
        let {text} = this.props;
        var toastNode;
        if(show){
            toastNode = (<div className="c-toast">{text}</div>);
        }
        return (
            <ReactCSSTransitionGroup component="div" transitionName="toastmask" transitionEnterTimeout={ENTERTIME} transitionAppear={true} transitionAppearTimeout={ENTERTIME} transitionLeaveTimeout={LEAVETIME}>
                {toastNode}
            </ReactCSSTransitionGroup>
        )
    }
}
Toast.propTypes = {
    container : PropTypes.object.isRequired,
    text : PropTypes.string.isRequired,
    timeout : PropTypes.number
}
Toast.defaultProps = {
    timeout : 2000
}
export default function toast(text,timeout){
    let tempDiv = document.createElement('div');
    document.body.appendChild(tempDiv);
    let props = {
        container : tempDiv,
        text : text
    }
    if(timeout){
        props.timeout = timeout;
    }
    ReactDOM.render(<Toast {...props} />,tempDiv);
}
