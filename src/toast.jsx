import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';

const ENTERTIME = 300;
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
            },ENTERTIME);
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
        return (
            <CSSTransition in={show} classNames="toastmask" timeout={ENTERTIME} appear={true} enter={true} exit={true}>
                <div className="c-toast">{text}</div>
            </CSSTransition>
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
