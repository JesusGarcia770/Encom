import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainTabs from './MainTabs'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'
import ResetPasswordScreen from '../screens/ResetPasswordScreen'
import ProductDetailScreen from '../screens/ProductDetailScreen'
import CheckoutWebViewScreen from '../screens/CheckoutWebViewScreen'
import CheckoutResultScreen from '../screens/CheckoutResultScreen'
import { colors, font } from '../theme/colors'

const Stack = createNativeStackNavigator()

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: colors.action,
          headerTitleStyle: { color: colors.text, fontFamily: font.bold, fontSize: 16 },
          headerStyle: { backgroundColor: colors.surface },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Producto' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CheckoutWebView" component={CheckoutWebViewScreen} options={{ title: 'Pago con Wompi' }} />
        <Stack.Screen name="CheckoutResult" component={CheckoutResultScreen} options={{ title: '', headerBackVisible: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
