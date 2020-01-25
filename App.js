import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import { Login } from './views/Login/Login'
import { Home } from './views/Home/Home'
import { NewsDetail } from './views/News/NewsDetail'
import { ShopDetail } from './views/Shop/ShopDetail'



const HomeNavigation = createStackNavigator({
  Home: { 
      screen: Home, // หน้าที่ต้องการเรียก
      navigationOptions: {
          header: null
      }
  },
  NewsDetailTest: { 
      screen: NewsDetail,
      navigationOptions: {
          title: 'รายละเอียด(ข่าวสาร)',
          headerTintColor: '#f3f3f3',
          headerTitleStyle: {
              fontSize: 18,
              fontFamily: 'Kanit-Regular',
              color: '#f3f3f3',
              fontWeight:'bold'
          },
          headerStyle: {
              backgroundColor: '#010001',
          },
      }
  },
  ShopDetail: { 
      screen: ShopDetail, 
      navigationOptions: {
          title: 'รายละเอียด',
          headerTintColor: '#f3f3f3',
          headerTitleStyle: {
              fontSize: 18,
              fontWeight: '400',
              fontFamily: 'Kanit-Regular',
              color: '#f3f3f3'
          },
          headerStyle: {
              backgroundColor: '#010001',
          },
      }
  },
}, {
  initialRouteParams: 'Home',   // หน้าไม่เจอหน้าไหน ก็จะมาทำงานที่  initialRouteParams
});



// อ้างหน้าเพื่อใช้งาน
const Navigation = createSwitchNavigator({
    Login: Login, //// เพิ่มเติมส่วน
    Home: HomeNavigation,
})



const App = createAppContainer(Navigation);

export default App;