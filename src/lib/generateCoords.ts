/**
 * Generates random GPS coordinates (latitude and longitude)
 * @param options - Optional configuration for coordinate generation
 * @returns Object containing latitude and longitude coordinates
 */
export function generateRandomGPSCoordinates() {
  // Generate random latitude between min and max
  const latitude = Math.random() * (90 - -90) + -90;

  // Generate random longitude between min and max
  const longitude = Math.random() * (180 - -180) + -180;

  return {
    latitude: parseFloat(latitude.toFixed(6)),
    longitude: parseFloat(longitude.toFixed(6)),
  };
}

/**
 * Generates random GPS coordinates within a specific region
 * @param centerLat - Center latitude of the region
 * @param centerLon - Center longitude of the region
 * @param radiusKm - Radius in kilometers around the center point
 * @returns Object containing latitude and longitude coordinates
 */
export function generateRandomGPSCoordinatesInRegion(
  centerLat: number,
  centerLon: number,
  radiusKm: number,
) {
  // Convert radius from km to degrees (approximate)
  const radiusInDegrees = radiusKm / 111.32; // 1 degree ≈ 111.32 km

  // Generate random angle and distance
  const angle = Math.random() * 2 * Math.PI;
  const distance = Math.random() * radiusInDegrees;

  // Calculate new coordinates
  const latitude = centerLat + distance * Math.cos(angle);
  const longitude =
    centerLon +
    (distance * Math.sin(angle)) / Math.cos((centerLat * Math.PI) / 180);

  return {
    latitude: parseFloat(latitude.toFixed(6)),
    longitude: parseFloat(longitude.toFixed(6)),
  };
}
