import Logo from "@/assets/images/splash-icon.png";
import CustomSafeAreaView from "@/components/global/CustomSafeAreaView";
import ProductSlider from "@/components/login/ProductSlider";
import { showToast } from "@/components/toast/ShowToast";
import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import CustomText from "@/components/ui/CustomText";
import PrivacyTerms from "@/components/ui/PrivacyTerms";
import { appName } from "@/constants";
import { Fonts } from "@/constants/Fonts";
import useKeyboardOffsetHeight from "@/hooks/useKeyboardOffsetHeight";
import { customerLogin } from "@/service/authService";
import { useSettingsStore } from "@/store/settingsStore";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Keyboard, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  State,
} from "react-native-gesture-handler";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";

const CustomerLogin = () => {
  const router = useRouter();
  const { theme: currTheme, setTheme } = useSettingsStore();

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [secretSequence, setSecretSequence] = useState<string[]>([]);
  const keyboardOffsetHeight = useKeyboardOffsetHeight();

  const animatedValue = useSharedValue(0);

  const { colors: theme } = useTheme();

  useEffect(() => {
    if (keyboardOffsetHeight <= 0) {
      animatedValue.value = withTiming(0, {
        duration: 300,
      });
    } else {
      animatedValue.value = withTiming(-keyboardOffsetHeight * 0.54, {
        duration: 500,
      });
    }
  }, [keyboardOffsetHeight]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await customerLogin(phoneNumber);
      router.replace("/protected/product_dashboard");
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      showToast("error", "Error logging in", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = () => {
    Keyboard.dismiss();
    handleLogin();
  };

  const handleGesture = ({
    nativeEvent,
  }: GestureEvent<PanGestureHandlerEventPayload>) => {
    if (nativeEvent.state === State.END) {
      const { translationX, translationY } = nativeEvent;
      let direction: string = "";

      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? "right" : "left";
      } else {
        direction = translationY > 0 ? "down" : "up";
      }

      const newSecretSequence = [...secretSequence, direction].slice(-5);
      setSecretSequence(newSecretSequence);

      if (newSecretSequence.join(" ") === "up up down left right") {
        setSecretSequence([]);
        router.push("/auth/delivery_login");
      }
    }
  };
  const { top } = useSafeAreaInsets();
  return (
    <CustomSafeAreaView style={styles.container}>
      <ProductSlider />
      <PanGestureHandler
        onHandlerStateChange={handleGesture}
        shouldCancelWhenOutside
      >
        <Animated.ScrollView
          bounces={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.subContainer}
          style={{ transform: [{ translateY: animatedValue }] }}
        >
          <LinearGradient
            colors={[theme.background, "transparent"]}
            style={styles.gradient}
            start={{ x: 0, y: 0.7 }}
            end={{ x: 0, y: 0 }}
          />

          <View style={[styles.content, { backgroundColor: theme.background }]}>
            <Image source={Logo} style={styles.logo} />
            <CustomText variant="h2" fontFamily={Fonts.Bold}>
              {appName}
            </CustomText>
            <CustomText
              variant="h5"
              fontFamily={Fonts.SemiBold}
              style={styles.text}
            >
              Log in or sign up
            </CustomText>
            <CustomInput
              onChangeText={(text) => {
                setPhoneNumber(text.slice(0, 10));
              }}
              onClear={() => setPhoneNumber("")}
              value={phoneNumber}
              left={
                <CustomText
                  variant="h6"
                  fontFamily={Fonts.Bold}
                  style={styles.phoneText}
                >
                  +254
                </CustomText>
              }
              placeholder="Enter your phone number"
              inputMode="numeric"
            />
            <CustomButton
              title="Continue"
              disabled={phoneNumber.length < 10}
              loading={loading}
              onPress={handleAuth}
            />
          </View>
        </Animated.ScrollView>
      </PanGestureHandler>

      <PrivacyTerms />
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.deliveryButton,
          { top: top + 10, backgroundColor: theme.background },
        ]}
        onPress={() => router.push("/auth/delivery_login")}
      >
        <Icon name="bike-fast" size={RFValue(22)} color={theme.text} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.deliveryButton,
          {
            left: null,
            right: 10,
            top: top + 10,
            backgroundColor: theme.background,
          },
        ]}
        onPress={() => setTheme(currTheme === "dark" ? "light" : "dark")}
      >
        <Icon name="theme-light-dark" size={RFValue(22)} color={theme.text} />
      </TouchableOpacity>
    </CustomSafeAreaView>
  );
};
export default CustomerLogin;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
  subContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: moderateScale(50),
  },
  phoneText: {
    marginLeft: 15,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  logo: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(10),
  },
  gradient: {
    height: moderateScale(60),
    width: "100%",
  },
  deliveryButton: {
    position: "absolute",
    zIndex: 99,
    elevation: 2,
    width: moderateScale(45),
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(25),
    left: 10,
  },
});
