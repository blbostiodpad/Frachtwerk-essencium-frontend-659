import { SetPassword } from '@frachtwerk/essencium-lib'
import {
  resetPasswordSchema,
  RIGHTS,
  UserOutput,
} from '@frachtwerk/essencium-types'
import { RootRoute, Route, Router } from '@tanstack/react-router'

import { layoutRouteAppShell, layoutRouteLogin } from '@/router/layouts'
import { ContactView } from '@/views/ContactView'
import { HomeView } from '@/views/HomeView'
import { LoginView } from '@/views/LoginView'
import { ProfileView } from '@/views/ProfileView'
import { RightsView } from '@/views/RightsView'
import { RolesView } from '@/views/RolesView'
import { SetPasswordView } from '@/views/SetPasswordView/SetPasswordView'
import { TranslationsView } from '@/views/TranslationsView/TranslationsView'
import { AddUserView } from '@/views/UsersView/AddUserView'
import { UpdateUserView } from '@/views/UsersView/UpdateUserView'
import { UsersView } from '@/views/UsersView/UsersView'

function checkRightAndRedirect(router: Router, requiredRights: RIGHTS[]): void {
  const user: UserOutput = JSON.parse(localStorage.getItem('user') as string)

  if (
    !requiredRights.every(right =>
      user?.role.rights.map(userRight => userRight.name).includes(right)
    )
  ) {
    router.navigate({ to: `/` })
  }
}

export const rootRoute = new RootRoute()

export const indexRoute = new Route({
  getParentRoute: () => layoutRouteAppShell,
  path: '/',
  component: HomeView,
})

export const setPasswordRoute = new Route({
  getParentRoute: () => layoutRouteLogin,
  path: 'setPassword',
  component: SetPasswordView,
  validateSearch: search => resetTokenSchema.parse(search),
})

export const loginRoute = new Route({
  getParentRoute: () => layoutRouteLogin,
  path: 'login',
  component: LoginView,
})

export const contactRoute = new Route({
  getParentRoute: () => layoutRouteAppShell,
  path: 'contact',
  component: ContactView,
})

export const profileRoute = new Route({
  getParentRoute: () => layoutRouteAppShell,
  path: 'profile',
  component: ProfileView,
})

export const usersRoute = new Route({
  getParentRoute: () => layoutRouteAppShell,
  path: 'users',
})

export const userIndexRoute = new Route({
  getParentRoute: () => usersRoute,
  path: '/',
  component: UsersView,
  beforeLoad: ({ router }) => checkRightAndRedirect(router, [RIGHTS.USER_READ]),
})

export const addUserRoute = new Route({
  getParentRoute: () => usersRoute,
  path: 'add',
  component: AddUserView,
  beforeLoad: ({ router }) =>
    checkRightAndRedirect(router, [RIGHTS.USER_CREATE]),
})

export const updateUserRoute = new Route({
  getParentRoute: () => usersRoute,
  path: '$userId',
  component: UpdateUserView,
  beforeLoad: ({ router }) =>
    checkRightAndRedirect(router, [RIGHTS.USER_UPDATE]),
})

export const rightsRoute = new Route({
  getParentRoute: () => layoutRouteAppShell,
  path: 'rights',
  component: RightsView,
  beforeLoad: ({ router }) =>
    checkRightAndRedirect(router, [RIGHTS.RIGHT_READ, RIGHTS.ROLE_READ]),
})

export const rolesRoute = new Route({
  getParentRoute: () => layoutRouteAppShell,
  path: 'roles',
  component: RolesView,
  beforeLoad: ({ router }) =>
    checkRightAndRedirect(router, [RIGHTS.ROLE_READ, RIGHTS.RIGHT_READ]),
})

export const translationsRoute = new Route({
  getParentRoute: () => layoutRouteAppShell,
  path: 'translations',
  component: TranslationsView,
  beforeLoad: ({ router }) =>
    checkRightAndRedirect(router, [RIGHTS.TRANSLATION_READ]),
})
