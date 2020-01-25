import React from 'react';
import {
    ActivityIndicator,
    Alert,
    Image, 
    StatusBar, 
    StyleSheet,
    ScrollView, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View, 
    AsyncStorage,// เพิ่มเติมส่วน
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import NetworkFailed from '../../component/NetworkFailed';
import NotFound from '../../component/NotFound';

import UserModel from '../../models/UserModel'  // เรียกใช้งาน clss UserModel

var user_model = new UserModel  // เรียกใช้งาน clss UserModel

export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            alert: '',
            username: 'admin',
            password: '123456',
        }
    }

    componentDidMount() {
        // เพิ่มเติมส่วน AsyncStorage
        AsyncStorage.getItem('user_data').then((user) => { return JSON.parse(user) }).then((user_data) => {
            if (user_data != null) {
                // this.setState({ 
                //     username: user_data.user_username, 
                //     password: user_data.user_password 
                // });

                this.props.navigation.navigate('Home')
            }
        });
    }

    _getLogin(){
        if (this.state.username.length == 0) {
            Alert.alert("แจ้งเตือน","กรุณาระบุบัญชีผู้ใช้");
        }else if(this.state.password.length == 0){
            Alert.alert("แจ้งเตือน","กรุณากรอกรหัสผ่าน");
        }else{
            this.setState({
                loading: true,
                alert: '',
            }, () => {    // จะไม่มี ) ของ setStat เพราเป้น event  จะเป็น arrow function 
                // เรียกใช้งาน   user_model = new UserModel
                user_model.getLogin(this.state.username,this.state.password).then((response) => {
                    console.log('[_getLogin] response:',response);

                    if (response == false) {    // ติดต่อ Server ไม่ได้
                        this.setState({
                            loading: false,
                            alert: 'network-failed',
                        });
                    }else if (response.data.length == 0) {  /// user pssword ผิด
                        this.setState({
                            loading: false,
                            alert: 'not-found',
                        });
                    }else{
                        this.setState({
                            loading: false,
                        },() => {
                            //Alert.alert("Function","_getLogin");
                           // this.props.navigation.navigate('Home')
                           // ถ้า Login ผ่าน
                           AsyncStorage.setItem('user_data',JSON.stringify(response.data[0])).then(() => {
                            this.props.navigation.navigate('Home')
                        });
                        });
                    }
                });
            });
        }
    }

    render() {
        var display = [];

        // loading...  จะหมุนๆ ก่อน LOGIN

        if (this.state.loading) {
            display.push(
                <View style={{ flexDirection: "row", justifyContent: "center", flex: 1, 
                        backgroundColor: '#25aae1', borderRadius: 2, padding: 10, }}>
                    <ActivityIndicator size="small" color="#fff"/>
                </View>
            )
        }else{
            display.push(
                <TouchableOpacity style={{ flex: 1, backgroundColor: '#25aae1', borderRadius: 2, padding: 10, }} 
                onPress={() => this._getLogin()}>
                    <Text style={{ alignSelf: "center", fontSize: 16, color: '#fff', }}>LOGIN</Text>
                </TouchableOpacity>
            )
        }

        if (this.state.alert == 'network-failed') {
            display.push(<NetworkFailed/>);
        }else if (this.state.alert == 'not-found') {
            display.push(<NotFound/>);
        }

        // เรียกใช้งาน
        return (
            <ScrollView style={{ backgroundColor: "#010001", }}>
                <StatusBar hidden={true} />
                <View style={{ padding: 36, }}>
                    <Image resizeMode="contain"
                        source={require('../../images/logo.png')} 
                        style={{ width: 200, height: 200, marginTop: 54, marginBottom: 24, alignSelf: 'center', }}
                    >
                    </Image>
                    <View style={[ styles.row_underline, { marginBottom: 16, }]}>
                        <Icon name="email-outline" style={styles.login_icon} />
                        <TextInput placeholder="Email address"
                            placeholderTextColor="#ADADAD"
                            underlineColorAndroid='transparent' 
                            style={{ color: '#fff', flex: 1, fontSize: 16, paddingLeft: 12, }}
                            onChangeText={(val) => { this.setState({
                                username : val  
                             }) }}

                            value={this.state.username}
                        />
                    </View>
                    <View style={[ styles.row_underline, { marginBottom: 24, }]}>
                        <Icon name="lock-outline" style={styles.login_icon} />
                        <TextInput placeholder="Password"
                            placeholderTextColor="#ADADAD"
                            underlineColorAndroid='transparent'
                            style={{ color: '#fff', flex: 1, fontSize: 16, paddingLeft: 12, }}
                            secureTextEntry={true}
                            onChangeText={(val) => { this.setState({
                                password : val  
                             })  // end set state
                            }}// end on change
                            value={this.state.password}
                        />
                    </View>
                    {/* ส่วนแส้งผลตัวแปร */}
                    {display}

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    row_underline:{
        flexDirection: "row", 
        borderBottomWidth: 1, 
        borderBottomColor: '#b6b6b6',
    },
    login_icon:{
        alignSelf: 'center',
        fontSize: 20, 
        color: '#ADADAD', 
    },
});