import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useProducts } from '../hooks/useProducts'
import { useCategories } from '../hooks/useCategories'
import ProductCard from '../components/ProductCard'
import PrimaryButton from '../components/PrimaryButton'
import { colors, font, radius, spacing, type } from '../theme/colors'

const HOME_PRODUCTS_LIMIT = 6

const FEATURES = [
  { icon: 'truck', label: 'Envío gratis' },
  { icon: 'credit-card', label: 'Cuotas sin interés' },
  { icon: 'shield', label: 'Compra segura' },
]

export default function HomeScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('destacados')
  const { products, loading, error } = useProducts()
  const { categories } = useCategories()

  const tabs = ['destacados', ...categories.map(c => c._id)]
  const tabLabels = categories.reduce(
    (acc, c) => ({ ...acc, [c._id]: c.name }),
    { destacados: 'Destacados' }
  )

  const visibleProducts = (
    activeTab === 'destacados'
      ? products
      : products.filter(p => p.category_id?._id === activeTab)
  ).slice(0, HOME_PRODUCTS_LIMIT)

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>Nuevo en ENCOM</Text>
        <Text style={styles.heroTitle}>Tecnología que transforma tu vida</Text>
        <Text style={styles.heroSub}>
          Smartphones, monitores y accesorios con calidad premium a precios accesibles
          para El Salvador.
        </Text>
        <PrimaryButton
          title="Ver catálogo"
          onPress={() => navigation.navigate('Catálogo')}
          style={styles.heroBtn}
        />
      </View>

      <View style={styles.featuresBar}>
        {FEATURES.map((f, i) => (
          <View key={f.label} style={styles.featureRow}>
            {i > 0 && <View style={styles.featureDivider} />}
            <View style={styles.featureItem}>
              <Feather name={f.icon} size={15} color={colors.action} />
              <Text style={styles.featureLabel}>{f.label}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={type.eyebrow}>Este mes</Text>
            <Text style={styles.sectionTitle}>Novedades</Text>
          </View>
          <Pressable onPress={() => navigation.navigate('Catálogo')} style={styles.viewAllBtn}>
            <Text style={styles.viewAll}>Ver todo</Text>
            <Feather name="arrow-right" size={13} color={colors.action} />
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsRow}>
          {tabs.map(t => (
            <Pressable
              key={t}
              onPress={() => setActiveTab(t)}
              style={[styles.tabBtn, activeTab === t && styles.tabBtnActive]}
            >
              <Text style={[styles.tabBtnText, activeTab === t && styles.tabBtnTextActive]}>
                {tabLabels[t]}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {loading && <Text style={styles.msg}>Cargando productos...</Text>}
        {error && !loading && <Text style={[styles.msg, styles.msgError]}>{error}</Text>}
        {!loading && !error && visibleProducts.length === 0 && (
          <Text style={styles.msg}>Aún no hay productos en esta categoría.</Text>
        )}

        {!loading && !error && visibleProducts.length > 0 && (
          <View style={styles.grid}>
            {visibleProducts.map(p => (
              <View style={styles.gridItem} key={p._id}>
                <ProductCard
                  product={p}
                  onPress={() => navigation.navigate('ProductDetail', { product: p })}
                />
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.about}>
        <Text style={type.eyebrow}>Sobre ENCOM</Text>
        <Text style={styles.aboutTitle}>Empresa salvadoreña de tecnología</Text>
        <Text style={styles.aboutText}>
          Ofrecemos innovación, eficiencia y precios competitivos para mejorar la vida
          diaria de nuestros clientes en El Salvador y Centroamérica.
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  hero: {
    backgroundColor: colors.ink,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
  },
  heroEyebrow: {
    fontFamily: font.bold,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.signal,
    marginBottom: spacing.sm,
  },
  heroTitle: { fontFamily: font.extrabold, fontSize: 27, lineHeight: 33, color: colors.textOnInk, marginBottom: 10 },
  heroSub: { fontFamily: font.regular, fontSize: 13.5, lineHeight: 20, color: colors.textOnInkMuted, marginBottom: spacing.xl },
  heroBtn: { alignSelf: 'flex-start', paddingHorizontal: spacing.xl },
  featuresBar: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  featureRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  featureDivider: { width: 1, height: 20, backgroundColor: colors.divider, marginHorizontal: spacing.sm },
  featureItem: { flexDirection: 'row', alignItems: 'center', gap: 6, flexShrink: 1 },
  featureLabel: { fontFamily: font.medium, fontSize: 10.5, color: colors.textMuted, flexShrink: 1 },
  section: { padding: spacing.lg },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing.lg,
  },
  sectionTitle: { fontFamily: font.extrabold, fontSize: 21, color: colors.text, marginTop: 2 },
  viewAllBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingBottom: 3 },
  viewAll: { fontFamily: font.bold, fontSize: 12.5, color: colors.action },
  tabsRow: { marginBottom: spacing.lg },
  tabBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
  },
  tabBtnActive: { backgroundColor: colors.action, borderColor: colors.action },
  tabBtnText: { fontFamily: font.medium, fontSize: 12, color: colors.textMuted },
  tabBtnTextActive: { color: '#fff', fontFamily: font.bold },
  msg: { fontFamily: font.medium, textAlign: 'center', color: colors.textMuted, paddingVertical: spacing.xl },
  msgError: { color: colors.danger },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  gridItem: { width: '47.5%' },
  about: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  aboutTitle: { fontFamily: font.bold, fontSize: 16, color: colors.text, marginTop: 6, marginBottom: 8 },
  aboutText: { fontFamily: font.regular, fontSize: 13, color: colors.textMuted, lineHeight: 20 },
})
