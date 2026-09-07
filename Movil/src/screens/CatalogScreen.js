import { useState } from 'react'
import { FlatList, StyleSheet, Text, View, Pressable } from 'react-native'
import { useProducts } from '../hooks/useProducts'
import { useCategories } from '../hooks/useCategories'
import ProductCard from '../components/ProductCard'
import { colors, font, radius, spacing, type } from '../theme/colors'

export default function CatalogScreen({ navigation }) {
  const { products, loading, error } = useProducts()
  const { categories } = useCategories()
  const [activeCat, setActiveCat] = useState('todos')

  const filtered = activeCat === 'todos'
    ? products
    : products.filter(p => p.category_id?._id === activeCat)

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={type.eyebrow}>Explora</Text>
        <Text style={styles.title}>Catálogo</Text>
      </View>

      <FlatList
        data={['todos', ...categories.map(c => c._id)]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        style={styles.filters}
        contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: spacing.sm }}
        renderItem={({ item }) => {
          const label = item === 'todos' ? 'Todos' : categories.find(c => c._id === item)?.name
          const active = activeCat === item
          return (
            <Pressable
              onPress={() => setActiveCat(item)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
            </Pressable>
          )
        }}
      />

      {loading && <Text style={styles.msg}>Cargando productos...</Text>}
      {error && !loading && <Text style={[styles.msg, styles.msgError]}>{error}</Text>}
      {!loading && !error && filtered.length === 0 && (
        <Text style={styles.msg}>No hay productos disponibles.</Text>
      )}

      {!loading && !error && filtered.length > 0 && (
        <FlatList
          data={filtered}
          keyExtractor={item => item._id}
          numColumns={2}
          columnWrapperStyle={{ gap: spacing.md }}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => (
            <View style={styles.gridItem}>
              <ProductCard
                product={item}
                onPress={() => navigation.navigate('ProductDetail', { product: item })}
              />
            </View>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, marginBottom: spacing.md },
  title: { fontFamily: font.extrabold, fontSize: 24, color: colors.text, marginTop: 2, marginBottom: spacing.md },
  filters: { flexGrow: 0, marginBottom: spacing.md },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.action, borderColor: colors.action },
  chipText: { fontFamily: font.medium, fontSize: 12, color: colors.textMuted },
  chipTextActive: { color: '#fff', fontFamily: font.bold },
  msg: { fontFamily: font.medium, textAlign: 'center', color: colors.textMuted, paddingVertical: spacing.xl },
  msgError: { color: colors.danger },
  grid: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, gap: spacing.md },
  gridItem: { flex: 1 },
})
