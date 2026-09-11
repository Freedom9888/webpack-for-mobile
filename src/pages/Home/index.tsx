import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { test } from '../../utils/utils'

const Home: React.FC = () => {
  const { t } = useTranslation()
  useEffect(() => {
    test()
  }, [])
  return (
    <div>
      <h2>{t('home.title')}</h2>
      <p>{t('home.description')}</p>
    </div>
  )
}

export default Home
