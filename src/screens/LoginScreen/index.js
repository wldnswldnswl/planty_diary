import React from 'react';
import { Component } from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { getApi, postApi } from '../../common/common';
import common from '../../../styles/common'; // common styles
import styles from './style';
import Amplify, { API } from 'aws-amplify';
export default class LoginScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: null,
            pwd: null,
            nickname: null
        }


    }

    //functions  
    /*
        name: _doLogin
        description: show Login Screen
    */
    async _doLogin() { 
     
        // alert(JSON.stringify(this.state));
        //get
        //빈 칸 확인
        if(this.state.email == null || this.state.email.trim() == ""||
           this.state.pwd == null || this.state.pwd.trim() == "" ){
               alert("빈 칸을 입력해주세요");
           }
        else{
            const response = await API.get('ApiMembers', '/members/login/'+this.state.email+'/'+this.state.pwd);
            if(response.data[0] != null){
           
                this.state.nickname = response.data[0].nickname;

                 // 세션 설정 (아이디, 닉네임)
                AsyncStorage.multiSet([ // AsyncStorage는 내부 저장소로 세션으로 사용하기에 보안이 부실할 것. 하지만 이메일, 닉네임 같은 비중요정보라 일단 저걸로 구현해놓음...!
                // 추후 redis 또는 Redux와 Redux Persist(앱을 종료해도 지속되는 Store)로 구현 //https://medium.com/humanscape-tech/redux-persist-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0-2077c9e566d9
                // ["email", JSON.stringify(this.state.email)],
                ["email", JSON.stringify(this.state.email)],
                ["nickname", this.state.nickname]
                ]);

    
                // const isLoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
               
                this.props.navigation.navigate('Home', {screen : 'Home', params: {
                    email : this.state.email,
                    nickname: this.state.nickname
                }}); 
            

            }else{
                alert("아이디/비밀번호를 확인해주세요.");
            }
                   
        }
    }
    /*
        name: _doNaverLogin
        description: login with Naver account
    */
    _doNaverLogin(){
        this.props.navigation.navigate('Home'); // 임시로 써놓음. 네이버연동 알아보는 사람이 알아서 만들기,,
    }

    /*
       name: _goJoinScreen
       description: show Join Screen
   */
    _goJoinScreen() {
        this.props.navigation.navigate('Join');
    }

    /*
        name: _goFindScreen
        description: show FindInfo Screen
    */
    _goFindScreen() {
        this.props.navigation.navigate('FindInfo');
    }

    /*
       Login Screen
    */
    render() {
        return (
            
            <View style={styles.container}>
                <View style={styles.titleArea}>
                    {/* 로고 이미지 삽입 */}
                    <Image source={require('../../../assets/Logo.png')}
                        style={{ width: 170, height: 170 }} />
                </View>
                <View style={styles.formArea}>
                    <TextInput
                        style={styles.textForm}
                        placeholder={"이메일"}
                        keyboardType='email-address'
                        onChangeText={value => this.setState({ 'email': value })}
                    />
                    <TextInput
                        style={styles.textForm}
                        placeholder={"비밀번호"}
                        secureTextEntry={true}
                        onChangeText={value => this.setState({ 'pwd': value })}
                    />
                    <Text style={styles.smallText}>비밀번호를 잊어버리셨나요?
                        <Text
                            style={common.linkEffect}
                            onPress={this._goFindScreen.bind(this)}>
                            비밀번호 찾기</Text>
                    </Text>
                </View>

                <View style={styles.buttonArea}>
        <TouchableOpacity
            style={[styles.button, styles.blue]}
            onPress={this._doLogin.bind(this)}>
            <Text style={styles.buttonTitle}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={this._doNaverLogin.bind(this)}
            style={[styles.button, styles.green]}>
            <Image source={require('../../../assets/naver_login_green.jpg')}
                style={{ width: 287, height: 50 }} />
        </TouchableOpacity>
        <Text style={[styles.smallText, common.mt2_5]}>아직 회원이 아니신가요?
             <Text
                style={common.linkEffect}
                onPress={this._goJoinScreen.bind(this)}>회원가입</Text>
        </Text>
    </View>
                   
            </View>            
        );
    }
}



const mapStateToProps = (state) => ({

    isLogin : state.isLogin.status
  
});

const mapDispatchToProps = (dispatch) => ({

    login: () => dispatch(login()),
  
    logout: () => dispatch(logout())
  
  });

  const LoginButton = (props) => {
    const { status, login, logout } = props;
    
    const handleLogin = () => {
      login();
    };
  
    const handleLogout = () => {
      logout();
    };
  
    return (
       <View></View>
    );
  };