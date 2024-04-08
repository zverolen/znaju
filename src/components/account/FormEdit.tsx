import { useState } from "react"
import { useAppDispatch } from "../../app/hooks"

import { edit } from "../../features/user/userSlice"

interface FormEditProps {
  onEditCancel: () => void;
}

const FormEdit = ({ onEditCancel }: FormEditProps) => {

  const [ userName, setUserName ] = useState<string>('')
  const [ email, setEmail ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')

  const dispatch = useAppDispatch()

  function handleSubmit(event: React.PointerEvent<HTMLButtonElement>) {
    event.preventDefault()
    dispatch(edit({userName: userName, email: email, password: password}))
    onEditCancel()
  }

  function handleUserNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserName(event.target.value)
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  function handleCancel() {
    onEditCancel()
  }

  return (
    <form>
      <p>Новые данные</p>
      <p>Введите данные, которые хотите изменить</p>
      <div>
        <label htmlFor="usernameNew">Новое имя пользователя</label>
        <input onChange={handleUserNameChange} value={userName} type="text" id="usernameNew" />
      </div>
      <div>
        <label htmlFor="emailNew">Новый email</label>
        <input onChange={handleEmailChange} value={email} type="email" id="emailNew"/>
      </div>
      <div>
        <label htmlFor="passwordNew">Новый пароль</label>
        <input onChange={handlePasswordChange} value={password} type="password" id="passwordNew"/>
      </div>
      <button onClick={handleSubmit} id="submitChange" type="submit">Сохранить</button>
      <button onClick={handleCancel} id="cancelChange" type="button">Отменить</button>
    </form>
  )
}

export default FormEdit