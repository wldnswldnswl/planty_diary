import React from "react";
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: wp('5%'), 
    marginBottom: hp('2%'),
    alignItems: "center",
    // paddingHorizontal: wp('3%'),
    backgroundColor: 'white'
  },

  nav: {
    flex: 0.8,
    width: wp('100%'),
    height: wp('100%'),
    marginLeft: wp('1%')
  },

  content: {
    flex: 10,
    width: "100%",
    height: "100%",
    paddingHorizontal: wp('3%')
  },
  
  list: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderColor: '#000',
    borderBottomWidth: 1
  },

  addButton: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20
  },
  title: {
    marginTop: 15,
    height: 30,
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center'
  }

})


export default styles;