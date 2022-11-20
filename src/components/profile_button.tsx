import { useContext, useRef, useEffect, useState, KeyboardEvent, Fragment } from 'react';
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import { Button, Menu } from '@ui';

const WalletConnected = ({ currentAccount }: { currentAccount: `0x${string}` }) => {
  const { disconnect } = useDisconnect()

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
        onClick: () => disconnect(),
      }
    ]
  ]

  const Logout = () => {
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
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  const onBtnClick = async () => {
    connect()
  }

  return (
    <div>
      {
        (isConnected && address) ?
          <WalletConnected currentAccount={address} /> :
          <Button onClick={onBtnClick}> Connect </Button>
      }
    </div>
  )
}

export default ProfileButton;