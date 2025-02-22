import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "./CustomText";

export interface CustomButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  loading?: boolean;
}
const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  loading,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.btn,
        { backgroundColor: disabled ? Colors.disabled : Colors.primary },
      ]}
    >
      {loading ? (
        <ActivityIndicator size={"small"} color={Colors.white} />
      ) : (
        <CustomText
          variant="h6"
          fontFamily={Fonts.SemiBold}
          style={styles.text}
        >
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};
export default CustomButton;
const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    marginVertical: 15,
    width: "100%",
  },
  text: {
    color: Colors.white,
  },
});
