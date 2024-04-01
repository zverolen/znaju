import { useAppDispatch } from "../../app/hooks"

interface AccountDetailsProps {
  email: string;
}

const AccountDetails = ({email}: AccountDetailsProps) => {
  return (
    <div>
      <p>{`Ваша электронная почта ${email}`}</p>
      <div>
        <button type="button">Изменить данные</button>
        <button type="button">Выйти</button>
      </div>
    </div>
  )
}

export default AccountDetails