// //addscreen-index
// import React from 'react';
// import { Component, useState } from 'react';
// import {
//     View,
//     Text
// } from 'react-native';
// import styles from './style';

// export default class DiaryScreen extends Component {

//     //datepicker 생성자 추가
//     constructor(props) {
//         super(props);

//         }


//     componentWillMount = async () => {
//     }

//     componentDidMount = async () => {
//     }

//     // functions

//     /*
//        name:  gotoHomeScreen
//        description: show Home Screen
//    */
//     // AddScreen: 일정(0), 할일(1) (전달된 파라미터에 따라 다른 view 생성하기!!!)
//     render() {
//         return (
//             <View style ={styles.container} >
//                 <Text style ={styles.content}>일기작성페이지</Text>
//             </View>

//         );
//     }
// } 
//addscreen-index
import React from 'react';
import { Component, useState } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    TouchableHighlight,
    Picker,
    TouchableOpacity,
    AsyncStorage,
    RefreshControlBase,
    RefreshControlComponent,
    RefreshControl
} from 'react-native';
import XDate from 'xdate';
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../styles/colors';
import { ScrollView } from 'react-native-gesture-handler';
// import DateTimePicker from 'react-native-modal-datetime-picker';
// import ReactNativePickerModule from 'react-native-picker-module';
/* import { TouchableOpacity } from 'react-native-gesture-handler'; */
// import ScrollPicker, { scrollToIndex } from 'react-native-wheel-scroll-picker';
import { Calendar } from 'react-native-calendars';

import { getApi, postApi, getDateString, getColor } from '../../common/common'

//styles
import common from '../../../styles/common';
import styles from './style';
// import { RotationGestureHandler } from 'react-native-gesture-handler';
import { API } from 'aws-amplify';
import { CommonActions } from '@react-navigation/native';

// 출력값 계산 결과
var result = {
    final_date: null
}

export default class AddScreen extends Component {

    //datepicker 생성자 추가
    constructor(props) {
        super(props);

        selected: undefined;
        this.state = {
            isNew: this.props.route.params.isNew,
            uuid: this.props.route.params.uuid,
            year: this.props.route.params.year,
            month: this.props.route.params.month,
            cal_date: this.props.route.params.date,

            ColorModalVisible: false,
            isVisible: false,
            final_date: null,
            modify: this.props.route.params.isNew,
            cont_modify: this.props.route.params.isNew,

            // put params start
            email: null,
            title: null,
            date: null,
            description: "",
            emoticon: 0,
            color: 0,
            // put params end

            seleceted: null
        }
        console.log("isNew: ", this.state.isNew);

    }

    UNSAFE_componentWillMount = async () => {

        /*  // 1) 새로 추가
         if (this.state.isNew) {
 
             //시간배열에 데이터 삽입
             for (var i = 0; i < 12; i++) {
                 var j = String(i + 1)
                 hour_arr.push(j)
             }
 
             //분배열에 데이터 삽입
             for (var i = 0; i < 59; i++) {
                 var j = String(i + 1)
                 minute_arr.push(j)
             }
 
             this.getCurrentDate();
         } */

    }

    componentDidMount = async () => {
        //getSession
        await AsyncStorage.getItem("email", (errs, result) => {
            if (!errs) {
                if (result !== null) {
                    this.setState({ "email": JSON.parse(result) });
                }
            }
        });

        // 2) 기존 데이터 수정 
        if (!this.state.isNew) {
            this.getSelectedInfo();
        }
    }

    // functions

    /*
       name:  gotoHomeScreen
       description: show Home Screen
   */
    async gotoHomeScreen() {

        const params = {
            email: this.state.email,
            title: this.state.title,
            date: this.state.year + "." + this.state.month + "." + this.state.cal_date,
            contents: this.state.contents,
            color: this.state.color,
            emoticon: this.state.emoticon,
        }

        if (params.title != null && params.title.trim() != "") {
            await postApi('ApiCalendar', '/calendar', params);

            if (!this.state.isNew) {
                params['uuid'] = this.state.uuid;
                const data = await API.del("ApiCalendar", "/calendar/object/" + this.state.email + "/" + this.state.uuid).then(response => {

                    // 달력 초기화 필요
                }).catch(error => {
                    console.log("error", error.response);
                });
            }
        this.props.navigation.navigate("Home", {screen : 'Home', params: {diary_chg: true}});
        } else {
            alert("일정을 입력하세요"); // 나중에 비동기 이용해 빨간글씨로 바꾸기
        }
    }

