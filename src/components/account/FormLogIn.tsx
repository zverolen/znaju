import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logIn, selectUserName, selectEmail, selectPassword, tempSignUp } from "../../features/user/userSlice"

const FormLogIn = () => {
  // Live-change the input type to email if emal is being entered?
  // Hard-code login and password or do something similar to force the demo account, fake email

  const savedUserName = useAppSelector(selectUserName)
  const savedEmail = useAppSelector(selectEmail)
  const savedPassword = useAppSelector(selectPassword)

  const [ userName, setUserName ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')

  const dispatch = useAppDispatch()

  function handleSubmit(event: React.PointerEvent<HTMLButtonElement>) {
    event.preventDefault()

    const isUsernameValid: boolean = userName === savedUserName || userName === savedEmail
    if (!isUsernameValid) {
      alert('Temp error: Wrong username (should be zverolen or zverolendeveloper@gmail.com')
      return
    }

    const isPasswordValid: boolean = password === savedPassword
    if (!isPasswordValid) {
      alert('Temp error: Wrong password (should be temppassword')
      return
    }

    dispatch(logIn())
    dispatch(tempSignUp())
  }

  function handleUserNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserName(event.target.value)
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  return (
    <form>
      <div>
        <label htmlFor="username">Почта или имя пользователя</label>
        <input onChange={handleUserNameChange} value={userName} type="text" id="username" required />
      </div>
      <div>
        <label htmlFor="password">Пароль</label>
        <input onChange={handlePasswordChange} value={password} type="password" id="password" required />
      </div>
      <button onClick={handleSubmit} id="submitLogin" type="submit">Войти</button>
    </form>
  )
}

export default FormLogIn