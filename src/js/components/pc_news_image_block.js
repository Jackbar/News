import React , {Component} from 'react';
import {Router, Route, Link, browserHistory} from 'react-router'
import { Card } from 'antd';

export default class PCNewsImageBlock extends Component {
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
    const newlists = this.state.news.length
      ?this.state.news.map((newsItem,index)=>(
        <div key={index} class="imageblock">
					<Link to={`details/${newsItem.uniquekey}`} target="_blank">
						<div class="custom-image">
							<img alt="" src={newsItem.thumbnail_pic_s}/>
						</div>
						<div class="custom-card">
							<h3>{newsItem.title}</h3>
							<p>{newsItem.author_name}</p>
						</div>
					</Link>
				</div>
      ))
      :'暂无结果'
    return(
      <div class="imageblockcontainer">
        <Card title={this.props.cardTitle}>
          {newlists}
        </Card>
      </div>
    )
  }



}
