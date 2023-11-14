import React, { Component, PureComponent } from "react";
import "./todo.css";
import axios, { Axios } from "axios";

export default class Todo extends PureComponent {
  state={
    task:"",
    getTask:[]
}
handleKey=(e)=>{
    this.setState({
        [e.target.name]:e.target.value
    })
}

Submit=(e)=>{
  const{task}=this.state
  const data=axios.post("http://localhost:3001/React/addtask",{task})

    data.then((res) => {
      if(res.status==201)
      {
        alert("Data Added")
      }
      else
      {
        alert("data not added")
      }
    })
    .catch((error)=>{alert("server not connected")})
    e.target[0].value=""
}

delete=(a)=>{
  let id=a
  const data=axios.delete(`http://localhost:3001/React/deltask/${id}`)
  data.then(()=>{
    alert("deleted")
  }).catch((error)=>{
    console.log(error);
  })
  this.display();
}

display=async()=>{
  const res=await axios.get("http://localhost:3001/React/gettask")
  this.setState({
    getTask:res.data
  })
}
componentDidMount(){
  this.display();
}
  render() {
    return (
      <div>
        <div className="container">
          <div className="textfield">
            <form action="" onSubmit={this.Submit}>
            <input type="text" placeholder="   Task" onChange={this.handleKey} name="task" value={this.state.task}/>
            </form>
          </div>
          <ul type="none">
            {
              this.state.getTask.map((dt)=>{
                return(<li><div className="list">{dt.task}<button onClick={()=>{
                  this.delete(dt._id)
                }}>Delete</button></div></li>)
              })
            }
          </ul> 
        </div>
      </div>
    );
  }
}
