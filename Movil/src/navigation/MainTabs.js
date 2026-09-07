import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import HomeScreen from '../screens/HomeScreen'
import CatalogScreen from '../screens/CatalogScreen'
import CartScreen from '../screens/CartScreen'
import ProfileScreen from '../screens/ProfileScreen'
import { useCart } from '../hooks/useCart'
import { colors, font } from '../theme/colors'

const Tab = createBottomTabNavigator()

function CartTabIcon({ color, size }) {
  const { itemCount } = useCart()
  return (
    <View>
      <Feather name="shopping-bag" size={size} color={color} />
      {itemCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{itemCount > 9 ? '9+' : itemCount}</Text>
        </View>
      )}
    </View>
  )
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.action,
        tabBarInactiveTintColor: colors.textFaint,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{ tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} /> }}
      />
      <Tab.Screen
        name="Catálogo"
        component={CatalogScreen}
        options={{ tabBarIcon: ({ color, size }) => <Feather name="grid" size={size} color={color} /> }}
      />
      <Tab.Screen
        name="Carrito"
        component={CartScreen}
        options={{ tabBarIcon: ({ color, size }) => <CartTabIcon color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{ tabBarIcon: ({ color, size }) => <Feather name="user" size={size} color={color} /> }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabLabel: { fontFamily: font.medium, fontSize: 10.5, marginTop: 2 },
  badge: {
    position: 'absolute',
    top: -5,
    right: -9,
    backgroundColor: colors.signal,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: { color: colors.ink, fontSize: 9, fontFamily: font.bold },
})
