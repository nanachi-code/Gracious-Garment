function initialize() {
    var map = new google.maps.Map(
        document.getElementById('map'), {
            center: new google.maps.LatLng(21.028800, 105.782280),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(21.028800, 105.782280),
        map: map
    });

}
$(document).ready(
   initialize()
);