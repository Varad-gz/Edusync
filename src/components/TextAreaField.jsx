const TextAreaField = ({
    id,
    label,
    defaultValue = "",
    className = "",
    ...props
}) => {
    return (
        <div className={`my-[20px] ${className}`}>
            <label htmlFor={id}>
                {label}
            </label>
            <textarea
                id={id}
                name={id}
                className="border-[1px] border-gray-200 outline-none px-[10px] py-[5px] rounded-md w-full"
                defaultValue={defaultValue}
                {...props}
            />
        </div>
    );
};

export default TextAreaField;