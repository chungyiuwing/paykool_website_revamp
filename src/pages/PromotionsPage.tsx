import React, { useState } from 'react';
import { PageType } from '../types';

interface PromotionsPageProps {
  onNavigate: (page: PageType, hash?: string) => void;
  onOpenApplyModal: (cardType?: string) => void;
}

export const PromotionsPage: React.FC<PromotionsPageProps> = ({ onNavigate, onOpenApplyModal }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'welcome' | 'cardholder' | 'past'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const merchantOffers = [
    {
      id: 1,
      merchant: 'Travel Kingdom',
      type: 'welcome',
      category: 'travel',
      badge: '迎新優惠',
      badge2: '旅遊出行',
      title: '批卡即送 20 吋前開蓋行李篋（4揀1）或門市即減 HK$500',
      description: '邀請碼「TK」專享，無強硬高額簽賬門檻，批卡即可門市領取。持卡人再享全單 95 折及 Yashi 特厚行李帶。',
      deadline: '2027-06-30',
      code: 'TK',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLvcF0J8OiaQHDgPyB2AivyOJKVPK9ns--06du-RWeQZOZdtltYuJhPU9VolsmokROyDKlfi3MJMKeAb6knCGLUMVnFunqIrEYNhIQU6aU0XnXhLAV7fIOmSrpCKaRLMVlnmnvNhT4G5e_LGKdCA8uBKIm4eqOHyjArLJ_U0OwYr6MadXrtsbjb62xbpI3qW7k0TyVNb3o-7o3JRMrxyRPppca9OkB67McZcPwIvmDJrcBfq7TX1QRyQ',
    },
    {
      id: 2,
      merchant: 'Apple Duo (Apple Pay)',
      type: 'welcome',
      category: 'shopping',
      badge: '迎新 / 持卡人',
      badge2: '潮流數碼',
      title: '簽賬送 HK$500 免找數簽賬額 ＋ 首次加卡 Apple Pay 享回贈',
      description: '邀請碼「DUO」，最快3分鐘批核虛擬卡，即加 Apple 錢包拍卡出機，專享分期自選手續費回贈。',
      deadline: '2027-03-31',
      code: 'DUO',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4KUsSINC97-ErJZT6zqMTrXC5sJ8pxBcysWfJ91SsHXGX0f3dvl5DBxa5oPMevibCtAi_fXlolMgdzFKmkAUI_Ns0BXxZhUvAq-y3ks_gIeEXNpI8agwZDM8JJ_BBtuB953CaGG7N6sX0HAFBuGHwxcIx1CkcTXyJb1YFXQbVhEYKFkN8D3V0eY4_ugn5A5hODoEdjQ3iGTUWlnjevkG603TFGeiqAj0z6jIAarnV6Gfcu0HcvllDkpqmyMlimjU0jw',
    },
    {
      id: 3,
      merchant: 'GIORMANI 茲曼尼',
      type: 'cardholder',
      category: 'shopping',
      badge: '迎新 / 持卡人',
      badge2: '家居生活',
      title: '迎新享 HK$400 簽賬額 ＋ 持卡人梳化滿額即減 $100',
      description: '邀請碼「MBGIORMANI」，尊享傢俬配件 75 折及自選 3/4/5 個月自主分期，全港各區分店同步適用。',
      deadline: '2027-02-05',
      code: 'MBGIORMANI',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4gMqMGV6iRvZ88K1JV-Sffkw8l065O6omqGysQWg4izXp6wp9_ujKbsf8f7w2xdcRGQPXQqKl5ZcCyGHFFtMEzyXGC-NNnlGCSy2ucsSSFAJ9W1fzLZK8h2Qu-YvfR-0xANSUZ0SjBMUFGSmWPC3v5EnlX4a7lJoumLf0st09W_N9UiqYZhV_tUI9Z3OQW-euE8zYIJ6EtIwSLOq3L_2fdbxSRuA78sqtsmlrjQJ6HdGXb4Y-etTOOvL-l9lrryOx8g',
    },
    {
      id: 4,
      merchant: '尚酒薈 x W Cellar',
      type: 'cardholder',
      category: 'dining',
      badge: '持卡人專屬',
      badge2: '餐飲美酒',
      title: '門市及網店尊享 95 折 ＋ 迎新送精選紅酒一瓶',
      description: '邀請碼「PPWWINE」，消費滿額即減 HK$400，品味環球臻選佳釀，持卡人更享專屬私人品酒會席位。',
      deadline: '推廣期內適用',
      code: 'PPWWINE',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCh9IkOu2YhAu0ACkYFKv7HYgp3_XLhh0eBILaxxdElVDZCk8rVw9HcrzX3943I4y3mtJdfktSY9L1EMvZUFehCGQwc6qegrs-lBRzoE2g2Xtf0zectaWr7B8n0_WF3BTjfaCnxn2L21cXxcGPSzk-VFK7V7NU3ZkUx1-HOEw5jURudmugVgAvHgsqROU2DB6iQSrJm5YrpngiAWMu8S5maWIIZAzHJ54EbsztfLz0ea6He9VgZlBOaDg',
    },
    {
      id: 5,
      merchant: 'HKTVmall',
      type: 'welcome',
      category: 'shopping',
      badge: '迎新優惠',
      badge2: '超市百貨',
      title: '全新客戶送 HK$500 電子購物禮券（HK$50 x 10張）',
      description: '邀請碼「PPTVMALL」，批核後3個月內完成任何合資格簽賬即可領取，超市、母嬰、電器全網通用。',
      deadline: '2027-03-31',
      code: 'PPTVMALL',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfMdv-zHw11bCKbyUDP-YiNvIcTSKTK14IC2JoFBN7oRKqIzlZgT7fDQqquNgYZjl9qmaar8MTgdG4okeg7lZ6SUHiFhWLvwB88QVbNpurojLuTKf0dTIs7UKO1ZTaSVLBnNykZvTIs6pg52a32FgxBhptNHiHFpLTv_1ItR_uIU3hiERyXMGDZpIN4kA9m5XkKdYVmbkbY77sbwkAu3my7O3LESZL9ydbsiNcoT47If9U4cqkiALD68GiIjHRk9Ypxw',
    },
    {
      id: 6,
      merchant: '2XCHANGE 外幣兌換',
      type: 'welcome',
      category: 'travel',
      badge: '迎新 / 持卡人',
      badge2: '旅遊外匯',
      title: '換外幣旅遊再賺獎賞！高達 HK$500 外幣現金獎賞及免手續費',
      description: '邀請碼「PP2XC」，門市兌換外幣滿指定金額即享現金獎賞，港幣兌換日圓、韓元或台幣免手續費。',
      deadline: '推廣期內適用',
      code: 'PP2XC',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCm5pL_cTesWzHIPVMtE299DEkkCDMBx1HxefWFay54JxFpSqbLXGWaHIIFO7nic3ji0glm9zpcWZkX6CrxwoDEUoI87wO4HfWL91wsoHb6M8aanjtS8RJjgVv6eEB425NMq7V1E-XXSohkdEBZN50DMat7L-RjvdWzx1870U8vR8hfuAnRHyz3L8jISrWygyPf23geFBSlAICJhlzDWDvBmcanrobm5Rg_UiTA6tj4w0P-eECHLgduugCk4T9nwWrzdg',
    },
    {
      id: 7,
      merchant: '美亞廚具 (Meyer)',
      type: 'cardholder',
      category: 'shopping',
      badge: '迎新 / 持卡人',
      badge2: '家居生活',
      title: '旗艦店消費滿額即減 HK$500 ＋ 持卡人享全單 95 折',
      description: '邀請碼「MCMY」，觀塘旗艦店特賣場精選低至2折折上折，更可享指定廚具套裝自主分期免息免找數。',
      deadline: '2027-08-31',
      code: 'MCMY',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2LGQ-wYpRJqRR-QhN-DQVVj4B_rP50rMJTgDdu1WWvM6a92ByrJ08-A-C9D5NnwJUMCXGGrsljUHhloEE8G8HtnzJ4n8iZdzu6pXD-wPzP-KrQPwF0c4Sa7JzotdP7VFL2HqrFcjtdFjIR3UNtDCLe-MxyiQlKFLxFiWcShEyOwVWZlGrdwUFhlcPJxEl63-3BCen6wsIXa5SIexD4ZMsrhcqPrSj31gkN91HZN2fCV3JRWKbnAb1Bw',
    },
    {
      id: 8,
      merchant: '九十番地居酒屋',
      type: 'cardholder',
      category: 'dining',
      badge: '餐飲美食',
      badge2: '即將截止',
      title: '消費滿額即減 HK$400 ＋ 持卡人簽賬獲贈免費指定飲品',
      description: '邀請碼「PP90BAN」，品嚐正宗日式串燒料理與特飲，凡持卡消費更享主廚特選小食乙客。',
      deadline: '2027-02-24',
      code: 'PP90BAN',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdm3UM7MHSAlToi34e6qXQLMeZVgceZ9DXh-tUMrqeXWTBsp0adMNSjbJL1mZvUsPTvRKO08K4uzMxzUJz-MCfS3IXWYzlR3Hj68GygBDfrc5smka9-ef0kIQJ8GBPcoQMGWhWxGie2qgQ5nUp4ExIjv54VXXjHGJady80oPR-WAWmit6PUXkPXCwv4tTC_bhDjbw8fdaESSCv6SeASJcS-2QbMqyoilPXTASqcODPDdiK2etRDcJNUQ',
    },
  ];

  // Filter logic
  const filteredOffers = merchantOffers.filter((item) => {
    if (activeTab === 'welcome' && item.type !== 'welcome') return false;
    if (activeTab === 'cardholder' && item.type !== 'cardholder') return false;
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const match =
        item.merchant.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="w-full bg-[#fdfbfe] min-h-screen">
      {/* Editorial Magazine Hero Section */}
      <section className="relative w-full border-b border-[#e4deeb]/50 bg-gradient-to-b from-[#FFF9F4]/60 via-white to-[#fdfbfe] pt-6 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-[13px] tracking-wide text-[#5a5563]">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#372274] transition-colors font-medium flex items-center gap-1 cursor-pointer"
            >
              <span>主頁</span>
            </button>
            <span className="material-symbols-outlined text-[14px] text-slate-300">chevron_right</span>
            <span className="font-semibold text-[#372274]">信用卡推廣與最新優惠</span>
          </nav>

          {/* Magazine Issue Header Bar */}
          <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between border-b border-[#e4deeb] pb-5 gap-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-[11px] font-bold tracking-widest uppercase bg-[#372274] text-white rounded">
                PAYKOOL EDITORIAL
              </span>
              <span className="text-[13px] font-semibold text-[#5a5563] tracking-wider">
                ISSUE NO. 04 / 2027年首季精選商戶推介
              </span>
            </div>
            <div className="flex items-center gap-6 text-[13px] text-[#5a5563]">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E83375]"></span>
                即時批核專享
              </span>
              <span className="hidden sm:inline">・</span>
              <span>3/4/5 個月自選免息分期</span>
            </div>
          </div>

          {/* Magazine Cover Headline */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1d192e] leading-tight tracking-tight">
                PayKool 最新信用卡推廣與商戶禮遇
              </h1>
              <p className="text-[#5a5563] text-base leading-relaxed max-w-2xl font-light">
                網羅全港熱門商戶迎新獎賞、生活購物簽賬回贈及持卡人專屬折扣！即時批核，專享高達 HK$500 迎新禮遇與 3/4/5 個月自選免息分期。
              </p>
            </div>

            {/* Key Numbers Column */}
            <div className="lg:col-span-4 flex lg:flex-col justify-between sm:justify-start gap-4 lg:gap-3 lg:border-l lg:border-[#e4deeb] lg:pl-8">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-extrabold text-[#372274]">32+</span>
                <span className="text-[13px] text-[#5a5563] font-medium">熱門優惠進行中</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-extrabold text-[#E83375]">HK$900</span>
                <span className="text-[13px] text-[#5a5563] font-medium">最高迎新回贈</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-extrabold text-[#00B6ED]">3分鐘</span>
                <span className="text-[13px] text-[#5a5563] font-medium">極速智能批核</span>
              </div>
            </div>
          </div>

          {/* Magazine Inset Card */}
          <div className="mt-10 rounded-2xl bg-gradient-to-r from-[#1F1841] via-[#372274] to-[#2B225A] text-white p-7 md:p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#FCE3CB] text-[20px]">verified_user</span>
                  <span className="text-[11px] font-bold tracking-widest text-[#FCE3CB] uppercase">
                    迎新限時禮遇
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold text-white tracking-tight leading-snug">
                  尚未持有 PayKool 卡？最快3分鐘極速智能批核，即開即用迎新高達$500回贈！
                </h2>
                <p className="text-sm text-[#ece4ff]/90 leading-relaxed font-light">
                  虛擬卡即批即加 Apple Pay / Google 錢包，免入息證明門檻，任何合資格簽賬享自主 3/4/5 期分期彈性。
                </p>
              </div>
              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenApplyModal('platinum')}
                  className="inline-flex items-center justify-center font-bold text-sm text-[#1d192e] bg-[#FCE3CB] hover:bg-white px-7 py-3.5 rounded-full transition-all tracking-wide shadow-sm cursor-pointer"
                >
                  <span>立即申請 PayKool 卡</span>
                  <span className="material-symbols-outlined ml-2 text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Stories: Asymmetric Magazine Split Grid */}
      <section className="w-full bg-white py-14 border-b border-[#e4deeb]/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between border-b border-[#e4deeb] pb-4 mb-8">
            <div className="flex items-baseline gap-3">
              <span className="text-xs font-bold text-[#E83375] uppercase tracking-widest">
                CURATED PICKS
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1d192e]">焦點強推專區</h2>
              <span className="hidden sm:inline text-sm text-[#5a5563]">全城熱話．優先鎖定限時禮遇</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Dominant Feature: Apple Duo */}
            <div className="lg:col-span-7 flex flex-col rounded-2xl bg-[#fbf8fd] border border-[#e4deeb]/60 overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-[#1F1841]">
                <img
                  className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                  alt="Apple Duo 出機攻略"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ0NP_VhIr0SziSM18d1DgsHkH_UBxee1_2WQUDenIM6rhqBMJUJWMgwccuqOfI98A-USPevdQ68ZjIBysESLTUKIolmbkFwoIlXKXFHS4C_vVAMxV7Gsj1bIO50SVl8s_YZ80TfcJwaGt-gaUyXWdLVrHTFKO2IwbbHmzZrJw6YaaP44z_cfq7ocKY-JIC-n_V7SkZYe0Z0tn4WtB06ppdQLNOD5lu5hNLE2JfZikFSUDo7y6pQav3tNBH0WdyDLbag"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1841]/90 via-[#1F1841]/30 to-transparent"></div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-[#E83375] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    焦點迎新
                  </span>
                  <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full">
                    潮流科技
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-xs font-semibold text-[#FCE3CB] tracking-wider">邀請碼：DUO</span>
                  <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
                    【PayKool x Apple Duo】出機攻略
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-6">
                <p className="text-[#5a5563] font-light leading-relaxed text-sm sm:text-base">
                  全新客戶以邀請碼「DUO」申請，首3個月簽賬滿HK$2,000送 HK$500 免找數簽賬額！最快3分鐘批卡即綁 Apple Pay 門市出機！
                </p>
                <div className="pt-4 border-t border-[#e4deeb] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-[#5a5563]">
                    <span className="material-symbols-outlined text-[16px] text-[#372274]">calendar_today</span>
                    <span>推廣期至：2027年3月31日</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onOpenApplyModal('platinum')}
                      className="px-6 py-2 text-xs font-bold text-white bg-[#372274] hover:bg-[#5B459B] rounded-full transition-colors shadow-sm cursor-pointer"
                    >
                      立即出卡
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Stacked Features: Travel Kingdom + GIORMANI */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              
              {/* Story 2: Travel Kingdom */}
              <div className="flex flex-col sm:flex-row rounded-2xl bg-[#fbf8fd] border border-[#e4deeb]/60 overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="relative sm:w-2/5 h-48 sm:h-auto overflow-hidden bg-[#2B225A] shrink-0">
                  <img
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Travel Kingdom"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7cZ3O8OzyitnLxrLXzvWrdmfwolJpPOXbttT75B3MDeox3iUQqLLNncoM-pyxWUkIJuIcNsJRMkNXMlI3NGFOL7sNDHaMloUmIEIzIreNUeFJnwjBYrNk1Wfog-8P_QcJvFUNmTGlf4mRsSN7x0yh6e1xW0IndlSXnqbvwuZhFXJ6u22B7Cw0Xu4prTGh1mUv44HuR901hHrENWf0h4zJEVR5yR1-Dc8s6GScUGHiyegXK11JRqzpsA"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#E83375] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      熱門迎新
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
                  <div>
                    <span className="text-[11px] font-semibold text-[#E83375]">迎新 4 揀 1 · 邀請碼：TK</span>
                    <h3 className="text-lg font-bold text-[#1d192e] leading-snug mt-1 group-hover:text-[#372274] transition-colors">
                      【PayKool x Travel Kingdom】送20吋前開篋或即減$500
                    </h3>
                    <p className="text-xs text-[#5a5563] font-light mt-1.5 line-clamp-2">
                      全新客戶輸入邀請碼「TK」，成功批核即送 Yashi/Tokiwa 日本轆前開蓋行李篋；持卡人門市簽賬享全單 95折！
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#e4deeb] text-xs">
                    <span className="text-[#5a5563]/70 text-[11px]">推廣期至：2027年6月30日</span>
                    <button
                      type="button"
                      onClick={() => onOpenApplyModal('platinum')}
                      className="font-bold text-[#372274] hover:text-[#E83375] transition-colors cursor-pointer"
                    >
                      立即申辦 →
                    </button>
                  </div>
                </div>
              </div>

              {/* Story 3: GIORMANI */}
              <div className="flex flex-col sm:flex-row rounded-2xl bg-[#fbf8fd] border border-[#e4deeb]/60 overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="relative sm:w-2/5 h-48 sm:h-auto overflow-hidden bg-[#5B459B] shrink-0">
                  <img
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="GIORMANI 茲曼尼"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAySMzHEz6fe2VmdGeKrj4tzjvwRGCiYAgvO6WTVXh9JZC5JT6K2x1PDJHTVib-1ye_wwSYKCO5Tv8MaZE2dhBtgqEX16T7ZUVzZMeUMnN6AcSKgVozeldDVRFwU0cB92vndQi-K-RLFwfrYy8DJZWS6vngQxcQCEvXyQk44BgOwmm9QODJb8_zrtiHk3vcO6mNknwXxxNo1oxaJqPHfiE90TPk3eCc0jascJEH56xRl7BszAuouRqlQaWqQ4aYcHqp4Q"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white text-[#372274] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      持卡人特選
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
                  <div>
                    <span className="text-[11px] font-semibold text-[#372274]">邀請碼：MBGIORMANI</span>
                    <h3 className="text-lg font-bold text-[#1d192e] leading-snug mt-1 group-hover:text-[#372274] transition-colors">
                      【PayKool x GIORMANI 茲曼尼】梳化滿額即減及低至75折
                    </h3>
                    <p className="text-xs text-[#5a5563] font-light mt-1.5 line-clamp-2">
                      持卡人於門市購買茲曼尼梳化折實滿HK$5,000即減HK$100；指定坐墊抱枕享 75折！單筆滿$100更可自選3/4/5個月自主分期！
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#e4deeb] text-xs">
                    <span className="text-[#5a5563]/70 text-[11px]">推廣期至：2027年2月5日</span>
                    <button
                      type="button"
                      onClick={() => onOpenApplyModal('platinum')}
                      className="font-bold text-[#372274] hover:text-[#E83375] transition-colors cursor-pointer"
                    >
                      立即申辦 →
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-30 w-full bg-white/95 backdrop-blur-md border-b border-[#e4deeb] shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 space-y-3">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Underline Tabs */}
            <div className="flex items-center gap-6 overflow-x-auto border-b border-transparent">
              {[
                { id: 'all', label: '全部優惠 (32)' },
                { id: 'welcome', label: '迎新優惠 (18)' },
                { id: 'cardholder', label: '持卡人專屬 (14)' },
                { id: 'past', label: '過往禮遇 (Past Archive)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`text-sm font-bold pb-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'text-[#372274] border-[#E83375]'
                      : 'text-[#5a5563] border-transparent hover:text-[#1d192e]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search & Sort Controls */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-80">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜尋商戶或優惠（如：Travel Kingdom、Apple）"
                  className="w-full rounded-full border border-[#e4deeb] bg-[#fdfbfe] py-1.5 pl-9 pr-4 text-xs text-[#1d192e] placeholder:text-slate-400 focus:border-[#372274] focus:outline-none"
                />
              </div>

              <div className="relative shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none rounded-full border border-[#e4deeb] bg-[#fdfbfe] px-4 py-1.5 pr-8 text-xs font-semibold text-[#1d192e] cursor-pointer focus:border-[#372274] focus:outline-none"
                >
                  <option value="newest">排序：最新發佈</option>
                  <option value="closing">排序：即將截止</option>
                  <option value="popular">排序：熱門推介</option>
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[16px] text-slate-400">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          {/* Lower Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 text-xs">
            <span className="text-[#5a5563]/80 font-medium shrink-0 mr-1 text-[11px] tracking-wider uppercase">
              分類：
            </span>
            {[
              { id: 'all', label: '全部 (All)' },
              { id: 'shopping', label: '購物' },
              { id: 'dining', label: '美食' },
              { id: 'travel', label: '旅遊' },
              { id: 'events', label: '精彩活動' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-3.5 py-1 font-medium shrink-0 transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#372274] text-white'
                    : 'bg-[#f6f1fd] text-[#5a5563] hover:bg-[#ece4ff]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Merchant Cards Grid */}
      <section className="w-full bg-[#fdfbfe] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between pb-8 border-b border-[#e4deeb]/60 mb-8">
            <p className="text-xs text-[#5a5563] tracking-wide">
              正在顯示 <span className="font-bold text-[#372274]">{filteredOffers.length}</span> 項精選推廣商戶 (共 32 個優惠)
            </p>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#E83375] animate-pulse"></span>
              <span className="text-xs text-[#5a5563]">實時更新進行中</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOffers.map((card) => (
              <article
                key={card.id}
                className="flex flex-col justify-between rounded-2xl bg-white border border-[#e4deeb] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-[#FFF9F4]">
                    <img
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                      src={card.image}
                      alt={card.title}
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="bg-[#E83375] text-white px-2.5 py-0.5 text-[10px] font-bold rounded-full">
                        {card.badge}
                      </span>
                      <span className="bg-white/90 text-[#372274] backdrop-blur px-2.5 py-0.5 text-[10px] font-medium rounded-full">
                        {card.badge2}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <span className="text-[11px] font-bold text-[#372274] tracking-wider uppercase">
                      {card.merchant}
                    </span>
                    <h3 className="text-lg font-bold text-[#1d192e] line-clamp-2 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#5a5563] font-light line-clamp-2 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-[#e4deeb]/60 space-y-4">
                  <div className="flex items-center justify-between text-[11px] text-[#5a5563]">
                    <span>推廣期至：{card.deadline}</span>
                    <span className="font-bold text-[#E83375]">邀請碼: {card.code}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onOpenApplyModal('platinum')}
                      className="text-xs font-bold text-[#372274] hover:text-[#E83375] transition-colors cursor-pointer"
                    >
                      了解詳情 →
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenApplyModal('platinum')}
                      className="text-xs font-bold text-white bg-[#372274] hover:bg-[#5B459B] px-4 py-1.5 rounded-full transition-colors shadow-xs cursor-pointer"
                    >
                      申請此卡
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load more */}
          <div className="mt-14 flex flex-col items-center justify-center gap-3 text-center">
            <p className="text-xs text-[#5a5563] font-medium tracking-wide">
              顯示 {filteredOffers.length} / 共 32 個優惠
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-[#372274] text-[#372274] hover:bg-[#372274] hover:text-white px-8 py-3 text-xs font-bold transition-all duration-200 cursor-pointer"
            >
              <span>顯示更多優惠 (載入更多)</span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>
          </div>
        </div>
      </section>

      {/* Past Archive Section */}
      <section className="w-full bg-[#fbf8fd] py-16 border-t border-[#e4deeb]/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#e4deeb]">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5a5563]">
                <span className="material-symbols-outlined text-[16px] text-[#372274]">inventory_2</span>
                <span>推廣活動回顧檔案庫</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1d192e]">過往熱門推廣回顧</h2>
              <p className="text-xs text-[#5a5563] font-light">
                查閱過往已截止之展覽會展位、大型節慶限定禮遇及商戶合作條款記錄。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[
              {
                tag: '大型展覽',
                title: '香港動漫電玩節 2026',
                desc: '現場成功批核送限量珍藏手辦及即享會場購物簽賬滿額立減。',
              },
              {
                tag: '年度盛事',
                title: '香港書展 2026 簽賬賞',
                desc: '攤位簽賬滿 HK$300 即減 HK$30，送會場限定布袋及圖書禮券。',
              },
              {
                tag: '零售連鎖',
                title: '759 阿信屋狂歡祭',
                desc: '憑 PayKool 卡感應支付全單折上折 88 折，享指定零食換領券。',
              },
              {
                tag: '餐飲消閒',
                title: '真好城迎新購物折',
                desc: '商戶指定櫃位享 5% 現金回贈及消費累積雙倍積分計劃。',
              },
            ].map((archive, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#e4deeb] space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#5a5563] font-medium">{archive.tag}</span>
                  <span className="text-[#5a5563]/60 bg-[#f6f1fd] px-2 py-0.5 rounded">
                    活動已圓滿結束
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#1d192e]">{archive.title}</h4>
                <p className="text-xs text-[#5a5563] font-light leading-relaxed">{archive.desc}</p>
                <span className="inline-block text-xs font-semibold text-[#372274] hover:text-[#E83375] transition-colors cursor-pointer">
                  查看條款細則記錄 →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
