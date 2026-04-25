import './FormField.css'

export default function FormField({ label, name, value, onChange, type = 'text', placeholder, required }) {
  return (
    <div className="admin-field">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  )
}
