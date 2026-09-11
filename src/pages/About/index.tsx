import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { test } from '../../utils/utils'

const About: React.FC = () => {
  const { t } = useTranslation()
  useEffect(() => {
    test()
  }, [])
  return (
    <div>
      <h2>{t('about.title')}</h2>
      <p>{t('about.description')}</p>
    </div>
  )
}

export default About
