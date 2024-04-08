import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks'
import { logOut } from "../../features/user/userSlice"
import FormEdit from './FormEdit';

interface AccountDetailsProps {
  email: string;
  userName: string;
  showEditForm?: () => void;
}

const AccountDetails = ({ email, userName }: AccountDetailsProps) => {

  const [ isEditing, setIsEditing ] = useState(false)

  const dispatch = useAppDispatch()

  function handleLogOut() {
    dispatch(logOut())
  }

  function handleEdit() {
    setIsEditing(!isEditing)
  }

  return (
    <>
      <div>
        <p>Ваши данные:</p>
        <p>{`Имя пользователя: ${userName}`}</p>
        <p>{`Email: ${email}`}</p>
        <div>
          {!isEditing && <button onClick={handleEdit} type="button">Изменить данные</button>}
          <button onClick={handleLogOut} type="button">Выйти</button>
        </div>
      </div>
      {isEditing && <FormEdit onEditCancel={handleEdit} />}
    </> 
  )
}

export default AccountDetails