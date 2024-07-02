export const SubmitBtn = ({
    label = 'Save',
    icon = 'fa-save',
    loading = false,
}) => {
    return <button type="submit" disabled={loading}>
    <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : icon}`}></i> {label}
  </button>
}