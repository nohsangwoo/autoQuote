"use client";

import React, { useState } from "react";

interface QuoteItem {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface ContactInfo {
  office: string;
  post: string;
  website: string;
  bank: string;
  account: string;
}

export default function Home() {
  const [items, setItems] = useState<QuoteItem[]>([
    {
      id: 1,
      name: "메타 광고 세팅",
      price: 450000,
      description: "블로그 월 포스팅 12~15개\n이후 추가 및 방문자 수 작업\n키워드 및 소재에 따라 가격 변동 있음"
    },
    {
      id: 2,
      name: "광고 유지 비용 (15%)",
      price: 75000,
      description: ""
    },
    {
      id: 3,
      name: "블로그 세팅 2가지",
      price: 2400000,
      description: "당근 비즈프로필 세팅\n단골 맺기 등기점업 30건\n광고 세팅, 소식 작성업 2건 포함"
    },
    {
      id: 4,
      name: "당근 비즈프로필 세팅",
      price: 500000,
      description: ""
    }
  ]);

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    office: "OFFICE NUM. +82 10.2449.5016",
    post: "POST NUM. 06343 4419호",
    website: "www.keykeeperofficial.com",
    bank: "우리은행 1005-004-602843",
    account: "예금주 주식회사 키키파(KEYKEEPER)"
  });

  const [newItem, setNewItem] = useState({ name: "", price: 0, description: "" });
  const [isEditing, setIsEditing] = useState(true);

  const addItem = () => {
    if (newItem.name && newItem.price > 0) {
      setItems([...items, { ...newItem, id: Date.now() }]);
      setNewItem({ name: "", price: 0, description: "" });
    }
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: number, field: keyof QuoteItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const updateContactInfo = (field: keyof ContactInfo, value: string) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const printQuote = () => {
    window.print();
  };

  return (
    <div className="min-h-screen p-8" style={{backgroundColor: '#F2F2F2'}}>
      {/* Control Buttons */}
      {isEditing && (
        <div className="max-w-4xl mx-auto mb-4 print:hidden">
          <div className="flex gap-4">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              미리보기
            </button>
            <button
              onClick={printQuote}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              인쇄하기
            </button>
          </div>
        </div>
      )}
      
      {!isEditing && (
        <div className="max-w-4xl mx-auto mb-4 print:hidden">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            편집 모드로 돌아가기
          </button>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
        {/* Header */}
        <div className="border-b-2 border-dashed p-8" style={{borderColor: '#ADAFC4'}}>
          <div className="flex justify-between items-start">
            <div className="text-sm leading-relaxed" style={{color: '#2A2F2F'}}>
              <div>서울특별시 강남구 압구정로 35</div>
              <div>남경빌딩 4층 4419호</div>
            </div>
            <div className="text-right">
              <h1 className="text-4xl font-bold tracking-widest" style={{color: '#2A2F2F'}}>KEYKEEPER</h1>
              <span className="text-sm align-top" style={{color: '#2A2F2F'}}>©</span>
            </div>
          </div>
        </div>

        {/* Title and Contact Info */}
        <div className="p-8">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h2 className="text-4xl font-black mb-1" style={{color: '#2A2F2F'}}>견적서 .</h2>
              <h3 className="text-4xl font-black" style={{color: '#2A2F2F'}}>OFFER SHEET .</h3>
            </div>
            <div className="text-sm text-right leading-relaxed" style={{color: '#2A2F2F'}}>
              {isEditing ? (
                <div className="space-y-1">
                  <input
                    type="text"
                    value={contactInfo.office}
                    onChange={(e) => updateContactInfo('office', e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-right text-sm"
                    style={{color: '#2A2F2F'}}
                  />
                  <input
                    type="text"
                    value={contactInfo.post}
                    onChange={(e) => updateContactInfo('post', e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-right text-sm"
                    style={{color: '#2A2F2F'}}
                  />
                  <input
                    type="text"
                    value={contactInfo.website}
                    onChange={(e) => updateContactInfo('website', e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-right text-sm"
                    style={{color: '#2A2F2F'}}
                  />
                  <input
                    type="text"
                    value={contactInfo.bank}
                    onChange={(e) => updateContactInfo('bank', e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-right text-sm"
                    style={{color: '#2A2F2F'}}
                  />
                  <input
                    type="text"
                    value={contactInfo.account}
                    onChange={(e) => updateContactInfo('account', e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-right text-sm"
                    style={{color: '#2A2F2F'}}
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
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2" style={{borderColor: '#ADAFC4'}}>
                  <th className="text-center py-4 w-16 font-medium text-base" style={{color: '#2A2F2F'}}>NO.</th>
                  <th className="text-center py-4 w-80 font-medium text-base" style={{color: '#2A2F2F'}}>상품명</th>
                  <th className="text-center py-4 w-32 font-medium text-base" style={{color: '#2A2F2F'}}>단가</th>
                  <th className="text-left py-4 font-medium text-base" style={{color: '#2A2F2F'}}>비고</th>
                  {isEditing && <th className="text-center py-4 w-16 font-medium text-base print:hidden" style={{color: '#2A2F2F'}}>액션</th>}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id} className="border-b" style={{borderColor: '#ADAFC4'}}>
                    <td className="py-6 text-center font-medium text-base" style={{color: '#2A2F2F'}}>{index + 1}.</td>
                    <td className="py-6 text-center">
                      {isEditing ? (
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                          className="w-full bg-transparent border-none outline-none font-semibold text-base text-center"
                          style={{color: '#2A2F2F'}}
                        />
                      ) : (
                        <span className="font-semibold text-base" style={{color: '#2A2F2F'}}>{item.name}</span>
                      )}
                    </td>
                    <td className="py-6 text-center">
                      {isEditing ? (
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => updateItem(item.id, 'price', parseInt(e.target.value) || 0)}
                          className="w-full bg-transparent border-none outline-none text-center text-base font-bold"
                          style={{color: '#2A2F2F'}}
                        />
                      ) : (
                        <span className="text-base font-bold" style={{color: '#2A2F2F'}}>{item.price.toLocaleString()}</span>
                      )}
                    </td>
                    <td className="py-6 px-4">
                      {isEditing ? (
                        <textarea
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          className="w-full bg-transparent border-none outline-none resize-none text-sm leading-relaxed font-medium"
                          style={{color: '#2A2F2F'}}
                          rows={3}
                          placeholder="비고사항을 입력하세요..."
                        />
                      ) : (
                        <div className="text-sm leading-relaxed whitespace-pre-line font-medium" style={{color: '#2A2F2F'}}>{item.description}</div>
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
              <div className="mt-8 p-6 rounded-lg print:hidden" style={{backgroundColor: '#F2F2F2'}}>
                <h4 className="text-lg font-medium mb-4" style={{color: '#2A2F2F'}}>새 항목 추가</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="상품명"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{borderColor: '#ADAFC4', color: '#2A2F2F'}}
                  />
                  <input
                    type="number"
                    placeholder="단가"
                    value={newItem.price || ''}
                    onChange={(e) => setNewItem({...newItem, price: parseInt(e.target.value) || 0})}
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{borderColor: '#ADAFC4', color: '#2A2F2F'}}
                  />
                  <input
                    type="text"
                    placeholder="비고"
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{borderColor: '#ADAFC4', color: '#2A2F2F'}}
                  />
                </div>
                <button
                  onClick={addItem}
                  className="mt-4 px-6 py-2 text-white rounded-md hover:opacity-90 transition-colors"
                  style={{backgroundColor: '#2A2F2F'}}
                >
                  항목 추가
                </button>
              </div>
            )}

            {/* Total */}
            <div className="mt-12 text-center">
              <div className="text-3xl font-bold" style={{color: '#2A2F2F'}}>
                총 <span className="ml-12 text-4xl">{total.toLocaleString()}</span> <span className="text-lg font-normal ml-2">(VAT별도)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-dashed p-8" style={{borderColor: '#ADAFC4'}}>
          <div className="text-right mb-6">
            <h3 className="text-2xl font-bold" style={{color: '#2A2F2F'}}>KEYKEEPER.</h3>
          </div>
          <div className="text-sm leading-relaxed max-w-2xl ml-auto" style={{color: '#575859'}}>
            성공을 위한 열쇠, Keykeeper는 믿을 수 있는 파트너로 최상의 결과를 신뢰에
            보답하겠습니다. 그리고 투철한 모든 정성으로 A-Z까지 전문가의 자세로 임하고
            있습니다. 마지막으로 ESG 경영철학을 통해 지속 가능한 가치를 창출하고 있습니다.
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
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
          @page {
            margin: 1in;
            size: A4;
          }
        }
      `}</style>
    </div>
  );
}
