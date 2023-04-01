import React from 'react'
import Chat from './components/chat'
import { useFonts, RobotoMono_400Regular, RobotoMono_700Bold, RobotoMono_300Light } from '@expo-google-fonts/roboto-mono';
import Loading from './components/loading';
import Preferences from './components/preferences';
import Header from './components/header';
import { BotWrapper } from './context/botPreferences';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Prompts from './components/prompts';
import AiButton from './components/AIButton';

export default function App() {

  let [fontsLoaded] = useFonts({
    RobotoMono_400Regular,
    RobotoMono_700Bold,
    RobotoMono_300Light
  });

  if (!fontsLoaded) {
    return <Loading />
  }


  return (
    <Navigation />
  )
}

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <BotWrapper>
        <Stack.Navigator screenOptions={{ header: () => <Header /> }}>
          <Stack.Screen name="Prompts" component={Prompts} />
          <Stack.Screen name="Home" component={Preferences} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </BotWrapper>
    </NavigationContainer>
  )
}
