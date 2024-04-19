export interface PlaceSearchResult {
    address: string;
    location?: google.maps.LatLng;
    iconUrl?: string;
    name?: string;
}