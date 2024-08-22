import { Stack } from 'expo-router'

const OnboardingLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}

export default OnboardingLayout
