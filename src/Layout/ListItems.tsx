import * as React from 'react'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import DashboardIcon from '@mui/icons-material/Dashboard'

import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ListItemButton } from './styles'

type memuListProps = Array<{
  path: string
  href: string
  component: React.ReactNode
  title: string
}>

const memuList: memuListProps = [
  {
    path: '/company',
    href: '/panel/company',
    component: <DashboardIcon />,
    title: 'Empresas',
  },
  {
    path: '/service-schedules',
    href: '/panel/service-schedules/list',
    component: <AccessTimeFilledOutlinedIcon />,
    title: 'Agendamento',
  },
  {
    path: '/checklist',
    href: '/checklist/10',
    component: <AccessTimeFilledOutlinedIcon />,
    title: 'Checklist',
  },
]

export const MainListItems = ({ opended }: { opended: boolean }) => {
  const [routeActual, setRouteActual] = useState('')
  const router = useRouter()
  // console.log('aberto',opended)
  useEffect(() => {
    setRouteActual(router.pathname)
  }, [router])

  return (
    <React.Fragment>
      {memuList.map((menu, index) => {
        return (
          <Link href={menu.href} key={index} style={{ textDecoration: 'none' }}>
            <ListItemButton
              selected={routeActual.includes(menu.path)}
              sx={{
                ...(opended && { margin: '10px 20px' }),
              }}
            >
              <ListItemIcon>{menu.component}</ListItemIcon>
              <ListItemText primary={menu.title} style={{ color: 'white' }} />
            </ListItemButton>
          </Link>
        )
      })}
    </React.Fragment>
  )
}

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset></ListSubheader>
    <ListItemButton onClick={() => signOut({ callbackUrl: '/' })}>
      <ListItemIcon>
        <ExitToAppOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItemButton>
  </React.Fragment>
)
