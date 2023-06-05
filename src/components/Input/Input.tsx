
interface Props{
    price: string
    setPrice:React.Dispatch<React.SetStateAction<string>>
}
function Input({price,setPrice}:Props) {
	return (
		<input
			type="number"
			onChange={(e) => setPrice(e.target.value)}
			value={price}
		/>
	);
}

export default Input;
