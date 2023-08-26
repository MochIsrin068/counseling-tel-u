import * as React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import Router from "./router";

LogBox.ignoreLogs(["In React 18, SSRProvider"]);

function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {/* <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator> */}

        <Router />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
