const commonConfig = {
    name: "CGH",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
        "image": "./assets/splash.png",
        "resizeMode": "cover",
        "backgroundColor": "#146842"
    },
    updates: {
        "fallbackToCacheTimeout": 0
    },
    assetBundlePatterns: [
        "**/*"
    ],
    web: {
        "favicon": "./assets/favicon.png"
    },
    plugins: [
        [
          "expo-media-library",
          {
            "photosPermission": "Allow to access your photos.",
            "savePhotosPermission": "Allow to save photos.",
            "isAccessMediaLocationEnabled": true
          }
        ]   
      ],
    extra: {
        debug: false, //Colocar a false para no generar correos dummy al registro del socio
        production: true,
        URL: "https://api.clubdegolflahacienda.com",
        URL_DEV: "https://api.hacienda.hiumanlab.com",
        //URL_DEV: "https://qa.api.hacienda.hiumanlab.com",
        eas: {
            projectId: "c16e312d-b8ac-495f-b1bc-39e309569e13"
        },
        debugEmail: 'alex.dzul@hiumanlab.com',
        appleWallet: false,
        googleWallet: false,
        eCommerce: false,
        debugPhone: '9991979545'
    }
};

const ios = {
    buildNumber: "49",
    supportsTablet: false,
    bundleIdentifier: "com.hiumanlab.clublahacienda"
};

const android = {
    versionCode: 50,
    adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundImage: "./assets/adaptive-icon-bg.png"
    },
    googleServicesFile: "./google-services.json",
    package: "com.hiumanlab.clublahacienda"
};


module.exports = () => {
    if (process.env.APP_ENV === "ios") {
        return {
            ...commonConfig,
            slug: "clublahacienda",
            version: "1.0.4",
            ios: ios
        };
    } else if (process.env.APP_ENV === "android") {
        return {
            ...commonConfig,
            slug: "clublahacienda",
            version: "1.0.4",
            android: android
        };
    } else if (process.env.APP_ENV === "expo") {
        return {
            ...commonConfig,
            slug: "clublahacienda-dev",
            version: "1.0.4",
            ios: ios,
            android: android
        };
    }
};