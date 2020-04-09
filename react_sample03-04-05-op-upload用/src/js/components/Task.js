import React from 'react';
import ClassNames from 'classnames';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      text: this.props.text,
      isDone: false,
      editMode: false,
    };
    // thisの束縛
    this.handleClickToggleDone = this.handleClickToggleDone.bind(this);
    this.handleClickRemove = this.handleClickRemove.bind(this);
    this.handleClickshowEdit = this.handleClickshowEdit.bind(this);
    this.handleKeyUpCloseEdit = this.handleKeyUpCloseEdit.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
  }
  handleChangeText(e) {
    this.setState({
      text: e.target.value,
    });
  }
  handleClickToggleDone() {
    this.setState((prevState) => ({
      isDone: !prevState.isDone,
    }));
  }
  handleClickRemove(e) {
    this.props.onRemove(this.state.id);
  }
  handleClickshowEdit() {
    this.setState({
      editMode: true,
    });
  }
  handleKeyUpCloseEdit(e) {
    if (e.keyCode === 13 && e.shiftKey === true) {
      this.setState({
        text: e.currentTarget.value,
        editMode: false,
      });
    }
  }
  // タスクを削除したときにコンポーネントがアンマウント(破棄)されるのでそれをログにて通知させている
  componentWillUnmountWillMount() {
    console.log('componentWillUnmount');
  }
  render() {
    // Reactにはclassを付け替えする機能はないので、外部ライブラリを使う
    // こっちはクラス名
    const classNameLi = ClassNames({
      list__item: true,
      'list__item--done': this.state.isDone,
    });
    // こっちはチェックボックス
    const classNameIcon = ClassNames({
      fa: true,
      'fa-circle-thin': !this.state.isDone,
      'fa-check-circle': this.state.isDone,
      'icon-check': true,
    });
    // underscoreのようにif文は使えないので、変数に前もって入れておく
    // 編集モードじゃなかったらinput 編集モードだったらspanのほうを表示
    const input = this.state.editMode ? (
      <input
        type='text'
        className='editText'
        value={this.state.text}
        onChange={this.handleChangeText}
        onKeyUp={this.handleKeyUpCloseEdit}
      />
    ) : (
      <span onClick={this.handleClickshowEdit}>{this.state.text}</span>
    );
    return (
      <li className={classNameLi}>
        <i
          className={classNameIcon}
          onClick={this.handleClickToggleDone}
          aria-hidden='true'
        />
        {/* ↓↓ここにタスクのコンポーネントを表示させている */}
        {input}
        <i
          className='fa fa-trash icon-trash'
          onClick={this.handleClickRemove}
          aria-hidden='true'
        />
      </li>
    );
  }
}
