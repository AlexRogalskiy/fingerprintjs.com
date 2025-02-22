import React from 'react'
import classNames from 'classnames'
import { ReactComponent as AccountFraudSvg } from './account_fraud.svg'
import { ReactComponent as PaymentProcessingSvg } from './payment_processing.svg'
import { ReactComponent as ECommerceSvg } from './e_commerce.svg'
import { ReactComponent as CryptoCurrencySvg } from './cryptocurrency.svg'
import { ReactComponent as GamingSvg } from './gaming.svg'
import { ReactComponent as PaywallSvg } from './paywall.svg'
import Container from '../common/Container'
import Section from '../common/Section'
import { useMainBackgroundImage } from '../../hooks/useBackgroundImage'
import { Link } from 'gatsby'
import { PATH } from '../../constants/content'

import styles from './UseCasesSection.module.scss'

export default function UseCasesSection() {
  const { mainBackground } = useMainBackgroundImage()

  return (
    <>
      <Section
        className={styles.section}
        backgroundImage={mainBackground}
        cssBackgroundColor="v('off-white')"
        cssBackgroundPosition='center center'
        cssBackgroundRepeat='no-repeat'
        cssBackgroundSize='1400px auto'
      >
        <Container>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              FingerprintJS
              <br />
              <strong>Use Cases</strong>
            </h2>
          </header>
          <div className={styles.useCases}>
            <UseCase link={PATH.accountTakeover} icon={AccountFraudSvg} title='Account Fraud' large>
              Confirm that every visitor on your website is real and not an advanced bot using multiple techniques to
              create fake accounts.
              <br />
              <br />
              You can mitigate account takeover attempts, prevent password sharing and significantly reduce the number
              of fake accounts.
            </UseCase>
            <UseCase link={PATH.paymentFraud} icon={PaymentProcessingSvg} title='Payment Processing' large>
              Identify anonymous visitors behind every transaction. Instantly recognize repeated card testing activity
              and link it to specific users.
              <br />
              <br />
              Significantly reduce chargebacks and fraudulent payments just one month after integrating FingerprintJS on
              your website.
            </UseCase>
            <UseCase link={PATH.ecommerce} icon={ECommerceSvg} title='E-Commerce'>
              Every fraudulent order is money directly out of your pocket. With our best in class tools you can stop
              malicious users before they cost you real money.
            </UseCase>
            <UseCase link={PATH.cryptocurrency} icon={CryptoCurrencySvg} title='Cryptocurrency'>
              Ensure that your trading, exchange and transfer operations are safe from malicious activity or account
              fraud.
            </UseCase>
            <UseCase link={PATH.gaming} icon={GamingSvg} title='Gaming'>
              Catch users trying to break your system via multiple accounts, devices, and IP addresses to unjustly
              enrich themselves.
            </UseCase>
            <UseCase link={PATH.paywall} icon={PaywallSvg} title='Paywall'>
              Internet savvy users know how to get unlimited views of your content with incognito windows. Make sure
              that your invested users pay a fair price for your content.
            </UseCase>
          </div>
        </Container>
      </Section>
    </>
  )
}

interface UseCaseProps {
  link?: string
  local?: boolean
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  title: string
  children: React.ReactNode
  large?: boolean
  onClick?: () => void
}
function UseCase({ link, local = true, icon: Icon, title, children, large, onClick }: UseCaseProps) {
  const content = (
    <>
      <div className={styles.iconContainer}>
        <Icon className={styles.icon} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{children}</p>
        <footer className={styles.learnMore}>Learn More &gt;</footer>
      </div>
    </>
  )

  return link ? (
    local ? (
      <Link to={link} className={classNames(styles.useCase, { [styles.large]: large })}>
        {content}
      </Link>
    ) : (
      <a href={link} className={classNames(styles.useCase, { [styles.large]: large })}>
        {content}
      </a>
    )
  ) : (
    <div
      className={classNames(styles.useCase, { [styles.large]: large })}
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : {}}
    >
      {content}
    </div>
  )
}
