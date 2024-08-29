/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  CameraHighlights,
  useBarcodeScanner,
} from "@mgcrea/vision-camera-barcode-scanner";
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Camera, useCameraDevices, useCameraFormat, useCameraPermission } from 'react-native-vision-camera';


function App(): React.JSX.Element {
  const { hasPermission, requestPermission } = useCameraPermission();

  if (!hasPermission) { requestPermission(); }
  const devices = useCameraDevices();
  const device = devices.find(({ position }) => position === "back");
  const format = useCameraFormat(device, [
    { videoResolution: { width: 1920, height: 1080 } },
  ]);

  if (!device) {
    return null;
  }

  const { props: cameraProps, highlights } = useBarcodeScanner({
    fps: 5,
    barcodeTypes: ["qr", "code-128"], // optional
    onBarcodeScanned: (barcodes) => {
      "worklet";
      console.log(
        `Scanned ${barcodes.length} codes with values=${JSON.stringify(
          barcodes.map(({ value }) => value),
        )} !`,
      );
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive
        {...cameraProps}
      />
      <CameraHighlights highlights={highlights} color="black" />
    </View>
  );
}

export default App;
