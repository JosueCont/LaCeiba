import {extendTheme} from "native-base";
import {Colors} from "./Colors";

export const theme = extendTheme({
    components: {
        Text: {
            baseStyle: {
                color: 'white',
                fontFamily: 'ComfortaaRegular'
            },
            defaultProps: {
                size: 'md'
            },
            sizes: {
                xl: {fontSize: '64px'},
                lg: {fontSize: '32px'},
                md: {fontSize: '14px'},
                sm: {fontSize: '12px'},
            },
        },
        Button: {
            baseStyle: {
                borderRadius: 15,

            },
            defaultProps: {
                colorScheme: 'green',
                size: 'sm',
            },
        },
        Input: {
            baseStyle: {
                borderRadius: 20,
                backgroundColor: '#D1D4C4'
            },
            defaultProps: {
                backgroundColor: 'white',
                borderWidth: 0,
                size: 'sm',
                color: 'black',
            },
        },
        FormControl: {
            ErrorMessage: {
                baseStyle: {
                    color: 'black',
                },
            }

        }
    },
    fontConfig: {
        Roboto: {
            100: {
                normal: 'Roboto-Light',
                italic: 'Roboto-LightItalic',
            },
            200: {
                normal: 'Roboto-Light',
                italic: 'Roboto-LightItalic',
            },
            300: {
                normal: 'Roboto-Light',
                italic: 'Roboto-LightItalic',
            },
            400: {
                normal: 'Roboto-Regular',
                italic: 'Roboto-Italic',
            },
            500: {
                normal: 'Roboto-Medium',
            },
            600: {
                normal: 'Roboto-Medium',
                italic: 'Roboto-MediumItalic',
            },
            // Add more variants
            //   700: {
            //     normal: 'Roboto-Bold',
            //   },
            //   800: {
            //     normal: 'Roboto-Bold',
            //     italic: 'Roboto-BoldItalic',
            //   },
            //   900: {
            //     normal: 'Roboto-Bold',
            //     italic: 'Roboto-BoldItalic',
            //   },
        },
    },
    colors: {
        primary: {
            50: '#E3F2F9',
            100: '#C5E4F3',
            200: '#A2D4EC',
            300: '#7AC1E4',
            400: '#47A9DA',
            500: '#0088CC',
            600: '#007AB8',
            700: '#006BA1',
            800: '#005885',
            900: '#003F5E',
        },
        amber: {
            400: '#d97706',
        },
        green: {
            400: Colors.green,
        },
        greenV2: {
            400: Colors.greenV2,
        },
    },
    config: {
        initialColorMode: 'dark',
    },
    fonts: {
        titleRegular: 'BrandonReg',
        titleLight: 'BrandonLight',
        titleComfortaaBold: 'ComfortaaBold',

    },
});
