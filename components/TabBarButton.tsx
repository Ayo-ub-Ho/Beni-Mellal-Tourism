import { icons } from "@/constants/icone";
import { PlatformPressable } from "@react-navigation/elements";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

type Props = {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  routeName: string;
  label: string;
};

export default function TabBarButton({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  label,
}: Props) {

  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 350 });
  }, [isFocused]);

  const animatedIconeStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 9]);

    return {
      transform: [{ scale: scaleValue }],
      top : top
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return { opacity };
  });

  const iconColor = isFocused ? "#3b17daff" : "#222";

  return (
    <PlatformPressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}
    >
      <Animated.View style={animatedIconeStyle}>
        {icons[routeName] && icons[routeName]({ color: iconColor, size: 24 })}
      </Animated.View>

      <Animated.Text style={[styles.label, animatedTextStyle, { color: iconColor }]}>
        {label}
      </Animated.Text>
    </PlatformPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginTop: 4,
    fontSize: 12,
  },
});
