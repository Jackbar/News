import React, {Component} from 'react'
import {Row, Col, Form, Input, Button,Card} from 'antd';
const FormItem = Form.Item;
class CommonComments extends Component {
  constructor() {
    super()
    this.state = {
      comments: ''
    }
  }

  componentDidMount() {
    var myFetchOptions = {
      method: 'GET'
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
      this.setState({comments: json});
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var myFetchOptions = {
      method: 'GET'
    }
    let formData = this.props.form.getFieldsValue()
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formData.remark, myFetchOptions).then(response => response.json()).then(json => {
      this.componentDidMount();
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {comments} = this.state
    const commentList = comments.length
      ? comments.map((item, index) => (
        <Card key={index} title={item.UserName} extra={< a href = '#' > 发布于 {item.datetime} < /a>}>
          <p>{item.Comments}</p>
        </Card>
      ))
      : '暂无评论'
    return (
      <div>
        <Row>
          <Col span={24}>
            {commentList}
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <FormItem>
                {getFieldDecorator('remark')(
                  <Input type='textarea' placeholder='请写评论'></Input>
                )}
              </FormItem>
              <Button htmlType='submit' type="primary">提交</Button>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default CommonComments = Form.create({})(CommonComments)
