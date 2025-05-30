'use client'

import React, { useState, useRef, useEffect } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface QuoteItem {
  id: number
  name: string
  price: number
  description: string
}

interface ContactInfo {
  office: string
  post: string
  website: string
  bank: string
  account: string
}

interface CompanyInfo {
  name: string
  address1: string
  address2: string
}

export default function Home() {
  const [items, setItems] = useState<QuoteItem[]>([
    {
      id: 1,
      name: '메타 광고 세팅',
      price: 450000,
      description:
        '블로그 월 포스팅 12~15개\n이후 추가 및 방문자 수 작업\n키워드 및 소재에 따라 가격 변동 있음',
    },
    {
      id: 2,
      name: '광고 유지 비용 (15%)',
      price: 75000,
      description: '',
    },
    {
      id: 3,
      name: '블로그 세팅 2가지',
      price: 2400000,
      description:
        '당근 비즈프로필 세팅\n단골 맺기 등기점업 30건\n광고 세팅, 소식 작성업 2건 포함',
    },
    {
      id: 4,
      name: '당근 비즈프로필 세팅',
      price: 500000,
      description: '',
    },
  ])

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    office: 'OFFICE NUM. +82 10.2449.5016',
    post: 'POST NUM. 06343 4419호',
    website: 'www.keykeeperofficial.com',
    bank: '우리은행 1005-004-602843',
    account: '예금주 주식회사 키키퍼(KEYKEEPER)',
  })

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: 'KEYKEEPER',
    address1: '서울특별시 강남구 압구정로 35',
    address2: '남경빌딩 4층 4419호',
  })

  const [newItem, setNewItem] = useState({
    name: '',
    price: 0,
    description: '',
  })
  const [isEditing, setIsEditing] = useState(false)
  const [scale, setScale] = useState(1)
  const quoteRef = useRef<HTMLDivElement>(null)

  // 화면 크기에 따른 scale 계산
  useEffect(() => {
    const calculateScale = () => {
      const windowWidth = window.innerWidth
      const padding = windowWidth <= 768 ? 32 : 64 // 모바일에서는 패딩을 줄임 (p-4 vs p-8)
      const availableWidth = windowWidth - padding
      const quoteMinWidth = 800 // 견적서 최소 너비
      
      if (availableWidth < quoteMinWidth) {
        setScale(availableWidth / quoteMinWidth)
      } else {
        setScale(1)
      }
    }

    calculateScale()
    window.addEventListener('resize', calculateScale)
    
    return () => {
      window.removeEventListener('resize', calculateScale)
    }
  }, [])

  const addItem = () => {
    if (newItem.name && newItem.price > 0) {
      setItems([...items, { ...newItem, id: Date.now() }])
      setNewItem({ name: '', price: 0, description: '' })
    }
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const updateItem = (
    id: number,
    field: keyof QuoteItem,
    value: string | number,
  ) => {
    setItems(
      items.map(item => (item.id === id ? { ...item, [field]: value } : item)),
    )
  }

  const updateContactInfo = (field: keyof ContactInfo, value: string) => {
    setContactInfo(prev => ({ ...prev, [field]: value }))
  }

  const updateCompanyInfo = (field: keyof CompanyInfo, value: string) => {
    setCompanyInfo(prev => ({ ...prev, [field]: value }))
  }

  const total = items.reduce((sum, item) => sum + item.price, 0)

  const resetItems = () => {
    if (confirm('견적 리스트를 초기화하시겠습니까?')) {
      setItems([])
    }
  }

  const downloadAsImage = async () => {
    if (quoteRef.current) {
      try {
        // 캡처 전에 스크롤을 맨 위로 이동
        window.scrollTo(0, 0)

        const canvas = await html2canvas(quoteRef.current, {
          scale: 2,
          backgroundColor: '#F4F4F2',
          useCORS: true,
          allowTaint: true,
          foreignObjectRendering: false,
          logging: false,
          x: 0,
          y: 0,
          scrollX: 0,
          scrollY: 0,
          windowWidth: quoteRef.current.scrollWidth,
          windowHeight: quoteRef.current.scrollHeight,
          ignoreElements: element => {
            // print:hidden 클래스가 있는 요소들 제외
            const htmlElement = element as HTMLElement
            return (
              element.classList.contains('print:hidden') ||
              htmlElement.style.display === 'none'
            )
          },
        })

        const link = document.createElement('a')
        link.download = `견적서_${new Date().toISOString().split('T')[0]}.png`
        link.href = canvas.toDataURL('image/png', 1.0)
        link.click()
      } catch (error) {
        console.error('이미지 다운로드 실패:', error)
        alert('이미지 다운로드에 실패했습니다.')
      }
    }
  }

  const downloadAsPDF = async () => {
    if (quoteRef.current) {
      try {
        // 캡처 전에 스크롤을 맨 위로 이동
        window.scrollTo(0, 0)

        const canvas = await html2canvas(quoteRef.current, {
          scale: 2,
          backgroundColor: '#F4F4F2',
          useCORS: true,
          allowTaint: true,
          foreignObjectRendering: false,
          logging: false,
          x: 0,
          y: 0,
          scrollX: 0,
          scrollY: 0,
          windowWidth: quoteRef.current.scrollWidth,
          windowHeight: quoteRef.current.scrollHeight,
          ignoreElements: element => {
            const htmlElement = element as HTMLElement
            return (
              element.classList.contains('print:hidden') ||
              htmlElement.style.display === 'none'
            )
          },
        })

        const imgData = canvas.toDataURL('image/png', 1.0)
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        })

        const imgWidth = 210 // A4 width in mm
        const pageHeight = 295 // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        let heightLeft = imgHeight

        let position = 0

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight
          pdf.addPage()
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
          heightLeft -= pageHeight
        }

        pdf.save(`견적서_${new Date().toISOString().split('T')[0]}.pdf`)
      } catch (error) {
        console.error('PDF 다운로드 실패:', error)
        alert('PDF 다운로드에 실패했습니다.')
      }
    }
  }

  return (
    <div className="min-h-screen p-8 mobile-responsive-main-padding" style={{ backgroundColor: '#E8E8E8', overflowX: 'auto' }}>
      {/* Control Buttons */}
      <div 
        data-control-buttons
        className="mx-auto mb-4 print:hidden" 
        style={{ width: '800px', transform: `scale(${scale})`, transformOrigin: 'top center' }}
      >
        <div className="flex gap-4 flex-wrap">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                미리보기
              </button>
              <button
                onClick={resetItems}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
              >
                리스트 초기화
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                편집 모드
              </button>
              <button
                onClick={downloadAsImage}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                이미지 다운로드
              </button>
              <button
                onClick={downloadAsPDF}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                PDF 다운로드
              </button>
              <button
                onClick={resetItems}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
              >
                리스트 초기화
              </button>
            </>
          )}
        </div>
      </div>

      <div
        ref={quoteRef}
        data-quote-container
        className="mx-auto shadow-lg print:shadow-none"
        style={{ 
          backgroundColor: '#F4F4F2',
          width: '800px',
          minWidth: '800px',
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          marginBottom: scale < 1 ? `${(1 - scale) * 400}px` : '0px'
        }}
      >
        {/* Header */}
        <div
          className="border-b-2 border-dashed px-8 pt-24 pb-8 mobile-responsive-padding"
          style={{ borderColor: '#ADAFC4' }}
        >
          <div className="flex justify-between items-end ">
            <div
              className="text-sm leading-relaxed"
              style={{ color: '#2A2F2F' }}
            >
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={companyInfo.address1}
                    onChange={e =>
                      updateCompanyInfo('address1', e.target.value)
                    }
                    className="w-full bg-transparent border-none outline-none"
                    style={{
                      color: '#2A2F2F',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      marginBottom: '4px',
                      display: 'block',
                      width: '100%',
                    }}
                  />
                  <input
                    type="text"
                    value={companyInfo.address2}
                    onChange={e =>
                      updateCompanyInfo('address2', e.target.value)
                    }
                    className="w-full bg-transparent border-none outline-none"
                    style={{
                      color: '#2A2F2F',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      display: 'block',
                      width: '100%',
                    }}
                  />
                </>
              ) : (
                <>
                  <div>{companyInfo.address1}</div>
                  <div>{companyInfo.address2}</div>
                </>
              )}
            </div>
            <div className="text-right flex flex-col items-end relative">
              {isEditing ? (
                <input
                  type="text"
                  value={companyInfo.name}
                  onChange={e => updateCompanyInfo('name', e.target.value)}
                  className="bg-transparent border-none outline-none text-right"
                  style={{
                    color: '#2A2F2F',
                    fontSize: '3rem',
                    fontWeight: '700',
                    letterSpacing: '0.1em',
                    lineHeight: '1',
                    textAlign: 'right',
                    width: 'auto',
                    minWidth: '200px',
                  }}
                />
              ) : (
                <div
                  className="text-5xl font-black"
                  style={{ color: '#2A2F2F' }}
                >
                  {companyInfo.name}
                </div>
              )}

              <span
                className="absolute top-0 right-[-10px] text-sm font-[700] align-top"
                style={{ color: '#2A2F2F' }}
              >
                ©
              </span>
            </div>
          </div>
        </div>

        {/* Title and Contact Info */}
        <div className="p-8 mobile-responsive-padding">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div
                className="text-4xl font-black mb-1 mobile-responsive-title"
                style={{ color: '#2A2F2F' }}
              >
                견적서 .
              </div>
              <div className="text-4xl font-black mobile-responsive-title" style={{ color: '#2A2F2F' }}>
                OFFER SHEET .
              </div>
            </div>
            <div
              className="text-sm text-right leading-relaxed mobile-responsive-text"
              style={{ color: '#2A2F2F' }}
            >
              {isEditing ? (
                <div className="space-y-1">
                  <input
                    type="text"
                    value={contactInfo.office}
                    onChange={e => updateContactInfo('office', e.target.value)}
                    className="w-full bg-transparent border-none outline-none"
                    style={{
                      color: '#2A2F2F',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      textAlign: 'right',
                      width: '100%',
                      marginBottom: '4px',
                    }}
                  />
                  <input
                    type="text"
                    value={contactInfo.post}
                    onChange={e => updateContactInfo('post', e.target.value)}
                    className="w-full bg-transparent border-none outline-none"
                    style={{
                      color: '#2A2F2F',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      textAlign: 'right',
                      width: '100%',
                      marginBottom: '4px',
                    }}
                  />
                  <input
                    type="text"
                    value={contactInfo.website}
                    onChange={e => updateContactInfo('website', e.target.value)}
                    className="w-full bg-transparent border-none outline-none"
                    style={{
                      color: '#2A2F2F',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      textAlign: 'right',
                      width: '100%',
                      marginBottom: '4px',
                    }}
                  />
                  <input
                    type="text"
                    value={contactInfo.bank}
                    onChange={e => updateContactInfo('bank', e.target.value)}
                    className="w-full bg-transparent border-none outline-none"
                    style={{
                      color: '#2A2F2F',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      textAlign: 'right',
                      width: '100%',
                      marginBottom: '4px',
                    }}
                  />
                  <input
                    type="text"
                    value={contactInfo.account}
                    onChange={e => updateContactInfo('account', e.target.value)}
                    className="w-full bg-transparent border-none outline-none"
                    style={{
                      color: '#2A2F2F',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      textAlign: 'right',
                      width: '100%',
                    }}
                  />
                </div>
              ) : (
                <div>
                  <div className="mb-1">{contactInfo.office}</div>
                  <div className="mb-1">{contactInfo.post}</div>
                  <div className="mb-1">{contactInfo.website}</div>
                  <div className="mb-1">{contactInfo.bank}</div>
                  <div>{contactInfo.account}</div>
                </div>
              )}
            </div>
          </div>

          {/* Quote Table */}
          <div className="mb-8">
            <table className="w-full border-collapse mobile-responsive-table">
              <thead>
                <tr className="border-b-2" style={{ borderColor: '#ADAFC4' }}>
                  <th
                    className="text-center py-4 w-16 font-medium text-base"
                    style={{ color: '#2A2F2F' }}
                  >
                    NO.
                  </th>
                  <th
                    className="text-center py-4 w-80 font-medium text-base"
                    style={{ color: '#2A2F2F' }}
                  >
                    상품명
                  </th>
                  <th
                    className="text-center py-4 w-32 font-medium text-base"
                    style={{ color: '#2A2F2F' }}
                  >
                    단가
                  </th>
                  <th
                    className="text-center py-4 font-medium text-base"
                    style={{ color: '#2A2F2F' }}
                  >
                    비고
                  </th>
                  {isEditing && (
                    <th
                      className="text-center py-4 w-16 font-medium text-base print:hidden"
                      style={{ color: '#2A2F2F' }}
                    >
                      액션
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b"
                    style={{ borderColor: '#ADAFC4' }}
                  >
                    <td
                      className="py-6 text-center font-medium text-base"
                      style={{ color: '#2A2F2F' }}
                    >
                      {index + 1}.
                    </td>
                    <td className="py-6 text-center">
                      {isEditing ? (
                        <input
                          type="text"
                          value={item.name}
                          onChange={e =>
                            updateItem(item.id, 'name', e.target.value)
                          }
                          className="w-full bg-transparent border-none outline-none"
                          style={{
                            color: '#2A2F2F',
                            fontSize: '16px',
                            fontWeight: '600',
                            textAlign: 'center',
                            width: '100%',
                            lineHeight: '1.5',
                          }}
                        />
                      ) : (
                        <span
                          className="font-semibold text-base"
                          style={{ color: '#2A2F2F' }}
                        >
                          {item.name}
                        </span>
                      )}
                    </td>
                    <td className="py-6 text-center">
                      {isEditing ? (
                        <input
                          type="number"
                          value={item.price}
                          onChange={e =>
                            updateItem(
                              item.id,
                              'price',
                              parseInt(e.target.value) || 0,
                            )
                          }
                          className="w-full bg-transparent border-none outline-none"
                          style={{
                            color: '#2A2F2F',
                            fontSize: '16px',
                            fontWeight: '700',
                            textAlign: 'center',
                            width: '100%',
                            lineHeight: '1.5',
                          }}
                        />
                      ) : (
                        <span
                          className="text-base font-bold"
                          style={{ color: '#2A2F2F' }}
                        >
                          {item.price.toLocaleString()}
                        </span>
                      )}
                    </td>
                    <td className="py-6 px-4 align-top">
                      {isEditing ? (
                        <input
                          type="text"
                          value={item.description}
                          onChange={e =>
                            updateItem(item.id, 'description', e.target.value)
                          }
                          className="w-full bg-transparent border-none outline-none"
                          style={{
                            color: '#2A2F2F',
                            fontSize: '14px',
                            fontWeight: '500',
                            width: '100%',
                            lineHeight: '1.5',
                          }}
                          placeholder="비고사항을 입력하세요..."
                        />
                      ) : (
                        <div
                          className="text-sm whitespace-pre-line font-medium"
                          style={{ color: '#2A2F2F' }}
                        >
                          {item.description}
                        </div>
                      )}
                    </td>
                    {isEditing && (
                      <td className="py-6 text-center print:hidden">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          삭제
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Add Item Form */}
            {isEditing && (
              <div
                className="mt-8 p-6 rounded-lg print:hidden"
                style={{ backgroundColor: '#E8E8E8' }}
              >
                <div
                  className="text-lg font-medium mb-4"
                  style={{ color: '#2A2F2F' }}
                >
                  새 항목 추가
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="상품명"
                    value={newItem.name}
                    onChange={e =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ borderColor: '#ADAFC4', color: '#2A2F2F' }}
                  />
                  <input
                    type="number"
                    placeholder="단가"
                    value={newItem.price || ''}
                    onChange={e =>
                      setNewItem({
                        ...newItem,
                        price: parseInt(e.target.value) || 0,
                      })
                    }
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ borderColor: '#ADAFC4', color: '#2A2F2F' }}
                  />
                  <input
                    type="text"
                    placeholder="비고"
                    value={newItem.description}
                    onChange={e =>
                      setNewItem({ ...newItem, description: e.target.value })
                    }
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ borderColor: '#ADAFC4', color: '#2A2F2F' }}
                  />
                </div>
                <button
                  onClick={addItem}
                  className="mt-4 px-6 py-2 text-white rounded-md hover:opacity-90 transition-colors"
                  style={{ backgroundColor: '#2A2F2F' }}
                >
                  항목 추가
                </button>
              </div>
            )}

            {/* Total */}
            <div className="mt-12 text-center">
              <div className="text-3xl font-bold" style={{ color: '#2A2F2F' }}>
                총{' '}
                <span className="ml-12 text-4xl">{total.toLocaleString()}</span>{' '}
                <span className="text-lg font-normal ml-2">(VAT별도)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="border-t-2 border-dashed p-8 flex mobile-responsive-padding mobile-responsive-footer"
          style={{ borderColor: '#ADAFC4' }}
        >
          <div className="w-[35%] relative flex justify-start items-end">
            <div>
              <div className="flex w-[100px]">
                Pick Yours
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start flex-1">
            <div className="text-left">
              <div className="text-2xl font-[700]" style={{ color: '#575859' }}>
                KEYKEEPER.
              </div>
            </div>
            <div
              className="text-[1rem] leading-relaxed font-thin tracking-[-0.08em] max-w-2xl ml-auto mobile-responsive-table"
              style={{ color: '#575859' }}
            >
              성공을 위한 열쇠, Keykeeper는 믿을 수 있는 파트너로 최상의 결과를
              신뢰에 보답하겠습니다. 그리고 투철한 모든 정성으로 A-Z까지
              전문가의 자세로 임하고 있습니다. 마지막으로 ESG 경영철학을 통해
              지속 가능한 가치를 창출하고 있습니다.
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .mobile-responsive-main-padding {
            padding: 1rem !important;
          }
          .mobile-responsive-padding {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          .mobile-responsive-text {
            font-size: 0.875rem !important;
          }
          .mobile-responsive-title {
            font-size: 2rem !important;
          }
          .mobile-responsive-footer {
            flex-direction: column !important;
            gap: 1rem !important;
          }
          .mobile-responsive-table {
            font-size: 0.875rem !important;
          }
        }
        
        @media print {
          body {
            background: white !important;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          [data-quote-container] {
            transform: none !important;
            width: auto !important;
            min-width: auto !important;
            margin-bottom: 0 !important;
          }
          @page {
            margin: 1in;
            size: A4;
          }
        }
      `}</style>
    </div>
  )
}
