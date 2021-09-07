import Auth from '@aws-amplify/auth'

export const deleteProfileAPI = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser()
    await user.deleteUser()
    Auth.signOut()
  } catch (error) {
    console.error(error)
    throw error
  }
}
