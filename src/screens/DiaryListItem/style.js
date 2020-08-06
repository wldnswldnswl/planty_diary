import React from "react";
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../../styles/colors'

// css
const styles = StyleSheet.create({
    container: {
        width:wp("100%"),
        height:wp("25%"),
        marginTop:wp("3%"),
        marginBottom:wp("1%")
    },
    date: {
        height:wp("7%")
    },
    diary: {
        height:wp("17.7%"),
        borderRadius: 3,
        backgroundColor: colors.primary
    },
    title: {
        height:wp("6%")
    },
    contents: {
        height:wp("11.7%")
    }
})

export default styles;