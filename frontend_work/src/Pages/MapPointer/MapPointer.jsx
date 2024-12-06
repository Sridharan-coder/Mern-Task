
import { AdvancedMarker, APIProvider, InfoWindow, Map} from '@vis.gl/react-google-maps';
import { useState } from 'react';

const MapPointer = ({ points, events }) => {
    const [isInfoOpen, setIsInfoOpen] = useState(false)

    const [iseInfoCoordinates, setIsInfoCoordinates] = useState("")

    const handleIsOpen = (coordinate) => {
        setIsInfoCoordinates(JSON.stringify(coordinate))
        setIsInfoOpen(true)
    }

    const handleIsClose = () => {
        setIsInfoCoordinates("")
        setIsInfoOpen(false)
    }

    return (
        <>
            <APIProvider apiKey={'AIzaSyDmCAnXJg525Oi2pLmp6X1aIRvgoUFs3Fo'}>
                <Map defaultCenter={{ lat: 10.909433, lng: 78.3665347 }}  defaultZoom={7.5} mapId="e47e3dc438967ab5">
                    {points.map((point, index) => {
                        return (<>
                            <AdvancedMarker position={point} onClick={() => handleIsOpen(point)} />
                            {(iseInfoCoordinates === JSON.stringify(point)) && isInfoOpen ? <InfoWindow style={{fontWeight:700,fontFamily:'monospace'}}  position={point} onCloseClick={() => handleIsClose()}>{events[index]}</InfoWindow> : ""}
                        </>)
                    })}
                </Map>
            </APIProvider>
        </>
    )
}

export default MapPointer;