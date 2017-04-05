import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router'

import {
  Row,
  Col,
  Menu,
  Icon,
  Tabs,
  message,
  Form,
  Input,
  Button,
  Checkbox,
  Modal
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class MobileHeader extends React.Component {
  constructor(){
    super()
    this.state = {
      hasLogined: false,
      modalVisible: false,
      action: 'login',
      userNickName: '',
      userid: 0
    }
  }
  componentWillMount(){
    if (localStorage.getItem('userNickName')) {
      this.setState({
        hasLogined: true,
        userNickName: localStorage.getItem('userNickName'),
        userid: localStorage.getItem('userid')
      })
    }
  }

  setModalVisible(value){
    this.setState({
      modalVisible:value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    var myFetchOptions = {
			method: 'GET'
		};
    var formData = this.props.form.getFieldsValue();
    console.log(formData)
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action+"&username="+ formData.userName +"&password="+ formData.password+"&r_userName=" + formData.r_userName + "&r_password="+ formData.r_password + "&r_confirmPassword="+ formData.r_confirmPassword, myFetchOptions)
		.then(response => response.json())
		.then(json => {
      console.log(json)
			this.setState({userNickName: json.NickUserName, userid: json.UserId});
      if (this.state.action=='login') {
        this.setState({
          hasLogined: true,
        })
        localStorage.setItem('userNickName',json.NickUserName)
        localStorage.setItem('userid',json.UserId)
      }
		});

		message.success("请求成功！");
		this.setModalVisible(false);
  }

  login(){
    this.setModalVisible(true)
  }
  tabChange(index){
    if (index==1) {
      this.setState({
        action:'login'
      })
    } else {
      this.setState({
        action:'register'
      })
    }
  }
  logout(){
    this.setState({
      hasLogined: false,
    })
    localStorage.removeItem('userNickName')
    localStorage.removeItem('userid')
  }
  render(){
    const {getFieldDecorator} = this.props.form
    const userShow = this.state.hasLogined
    ?<Link>
        <Icon type="inbox"></Icon>
      </Link>
    :<Icon type="setting" onClick={this.login.bind(this)}></Icon>
    return (
      <div id="mobileheader">
        <header>
          <img src="./src/images/logo.png" alt="logo"/>
          <span>ReactNews</span>
          {userShow}
        </header>
        <Modal
          title="用户中心"
          wrapClassName="vertical-center-modal"
          visible={this.state.modalVisible}
          onCancel={()=>this.setModalVisible(false)}
          onOk={()=>this.setModalVisible(false)}
          okText="关闭"
        >
          <Tabs type="card">
            <TabPane tab="登录" key="1">
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="账户">
                  {getFieldDecorator('userName')(
                    <Input placeholder="请输入您的账号" />
                  )}
                </FormItem>
                <FormItem label="密码">
                  {getFieldDecorator('password')(
                    <Input type="password" placeholder="请输入您的密码" />
                  )}
                </FormItem>
                <Button type="primary" htmlType="submit">登录</Button>
              </Form>

            </TabPane>
            <TabPane tab="注册" key="2">
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="账户">
                  {getFieldDecorator('r_userName')(
                    <Input placeholder="请输入您的账号" />
                  )}
                </FormItem>
                <FormItem label="密码">
                  {getFieldDecorator('r_password')(
                    <Input type="password" placeholder="请输入您的密码" />
                  )}
                </FormItem>
                <FormItem label="确认密码">
                  {getFieldDecorator('r_confirm')(
                    <Input type="password" placeholder="请再次输入您的密码" />
                  )}
                </FormItem>
                <Button type="primary" htmlType="submit">注册</Button>
              </Form>

            </TabPane>
          </Tabs>
        </Modal>
      </div>
    )
  }
}

export default MobileHeader = Form.create({})(MobileHeader)
