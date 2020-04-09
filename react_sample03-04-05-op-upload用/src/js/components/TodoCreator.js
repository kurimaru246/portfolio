import React from 'react';

export default class TodoCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: '', // 入力のvalue タスク名のところ
      errMsg: '' // エラーメッセージがあるかないかで表示するか判定する 本来ならエラーフラグを立てることて判定させること
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  handleChange(e) {
    this.setState({
      val: e.target.value
    });
  }
  handleKeyUp(e) {
    // EnterキーとShiftキーが押されてるか判別
    if (e.keyCode === 13 && e.shiftKey === true) {
      const val = e.target.value;
      if (!val) {
        // 何も入力されていなかったらこっち
        this.setState({
          errMsg: '何も入力されていません'
        });
        return;
      }
      // タスクが入力されていたらこっち
      this.setState({
        val: '',
        errMsg: ''
      });
      this.props.callBackAddTask(val);
    }
  }
  // renderで再描画してエラーであればerrMsgを呼び、そうでなければ空の状態にする
  render() {
    const errMsg = this.state.errMsg ? (
      <span className='error'>{this.state.errMsg}</span>
    ) : (
      ''
    );
    return (
      <div className='form'>
        <div className='inputArea'>
          <input
            type='text'
            className='inputText'
            value={this.state.val}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
            placeholder='smothing todo task'
          />
          {errMsg}
        </div>
      </div>
    );
  }
}
