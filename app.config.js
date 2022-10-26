const commonConfig = {
    name: "Club La Hacienda",
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
    extra: {
        debug: true,
        production: true,
        URL: "https://api.hacienda.hiumanlab.com",
        URL_DEV: "https://qa.api.hacienda.hiumanlab.com",
        eas: {
            projectId: "c16e312d-b8ac-495f-b1bc-39e309569e13"
        },
        debugEmail: 'lucks17@gmail.com',
        debugPhone: '9995759065'
    }
};

const ios = {
    buildNumber: "27",
    supportsTablet: false,
    bundleIdentifier: "com.hiumanlab.clublahacienda"
};

const android = {
    versionCode: 26,
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
            version: "1.0.0",
            ios: ios
        };
    } else if (process.env.APP_ENV === "android") {
        return {
            ...commonConfig,
            slug: "clublahacienda",
            version: "1.0.0",
            android: android
        };
    } else if (process.env.APP_ENV === "expo") {
        return {
            ...commonConfig,
            slug: "clublahacienda-dev",
            version: "1.0.0",
            ios: ios,
            android: android
        };
    }
};