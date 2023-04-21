import * as React from 'react';

export default function MapContainer(props: any) {
  let [viewPort, setViewPort] = React.useState({
    width: '100%',
    height: '100%',
    latitude: 41.14961,
    longitude: -8.61099,
    zoom: 12,
  });
}
