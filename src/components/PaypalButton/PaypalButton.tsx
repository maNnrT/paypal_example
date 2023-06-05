import { useEffect } from 'react';
import {
	PayPalButtons,
	usePayPalScriptReducer,
} from '@paypal/react-paypal-js';

// This values are the props in the UI

interface Props {
	currency: string;
	showSpinner: boolean;
	amount: string;
}
// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({
	currency,
	showSpinner,
	amount,
}: Props) => {
	// usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
	// This is the main reason to wrap the PayPalButtons in a new component
	const [{ options, isPending }, dispatch] =
		usePayPalScriptReducer();

	useEffect(() => {
		dispatch({
			type: 'resetOptions',
			value: {
				...options,
				currency: currency,
			},
		});
	}, [currency, showSpinner]);
	const serverURL = 'http://localhost:8888';

	return (
		<>
			{showSpinner && isPending && <div className="spinner" />}
			<PayPalButtons
				style={{
					color: 'blue',
					layout: 'vertical',
					shape: 'rect',
					label: 'paypal',
				}}
				disabled={false}
				forceReRender={[
					amount,
					currency,
					{
						color: 'blue',
						layout: 'vertical',
						shape: 'rect',
						label: 'paypal',
					},
				]}
				fundingSource={undefined}
				createOrder={(data, actions) => {
					// return actions.order
					// 	.create({
					// 		purchase_units: [
					// 			{
					// 				amount: {
					// 					currency_code: currency,
					// 					value: amount,
					// 				},
					// 			},
					// 		],
					// 	})
					// 	.then((orderId) => {
					// 		// Your code here after create the order
					// 		return orderId;
					// 	});
					return fetch(
						`${serverURL}/my-server/create-paypal-order`,
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							// use the "body" param to optionally pass additional order information
							// like product skus and quantities
							body: JSON.stringify({
								product: {
									description: 'Sweet Candy',
									cost: amount,
								},
							}),
						}
					)
						.then((response) => response.json())
						.then((order) => order.id);
				}}
				onApprove={function (data, actions) {
					// return actions.order?.capture().then(function (detail) {
					// 	// Your code here after capture the order
					// 	alert(`Transaction by ${detail?.payer.name}`);
					// });
					return fetch(
						`${serverURL}/my-server/capture-paypal-order`,
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								orderID: data.orderID,
							}),
						}
					).then((response) => {
						console.log('Payment successfull');
						return response.json();
					}).then(data=>console.log(data))
				}}
				onError={() => {
					alert('Error had occured');
				}}
			/>
		</>
	);
};
export default ButtonWrapper;