    /*
       name:  gotoToDoScreen
       description: show ToDo Screen
   */
    gotoToDoScreen = () => {
        const { route } = this.props;
        this.props.navigation.navigate("ToDo", {
            isNew: this.state.isNew,
            year: route.params.year,
            month: route.params.month,
            date: route.params.date,
            day: route.params.day,
            calendarheader_month: this.state.Calendarheader_month
        });
    }

    /*
        name:  Back
        description: screen back,
    */
    Back() {
        // this.props.navigation.goBack(); // 로 하면 스택에 쌓인 할일/일정 페이지들이 나옴
        this.props.navigation.navigate("Home", {screen : 'Home', params: {diary_chg: false}});
    }

    /*
        name:  toggleColorModal
        description: show color picker
    */
    toggleColorModal = () => {
        this.setState({ ColorModalVisible: !this.state.ColorModalVisible });
    }

    /*
        name:  setThemeColor
        description: set theme color
    */
    setThemeColor(Color) {
        this.state.color = Color;
    }

    change_modify() {
        this.setState({ modify: true });
        this.setState({ cont_modify: true });
    }

    getSelectedInfo = async () => {
        // 기존 할일 불러오기
        const path_calendarlist = "/calendar/getModifyData/" + this.state.email + "/" + this.state.uuid;
        const response_calendarlist = (await getApi("ApiCalendar", path_calendarlist))[0];

        // 기존 내용으로 변수 갱신
        result.final_date = response_calendarlist.date;
        this.setState({ "title": response_calendarlist.title })
        this.setState({ "contents": response_calendarlist.contents })
        this.setState({ "emoticon": response_calendarlist.emoticon });
        this.setState({ "color": response_calendarlist.color });
        console.log("R: ", response_calendarlist);
    }

    deleteThisCalendar = async () => {
        const data = await API.del("ApiCalendar", "/calendar/object/" + this.state.email + "/" + this.state.uuid).then(response => {
            // 달력 초기화 필요
            this.props.navigation.navigate("Home");
        }).catch(error => {
            console.log("error", error.response);
        });
        console.log(data);
    }

