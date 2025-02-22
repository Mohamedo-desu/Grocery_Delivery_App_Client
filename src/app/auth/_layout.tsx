import { Stack } from 'expo-router'
const AuthLayout = () => {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="customer_login"
				options={{
					animation: 'fade',
				}}
			/>
			<Stack.Screen
				name="delivery_login"
				options={{
					animation: 'fade',
				}}
			/>
		</Stack>
	)
}
export default AuthLayout
