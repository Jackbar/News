import React, {Component} from 'react'
import {Row, Col} from 'antd';
import PCHeader from './pc_header'
import PCFooter from './pc_footer'
import PCNewsImageBlock from './pc_news_image_block.js'
export default class PCNewsDetails extends Component {

  constructor() {
    super()
    this.state = {
      newsItem: ''
    }
  }

  componentDidMount() {
    let myfetchOption = {
      methods: 'GET'
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey).then(response => response.json()).then(res => {
      this.setState({newsItem: res})
      document.title = this.state.newsItem.title;
    })
  }

  createMarkup() {
    return {__html: this.state.newsItem.pagecontent}
  }
  render() {
    return (
      <div>
        <PCHeader></PCHeader>
        <Row>
          <Col span={2}></Col>
          <Col span={14}>
            <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
          </Col>
          <Col span={6}>
            <PCNewsImageBlock cardTitle='头条' type="top" count={20}></PCNewsImageBlock>
          </Col>
          <Col span={2}></Col>
        </Row>
        <PCFooter></PCFooter>
      </div>
    )
  }
}
