import "../assets/mask.css";
import React,{PropTypes,Component} from 'react';
class Mask extends Component{
    constructor(props){
        super(props);
        this.click = this.click.bind(this);
    }
    click(){
        let {onClick} = this.props;
        onClick && onClick();
    }
    render(){
        return(
            <div className="cm-mask" onClick={this.click}>
                {this.props.children}
            </div>
        )
    }
}
export default Mask;