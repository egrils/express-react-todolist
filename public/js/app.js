const App = React.createClass({
    getInitialState: function () {
        return {
            newtodo: '',
            todos: [],
            active:[],
            completed:[]
        }
    },
    componentDidMount: function() {
        $.get('http://localhost:3000/api/forms/1', (elements) => {
            console.log(elements)
        });
    },
    change: function (event) {
        const input = event.target.value;
        this.setState({newtodo: input})
    },
    handlekeydown: function (event) {
        if (event.keyCode !== 13) {
            return;
        }
        const todos = this.state.todos;
        todos.push({
            todo:this.state.newtodo,
            done:false
        });
        this.setState({todos})
    },
    delete: function (index) {
        const todos = this.state.todos;
        todos.splice(index, 1);
        this.setState({todos})
    },
    handlecheck:function (ele,index) {
        let flag = 0;
        const old = this.state.todos;
        const todos = old.map((item)=>{
            let checkitem = item
            if (flag === index){
                checkitem = {
                    todo:item.todo,
                    done:!item.done
                }
            }
            flag ++;
            return checkitem;
        })
        this.setState({todos})

    },
    getactive:function () {
        const active = this.state.todos.filter(ele => ele.done === false);
        this.setState({active})
    },
    render: function () {
        return <div className="col-md-7 col-md-offset-4">
            <h1 className="col-md-offset-2">todos</h1>
            <input
                className="col-md-7"
                placeholder="What needs to be done?"
                onChange={this.change}
                onKeyDown={this.handlekeydown}
            />
            <Items todos={this.state.todos} ischeck={this.state.ischeck} onDelete={this.delete} onCheck={this.handlecheck}/>
            <Footer todos={this.state.todos} onActive={this.getactive}/>
        </div>
    }
});

const Items = React.createClass({
    check:function (itemarray) {
        const ele = itemarray[0];
        const index = itemarray[1];
        this.props.onCheck(ele,index);
    },
    remove: function (index) {
        this.props.onDelete(index);
    },
    render: function () {
        let todos = this.props.todos.map((ele, index)=> {
            const todo = ele.todo;
            return <div key={index} className="col-md-12">
                <input className="col-md-1" type="checkbox" onClick={this.check.bind(this,[ele,index])} />
                <span className="col-md-5">{todo}</span>
                <button className="btn btn-danger" onClick={this.remove.bind(this, index)}>X</button>

            </div>
        });
        return <div>
            <div>
                {todos}
            </div>
        </div>
    }
});

const Footer = React.createClass({
    leftcount:function () {
        const lefttodos = this.props.todos.filter(ele => ele.done === false);
        return lefttodos.length;
    },
    active:function () {
        this.props.onActive()
    },
    render: function () {
        const count = this.leftcount();
        return <div className="col-md-6">
            <span>{count} items left</span>

            <button>All</button>
            <button onClick={this.active}>Active</button>
            <button>Completed</button>
            <button>clear</button>

        </div>
    }
});

ReactDOM.render(<App />, document.getElementById('content'));