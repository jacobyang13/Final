import React, {Component} from 'react';
const google = window.google;
var INITIAL_MAP_ZOOM_LEVEL = 12;
var INITIAL_LOCATION = {
  address: 'Mission District, San Francisco',
  position: {
    latitude: 37.7541839478958,
    longitude: -122.4065137873994
  }
}
var ATLANTIC_OCEAN = {
  latitude: 29.532804,
  longitude: -55.491477
};

//code for creating map and geocoding from http://react.tips/reactjs-and-geocoding/
export class Map extends React.Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.state = {
      isGeocodingError: false,
      foundAddress: INITIAL_LOCATION.address,
      data: [],
      weekPrice: 0.00,
      weekPriceCount: 0.00,
      averageWeekPrice: 0.00,
      hasSearched: false,
      search: "",
      amountBook: 0.00,
      amountPrice: 0.00
    };
  }

  //handles search bar submissions- changes geolocation and adds marker.
  geocodeAddress = (address) => {
    this.geocoder.geocode({
      'address': address
    }, function handleResults(results, status) {

      //if successful
      if (status === google.maps.GeocoderStatus.OK) {
        this.setState({foundAddress: results[0].formatted_address, isGeocodingError: false});

        this.map.setCenter(results[0].geometry.location);
        this.marker.setPosition(results[0].geometry.location);

        return;
      }
      //otherwise error
      this.setState({foundAddress: null, isGeocodingError: true});

      //if error, sets map to ocean
      this.map.setCenter({lat: ATLANTIC_OCEAN.latitude, lng: ATLANTIC_OCEAN.longitude});

      this.marker.setPosition({lat: ATLANTIC_OCEAN.latitude, lng: ATLANTIC_OCEAN.longitude});

    }.bind(this));
  }
  //search bar handler
  handleSubmit = e => {
    e.preventDefault();
    var address = this.searchInputElement.value;
    if (this.state.search !== address) {
      //sets the state to search to trigger new return content
      this.setState({hasSearched: true, search: address})
      //for some reason this.setState was unable to successfully change the price. Had to do it this way... not recommended...
      //sets all state values back to zero to allow new search to return new data
      this.state.weekPrice = 0
      this.state.weekPriceCount = 0
      this.state.averageWeekPrice = 0;
      this.state.amountBook = 0;
      this.state.amountPrice = 0;
      this.geocodeAddress(address);
      this.calculatePrice(address);
      this.calculateOptimization(address);

    }

  }
  //price estimation method based on geolocation
  calculateOptimization = (address) => {
    
  }

  //price estimation method based on geolocation
  calculatePrice = (address) => {
    
   
  }

  //mounts map and sets intial values
  componentDidMount = () => {
    this.map = new google.maps.Map(this.mapElement, {
      zoom: INITIAL_MAP_ZOOM_LEVEL,
      center: {
        lat: INITIAL_LOCATION.position.latitude,
        lng: INITIAL_LOCATION.position.longitude
      }
    });
    this.marker = new google.maps.Marker({
      map: this.map,
      position: {
        lat: INITIAL_LOCATION.position.latitude,
        lng: INITIAL_LOCATION.position.longitude
      }
    })
    this.geocoder = new google.maps.Geocoder();
    var tempData = this.props.data
    this.setState({data: tempData})
  }

  //sets ref that is used in return method
  setSearchInputElementReference = (inputReference) => {
    this.searchInputElement = inputReference;
  }

  setMapElementReference = (mapElementReference) => {
    this.mapElement = mapElementReference;
  }

  render() {
    return (
      <div>

        <div className="sameSize">
          <div className="callout">
            <div>
              <form onSubmit={this.handleSubmit}>
                <input type="text" id="address" ref={this.setSearchInputElementReference} placeholder="Search by Coordinates(Longitude and Latitude eg: 37.75, -122.40)"/>
                <button className="button expanded custom">Search Map</button>
              </form>
              {this.state.isGeocodingError
                ? <p className="center">Address not found.</p>
                : <p className="center">{this.state.foundAddress}</p>
}
            </div>
            <div>
              <p className="center">
              </p>
            </div>

            <div className="">
              <div className="">
                <div className="callout">
                  <div className="map" ref={this.setMapElementReference} style={{
                    height: '100%',
                    width: '100%'
                  }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
export default Map;
