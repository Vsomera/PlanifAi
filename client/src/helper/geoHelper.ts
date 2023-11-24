import { point, buffer, bbox } from '@turf/turf';

type Coordinate = {
    latitude: number
    longitude: number
}

export const calculateBoundingCoordinates = (longitude: number, latitude: number, distance: number): Record<string, Coordinate> =>  {
    // Creates a box around a given location
    
    const center = point([longitude, latitude])

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const buffered = buffer(center, distance, { units: 'kilometers' })

    const boundingBox = bbox(buffered);

    const topLeft: Coordinate = { latitude: boundingBox[3], longitude: boundingBox[0] }
    const topRight: Coordinate = { latitude: boundingBox[3], longitude: boundingBox[2] }
    const bottomLeft: Coordinate = { latitude: boundingBox[1], longitude: boundingBox[0] }
    const bottomRight: Coordinate = { latitude: boundingBox[1], longitude: boundingBox[2] }

    return {
        topLeft,
        topRight,
        bottomLeft,
        bottomRight
    }
}
