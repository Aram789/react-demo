import React, {Component} from "react";


export default class Input extends Component {
    state = {
        value: '',
        valueNew: ''
    }
    change = (event) => {
        this.setState({
            valueNew: event.target.value
        })
    }
    handleClick = () => {
        this.setState({
            value: this.state.valueNew,
            valueNew: ''
        })
    }

    render() {
        return (
            <>
                <input value={this.state.valueNew} onChange={this.change} type="text"/>
                <button onClick={this.handleClick}>Click</button>
                <h2>{this.state.value}</h2>
            </>
        )
    }
}