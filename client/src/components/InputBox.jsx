export const InputBox = ({ inputLabel, inputType, placeholder, onChange }) => {
    return <div className="flex flex-col border border-red-500">
        <label>{inputLabel}</label>
        <input type={inputType} placeholder={placeholder} className="" onChange={onChange} />
    </div>
}