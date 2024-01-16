/*
 * Copyright (C) 2023 Frachtwerk GmbH, Leopoldstraße 7C, 76133 Karlsruhe.
 *
 * This file is part of Essencium Frontend.
 *
 * Essencium Frontend is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Essencium Frontend is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Essencium Frontend. If not, see <http://www.gnu.org/licenses/>.
 */

import { FeedBackWidget, Home } from '@frachtwerk/essencium-lib'
import { useAtomValue } from 'jotai'
import { ReactElement } from 'react'

import { userAtom } from '@/api'
import { useCreateFeedback } from '@/api/feedback'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import { getTranslation } from '@/utils'
import { baseGetServerSideProps } from '@/utils/next'

function HomeView(): JSX.Element {
  const user = useAtomValue(userAtom)

  const {
    mutate: createFeedback,
    isSuccess: feedbackCreated,
    isError: feedbackFailed,
    isLoading: feedbackSending,
  } = useCreateFeedback()

  return (
    <>
      <Home />

      <FeedBackWidget
        currentUser={user}
        createFeedback={createFeedback}
        feedbackCreated={feedbackCreated}
        feedbackFailed={feedbackFailed}
        feedbackSending={feedbackSending}
      />
    </>
  )
}

HomeView.getLayout = function getLayout(
  page: ReactElement,
  version?: string,
): JSX.Element {
  return (
    <AuthLayout
      routeName={getTranslation('navigation.home.label')}
      version={version}
    >
      {page}
    </AuthLayout>
  )
}

export default HomeView

export const getServerSideProps = baseGetServerSideProps()
