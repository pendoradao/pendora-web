import { useContext, useRef, useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import { Avatar, Button, Menu } from '@components/ui';
import MyProfilesDialog from '@components/profile/my_profiles';
import { getChallengeText, useLogin } from '@lib/auth';
import { UserContext } from '@context/app';
import { Profile } from '@types'

interface IProfileButton {
  // profile: Profile;
  handleOpenMyProfile: () => void;
}

const WalletConnected = (profileButtonProps: IProfileButton) => {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { setToken }  = useContext(UserContext)
  const { handleOpenMyProfile } = profileButtonProps

  const menuItems = [
    [
      {
        label: 'Profile',
        onClick: () => console.log('Profile'),
      },
      {
        label: 'Switch Lens Account',
        onClick: handleOpenMyProfile,
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
      {address && `${address.slice(0, 5)}...${address.slice(38)}`}
    </Menu>
  )
}

const ProfileButton = () => {
  const { address, isConnected, isConnecting } = useAccount()
  const  { token, setToken, profile }  = useContext(UserContext)
  const [challengeText, setChallengeText] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)
  const { login, isLoading } = useLogin({
    address: address,
    challengeText: challengeText, 
    handleGetToken: (token: string) => {setToken && setToken(token)}
  })

  useEffect(() => {
    console.log('address', address)
    if (address) {
      getChallengeText(address).then((challengeText) => {
        setChallengeText(challengeText)
      })
      setIsOpen(true)
    }
  }, [address])

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  const onLogin = async () => {
    login()
  }

  return (
    <>
      {(isConnected && address) ? (
        // token ? <WalletConnected currentAccount={address} /> : <Button onClick={onLogin} loading={isLoading}> Login </Button>
        <WalletConnected handleOpenMyProfile={() => {setIsOpen(true)}} />
        ) :
        <Button onClick={() => connect()} loading={isConnecting}> Connect </Button>
      }
      <MyProfilesDialog isOpen={isOpen} setIsOpen={setIsOpen}/>
      <Avatar avatarUrl={profile?.avatarUrl}></Avatar>
    </>
  )
}

export default ProfileButton;