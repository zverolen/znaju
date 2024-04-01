import { useState } from "react"

import type { UserStatus } from '../../types/types'
import { useAppSelector, useAppDispatch } from '../../app/hooks'

import { selectUserStatus, selectUserName, selectEmail } from "../../features/user/userSlice"

import FormLogIn from "./FormLogIn"
import AccountDetails from "./AccountDetails"
import FormEdit from "./FormEdit"

const Account = () => {
  // --> Probably will be moved to the root or in the root there will be the request, most likely
  const userStatus = useAppSelector(selectUserStatus)
  const userName = useAppSelector(selectUserName)
  const userEmail = useAppSelector(selectEmail)

  let accountContent!: JSX.Element
  let accountHeading!: string;

  if (userStatus === 'loggedOut') {
    accountContent = <FormLogIn />
    accountHeading = "Войдите в свой аккаунт"
  } else if (userStatus === 'loggedIn') {
    accountContent = <AccountDetails email={userEmail} />
    accountHeading = `Добро дошли, ${userName}!`
  } else {
    accountContent = <FormEdit />
    accountHeading = 'Изменение данных'
  }

  return (
    <>
      <h3>{accountHeading}</h3>
      {accountContent}
    </>
  )
}

export default Account