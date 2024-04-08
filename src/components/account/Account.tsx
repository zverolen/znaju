import { useAppSelector } from '../../app/hooks'

import { selectUserStatus, selectUserName, selectEmail } from "../../features/user/userSlice"

import FormLogIn from "./FormLogIn"
import AccountDetails from "./AccountDetails"

const Account = () => {
  // --> Probably will be moved to the root or in the root there will be the request, most likely
  const isLoggedIn = useAppSelector(selectUserStatus)
  const userName = useAppSelector(selectUserName)
  const userEmail = useAppSelector(selectEmail)

  let accountContent!: JSX.Element
  let accountHeading!: string;

  if (!isLoggedIn) {
    accountContent = <FormLogIn />
    accountHeading = "Войдите в свой аккаунт"
  } else {
    accountContent = <AccountDetails email={userEmail} userName={userName} />
    accountHeading = `Добро дошли, ${userName}!`
  }

  return (
    <>
      <h3>{accountHeading}</h3>
      {accountContent}
    </>
  )
}

export default Account