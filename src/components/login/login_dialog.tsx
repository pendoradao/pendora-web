import { Modal } from '@components/ui';
import Login from '@components/login';

interface DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const LoginDialog = ({ open, setOpen }: DialogProps) => {
  return (
    <Modal
      title="Login"
      open={open}
      setOpen={setOpen}
      className='w-full md:w-1/4 '
    >
      <Login />
    </Modal>
  )
}

export default LoginDialog;