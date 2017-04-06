import React , {Component} from 'react';
import {Row,Col,Carousel} from 'antd';

export default class PCNewsContainer extends Component {

  render(){
    const settings={
      dots:true,
      infinite:true,
      autoplay:true,
      speed:500,
      slidesToShow:1
    }
    return (
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} class="container">
            <div class="leftContainer">
              <Carousel {...settings}>
                <div><img src="./src/images/carousel_1.jpg" /></div>
                <div><img src="./src/images/carousel_2.jpg" /></div>
                <div><img src="./src/images/carousel_3.jpg" /></div>
                <div><img src="./src/images/carousel_4.jpg" /></div>

              </Carousel>
            </div>
          </Col>
          <Col span={2}></Col>

        </Row>
      </div>
    )
  }
}
