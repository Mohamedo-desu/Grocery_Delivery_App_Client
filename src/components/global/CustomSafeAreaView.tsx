import { useTheme } from "@react-navigation/native";
import { FC } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CustomSafeAreaViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const CustomSafeAreaView: FC<CustomSafeAreaViewProps> = ({
  children,
  style,
}) => {
  const { colors: theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }, style]}
    >
      {children}
    </SafeAreaView>
  );
};
export default CustomSafeAreaView;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
