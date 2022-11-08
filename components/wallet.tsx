import { useContext, useRef, useEffect, useState, KeyboardEvent } from 'react';

import { Button, Box, Popper, Grow, ClickAwayListener, MenuItem, MenuList, Paper } from '@mui/material';
import { connectWallet } from "../lib/eth";

import { etherContext } from '../hooks/useeth';

const WalletConnected = ({ currentAccount }: { currentAccount: string }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const prevOpen = useRef(open);
  const { setCurrentAccount } = useContext(etherContext);


  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const Logout = () => {
    setCurrentAccount && setCurrentAccount('');
  }

  return (
    <div>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        variant='outlined'
        onClick={handleToggle}
      >
        {`${currentAccount.slice(0, 5)}...${currentAccount.slice(38)}`}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={Logout}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

const Wallet = () => {
  const { currentAccount, setCurrentAccount } = useContext(etherContext);

  const onBtnClick = async () => {
    await connectWallet(setCurrentAccount);
  }

  return (
    <Box sx={{ display: 'inline-block' }}>
      {
        (currentAccount && setCurrentAccount) ?
          <WalletConnected currentAccount={currentAccount} /> :
          <Button variant='contained' onClick={onBtnClick} > connect </Button>
      }
    </Box>
  )
}

export default Wallet;