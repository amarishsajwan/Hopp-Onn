export default {
  expo: {
    name: "my-app2",
    slug: "my-app2",
    scheme: "my-app2",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    jsEngine: "hermes",
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.anonymous.myapp2",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.anonymous.myapp2",
      googleServicesFile:
        process.env.GOOGLE_SERVICES_JSON || "./google-services.json",

      permissions: ["android.permission.SCHEDULE_EXACT_ALARM"],
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      "expo-build-properties",
      [
        "expo-dev-launcher",
        {
          launchMode: "most-recent",
        },
      ],
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you share them with your friends.",
        },
      ],
      [
        "expo-document-picker",
        {
          iCloudContainerEnvironment: "Production",
        },
      ],
      [
        "expo-media-library",
        {
          photosPermission: "Allow $(PRODUCT_NAME) to access your photos.",
          savePhotosPermission: "Allow $(PRODUCT_NAME) to save photos.",
          isAccessMediaLocationEnabled: true,
        },
      ],
    ],
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "da514068-43bd-40f8-975e-49ef6f9223b9",
      },
    },
  },
};
