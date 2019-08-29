function initialize() {
    var map = new google.maps.Map(
        document.getElementById('map'), {
            center: new google.maps.LatLng(21.028998, 105.781704),
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(21.028998, 105.781704),
        map: map
    });

}
google.maps.event.addDomListener(window, 'load', initialize);