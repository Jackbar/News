import React , {Component} from 'react';
import {Router, Route, Link, browserHistory} from 'react-router'
import { Card } from 'antd';

export default class PCNewsBlock extends Component {
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
    const lis = this.state.news.length
      ?this.state.news.map((item,index)=>(
        <li key={index}>
          <Link to={`detail/${item.uniquekey}`} target="_black">
            <p>{item.title}</p>
          </Link>
        </li>
      ))
      :'暂无结果'
    return(
      <div>
        <Card>
          <ul>
            {lis}
          </ul>
        </Card>
      </div>
    )
  }



}
