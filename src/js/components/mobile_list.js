import React , {Component} from 'react';
import {Router, Route, Link, browserHistory} from 'react-router'
import { Row,Col } from 'antd';

export default class MobileList extends Component {
  constructor(){
    super()
    this.state = {
      news:[]
    }
  }

  componentWillMount(){
    var fetchOption = {
      method:'GET'
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count,fetchOption)
    .then(response=>response.json())
    .then(res=>{
      console.log(res);
      this.setState({
        news:res
      })
    })
  }

  render(){
    //map => (()=>())
    const list = this.state.news.length
      ?this.state.news.map((newsItem,index)=>(
        <section key={index} className="m_article list-item special_section clearfix">
          <Link to={`details/${newsItem.uniquekey}`}>
            <div className="m_article_img">
              <img src={newsItem.thumbnail_pic_s} alt={newsItem.title} />
            </div>
            <div className="m_article_info">
              <div className="m_article_title">
                <span>{newsItem.title}</span>
              </div>
              <div className="m_article_desc clearfix">
                <div className="m_article_desc_l">
                  <span className="m_article_channel">{newsItem.realtype}</span>
                  <span className="m_article_time">{newsItem.date}</span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      ))
      :'暂无结果'
    return(
      <div>
        <Row>
          <Col span={24}>
            {list}
          </Col>
        </Row>
      </div>
    )
  }



}
