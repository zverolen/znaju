import { useState } from "react"

import type { AccountStatus } from '../../types/types'

const Account = () => {
  const [ accountStatus, setAccountStatus ] = useState<AccountStatus>('loggedIn')
  const userName: string = 'zverolen'
  const email: string = 'zverolendeveloper@gmail.com'
  return (
    <>
      <h3>{`Аккаунт ${userName}`}</h3>
      <button>Изменить данные</button>
      <button>Выйти</button>
    </>
  )
}

export default Account