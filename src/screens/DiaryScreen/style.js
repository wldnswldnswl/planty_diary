// import { StyleSheet } from "react-native";
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'; 
// import Colors from '../../../styles/colors' 

//  // css
//  const styles = StyleSheet.create({ 
//     container: { 
//         flex: 1, 
//         // padding: wp('5%'), 
//         marginBottom: hp('2%'),
//         alignItems: "center",
//         // paddingHorizontal: wp('3%'),
//         backgroundColor: 'white'
//     }, 

//     content: { 
//         flex: 10,
//         width: "100%", 
//         height: "100%", 
//         paddingHorizontal: wp('3%'),

//     },
    
//     list: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: 20,
//         borderColor: '#000',
//         borderBottomWidth: 1
//       }
// }) 


// export default styles;//addscreen-style
import React from "react";
import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'; 
import Colors from '../../../styles/colors' 
import common from '../../../styles/common'

 // css
 const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        backgroundColor: 'white', 
        alignItems: "center",
        marginBottom: hp('2%'),
        paddingHorizontal: wp('3%'),
        // padding: wp('5%')
    }, 
    nav: { 
        flex: 0.8,
        width: wp('100%'), 
        height: wp('100%'), 
        marginLeft: wp('1%')
    }, 
    mainText: { 
        flex: 1.3,
        width: wp('100%'), 
        height: wp('100%'),
        paddingHorizontal: wp('3%') 
    }, 

    cal_title: {
        width: "100%",
        height: "7%"
    },

    content: { 
        flex: 8,
        width: "100%", 
        height: "100%",
        flexDirection: 'column'
    },

    footer: {
        /* flexDirection: "row" */
        height: "8%"
    },

    content_element: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: hp('0.5%')
    },

    content_element_sub: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'flex-start',
        marginTop: hp('3%')
    },

    textForm: { 
        borderBottomWidth: 1, 
        borderColor: '#888', 
        width: '100%', 
        paddingLeft: wp('2%'), 
        paddingRight:wp('2%'), 
        // marginBottom: 5,
        // paddingVertical:hp('3%'),
        justifyContent:'center'
       },

    descriptionForm: {
        marginLeft: wp('1%'),
        marginTop: hp('1%'),
        // borderBottomColor: Colors.gray,
        // borderBottomWidth:0.7,
        // width:wp('90%'),
        paddingVertical:1
    },

    tab_btn:{
        borderRadius:50,
        borderWidth:1,
        borderColor: Colors.darkPrimary,
        backgroundColor:Colors.darkPrimary,
        padding:wp('2%'),
        width:wp('20%'),
        height:hp('5%'),
        marginLeft: wp('2.5%')
    },  

    delete_btn:{
        borderWidth:1,
        borderColor: Colors.darkPrimary,
        padding:wp('2%'),
        width:wp('20%'),
        height:hp('5%'),
        marginLeft: wp('54%'),
    },  

    on:{
        color: "white",
        backgroundColor: Colors.darkPrimary,
        textAlign: 'center'
    },

    off:{
        color: Colors.darkPrimary,
        backgroundColor: "white",
        textAlign: 'center'
    },

    modal_container: {
        alignItems:"center",
        width:330,
        height:550,
        left:wp("5%"),
        backgroundColor: 'white',
        borderRadius: 3,
    },

    modalheader: {
        width:'100%',
        height:'2.5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 3,
        borderTopRightRadius:3,
        backgroundColor:Colors.darkPrimary
    },
    
    /* modalyearmonth: {
        width : '100%',
        height: '8%',
        justifyContent: 'center',
        alignItems: 'center'
    }, */

    modalCalendar: {
        width : '100%',
        height: '65.5%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },

    modalHourContainer: {
        width : '100%',
        height: '24%',
        flexDirection: 'row'
    },

    modalAmPm: {
        flex:1,
        alignItems: 'center'
    },

    modalHour: {
        flex:1,
        alignItems: 'center'
    },

    modalMin: {
        flex:1,
        alignItems: 'center'
    },

    modalButton: {
        width : '100%',
        height: '8%',
        flexDirection: 'row',
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3
    },

    modalCnButton: {
        flex:1,
        borderBottomLeftRadius: 3,
        alignItems: "center"
    },

    modalSvButton: {
        flex:1,
        borderBottomRightRadius: 3,
         alignItems: "center"
    },

    calendar: {
        // marginBottom: 10
    },

    theme_btn : {       
        borderWidth : 1,
        width : 30,
        height : 30,
        borderRadius : 50,
        right : wp('38%'),
        bottom: hp('2%'),
        position: "absolute"
        // alignItems : 'flex-start'
       
     },

     colormodal_container: {
        width: 350,
        height: 200,
        left : wp('3%'),
        right : wp('-3%'),
        borderRadius: 3,
        backgroundColor: 'white'
    },

    colorModalTitle: {
        width: "100%",
        height:("20%"),
        left: wp('2%'),
        marginTop: wp('2%'),
        borderTopLeftRadius:3,
        borderTopRightRadius:3
    },

    colorModalUp: {
        flex:1,
        alignItems:"center",
        flexDirection : 'row'
    },

    colorModalDown: {
        flex:1,
        alignItems:"center",
        flexDirection : 'row'
    },

    colorModalTheme: {
        width:40,
        height:40,
        borderRadius: 50
    },

    colorModalButton: {
        width: "100%",
        height:("20%"),
        alignItems:"center",
        borderBottomLeftRadius:3,
        borderBottomRightRadius:3
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
        marginTop:15,
        height:30,
        width: wp('100%'),
        alignItems: 'center',
        justifyContent: 'center'
      }


}) 


export default styles;