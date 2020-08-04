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

export default class DiaryListScreen extends Component {

    // functions
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            calendarList: [],
            year_month: new Date().getFullYear()+"."+change_2len_month(new Date().getMonth() + 1),
            date: change_2len_date(new Date().getDate())
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

        const path = "/calendar/getAllDayList/" + JSON.parse(this.state.email);
        const response = await getApi("ApiCalendar", path);

        this.setState({ calendarList: response });
        // console.log(this.state.calendarList);
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
            year: this.state.year,
            month: this.state.month,
            date: this.state.date,
        });
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
        const { onValueChange } = this;
        const { date } = "";
        // alert("email render: "+this.state.email);

        //  const title = this.props.navigation.state.params;
        // this.getToDoList =  this.getToDoList.bind("planty.adm@gmail.com");
        return (
            <View style={styles.container}>
                <View style={styles.nav}>
                    <TouchableOpacity style={[styles.addButton, { left: 10 }]}
                        underlayColor={Colors.clicked} onPress={this.gotoHomeScreen.bind(this)}>
                        <Text style={{ fontSize: 30, color: Colors.gray }}>X</Text>
                        {/* 아이콘으로 바꾸기 */}
                    </TouchableOpacity>
                    <View style={[styles.title]}>
                        <TouchableOpacity>
                            <Text style={[common.font_title, common.font_bold], { color: Colors.gray, fontSize: wp('6%') }}>{this.state.year_month}</Text>
                        </TouchableOpacity>
                        {/* <MonthPicker
                            onChange={onValueChange}
                            value={date}
                            minimumDate={new Date(1920, 1)}
                            maximumDate={new Date(2120, 12)}
                            enableAutoDarkMode={false}
                          /> */}
                    </View>
                </View>

                <View style={styles.content}>
                    <ScrollView>
                        {this.state.calendarList && (
                            this.state.calendarList.map((data) => {
                                return <DiaryListItem name={data.title} date={data.date} />
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

