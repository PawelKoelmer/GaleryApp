/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {PhotoList} from './src/screens/PhotoList';
import {AddPhoto} from './src/screens/AddPhoto';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/reduxStore';
import {PersistGate} from 'redux-persist/integration/react';
import {PreviewImage} from './src/screens/PreviewImage';

export enum NavigationScreens {
  PHOTO_LIST = 'photoListScreen',
  ADD_PHOTO = 'addPhotoScreen',
  PREVIEW_PHOTO = 'previewPhotoScreen',
}

export type NavigationScreensProps = {
  [NavigationScreens.PREVIEW_PHOTO]: {id: number};
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name={NavigationScreens.PHOTO_LIST}
                component={PhotoList}
                options={({navigation}) => ({
                  title: 'Gallery',
                  headerBackVisible: false,
                  headerRight: ({tintColor}) => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate(NavigationScreens.ADD_PHOTO);
                      }}>
                      <IonicIcons
                        name={'add'}
                        size={24}
                        color={tintColor ?? '#000'}
                      />
                    </TouchableOpacity>
                  ),
                })}></Stack.Screen>
              <Stack.Screen
                name={NavigationScreens.ADD_PHOTO}
                component={AddPhoto}
                options={{
                  headerShown: true,
                  title: 'Add photo',
                }}></Stack.Screen>
              <Stack.Screen
                name={NavigationScreens.PREVIEW_PHOTO}
                component={PreviewImage}
                options={{
                  headerShown: true,
                  title: 'Preview photo',
                }}></Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
