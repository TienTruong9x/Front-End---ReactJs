import React, { Component } from "react";
import TaskForm from "./components/TaskForm";
import Controls from "./components/Controls";
import TaskList from "./components/TaskList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isEditting: "add",
      taskEditting: [],
    };
  }
  componentDidMount() {
    if (localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks,
      });
    }
  }

  sendDataFormTF(newTask) {
    var { tasks } = this.state;
    tasks.push(newTask);
    this.setState({
      tasks: tasks,
    });
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
  }

  onDelete = (id) => {
    var { tasks } = this.state;
    var delTask = tasks.findIndex((task) => {
      return task.id === id;
    });
    tasks.splice(delTask, 1);
    this.setState({
      tasks: tasks,
    });
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
  };

  onEdit = (id) => {
    this.setState({
      isEditting: "edit",
    });
    var { tasks } = this.state;
    var indexTask = tasks.findIndex((task) => {
      return task.id === id;
    });
    this.setState(
      {
        taskEditting: tasks[indexTask],
      },
      () => {
        console.log(this.state.taskEditting);
      }
    );
  };

  onChangeStatus = (id) => {
    var { tasks } = this.state;
    var editTask = tasks.findIndex((task) => {
      return task.id === id;
    });
    if (tasks[editTask].selectStatus === "0") {
      tasks[editTask].selectStatus = "2";
    } else if (tasks[editTask].selectStatus === "2") {
      tasks[editTask].selectStatus = "1";
    } else if (tasks[editTask].selectStatus === "1") {
      tasks[editTask].selectStatus = "0";
    }
    this.setState({
      tasks: tasks,
    });
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <TaskForm
              reviceDataFormTaskFormToApp={(newTask) =>
                this.sendDataFormTF(newTask)
              }
              status={this.state.isEditting}
            ></TaskForm>
          </div>
          <div className="col-8">
            <Controls></Controls>
            <TaskList
              tasks={this.state.tasks}
              onDelete={this.onDelete}
              onEdit={this.onEdit}
              onChangeStatus={this.onChangeStatus}
            ></TaskList>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
