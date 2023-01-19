import React, {Component} from "react";

class ToDo extends Component {
    state = {
        inputValue: '',
        tasks: []
    }
    handleChange = (event) =>{
        this.setState({
            inputValue: event.target.value
        })
    }
    addTask = () =>{
        const inputValue = this.state.inputValue.trim();
        const tasks = [...this.state.tasks, inputValue]
        if(inputValue){
            this.setState({
                tasks: tasks,
                inputValue: ''
            })
        }
    }
    render() {
        const {tasks} = this.state
        const taskComponents = tasks.map((task, index)=>{
            return <li key={index}>{task}</li>
        })
        return(
            <div>
                <h2>ToDo List</h2>
                <input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.inputValue}
                />
                <button
                    onClick={this.addTask}

                >Add Task</button>
                <ol>
                    {taskComponents}
                </ol>

            </div>
        )
    }
}

export default ToDo;