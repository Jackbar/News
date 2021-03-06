import React from 'react';
import MobileHeader from './mobile_header'
import MobileFooter from './mobild_footer'
import MobileList from './mobile_list'
import {Tabs} from 'antd'
const TabPane = Tabs.TabPane
export default class MobileIndex extends React.Component {

  render(){
    return (
      <div>
        <MobileHeader></MobileHeader>
        <Tabs>
          <TabPane tab="头条" key="1">
            <MobileList type="top" count={20}/>
          </TabPane>
          <TabPane tab="社会" key="2">
            <MobileList type="shehui" count={20}/>
          </TabPane>
          <TabPane tab="国内" key="3">
            <MobileList type="guonei" count={20}/>
          </TabPane>
          <TabPane tab="国际" key="4">
            <MobileList type="guoji" count={20}/>
          </TabPane>
          <TabPane tab="科技" key="5">
            <MobileList type="keji" count={20}/>
          </TabPane>
        </Tabs>
        <MobileFooter></MobileFooter>
      </div>
    )
  }
}
