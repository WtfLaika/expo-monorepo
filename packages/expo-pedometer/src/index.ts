// Reexport the native module. On web, it will be resolved to ExpoPedometerModule.web.ts

import { EventSubscription } from "expo-modules-core";

import ExpoPedometrModule from "./ExpoPedometerModule";
// and on native platforms to ExpoPedometerModule.ts
export type StepChangeEvent = {
  step: number;
};
export function requestPermissions() {
  return ExpoPedometrModule.requestPermissions();
}

export function startSendingData() {
  return ExpoPedometrModule.startSendingData();
}

export function stopSendingData() {
  return ExpoPedometrModule.stopSendingData();
}

export function addStepChangedListener(
  listener: (event: StepChangeEvent) => void
): EventSubscription {
  return ExpoPedometrModule.addListener("onStepCounted", listener);
}
