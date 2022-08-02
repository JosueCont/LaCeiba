const commonConfig = {
    "name": "Club La Hacienda",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
        "image": "./assets/splash.png",
        "resizeMode": "cover",
        "backgroundColor": "#146842"
    },
    "updates": {
        "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
        "**/*"
    ],
    "web": {
        "favicon": "./assets/favicon.png"
    },
    "extra": {
        "debug": true
    }
};

const ios = {
    "supportsTablet": true
};

const android = {
    "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
    }
};


module.exports = () => {
    if (process.env.APP_ENV === "ios") {
        return {
            ...commonConfig,
            "slug": "club-la-hacienda",
            "version": "1.0.0",
            "ios": ios
        };
    } else if (process.env.APP_ENV === "android") {
        return {
            ...commonConfig,
            "slug": "club-la-hacienda",
            "version": "1.0.0",
            "android": android
        };
    } else if (process.env.APP_ENV === "expo") {
        return {
            ...commonConfig,
            "slug": "club-la-hacienda-dev",
            "version": "1.0.0",
            "ios": ios,
            "android": android
        };
    }
};