import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, ScrollView, useWindowDimensions } from 'react-native';
import { useState, useEffect } from 'react'
import RenderHtml from 'react-native-render-html';
import * as Speech from 'expo-speech'
import { fetchPage, getText } from './fetch-text'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome'


const Tab = createBottomTabNavigator();

const textStyle = {}

const Page = ({page, width}) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <RenderHtml 
            contentWidth={width}
            source={{html: page}}
            defaultTextProps={{selectable:true}}
            baseStyle={textStyle}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default function App() {
  const { width } = useWindowDimensions()
  const [pages, setPages] = useState({})

  const speak = () => {
    Speech.speak("Hallo hva skjer der", {
      voice: "com.apple.ttsbundle.Nora-compact",
      language: "no",
      rate: 1.15,
      pitch: 0.8
    })
  }

  useEffect(() => {
    (async () => {
      const p = await fetchPage()
      setPages({
        gl: getText(p, "gl"),
        la: getText(p, "la"),
        ve: getText(p, "ve"),
        co: getText(p, "co")
      })
    })()
  }, [])

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="LG" 
          children={() => <Page page={pages["gl"]} width={width}/>}
          options={{
            tabBarIcon: ({color, size}) => (<FontAwesomeIcon name="book" color={color} size={size} />)
          }}
        />
        <Tab.Screen name="Laudes" 
          children={() => <Page page={pages["la"]} width={width}/>}
          options={{
            tabBarIcon: ({color, size}) => (<FontAwesomeIcon name="sun-o" color={color} size={size} />)
          }}
        />
        <Tab.Screen name="Vespers" 
          children={() => <Page page={pages["ve"]} width={width}/>}
          options={{
            tabBarIcon: ({color, size}) => (<FontAwesomeIcon name="moon-o" color={color} size={size} />)
          }}
        />
        <Tab.Screen name="Compl" 
          children={() => <Page page={pages["co"]} width={width}/>}
          options={{
            tabBarIcon: ({color, size}) => (<FontAwesomeIcon name="minus-square-o" color={color} size={size} />)
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
