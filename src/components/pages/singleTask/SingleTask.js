import {Component} from "react";

export default class SingleTask extends Component{
    componentDidMount() {
        const taskId = this.props
        console.log(taskId)
    }

    render() {
        return (
            <div className='container'>
                <div>task</div>
            </div>
        );
    }
}