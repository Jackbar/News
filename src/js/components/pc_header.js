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
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;

class PCHeader extends React.Component {
  constructor(){
    super()
    this.state={
      current:'top',
      modalVisible: false,
      action: 'login',
      hasLogined: false,
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
  menuClick(e){
    if(e.key=='register'){
      this.setState({
        current:'register'
      })
      this.setModalVisible(true)
    }else{
      this.setState({
        current:e.key
      })
    }
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
    const { getFieldDecorator } = this.props.form
    const userShow = this.state.hasLogined
    ?<Menu.Item key="logout" class="register">
      <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
      <Link target="_blank">
        <Button type="dashed" htmlType="button">个人中心</Button>
      </Link>
      <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
    </Menu.Item>
    :
    <Menu.Item key="register" class="register">
      <Icon type="appstore"/>注册/登录
    </Menu.Item>
    return (
      <header>
        <Row>
          <Col span={2}></Col>
          <Col span={4}>
            <a href="/" class="logo">
              <img src="./src/images/logo.png" alt="logo"/>
              <span>ReactNews</span>
            </a>
          </Col>
          <Col span={16}>
            <Menu mode="horizontal" onClick={this.menuClick.bind(this)} selectedKeys={[this.state.current]}>
              <Menu.Item key="top">
                <Icon type="appstore"/>头条
              </Menu.Item>
              <Menu.Item key="shehui">
                <Icon type="appstore"/>社会
              </Menu.Item>
              <Menu.Item key="guonei">
                <Icon type="appstore"/>国内
              </Menu.Item>
              <Menu.Item key="guoji">
                <Icon type="appstore"/>国际
              </Menu.Item>
              <Menu.Item key="yule">
                <Icon type="appstore"/>娱乐
              </Menu.Item>
              <Menu.Item key="tiyu">
                <Icon type="appstore"/>体育
              </Menu.Item>
              <Menu.Item key="keji">
                <Icon type="appstore"/>科技
              </Menu.Item>
              <Menu.Item key="shishang">
                <Icon type="appstore"/>时尚
              </Menu.Item>
              {userShow}
            </Menu>
            <Modal
              title="用户中心"
              wrapClassName="vertical-center-modal"
              visible={this.state.modalVisible}
              onCancel={()=>this.setModalVisible(false)}
              onOk={()=>this.setModalVisible(false)}
              okText="关闭"
            >
              <Tabs type="card" onChange={this.tabChange.bind(this)}>
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
          </Col>

          <Col span={2}></Col>

        </Row>
      </header>
    )
  }
}

export default PCHeader = Form.create({})(PCHeader);