    // AddScreen: 일정(0), 할일(1) (전달된 파라미터에 따라 다른 view 생성하기!!!)
    render() {
        //  const params = this.props.navigation.state;
        //  const itemId = params ? params.itemId : null;
        const { onValueChange } = this;
        const modify = /* !this.state.modify */false;
        const cont_modify = this.state.cont_modify;
        let modifyBtn = null;
        let deleteBtn = null;
        let colorBtn = null;

        // View 동적 생성(삭제버튼, 수정 버튼, 색상선택버튼,  일기 수정 시 삭제버튼 띄우기)
        if (modify) {
            modifyBtn = <Icon name="ios-pencil" size={30} color={Colors.gray}
                onPress={this.change_modify.bind(this)}></Icon>
            deleteBtn = <Icon name="trash-bin" size={30} color={Colors.gray} style={{ right: 10 }}
                onPress={this.deleteThisCalendar()}> </Icon>
            colorBtn = null;
        } else {
            modifyBtn = <TouchableOpacity style={[styles.addButton, { right: 10 }]}
                underlayColor={Colors.clicked} onPress={this.gotoHomeScreen.bind(this)}>
                <Text style={{ fontSize: 25, color: Colors.gray, marginTop: wp("7%") }}>V</Text>
            </TouchableOpacity>;
            deleteBtn = null;
            colorBtn = <TouchableOpacity title="Theme" style={[styles.theme_btn, { borderColor: getColor(this.state.color) }, { backgroundColor: getColor(this.state.color) }]} onPress={() => { this.toggleColorModal() }}>
            </TouchableOpacity>
        }

        return (

            <View style={styles.container}>
                <View style={styles.nav}>
                    <TouchableOpacity style={[styles.addButton, { left: 10 }]}
                        underlayColor={Colors.clicked} onPress={this.Back.bind(this)}>
                        <Text style={{ fontSize: 25, color: Colors.gray, marginTop: wp("7%") }}>X</Text>
                        {/* 아이콘으로 바꾸기 */}
                    </TouchableOpacity>
                    <View style={[styles.title]}>
                        <Text style={[common.font_title, common.font_bold], { color: Colors.gray, fontSize: wp('6%') }}>{this.state.year}.{this.state.month}.{this.state.cal_date}</Text>
                    </View>
                    {modifyBtn}
                </View>
                <View style={styles.cal_title}>
                    <TextInput style={[common.font_small, styles.textForm]} placeholder={'제목을 입력해주세요.'}
                        onChangeText={(text) => { this.setState({ title: text }) }}
                        value={this.state.title}
                    // multiline={true}
                    ></TextInput>
                </View>
                <View style={styles.content}>
                    <ScrollView>
                        <TextInput style={[common.font_small, styles.descriptionForm]}
                            onChangeText={(text) => { this.setState({ contents: text }) }}
                            value={this.state.contents}
                            placeholder={'오늘 하루를 입력해주세요.'}
                            multiline={true}
                        // 기본높이 설정해야함
                        ></TextInput>
                    </ScrollView>
                </View>

                {/* bottom: 색깔,이모티콘 설정: 글이 길어질 수 있으니 버튼 이동가능하게1! */}
                <View style={styles.footer}>
                    {colorBtn}
                    {deleteBtn}
                    <Modal isVisible={this.state.ColorModalVisible} onBackdropPress={() => { this.toggleColorModal() }}>
                        <View style={styles.colormodal_container}>
                            <View style={styles.colorModalTitle}>
                                <Text style={[common.font_mid, common.font_bold, common.mb1, { color: Colors.gray }]}>일정 색상 설정</Text>
                            </View>
                            <View style={styles.colorModalUp}>
                                <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._0 }, { backgroundColor: Colors._0 }, { left: wp("4%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor(0) }} />
                                <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._1 }, { backgroundColor: Colors._1 }, { left: wp("8%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor(1) }} />
                                <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._2 }, { backgroundColor: Colors._2 }, { left: wp("12%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor(2) }} />
                                <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._3 }, { backgroundColor: Colors._3 }, { left: wp("16%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor(3) }} />
                                <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._4 }, { backgroundColor: Colors._4 }, { left: wp("20%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor(4) }} />
                                <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._5 }, { backgroundColor: Colors._5 }, { left: wp("24%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor(5) }} />

                            </View>
                            <View style={styles.colorModalDown}>
                                <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._6 }, { backgroundColor: Colors._6 }, { left: wp("4%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor(6) }} />
                                <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._7 }, { backgroundColor: Colors._7 }, { left: wp("8%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor(7) }} />
                                <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._8 }, { backgroundColor: Colors._8 }, { left: wp("12%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor(8) }} />
                                <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._9 }, { backgroundColor: Colors._9 }, { left: wp("16%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor(9) }} />
                                <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._10 }, { backgroundColor: Colors._10 }, { left: wp("20%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor(10) }} />
                                <TouchableOpacity style={[styles.colorModalTheme, { borderColor: Colors._11 }, { backgroundColor: Colors._11 }, { left: wp("24%") }]} onPress={() => { this.toggleColorModal(); this.setThemeColor(11) }} />
                            </View>
                            <View style={styles.colorModalButton}>
                                <TouchableOpacity onPress={() => this.toggleColorModal()}>
                                    <Text style={[common.font_mid, { color: Colors.darkPrimary }]}>취소</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>


        );
    }
} 