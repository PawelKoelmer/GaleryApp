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

export enum NavigationScreens {
  PHOTO_LIST = 'photoListScreen',
  ADD_PHOTO = 'addPhotoScreen',
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={NavigationScreens.PHOTO_LIST}
            component={PhotoList}
            options={({navigation}) => ({
              title: 'Plants',
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
            options={{headerShown: true, title: 'Add photo'}}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
