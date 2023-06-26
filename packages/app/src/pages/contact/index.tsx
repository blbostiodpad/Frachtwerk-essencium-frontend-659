import { Contact } from '@frachtwerk/essencium-lib'

import AuthLayout from '@/components/layouts/AuthLayout'
import { baseGetStaticProps } from '@/utils/baseGetStaticProps'
import { getTranslation } from '@/utils/getTranslation'

function ContactView(): JSX.Element {
  return <Contact />
}

ContactView.getLayout = function getLayout(page: React.ReactNode): JSX.Element {
  return (
    <AuthLayout routeName={getTranslation('contactView.contactForm.title')}>
      {page}
    </AuthLayout>
  )
}

export const getStaticProps = baseGetStaticProps()

export default ContactView
