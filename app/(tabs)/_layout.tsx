import { Tabs } from 'expo-router';
import React from 'react';
import { IconSymbol } from '@/components/icon-symbol';

export default function TabLayout(): React.JSX.Element {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#03DAC6',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#121212",
          borderTopWidth: 0,
          height: 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
