import { ImageBackground } from "react-native";

const colors = {
    white: '#ffffff',
    black: '#000000',
    main: '#5BC1AC',
    grey: '#d5d5d5',
    grey_1: '#a6a6a6',
    red: '#e84118',
};

export const theme={
    background: colors.white,
    text: colors.black,
    errorText: colors.red,

    //BUTTON
    btnBackground: colors.main,
    btnTitle: colors.white,
    btnTextLink: colors.main,
    btnSignout: colors.red,

    //Image
    imgBackground: colors.grey,
    imgBtnBackground: colors.grey_1,
    imgBtnIcon: colors.white,

    //Input
    inputBackground: colors.white,
    inputLabel: colors.grey_1,
    inputPlaceholder: colors.grey_1,
    inputBorder: colors.grey_1,
    inputDisabled: colors.grey,

    //Spinner
    spinnerBackground: colors.black,
    spinnerIndicator: colors.white,

    //Tab
    tabBtnActive: colors.main,
    tabBtnInactive: colors.grey_1,

    //List-Item
    itemBorder: colors.grey,
    itemTime: colors.grey_1,
    itemDesc: colors.grey_1,
    itemIcon: colors.text,

    //Chat
    sendBtnActive: colors.main,
    sendBtnInactive: colors.grey_1,
};