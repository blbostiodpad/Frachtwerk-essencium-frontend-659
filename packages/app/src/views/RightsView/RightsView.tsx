/* eslint-disable react/no-unstable-nested-components */
import {
  Button,
  Center,
  Checkbox,
  Flex,
  Loader,
  Text,
  Title,
} from '@mantine/core'
import { IconShieldCheckFilled } from '@tabler/icons-react'
import { ColumnDef } from '@tanstack/react-table'
import { HttpNotification, Rights } from 'lib'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { RightOutput, RoleOutput } from 'types'

import { useGetRights } from '@/api/rights'
import { useGetRoles, useUpdateRole, UseUpdateRoleData } from '@/api/roles'

export function RightsView(): JSX.Element {
  const { t } = useTranslation()

  const {
    data: rights,
    isLoading: isLoadingRights,
    isFetching: isFetchingRights,
    isInitialLoading: isInitialLoadingRights,
    isError: isErrorRights,
    error: errorRights,
    refetch: refetchRights,
  } = useGetRights()

  const { data: roles, refetch: refetchRoles } = useGetRoles()

  const handleRefetch = useCallback((): void => {
    refetchRights()
    refetchRoles()
  }, [refetchRights, refetchRoles])

  const { mutate: updateRole } = useUpdateRole()

  const handleUpdateRole = useCallback(
    (data: UseUpdateRoleData): void => {
      updateRole(data, {
        onSuccess: handleRefetch,
      })
    },
    [handleRefetch, updateRole]
  )

  const hasRight = useCallback(
    (rightName: string, roleName: string) => {
      if (!roles?.content) {
        return false
      }

      const matchedRole = roles.content.find(role => role.name === roleName)

      if (!matchedRole)
        throw Error(`Role ${roleName} does not exist in ${roles.content}`)

      return matchedRole.rights.some(right => right.name === rightName)
    },
    [roles?.content]
  )

  // returns rights array for role after activating/deactivating a right
  function getUpdatedRights(
    role: RoleOutput,
    userRight: RightOutput
  ): RightOutput['id'][] {
    const rightToUpdate = role.rights.find(
      right => right.name === userRight.name
    )

    if (rightToUpdate) {
      return role.rights
        .filter(right => right.name !== userRight.name)
        .map(right => right.id)
    }

    return [...role.rights, { name: userRight.name, id: userRight.id }].map(
      right => right.id
    )
  }

  const columns = useMemo<ColumnDef<RightOutput>[]>(() => {
    const roleColumns: ColumnDef<RightOutput>[] = (roles?.content || []).map(
      role => ({
        accessorKey: `${role.name}`,
        header: () => <Text>{t(`rightsView.table.${role.name}`)}</Text>,
        cell: info => {
          const right = info.row.original

          const updatedRole = {
            ...role,
            rights: getUpdatedRights(role, right),
          }

          if (role.name === 'ADMIN') {
            return (
              <Checkbox disabled checked={hasRight(right.name, role.name)} />
            )
          }

          return (
            <Checkbox
              onChange={() =>
                handleUpdateRole({ roleId: updatedRole.id, role: updatedRole })
              }
              checked={hasRight(right.name, role.name)}
            />
          )
        },
      })
    )

    return [
      {
        accessorKey: 'name',
        header: () => <Text>{t('rightsView.table.name')}</Text>,
        cell: info => info.getValue(),
      },
      ...roleColumns,
    ]
  }, [t, hasRight, handleUpdateRole, roles?.content])

  return (
    <>
      <HttpNotification
        isLoading={isFetchingRights && !isInitialLoadingRights}
        isError={isErrorRights}
        errorTitle={`Error ${
          errorRights?.response?.status
            ? `(${errorRights?.response?.status})`
            : ''
        }`}
        errorMessage={errorRights?.message}
        loadingTitle={t('notifications.loadingAsyncData.title') as string}
        loadingMessage={t('notifications.loadingAsyncData.message') as string}
      />

      <Flex py="md" justify="space-between" align="center">
        <Title size="h2">
          <Flex align="center" gap={10}>
            <IconShieldCheckFilled size="32" />
            <Text> {t('rightsView.title')}</Text>
          </Flex>
        </Title>

        <Button
          variant="light"
          onClick={() => {
            handleRefetch()
          }}
        >
          {t('rightsView.action.refresh')}
        </Button>
      </Flex>

      {isLoadingRights ? (
        <Center h="100%">
          <Loader size="xl" name="loader" />
        </Center>
      ) : (
        <Rights rights={rights?.content || []} columns={columns} />
      )}
    </>
  )
}
