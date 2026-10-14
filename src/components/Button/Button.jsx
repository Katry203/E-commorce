export default function Button({ children, className, disabled, onClick, type = 'submit', ...props }) {
    return (
        <button {...props} className={` ${className}`} onClick={onClick} disabled={disabled} type={type}
        >{children}</button>
    )
}
