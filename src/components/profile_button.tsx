import { useContext, useRef, useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import { Button, Menu } from '@components/ui';
import { getChallengeText, useLogin } from '@lib/auth';
import { UserContext } from '@context/app';

const WalletConnected = ({ currentAccount }: { currentAccount: `0x${string}` }) => {
  const { disconnect } = useDisconnect()
  const { setToken }  = useContext(UserContext)

  const menuItems = [
    [
      {
        label: 'Profile',
        onClick: () => console.log('Profile'),
      },
      {
        label: 'Dashboard',
        onClick: () => console.log('Dashboard'),
      }
    ],
    [
      {
        label: 'Logout',
        onClick: () => Logout(),
      }
    ]
  ]

  const Logout = () => {
    setToken && setToken('')
    disconnect()
  }

  return (
    <Menu items={menuItems}>
      {`${currentAccount.slice(0, 5)}...${currentAccount.slice(38)}`}
    </Menu>
  )
}

const ProfileButton = () => {
  const { address, isConnected } = useAccount()
  const  { token, setToken }  = useContext(UserContext)
  const [challengeText, setChallengeText] = useState<string>('')
  const { login } = useLogin({
    address: address,
    challengeText: challengeText, 
    handleGetToken: (token: string) => {setToken && setToken(token)}
  })

  useEffect(() => {
    if (address) {
      getChallengeText(address).then((challengeText) => {
        setChallengeText(challengeText)
      })
    }
  }, [address])

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  const onLogin = async () => {
    login()
  }

  return (
    <div>
      {(isConnected && address) ? (
        token ? <WalletConnected currentAccount={address} /> : <Button onClick={onLogin}> Login </Button>
      ) :
        <Button onClick={() => connect()}> Connect </Button>
      }
    </div>
  )
}

export default ProfileButton;