import { ConfigContext, ExpoConfig } from "expo/config";

const EAS_PROJECT_ID = "9bbd5cda-7766-46fa-80ce-db9e8ba01954";
const PROJECT_SLUG = "grocerydeliveryapp";
const OWNER = "mohamedo-desu";

// App production config
const APP_NAME = "Grocery Delivery";
const BUNDLE_IDENTIFIER = `com.mohamedodesu.${PROJECT_SLUG}`;
const PACKAGE_NAME = `com.mohamedodesu.${PROJECT_SLUG}`;
const ICON = "./assets/icons/ios-prod.png";
const ADAPTIVE_ICON = "./assets/icons/android-prod.png";
const SCHEME = PROJECT_SLUG;

export default ({ config }: ConfigContext): ExpoConfig => {
  console.log("⚙️ Building app for environment:", process.env.APP_ENV);
  const { name, bundleIdentifier, icon, adaptiveIcon, packageName, scheme } =
    getDynamicAppConfig(
      (process.env.APP_ENV as "development" | "preview" | "production") ||
        "development"
    );

  return {
    ...config,
    name: name,
    version: "1.0.0",
    slug: PROJECT_SLUG,
    orientation: "portrait",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    icon: icon,
    scheme: scheme,
    ios: {
      supportsTablet: true,
      bundleIdentifier: bundleIdentifier,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: adaptiveIcon,
        backgroundColor: "#ffffff",
      },
      package: packageName,
      softwareKeyboardLayoutMode: "pan",
      permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "FOREGROUND_SERVICE",
        "ACCESS_BACKGROUND_LOCATION",
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
      ],
    },
    updates: {
      url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    extra: {
      eas: {
        projectId: EAS_PROJECT_ID,
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            image: "./assets/images/splash-icon.png",
            backgroundColor: "#000000",
          },
        },
      ],
      [
        "@sentry/react-native/expo",
        {
          organization: "mohamedo-apps-desu",
          project: PROJECT_SLUG,
        },
      ],
      [
        "expo-font",
        {
          fonts: [
            "./assets/fonts/Okra-Bold.ttf",
            "./assets/fonts/Okra-ExtraBold.ttf",
            "./assets/fonts/Okra-Medium.ttf",
            "./assets/fonts/Okra-MediumLight.ttf",
            "./assets/fonts/Okra-Regular.ttf",
          ],
        },
      ],
      [
        "expo-quick-actions",
        {
          androidIcons: {
            help_icon: {
              foregroundImage: "",
              backgroundColor: "#069140",
            },
          },
        },
      ],
      [
        "expo-notifications",
        {
          icon: "",
          color: "",
          sounds: [],
        },
      ],
      [
        "expo-build-properties",
        {
          android: {
            usesCleartextTraffic: true,
            hardwareAccelerated: true,
            enableProguardInReleaseBuilds: true,
            enableOnBackInvokedCallback: true,
          },
        },
      ],
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "Allow $(PRODUCT_NAME) to use your location.",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    owner: OWNER,
  };
};

export const getDynamicAppConfig = (
  environment: "development" | "preview" | "production"
) => {
  if (environment === "production") {
    return {
      name: APP_NAME,
      bundleIdentifier: BUNDLE_IDENTIFIER,
      packageName: PACKAGE_NAME,
      icon: ICON,
      adaptiveIcon: ADAPTIVE_ICON,
      scheme: SCHEME,
    };
  }

  if (environment === "preview") {
    return {
      name: `${APP_NAME} Preview`,
      bundleIdentifier: `${BUNDLE_IDENTIFIER}.preview`,
      packageName: `${PACKAGE_NAME}.preview`,
      icon: "./assets/icons/ios-prev.png",
      adaptiveIcon: "./assets/icons/android-prev.png",
      scheme: `${SCHEME}-prev`,
    };
  }

  return {
    name: `${APP_NAME} Development`,
    bundleIdentifier: `${BUNDLE_IDENTIFIER}.dev`,
    packageName: `${PACKAGE_NAME}.dev`,
    icon: "./assets/icons/ios-dev.png",
    adaptiveIcon: "./assets/icons/android-dev.png",
    scheme: `${SCHEME}-dev`,
  };
};
