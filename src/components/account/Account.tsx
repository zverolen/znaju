import { useState } from "react"

import type { UserStatus } from '../../types/types'
import { useAppSelector, useAppDispatch } from '../../app/hooks'

import { selectUserStatus } from "../../features/user/userSlice"

import FormLogIn from "./FormLogIn"

const Account = () => {
  const [ accountStatus, setAccountStatus ] = useState<UserStatus>('loggedIn')
  const userName: string = 'zverolen'
  const email: string = 'zverolendeveloper@gmail.com'

  // --> Probably will be moved to the root or in the root there will be the request, most likely
  const userStatus = useAppSelector(selectUserStatus)

  let accountContent!: JSX.Element
  let accountHeading!: string;

  if (userStatus === 'loggedOut') {
    // Show the log in form
    accountContent = <FormLogIn />
    accountHeading = "Войдите в свой аккаунт"
  } else if (userStatus === 'loggedIn') {
    // Show the user info and Edit and Log Out button
  } else {
    // Show edit form
  }

  return (
    <>
      <h3>{accountHeading}</h3>
      {accountContent}
    </>
  )
}

export default Account