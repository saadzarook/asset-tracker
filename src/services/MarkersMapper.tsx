import { marker } from "../types/SingleMarker";

export const MarkerMappers = (res: any, value: string): any => {
    const dataSource: any[] = [];
    res.map((info: any) => {
        if(info.objectNo == value){
        const data : marker = {
            id: info.id,
            objectName: info.objectNo,
            lastUpdated: info.loggedTime,
            description: info.description,
            position: {
                lat:info.currentLocation.coordinates[0],
                lng:info.currentLocation.coordinates[1]
              }
        }  
        dataSource.push(data);
        }
    })
    return dataSource;
 }