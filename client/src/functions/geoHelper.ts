// import { point, bbox, buffer, Feature, Polygon } from '@turf/turf';

// type Coordinate = {
//     latitude: number;
//     longitude: number;
// };c

// export function calculateBoundingCoordinates(centerLongitude: number, centerLatitude: number, distance: number): Record<string, Coordinate> {
//     // Create a point feature
//     const center = point([centerLongitude, centerLatitude]);

//     // Create a buffer around the point
//     const buffered: Feature<Polygon> = buffer(center, distance, { units: 'kilometers' });

//     // Calculate a bounding box
//     const boundingBox = bbox(buffered);

//     // Extract coordinates
//     const topLeft: Coordinate = { latitude: boundingBox[3], longitude: boundingBox[0] };
//     const topRight: Coordinate = { latitude: boundingBox[3], longitude: boundingBox[2] };
//     const bottomLeft: Coordinate = { latitude: boundingBox[1], longitude: boundingBox[0] };
//     const bottomRight: Coordinate = { latitude: boundingBox[1], longitude: boundingBox[2] };

//     return {
//         topLeft,
//         topRight,
//         bottomLeft,
//         bottomRight
//     };
// }

// // Example usage
// const centralPoint: Coordinate = { longitude: -123.10, latitude: 49.24 };
// const distance = 10; // 10 kilometers away from coord

// const result = calculateBoundingCoordinates(centralPoint.longitude, centralPoint.latitude, distance);
// console.log("Top Left:", result.topLeft);
// console.log("Top Right:", result.topRight);
// console.log("Bottom Left:", result.bottomLeft);
// console.log("Bottom Right:", result.bottomRight);
