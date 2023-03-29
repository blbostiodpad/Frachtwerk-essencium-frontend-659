import {
  Box,
  Burger,
  Code,
  Flex,
  Group,
  Header as MantineHeader,
  MediaQuery,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { UserOutput } from 'types'

import { LanguageSelector } from './components/LanguageSelector'
import { SearchBar } from './components/SearchBar'
import { ThemeSelector } from './components/ThemeSelector'
import { UserMenu } from './components/UserMenu'

type Props = {
  isOpen: boolean
  handleOpenNav: () => void
  logo: JSX.Element
  version?: string
  user: UserOutput | undefined
}

export function Header({
  isOpen,
  handleOpenNav,
  logo,
  version,
  user,
}: Props): JSX.Element {
  const { t } = useTranslation()

  const theme = useMantineTheme()

  return (
    <MantineHeader height={{ base: 70 }} p="md" fixed>
      <Flex
        sx={{
          height: '100%',
        }}
        justify="space-between"
        align="center"
      >
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={isOpen}
            onClick={handleOpenNav}
            size="sm"
            color={theme.colors.gray[5]}
            mr="xl"
          />
        </MediaQuery>

        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Group spacing="xs" noWrap align="center">
            <Box>{logo}</Box>

            <Text size={21} mr="10" weight="500">
              {t('header.title')}
            </Text>

            {version ? (
              <>
                <Code>{version}</Code>

                {process.env.NODE_ENV === 'development' ? (
                  <Code>{process.env.NODE_ENV}</Code>
                ) : null}
              </>
            ) : null}
          </Group>
        </MediaQuery>

        <SearchBar />

        <Group noWrap>
          <Group noWrap>
            <ThemeSelector />

            <LanguageSelector />
          </Group>

          {user ? <UserMenu user={user} /> : null}
        </Group>
      </Flex>
    </MantineHeader>
  )
}
