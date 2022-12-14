import React, { useState } from 'react';
import { Layout, DatePicker, Avatar, Collapse, Input, notification, Button   } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import MapContainer from './MapContainer';
import { MarkersMappers } from '../services/MarkersMapper';
import { MapWithADrawingManager } from './GeoFenceMap';


function Dashboard() {

  const dummyMarker = [
    {
      "id": 2,
      "objectNo": "1010100",
      "description" : "Tool description for 2",
      "currentLocation": {
        "type": "Point",
        "coordinates": [
          6.927079,
          79.861244
        ]
      },
      "loggedTime": "2022-08-12 11:07:13.622",
      "kioskNo": "k02"
    },
    {
      "id": 3,
      "objectNo": "1010100",
      "description" : "Tool description for 3",
      "currentLocation": {
        "type": "Point",
        "coordinates": [
          5.927079,
          78.861244
        ]
      },
      "loggedTime": "2022-07-17 14:07:13.622",
      "kioskNo": "k03"
    },
    {
      "id": 4,
      "objectNo": "1010112",
      "description" : "Tool description for 4",
      "currentLocation": {
        "type": "Point",
        "coordinates": [
          7.927079,
          73.861244
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

  const [activeTab, setActiveTab] = useState("1");
  const [LocationList, setLocationList] = useState([]);


  const onPolygonComplete = (polygon: any) => {
    setLocationList(
      polygon
        .getPath()
        .getArray()
        .map((point: any) => ({
          lat: point.lat(),
          lng: point.lng(),
        }))
    )
  }

  const [markers, setMarkers] = useState([{
        id: 0,
        objectName: "",
        lastUpdated: "",
        description: "",
        position: {
          lat: 0,
          lng: 0
        }
      }]);

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

  const updateMarker = (dummyMarker: any, value: string) => {
    //console.log(dummyMarker)
    if(dummyMarker !== null){
      const dataSource = MarkersMappers(dummyMarker, value)
        setMarkers(dataSource)
        console.log(markers)
    } else{
      openNotification();
      setMarkers([{
        id: 0,
        objectName: "",
        lastUpdated: "",
        description: "",
        position: {
          lat: 0,
          lng: 0
        }
      }]);

    }
  }
  

  const onSearch = (value: string) => {
    console.log(value);
    fetch(`https://jsonplaceholder.typicode.com/todos/1`)
        .then(res => res.json())
        .then(res =>
          updateMarker(dummyMarker, value)
          //console.log(res)
        );
        
  };

  const addGeofence = () => {
    console.log(LocationList);
  }
  
  return (
    <>
    <Layout>
      <Sider width={"350"}>
      <Avatar
    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
    icon={<AntDesignOutlined />} 
  />
  <Collapse accordion onChange={(key) => setActiveTab(key[0])}>
    <Panel header="Asset History" key="1">
      <RangePicker showTime />
    </Panel>
    <Panel header="Geofences" key="2">
      <div>
      <Button type="primary" onClick={addGeofence}>Add Geofence</Button>
      </div>
    </Panel>
    <Panel header="Configurations" key="3">
    </Panel>
  </Collapse>
      </Sider>
      <Layout>
        
      <Search placeholder="input search text" onSearch={onSearch} enterButton style={{ width: 450 }} />
        <Content>
          {activeTab === "1" ? 
          <MapContainer markers={markers} />
          : <MapWithADrawingManager onPolygonComplete={onPolygonComplete}/>
          }
          
        </Content>
      </Layout>
    </Layout>
    </>
  );
};

export default Dashboard;
