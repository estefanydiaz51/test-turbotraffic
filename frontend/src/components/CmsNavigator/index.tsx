import { styled, Theme, CSSObject } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import {
  Dashboard as DashboardIcon, 
  AdminPanelSettings as Admin,
  LogoutOutlined
} from '@mui/icons-material'
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Drawer as MuiDrawer
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from "next/navigation"



const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);




type NavigatorProps = {
  children: React.ReactNode
}

function CmsNavigator({children } : NavigatorProps) {
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState<any>({});
  const route = useRouter()
  const menuItems = [
    {
      title: 'My Dashboard',
      icon: <DashboardIcon />,
      route: '/dashboard'
    },
  {
      title: 'Admin',
      icon: <Admin />,
      route: '/dashboard/admin'
    },
  ]
  useEffect(() => {
    const user = localStorage.getItem('auth')
    const userPaser = user ? JSON.parse( user): {}
    setUser(userPaser)
  }, [])
  

  const handleDrawerOpenClose = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('auth')
    route.push('/login')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed" open={open}
      >
        <Toolbar 
          sx={{ 
            backgroundColor: '#072448',
            color: '#fff',
            fontWeight: 500
          }}>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: '#072448',
            justifyContent: 'space-between',
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 'auto',
              boxSizing: 'border-box'}
            }
        }}
        variant="permanent"
        open={open}
      >
        
        <List
          sx={{
            pt: 0
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 100,
              backgroundColor:'#031B37',
              px: 2.5
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                backgroundColor:'#031B37',
                pb: 1.6,
                
              }}
            >
              <Typography variant='h4' color='#ffffff'>
                Bienvenido 
              </Typography>
              <Typography variant='body1' color='#ffffff'>
                { user.name}
              </Typography>
            </Box>
          </Box>
          {
            menuItems.filter(item => {
              if(user.role !== 'admin'){
                return item.title !== 'Admin' 
              }else{
                return item
              }
            }).map((item) => (
              <Link key={item.title} href={item.route} 
                  style={{
                    textDecoration: 'none'
                  }}
                >
                  <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                        color: '#FFFFFF'
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                          color: '#E0EAF8'
                        }}
                      >
                        { item.icon }
                      </ListItemIcon>
                      <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>
                </Link> 
              ))}
            </List>
          <Box 
            sx={{ 
              backgroundColor: '#072448',
              minHeight: 0,
            }}
          >
            <Box
              sx={{ 
                display: 'flex',
                backgroundColor: '#031B37',
                justifyContent: 'center',
                padding: '5px'
              }} 
            >
              <IconButton 
                sx={{ 
                  color: '#E0EAF8',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(116, 191, 255, 0.08)',
                  fontSize: '1.2rem',
                  opacity: 0.8,
                  ...(!open && { display: 'none'})
                }}
                onClick={handleLogout}
              >
                <LogoutOutlined />
                <Typography
                  sx={{
                    marginLeft: '5px'
                  }}
                >
                  Cerrar sesión
                </Typography>
              </IconButton>
            </Box>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        { children }
      </Box>
    </Box>
  );
}

export default CmsNavigator