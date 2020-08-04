import React from 'react';
import { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
    //  RadioButton
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import styles from './style';
import common from '../../../styles/common';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { diary_date } from '../../common/common';

export default class DiaryListItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: this.props.name,
            date: diary_date(this.props.date),
            seq: this.props.seq,
            checked: ""
        };

    }

    checkRadio(checked, seq) {
        var checked;

        if (checked == seq) {
            this.checked = "#";
        } else {
            this.checked = seq;
        }

        return { checked: checked };
    }

    render() {
        const { checked } = this.state;
        const { seq } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.date}>
                    <Text style = {[common.font_mid, {left: wp("1%")}]}>{this.state.date}</Text>
                </View>
                <View style={styles.diary}>
                    <View style={styles.title}>
                        <Text style ={{fontSize : 17, left:wp("1%")}}>{this.state.title}</Text>
                    </View>
                    <View style={styles.contents}></View>
                </View>
            </View>
        );
    }
}