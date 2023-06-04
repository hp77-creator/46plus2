import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:geolocator/geolocator.dart';
import 'package:latlong2/latlong.dart';
import 'package:user_app/services/location.dart';
// import 'package:location/location.dart';

class MapSample extends StatefulWidget {
  static const String route = '/home';

  const MapSample({super.key});

  @override
  State<MapSample> createState() => MapSampleState();
}

class MapSampleState extends State<MapSample> {
  // LocationData? _currentLocation;
  late final MapController _mapController;

  bool _permission = false;

  // final Location _locationService = Location();
  String? _serviceError = '';

  @override
  void initState() {
    super.initState();
    _mapController = MapController();
    // initLocationService();
  }

  // void initLocationService() async {
  //   await _locationService.changeSettings(
  //     interval: 1000,
  //   );
  //
  //   LocationData? location;
  //   bool serviceEnabled;
  //   bool serviceRequestResult;
  //   try {
  //     serviceEnabled = await _locationService.serviceEnabled();
  //
  //     if (serviceEnabled) {
  //       final permission = await _locationService.requestPermission();
  //       _permission = permission == PermissionStatus.granted;
  //
  //       if (_permission) {
  //         location = await _locationService.getLocation();
  //         _currentLocation = location;
  //         _locationService.onLocationChanged
  //             .listen((LocationData result) async {
  //           if (mounted) {
  //             setState(() {
  //               _currentLocation = result;
  //
  //               // If Live Update is enabled, move map center
  //               _mapController.move(
  //                   LatLng(_currentLocation!.latitude!,
  //                       _currentLocation!.longitude!),
  //                   _mapController.zoom);
  //             });
  //           }
  //         });
  //       }
  //     } else {
  //       serviceRequestResult = await _locationService.requestService();
  //       if (serviceRequestResult) {
  //         initLocationService();
  //         return;
  //       }
  //     }
  //   } on PlatformException catch (e) {
  //     debugPrint(e.toString());
  //     if (e.code == 'PERMISSION_DENIED') {
  //       _serviceError = e.message;
  //     } else if (e.code == 'SERVICE_STATUS_ERROR') {
  //       _serviceError = e.message;
  //     }
  //     location = null;
  //   }
  // }

  void _onPress() async {
    Position position = await determinePosition();
    print(position);
    _mapController.move(LatLng(position.latitude, position.longitude), 5);
  }

  @override
  Widget build(BuildContext context) {
    LatLng currentLatLng;

    // Until currentLocation is initially updated, Widget can locate to 0, 0
    // by default or store previous location value to show.
    // if (_currentLocation != null) {
    //   currentLatLng =
    //       LatLng(_currentLocation!.latitude!, _currentLocation!.longitude!);
    // } else {
    //   currentLatLng = LatLng(0, 0);
    // }

    // final markers = <Marker>[
    //   Marker(
    //     width: 80,
    //     height: 80,
    //     point: currentLatLng,
    //     builder: (ctx) => const FlutterLogo(
    //       textColor: Colors.blue,
    //       key: ObjectKey(Colors.blue),
    //     ),
    //   ),
    // ];

    return Scaffold(
      body: Stack(
        children: [
          FlutterMap(
            mapController: _mapController,
            options: MapOptions(
              center: LatLng(0, 0),
              zoom: 5,
            ),
            children: [
              TileLayer(
                urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                userAgentPackageName: 'com.example.app',
              ),
              // MarkerLayer(markers: markers),
            ],
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _onPress,
        child: const Icon(Icons.gps_fixed),
      ),
    );
    // floatingActionButton: FloatingActionButton.extended(
    //   onPressed: _goToTheLake,
    //   icon: const Icon(Icons.directions_boat),
    // ),
  }

  @override
  void dispose() {
    _mapController.dispose();
    super.dispose();
  }
}
