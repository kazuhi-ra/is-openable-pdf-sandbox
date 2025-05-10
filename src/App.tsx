import { useState } from 'react'

import './App.css'

function App() {
  const [result, setResult] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    try {
      const { isOpenablePdf } = await import('@kazuhi-ra/is-openable-pdf')

      const isOpenable = await isOpenablePdf(file)
      setResult(
        isOpenable
          ? 'このPDFファイルは開けます！'
          : 'このPDFファイルは開けません。'
      )
    } catch (error) {
      setResult('エラーが発生しました。')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='container'>
      <h1>PDFファイルチェッカー</h1>
      <div className='upload-area'>
        <input
          type='file'
          accept='.pdf'
          onChange={handleFileChange}
          disabled={isLoading}
        />
      </div>
      {isLoading && <p>チェック中...</p>}
      {result && (
        <p className={result.includes('開けます') ? 'success' : 'error'}>
          {result}
        </p>
      )}
    </div>
  )
}

export default App
