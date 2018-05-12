function userSigned(user)
{
    return {
        type: 'USER_SIGNED',
        payload: user
    }
}
export default userSigned