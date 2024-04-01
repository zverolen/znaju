import { useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { logIn } from "../../features/user/userSlice"

const FormLogIn = () => {
  // Live-change the input type to email if emal is being entered?
  // Hard-code login and password or do something similar to force the demo account, fake email
  // What happens on pressing cancel?

  const [ userName, setUserName ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')

  const dispatch = useAppDispatch()

  function handleSubmit(event: React.PointerEvent<HTMLButtonElement>) {
    event.preventDefault()

    const isUsernameValid: boolean = userName === 'zverolen' || userName === 'zverolendeveloper@gmail.com'
    if (!isUsernameValid) {
      alert('Temp error: Wrong username (should be zverolen or zverolendeveloper@gmail.com')
      return
    }

    const isPasswordValid: boolean = password === 'temppassword'
    if (!isPasswordValid) {
      alert('Temp error: Wrong password (should be temppassword')
      return
    }

    dispatch(logIn())
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
      <button id="cancelLogin" type="button">Отменить</button>
    </form>
  )
}

export default FormLogIn