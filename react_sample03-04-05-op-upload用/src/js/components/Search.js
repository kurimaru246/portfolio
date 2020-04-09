// Reactのコンポーネントを使うのでReactをimport
import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: '',
    };
    // thisの束縛
    this.handleChange = this.handleChange.bind(this);
  }
  // 入力された値が変わったときにsetStateでもってvalueの中身を更新
  handleChange(e) {
    this.setState({
      val: e.target.value,
    });
    // 更新したことを親コンポーネントへ通知し入力されたvalueを親へ渡す
    this.props.callBackSearch(e.target.value);
  }
  // 更新したらrenderで再描画する
  render() {
    return (
      <div className='searchBox'>
        <i className='fa fa-search searchBox__icon' aria-hidden='true' />
        <input
          type='text'
          className='searchBox__input'
          // onChangeで変わった中身を呼ぶ
          onChange={this.handleChange}
          // 呼ばれた中身をvalueで表示
          value={this.state.val}
          placeholder='smothing keyword'
        />
      </div>
    );
  }
}
