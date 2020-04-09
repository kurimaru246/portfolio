import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/TodoList';
import TodoCreator from './components/TodoCreator';
import Search from './components/Search';

class TodoApp extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          id: this.createHashId(),
          text: 'sample todo1',
        },
        {
          id: this.createHashId(),
          text: 'sample todo2',
        },
      ],
      searchText: '',
    };
    this.callBackRemoveTask = this.callBackRemoveTask.bind(this);
    this.callBackAddTask = this.callBackAddTask.bind(this);
    this.callBackSearch = this.callBackSearch.bind(this);
    this.filterCollection = this.filterCollection.bind(this);
  }
  createHashId() {
    return Math.random().toString(36).slice(-16);
  }

  // 自分のstateを更新
  callBackSearch(val) {
    this.setState({
      searchText: val,
    });
  }

  callBackRemoveTask(id) {
    let data = _.reject(this.state.data, { id: id });
    this.setState({
      data: data,
    });
  }

  callBackAddTask(val) {
    let nextData = this.state.data;
    nextData.push({ id: this.createHashId(), text: val });
    this.setState({
      data: nextData,
    });
  }

  filterCollection(elm) {
    // 正規表現
    // '^'文字列の先頭からsearchTextの中身かどうか
    // 第2引数は'i'でOK
    const regexp = new RegExp('^' + this.state.searchText, 'i');
    // elmに配列のdataが入っているので
    // dataのtextがmatchするかどうか正規表現にて判定しreturnで返す
    return elm.text.match(regexp);
  }

  render() {
    const data = this.state.searchText
      ? this.state.data.filter(this.filterCollection)
      : this.state.data;

    return (
      <div>
        {/* TodoCreatorのほうでタスクの入力フォームを呼ぶ */}
        {/* callBackAddTaskをpropsでTodoCreatorに渡す */}
        <TodoCreator callBackAddTask={this.callBackAddTask} />

        {/* Searchコンポーネントを呼び出して描画している */}
        <Search callBackSearch={this.callBackSearch} />

        {/* Componentの中にcomponentを入れ子にして使える */}
        {/* importしたコンポーネントをここで呼び出している */}
        <TodoList data={data} callBackRemoveTask={this.callBackRemoveTask} />
      </div>
    );
  }
}

ReactDOM.render(<TodoApp />, document.getElementById('app'));
