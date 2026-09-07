import { useState } from 'react'
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useCart } from '../hooks/useCart'
import { createCheckout } from '../api/checkout'
import PrimaryButton from '../components/PrimaryButton'
import { colors, font, radius, spacing, type } from '../theme/colors'

export default function CartScreen({ navigation }) {
  const {
    items, itemCount, subtotal, loading, error,
    incrementItem, decrementItem, removeItem, isPending,
  } = useCart()
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')

  const handleCheckout = async () => {
    setCheckoutError('')
    setCheckoutLoading(true)
    try {
      const { checkoutUrl } = await createCheckout()
      navigation.navigate('CheckoutWebView', { checkoutUrl })
    } catch (err) {
      setCheckoutError(err.message)
    } finally {
      setCheckoutLoading(false)
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={type.eyebrow}>{itemCount} {itemCount === 1 ? 'artículo' : 'artículos'}</Text>
        <Text style={styles.title}>Tu carrito</Text>
      </View>

      {loading && <Text style={styles.msg}>Cargando carrito...</Text>}
      {error && !loading && <Text style={[styles.msg, styles.msgError]}>{error}</Text>}

      {!loading && !error && items.length === 0 && (
        <View style={styles.empty}>
          <Feather name="shopping-bag" size={26} color={colors.textFaint} />
          <Text style={styles.msg}>Tu carrito está vacío.</Text>
        </View>
      )}

      {!loading && !error && items.length > 0 && (
        <>
          <FlatList
            data={items}
            keyExtractor={item => item.product_id._id}
            contentContainerStyle={styles.list}
            ItemSeparatorComponent={() => <View style={styles.rowDivider} />}
            renderItem={({ item }) => {
              const product = item.product_id
              const pending = isPending(product._id)
              return (
                <View style={styles.row}>
                  <View style={styles.rowImg}>
                    {product.image ? (
                      <Image source={{ uri: product.image }} style={styles.rowImgTag} />
                    ) : (
                      <Feather name="image" size={16} color={colors.textFaint} />
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.rowName} numberOfLines={1}>{product.name}</Text>
                    <Text style={styles.rowPrice}>${Number(product.price).toFixed(2)}</Text>
                    <View style={styles.qtyRow}>
                      <Pressable
                        style={styles.qtyBtn}
                        disabled={pending}
                        onPress={() => decrementItem(product._id)}
                      >
                        <Feather name="minus" size={13} color={colors.text} />
                      </Pressable>
                      <Text style={styles.qtyValue}>{item.quantity}</Text>
                      <Pressable
                        style={styles.qtyBtn}
                        disabled={pending || item.quantity >= product.stock}
                        onPress={() => incrementItem(product._id)}
                      >
                        <Feather name="plus" size={13} color={colors.text} />
                      </Pressable>
                    </View>
                  </View>
                  <Pressable disabled={pending} onPress={() => removeItem(product._id)} hitSlop={8}>
                    <Feather name="trash-2" size={16} color={colors.danger} />
                  </Pressable>
                </View>
              )
            }}
          />

          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Envío</Text>
              <Text style={styles.freeShip}>Gratis</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
            </View>

            {checkoutError ? <Text style={styles.checkoutError}>{checkoutError}</Text> : null}

            <PrimaryButton
              title={checkoutLoading ? 'Conectando con Wompi...' : 'Realizar compra'}
              onPress={handleCheckout}
              loading={checkoutLoading}
              disabled={items.length === 0}
            />
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  header: { padding: spacing.lg, paddingBottom: spacing.md },
  title: { fontFamily: font.extrabold, fontSize: 22, color: colors.text, marginTop: 2 },
  msg: { fontFamily: font.medium, textAlign: 'center', color: colors.textMuted, paddingVertical: spacing.xxl },
  msgError: { color: colors.danger },
  empty: { alignItems: 'center', gap: spacing.md, paddingTop: spacing.xxl },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.md },
  rowDivider: { height: 1, backgroundColor: colors.divider },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  rowImg: {
    width: 52,
    height: 52,
    borderRadius: radius.hairline,
    backgroundColor: colors.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  rowImgTag: { width: '100%', height: '100%' },
  rowName: { fontFamily: font.medium, fontSize: 13.5, color: colors.text, marginBottom: 2 },
  rowPrice: { fontFamily: font.bold, fontSize: 13, color: colors.text, marginBottom: 6 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  qtyBtn: {
    width: 24, height: 24, borderRadius: 6,
    borderWidth: 1, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  qtyValue: { fontFamily: font.bold, fontSize: 13, minWidth: 18, textAlign: 'center' },
  summary: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderTopLeftRadius: radius.soft,
    borderTopRightRadius: radius.soft,
    padding: spacing.xl,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { fontFamily: font.regular, fontSize: 13, color: colors.textMuted },
  summaryValue: { fontFamily: font.medium, fontSize: 13, color: colors.text },
  freeShip: { fontFamily: font.bold, fontSize: 13, color: colors.success },
  divider: { height: 1, backgroundColor: colors.divider, marginBottom: 10 },
  totalLabel: { fontFamily: font.bold, fontSize: 16, color: colors.text },
  totalValue: { fontFamily: font.extrabold, fontSize: 18, color: colors.text },
  checkoutError: { fontFamily: font.medium, fontSize: 12, color: colors.danger, marginBottom: 10 },
})
