import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  TextInput,
} from '@mantine/core'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ResetPasswordForm, ResetPasswordSuccessMessage } from './components'
import { LoginFormProps } from './types'

export function LoginForm({ loginCredentials }: LoginFormProps) {
  const { t } = useTranslation()

  const [isOpened, setIsOpened] = useState(false)
  const [isSent, setIsSent] = useState(false)

  return (
    <Paper shadow="md" p={30} mt="md" radius="md">
      {!isOpened && !isSent && (
        <form>
          <TextInput
            value={loginCredentials.email}
            placeholder={t('login.form.emailPlaceholder') as string}
            label={t('login.form.email')}
            required
            styles={{
              label: {
                fontWeight: 600,
              },
            }}
            withAsterisk
          />

          <PasswordInput
            value={loginCredentials.password}
            placeholder={t('login.form.passwordPlaceholder') as string}
            label={t('login.form.password')}
            required
            fw={800}
            styles={{
              label: {
                fontWeight: 600,
              },
            }}
            withAsterisk
            mt="md"
          />

          <Group position="apart" mt="md">
            <Checkbox
              label={t('login.form.rememberLogin')}
              fw={600}
              color="cyan"
              size="xs"
            />

            <Anchor
              size="xs"
              color="cyan"
              fw="600"
              onClick={() => setIsOpened(true)}
            >
              {t('login.form.resetPassword')}
            </Anchor>
          </Group>

          <Button type="submit" fullWidth mt="md" color="cyan">
            {t('login.form.submit')}
          </Button>
        </form>
      )}

      {isOpened && !isSent && (
        <ResetPasswordForm setOpen={setIsOpened} setSent={setIsSent} />
      )}

      {isSent && <ResetPasswordSuccessMessage />}
    </Paper>
  )
}
