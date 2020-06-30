import { AppRegistry, Platform } from 'react-native';

import App from "lib/App";
import { name as appName } from './app.json';


AppRegistry.registerComponent(appName, () => App);
if (Platform.OS === "web") {
  AppRegistry.runApplication('LogistimaticsDemo', { rootTag: document.getElementById('app') });
}