import React from "react";
import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";

import Widget from "./src/components/Widget";
import { theme } from "./src/theme";
import { DissmissKeyboard } from "./src/components/DissmissKeyboard";

export default function App() {
  SplashScreen.hideAsync();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <DissmissKeyboard>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
      >
        <StatusBar style="light" backgroundColor="transparent" translucent />
        <Widget />
      </View>
    </DissmissKeyboard>
  );
}
