import React from 'react';
import Home from './components/home';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './lib/rootReducer'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddPost from './components/addPost';

const Stack = createNativeStackNavigator();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="AddPost" component={AddPost} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}


