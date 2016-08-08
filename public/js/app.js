const App = React.createClass({
    getInitialState: function () {
        return {
            newtodo: '',
            todos: [],
            isactive:[]
        }
    },
    componentDidMount: function() {
        $.get('/', (elements) => {
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
        let isactive = this.state.isactive;
        todos.push({
            todo:this.state.newtodo,
            done:false
        });
        isactive = todos.map(ele=>ele);
        this.setState({todos,isactive})
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
        });
        this.setState({todos})

    },
    getall:function () {
        const isactive = this.state.todos;
        this.setState({isactive})
    },
    getactive:function () {
        const isactive = this.state.todos.filter(ele => ele.done === false);
        this.setState({isactive})
    },
    getcompleted:function () {
        const isactive = this.state.todos.filter(ele => ele.done === true);
        this.setState({isactive})
    },
    clearcompleted:function () {
        const todos = this.state.todos.filter(ele => ele.done === false);
        this.setState({todos})
    },
    render: function () {
        return <div className="col-md-7 col-md-offset-4">
            <h1 className="col-md-offset-2">todos</h1>
            <input
                className="col-md-7"
                placeholder="What needs to be done?"
                onChange={this.change}
                onKeyDown={this.handlekeydown}/>
            <Items
                todos={this.state.todos}
                isactive={this.state.isactive}
                onDelete={this.delete}
                onCheck={this.handlecheck}/>
            <Footer
                todos={this.state.todos}
                onAll={this.getall}
                onActive={this.getactive}
                onCompleted={this.getcompleted}
                onClear={this.clearcompleted}/>
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
        let todos = this.props.isactive.map((ele, index)=> {
            const todo = ele.todo;
            const done = ele.done;
            return <div key={index} className="col-md-12">
                <input className="col-md-1"
                       type="checkbox"
                       checked={done}
                       onClick={this.check.bind(this,[ele,index])}/>
                <span className="col-md-5">{todo}</span>
                <button className="btn btn-danger"
                        onClick={this.remove.bind(this, index)}>X</button>

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
    all:function () {
        this.props.onAll()
    },
    active:function () {
        this.props.onActive()
    },
    completed:function () {
        this.props.onCompleted()
    },
    clear:function () {
        this.props.onClear()
    },
    render: function () {
        const count = this.leftcount();
        return <div className="col-md-8">
            <span className="col-md-3">{count} items left</span>

            <button onClick={this.all}>All</button>
            <button onClick={this.active}>Active</button>
            <button onClick={this.completed}>Completed</button>
            <button onClick={this.clear}>clear completed</button>

        </div>
    }
});

ReactDOM.render(<App />, document.getElementById('content'));