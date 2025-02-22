import { Fonts } from "@/constants/Fonts";
import Icon from "@expo/vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import { FC, ReactNode } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export interface CustomInputProps {
  left: ReactNode;
  onClear: () => void;
  right?: ReactNode;
}

const CustomInput: FC<CustomInputProps & TextInputProps> = ({
  onClear,
  left,
  right = true,
  ...props
}) => {
  const { colors: theme } = useTheme();

  return (
    <View
      style={[
        styles.flexRow,
        { backgroundColor: theme.gray[100], borderColor: theme.gray[300] },
      ]}
    >
      {left}
      <TextInput
        placeholderTextColor={theme.gray[400]}
        style={[styles.inputContainer, { color: theme.text }]}
        {...props}
      />
      <View style={styles.icon}>
        {props.value && props.value.length > 0 && right && (
          <TouchableOpacity onPress={onClear}>
            <Icon
              name="close-circle-sharp"
              size={RFValue(16)}
              color={theme.gray[400]}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default CustomInput;
const styles = StyleSheet.create({
  text: {
    width: "10%",
    marginLeft: 10,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: 0.5,
    width: "100%",
    marginVertical: 10,
    elevation: 1,
  },
  inputContainer: {
    width: "70%",
    fontFamily: Fonts.Medium,
    fontSize: RFValue(14),
    paddingVertical: 14,
    paddingBottom: 15,
    height: "100%",
    bottom: -1,
  },
  icon: {
    width: "5%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
});
