import React from 'react';
import { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView,
    AsyncStorage
} from 'react-native';
// import { DrawerActions } from 'react-navigation-drawer';
import Amplify, { API } from 'aws-amplify';

import MyActionBar from '../MyActionBar';
import DiaryListItem from '../DiaryListItem';
import { change_2len_month, change_2len_date } from '../../common/common';
//styles
import common from '../../../styles/common';
import styles from './style';
import Colors from '../../../styles/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import DatePicker from '../DatePicker';
import { getApi, getColor } from '../../common/common'
import MonthPicker from 'react-native-month-year-picker';
import { Value } from 'react-native-reanimated';

export default class DiaryListScreen extends Component {

    // functions
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            calendarList: [],
            year_month: new Date().getFullYear() + "." + change_2len_month(new Date().getMonth() + 1),
            date: change_2len_date(new Date().getDate()),
            DayPickerVisible: false
        }
    }

    componentDidMount = async () => {

        await AsyncStorage.getItem("email", (errs, result) => {
            if (!errs) {
                if (result !== null) {
                    this.setState({ "email": result });
                }
            }
        });
        const path = "/calendar/getCurrentDayList/" + JSON.parse(this.state.email) + "/" + this.state.year_month;
        const response = await getApi("ApiCalendar", path);

        this.setState({ calendarList: response });

    }

    getDiaryList = async () => {

    }

    /*
        name:  gotoHomeScreen
        description: show Home Screen
    */
    gotoHomeScreen() {
        this.props.navigation.navigate("Home");
    }

    /*
       name:  gotoToDoScreen
       description: show ToDo Screen
   */
    gotoDiaryScreen() {
        this.props.navigation.navigate("Diary", {
            isNew: true,
            year: this.state.year_month.substring(0, 4),
            month: this.state.year_month.substring(5),
            date: this.state.date,
        });
    }

    showDayPicker = (value) => {
        this.setState({ DayPickerVisible: value });
    }

    setDate = (Date) => {
        this.setState({ year_month: Date });
    }

    /*
       name:  gotoSideNav
       description: show Setting Nav
   */
    // gotoSideNav(){
    //     this.props.navigation.dispatch(DrawerActions.openDrawer());
    // }

    // HomeScreen : 캘린더
    render() {

        const onValueChange = (event, newDate) => {
            const selectedDate = newDate || date;

            this.showDayPicker(false);
            this.setDate(selectedDate);
        };

        // alert("email render: "+this.state.email);

        //  const title = this.props.navigation.state.params;
        // this.getToDoList =  this.getToDoList.bind("planty.adm@gmail.com");
        return (
            <View style={styles.container}>
                <View style={styles.nav}>
                    <TouchableOpacity style={[styles.addButton, { left: 10 }]}
                        underlayColor={Colors.clicked} onPress={this.gotoHomeScreen.bind(this)}>
                        <Text style={{ fontSize: 25, color: Colors.gray, marginTop: wp("8%") }}>X</Text>
                        {/* 아이콘으로 바꾸기 */}
                    </TouchableOpacity>
                    <View style={[styles.title]}>
                        <TouchableOpacity /* onPress={this.showDayPicker(true)} */>
                            <Text style={[common.font_title, common.font_bold], { color: Colors.gray, fontSize: wp('6%') }}>{this.state.year_month}</Text>
                        </TouchableOpacity>
                        {/* {this.state.DayPickerVisible && (<MonthPicker
                            onChange={onValueChange}
                            value={this.state.year_month}
                            minimumDate={new Date()}
                            maximumDate={new Date(2025, 5)}
                            enableAutoDarkMode={false}
                            outputFormat="YYYY.MM"
                            okButton="완료"
                            cancelButton="취소"
                        />
                        )} */}
                    </View>
                </View>

                <View style={styles.content}>
                    <ScrollView>
                        {this.state.calendarList && (
                            this.state.calendarList.map((data) => {
                                return <DiaryListItem name={data.title} date={data.date} contents={data.contents.substring(0, 40)} />
                            })
                        )}
                    </ScrollView>

                    <TouchableHighlight style={[common.addButton]}
                        underlayColor={Colors.clicked} onPress={this.gotoDiaryScreen.bind(this)}>
                        <Text style={{ fontSize: 50, color: 'white' }}>+</Text>
                    </TouchableHighlight>

                </View>
            </View>
        );

    }
}

