import React, {Component} from 'react';
import {Row, Col, Carousel, Tabs} from 'antd';
import PCNewsBlock from './pc_news_block'
import PCNewsImageBlock from './pc_news_image_block'

const TabPane = Tabs.TabPane;
export default class PCNewsContainer extends Component {

  render() {
    const settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      speed: 500,
      slidesToShow: 1
    }
    return (
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} class="container">
            <div class="leftContainer">
              <div class="carousel">
                <Carousel {...settings}>
                  <div><img src="./src/images/carousel_1.jpg"/></div>
                  <div><img src="./src/images/carousel_2.jpg"/></div>
                  <div><img src="./src/images/carousel_3.jpg"/></div>
                  <div><img src="./src/images/carousel_4.jpg"/></div>

                </Carousel>
              </div>

              <PCNewsImageBlock cardTitle="娱乐" type='top' count={6}/>
            </div>
            <Tabs class="tabs_news">
              <TabPane tab="头条" key="1">
                <PCNewsBlock type='top' count={22}/>
              </TabPane>
              <TabPane tab="科技" key="2">
                <PCNewsBlock type='keji' count={22}/>
              </TabPane>
            </Tabs>

          </Col>
          <Col span={2}></Col>

        </Row>
      </div>
    )
  }
}
