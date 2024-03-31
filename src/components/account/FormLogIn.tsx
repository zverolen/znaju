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

  function handleSubmit(event: React.ChangeEvent<HTMLButtonElement>) {
    event.preventDefault()
    dispatch(logIn())
  }

  return (
    <form>
      <div>
        <label htmlFor="username">Почта или имя пользователя</label>
        <input value={userName} type="text" id="username" required />
      </div>
      <div>
        <label htmlFor="password">Пароль</label>
        <input value={password} type="password" id="password" required />
      </div>
      <button onClick={isValid && handleSubmit} id="submitLogin" type="submit">Войти</button>
      <button id="cancelLogin" type="button">Отменить</button>
    </form>
  )
}

export default FormLogIn