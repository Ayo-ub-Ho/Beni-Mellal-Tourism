import TabBar from "@/components/TabBar";
import { Tabs } from "expo-router";
import React from "react";
export default function Layout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="ListOfAttractions" />
      <Tabs.Screen name="Favorites" />
    </Tabs>
  );
}
