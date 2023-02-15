import {Component} from "react";

export default class SingleTask extends Component{
    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (
            <div className='container'>
                <div>task</div>
            </div>
        );
    }
}