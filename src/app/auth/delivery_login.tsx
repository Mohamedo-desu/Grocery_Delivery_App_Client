import CustomSafeAreaView from "@/components/global/CustomSafeAreaView";
import { showToast } from "@/components/toast/ShowToast";
import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import CustomText from "@/components/ui/CustomText";
import { Fonts } from "@/constants/Fonts";
import { deliveryLogin } from "@/service/authService";
import { screenHeight } from "@/utils/scaling";
import Icon from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const DeliveryLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      await deliveryLogin(email, password);
      router.replace("/protected/delivery_dashboard");
    } catch (error: any) {
      console.log(error);
      showToast("error", "Error logging in", error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <CustomSafeAreaView>
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            <LottieView
              autoPlay
              loop
              style={styles.lottie}
              source={require("@/assets/animations/delivery_man.json")}
            />
          </View>
          <CustomText variant="h3" fontFamily={Fonts.Bold}>
            Delivery Partner Portal
          </CustomText>
          <CustomText
            variant="h6"
            fontFamily={Fonts.SemiBold}
            style={styles.text}
          >
            Faster than Flash ⚡
          </CustomText>

          <CustomInput
            onChangeText={setEmail}
            placeholder="Email"
            value={email}
            left={
              <Icon
                name="mail"
                size={RFValue(18)}
                color="#f8890e"
                style={{ marginLeft: 10 }}
              />
            }
            onClear={() => setEmail("")}
            inputMode="email"
            right={false}
          />
          <CustomInput
            onChangeText={setPassword}
            placeholder="Password"
            value={password}
            left={
              <Icon
                name="key-sharp"
                size={RFValue(18)}
                color="#f8890e"
                style={{ marginLeft: 10 }}
              />
            }
            onClear={() => setEmail("")}
            secureTextEntry
            right={false}
          />
          <CustomButton
            disabled={email.trim().length === 0 || password.trim().length < 8}
            loading={loading}
            onPress={handleLogin}
            title="Login"
          />
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
};
export default DeliveryLogin;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  lottie: {
    height: "100%",
    width: "100%",
  },
  lottieContainer: {
    height: screenHeight * 0.12,
    width: "100%",
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
});
