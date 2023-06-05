import { useState } from 'react';
import Input from './components/Input/Input';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import ButtonWrapper from './components/PaypalButton/PaypalButton';
const amount = '2';
const currency = 'USD';
export default function App() {
	const [price, setPrice] = useState('');

	return (
		<div style={{ maxWidth: '750px', minHeight: '200px' }}>
			<Input
				price={price}
				setPrice={setPrice}
			/>
			<PayPalScriptProvider
				options={{
					'client-id':
						'Afib2yY9q3H2qlaQVfkRkYVwV-uKfxr2FCFhqgz0Jdlp3AgVBMziaRr_19RwjHiAPuYasfloGtAt0l1w',
					components: 'buttons',
					currency: 'USD',
					intent:'capture'
				}}
			>
				<ButtonWrapper
					currency={currency}
					showSpinner={false}
					amount={price.toString()}
				/>
			</PayPalScriptProvider>
		</div>
	);
}
