import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import RouteName from '../helpers/routeName';
import {CharacterDetailsScreen, CharactersListScreen} from '../pages';

const Stack = createStackNavigator();

const Router: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={RouteName.CharactersList}
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={RouteName.CharactersList}
          component={CharactersListScreen}
        />
        <Stack.Screen
          name={RouteName.CharacterDetails}
          component={CharacterDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
