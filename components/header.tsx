import Link from 'next/link';
import { Toolbar, Button, Box, Typography } from '@mui/material';

import styles from '../styles/Home.module.css'


const NavTabs = [
  {
    name: 'Docmentations',
    to: '/docs',
  },
  {
    name: 'Dashboard',
    to: '/dashboard',
  },
  {
    name: 'FAQ',
    to: '/faq',
  },
]

const Header = () => {
  return (
    <header className={styles.header}>
      <Box>
        <Toolbar sx={{
          borderBottom: 1,
          borderColor: 'divider',
        }}>
          <Link href="/" >
            <h3>
              Pendora
            </h3>
          </Link>
          <Box sx={{ flex: 1 }} />

          {
            NavTabs.map(x => {
              return (
                <Typography variant="subtitle1" key={x.name} sx={{
                  marginRight: 4,
                }}>
                  <Link href={x.to} >{x.name}</Link>
                </Typography>
              )
            })
          }

          <Button variant='outlined' onClick={() => {}} > connect </Button>

        </Toolbar>
      </Box>
    </header>
  );
}

export default Header;