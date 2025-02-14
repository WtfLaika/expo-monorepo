import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  requestPermissions,
  startSendingData,
  addStepChangedListener,
  stopSendingData,
} from "expo-pedometer";

export default function HomeScreen() {
  const [permission, setPermission] = useState(false);
  const [numOfSteps, setNumbOfSteps] = useState(0);
  const [startedTracking, setStartedTracking] = useState(false);
  useEffect(() => {
    const sub = addStepChangedListener(({ step }) => setNumbOfSteps(step));

    return () => sub.remove();
  }, []);

  const requestPermissionsHandler = () => {
    requestPermissions();
    setPermission(true);
  };

  const startTracking = () => {
    startSendingData();
    setStartedTracking(true);
  };

  const stopTracking = () => {
    stopSendingData();
    setStartedTracking(false);
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
      {!permission ? (
        <>
          <View />
          <Text style={styles.requestText}>Please Enable Step Counting</Text>
          <View style={styles.requestButton}>
            <Button
              onPress={requestPermissionsHandler}
              title="Request permission"
              color={"#8803fc"}
            />
          </View>
        </>
      ) : (
        <>
          <View />
          <View>
            <Text style={styles.requestText}>Number of Steps</Text>
            <Text style={styles.stepsCounter}>{numOfSteps}</Text>
          </View>
          <View style={styles.requestButton}>
            <Button
              onPress={!startedTracking ? startTracking : stopTracking}
              title={!startedTracking ? "Start Tracking" : "Stop Tracking"}
              color={"#8803fc"}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  requestText: {
    fontSize: 30,
    textAlign: "center",
  },
  stepsCounter: { fontSize: 40, textAlign: "center" },
  requestButton: {
    marginBottom: 20,
    alignContent: "center",
    marginHorizontal: 20,
  },
});
