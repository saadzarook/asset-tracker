import React, { useState } from 'react';
import { Layout, DatePicker, Avatar, Collapse, Input, notification   } from 'antd';
import { useDispatch } from "react-redux";
import { AntDesignOutlined } from '@ant-design/icons';
import MapContainer from './MapContainer';


function Dashboard() {

  const dummyMarker = [
    {
      "id": 2,
      "objectNo": "1010100",
      "currentLocation": {
        "type": "Point",
        "coordinates": [
          6.927079,
          79.861244
        ]
      },
      "loggedTime": "2022-08-12 11:07:13.622",
      "kioskNo": "k02"
    }
  ]

  const { Sider, Content } = Layout;
  
  const { Panel } = Collapse;
  const { Search } = Input;

  const { RangePicker } = DatePicker;

  const [marker, setMarker] = useState({
    objectName: "",
    lastUpdated: "",
    lat: 0,
    lng: 0
  });

  const openNotification = () => {
    notification.open({
      message: 'Error',
      description:
        'Invalid ID. Tool not found. Please input a valid ID',
      onClick: () => {
        console.log('Closed Notification');
      },
    });
  };
  const onSearch = (value: string) => {
    console.log(value);
    fetch(`http://localhost:8080/api/product/location/current/?objectNo=${value}`)
        .then(res => res.json())
        .then(res =>
          console.log(res)
        );
        //TODO : Replace dummyMarker with respons object
        if(dummyMarker[0].objectNo == value){
          setMarker({
            objectName: dummyMarker[0].objectNo,
            lastUpdated: dummyMarker[0].loggedTime,
            lat : dummyMarker[0].currentLocation.coordinates[0],
            lng : dummyMarker[0].currentLocation.coordinates[1],
          });
        }
        else{
          openNotification();
        }
  };
  
  return (
    <>
    <Layout>
      <Sider width={"350"}>
      <Avatar
    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
    icon={<AntDesignOutlined />} 
  />
  <Collapse accordion>
    <Panel header="Asset History" key="1">
      <RangePicker showTime />
    </Panel>
    <Panel header="Geofences" key="2">
    </Panel>
    <Panel header="Configurations" key="3">
    </Panel>
  </Collapse>
      </Sider>
      <Layout>
        
      <Search placeholder="input search text" onSearch={onSearch} enterButton style={{ width: 450 }} />
        <Content>
          <MapContainer 
          marker={marker}
          />
        </Content>
      </Layout>
    </Layout>
    </>
  );
};

export default Dashboard;
