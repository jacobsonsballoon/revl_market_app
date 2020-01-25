import React from 'react';
import {
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text, 
    TouchableOpacity,
    View,
} from 'react-native';
import {
    Header,
    Content,
} from "native-base"

import NetworkFailed from '../../component/NetworkFailed';
import NotFound from '../../component/NotFound';
import Loading from '../../component/Loading';

import GOBALS from '../../GOBALS';

//import NewsModel from '../../models/NewsModel'
var news_model = new NewsModel

export class NewsDetail extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: '#010001', }}>
                <StatusBar hidden={true} />

            </ScrollView>
        );
    }
}