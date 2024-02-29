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
                size: 'md'
            },
            defaultProps: {
               // colorScheme: 'green',
            },
        },
        Input: {
            baseStyle: {
                borderRadius: 20,
                backgroundColor: 'white',


            },
            defaultProps: {
                ///backgroundColor: 'white',
                borderWidth: 0,
                color: Colors.darkPrimary,
                height: 45,
                fontSize: 'md',
                textAlign: 'center',
                caretHidden: false,
                selectionColor: Colors.darkPrimary

            },
        },
        Select: {
            baseStyle: {},
            defaultProps: {
                color: Colors.darkPrimary,
                height: 45,
                fontSize: 'md',
                textAlign: 'center',
                placeholderTextColor: Colors.darkPrimary
            },
        },
        FormControl: {
            ErrorMessage: {
                baseStyle: {
                    color: 'black',
                },
            }

        },
        Checkbox: {
            baseStyle: {
                fontFamily: 'ComfortaaRegular',
                _text: {
                    color: '#000',
                    ml: 2,
                },
                bg: 'muted.50',
                borderRadius: 30,
                color: '#ccc',


            },
            defaultProps: {
                size: 'sm'
            },
            sizes: {
                xl: {fontSize: '64px'},
                lg: {fontSize: '32px'},
                md: {fontSize: '14px'},
                sm: {fontSize: '12px'},
            },

        },
        Image: {
            defaultProps: {
                alt: 'images'
            },
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
            50: Colors.primary,
            100: Colors.primary,
            200: Colors.darkPrimary,
            300:Colors.darkPrimary,
            400: Colors.darkPrimary,
            500: Colors.lightPrimary,
            600: Colors.darkPrimary, //Primary
            700: Colors.darkPrimary,
            800: Colors.lightPrimary, // Button pressed primaryLight

        },
        amber: {
            400: '#d97706',
        },
        green: {
            300: Colors.lightPrimary,
            600: Colors.darkPrimary,
            800: Colors.lightPrimary,
        },
    },
    config: {
        initialColorMode: 'dark',
    },
    fonts: {
        titleRegular: 'BrandonReg',
        titleLight: 'BrandonLight',
        titleBrandonBldBold: 'BrandonBld',
        titleComfortaaBold: 'ComfortaaBold',
        titleConfortaaRegular: 'ComfortaaRegular',
        titleComfortaaSemiBold: 'ComfortaaSemiBold',
        titleBrandonBldBoldIt: 'BrandonBldIt',
        titleComfortaaVariable: 'ComfortaaVariable'
    },
});
