import { Dimensions, Platform } from 'react-native';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;
export const isIphoneX = Platform.OS === 'ios' && (deviceWidth === 812 || deviceHeight === 812);
export const isAdroid = Platform.OS === 'android';