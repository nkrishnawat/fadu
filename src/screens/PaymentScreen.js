import { CardField, useConfirmPayment, useStripe, BillingDetails, Address } from '@stripe/stripe-react-native';
import { Button, Text, View, Image, useState } from "react-native";

function PaymentScreen() {

    const { confirmPayment, loading } = useConfirmPayment();
    const [billingDetails, setBillingDetails] = useState(new BillingDetails("", "", "", new Address("", "", "", "", "", "")));


    const fetchPaymentIntentClientSecret = async () => {
        const response = await fetch(`${API_URL}/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currency: 'usd',
            }),
        });
        const { clientSecret } = await response.json();

        return clientSecret;
    };

const handlePayPress = async () => {

    // Fetch the intent client secret from the backend
    const clientSecret = await fetchPaymentIntentClientSecret();

    // Confirm the payment with the card details
    const {paymentIntent, error} = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails,
      },
    });

    if (error) {
      console.log('Payment confirmation error', error);
    } else if (paymentIntent) {
      console.log('Success from promise', paymentIntent);
    }
  };

    return (
        <View>

            <CardField
                postalCodeEnabled={true}
                placeholders={{
                    number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                    backgroundColor: '#FFFFFF',
                    textColor: '#000000',
                }}
                style={{
                    width: '100%',
                    height: 50,
                    marginVertical: 30,
                }}
                onCardChange={(cardDetails) => {
                    console.log('cardDetails', cardDetails);
                }}
                onFocus={(focusedField) => {
                    console.log('focusField', focusedField);
                }}
            />

            <TextInput
                    placeholder="Name"
                    value={billingDetails.name}
                    onChangeText={(name) =>
                    setBillingDetails((prevDetails) => ({ ...prevDetails, name }))
                    }
                />
                <TextInput
                    placeholder="Address"
                    value={billingDetails.address}
                    onChangeText={(address) =>
                    setBillingDetails((prevDetails) => ({ ...prevDetails, address }))
                    }
                />


            <CardField
                onCardChange={(cardDetails) => console.log('cardDetails', cardDetails)} />
            <Button onPress={handlePayPress} title="Pay" disabled={loading} />
        </View>
    );
}

export default PaymentScreen;