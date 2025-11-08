import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useLinkBuilder } from "@react-navigation/native";
import { Dimensions, StyleSheet, View } from "react-native";
import TabBarButton from "./TabBarButton";

const { width } = Dimensions.get("window");

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { buildHref } = useLinkBuilder();

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel ??
          options.title ??
          route.name;

        const isFocused = state.index === index;

        return (
          <TabBarButton
            key={route.name}
            onPress={() => {
              if (!isFocused) navigation.navigate(route.name);
            }}
            onLongPress={() => {
              navigation.emit({ type: "tabLongPress", target: route.key });
            }}
            isFocused={isFocused}
            routeName={route.name}
            label={label.toString()}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 50,
    left: width * 0.05,
    right: width * 0.05,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 35,
    justifyContent: "space-around",
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
});
