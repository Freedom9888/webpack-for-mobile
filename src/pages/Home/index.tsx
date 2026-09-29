import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { test } from '../../utils/utils'
import DiagnosticTabs from '../../components/DiagnosticTabs'

const Home: React.FC = () => {
  const { t } = useTranslation()
  const [current, setCurrent] = useState(5)
  useEffect(() => {
    test()
  }, [])
  return (
    <div>
      <h2>{t('home.title')}</h2>
      <p>{t('home.description')}</p>
      {/* 风格诊断进度 Tab 预览：01–08，点击任意题号可切换 */}
      <DiagnosticTabs total={8} current={current} onSelect={setCurrent} />
    </div>
  )
}

export default Home
