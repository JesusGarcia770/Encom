import { useProducts } from '../../hooks/useProducts'
import ProductCard from './ProductCard'
import './ProductCatalog.css'

export default function ProductCatalog() {
  const { products, loading, error } = useProducts()

  return (
    <section className="catalog-section">
      <div className="catalog-header">
        <h1 className="catalog-title">Catálogo <span>de productos</span></h1>
      </div>

      {loading && <p className="catalog-msg">Cargando productos...</p>}
      {error && !loading && <p className="catalog-msg catalog-error">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="catalog-msg">No hay productos disponibles.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="catalog-grid">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}
