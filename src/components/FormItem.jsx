export const FormItem = ({ title, label, children }) => {
    return <>
                <div className="form-group">
                    <label htmlFor={label}>{title}</label>
                    {children}
                </div>
    </>
}