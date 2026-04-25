import './FormField.css'

export default function FormField({ label, name, value, onChange, type = 'text', placeholder, children }) {
  return (
    <div className="pub-field">
      <label>{label}</label>
      {children ?? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  )
}
