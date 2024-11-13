const TextInput = ( {label, placeholder, value, setValue} ) => {
    return <div className="flex flex-col w-1/2 m-3">
        <input type="text" placeholder={placeholder}className="p-2  border border-white rounded bg-transparent placeholder-white text-white outline-none" value={value} onChange={(e) => {setValue(e.target.value)}} />
    </div>;    
};

export default TextInput;