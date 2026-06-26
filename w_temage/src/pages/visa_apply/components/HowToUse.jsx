import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function HowToUse() {
    const [activeTab, setActiveTab] = useState('activate');
    const [currentStep, setCurrentStep] = useState(0);
    const [activeVdoTab, setActiveVdoTab] = useState('Request Numberless Card');
    const [activeAppTab, setActiveAppTab] = useState('Regular Income Earner');
    const [activeSubTab, setActiveSubTab] = useState('Supplementary Card');

    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out',
        });
    }, []);

    useEffect(() => {
        setCurrentStep(0);
    }, [activeTab]);

    const tabs = [
        { id: 'activate', label: 'Activate Digital Card' },
        { id: 'view_info', label: 'View Card Info' },
        { id: 'activation', label: 'Activation Physical card' },
        { id: 'link_card', label: 'Link Card' },
        { id: 'qr_pay', label: 'QR Pay' },
    ];

    const tabContent = {
        activate: {
            steps: [
                { title: '1. Select KTC Card then select "Activate"', img: 'https://placehold.co/300x600/1e293b/white?text=Step+1' },
                { title: '2. Read Term & Conditions and select "Accept"', img: 'https://placehold.co/300x600/334155/white?text=Step+2' },
                { title: '3. Enter your PIN to confirm', img: 'https://placehold.co/300x600/475569/white?text=Step+3' },
                { title: '4. Card Activation successful', img: 'https://placehold.co/300x600/10b981/white?text=Success' }
            ],
            faqs: [
                { question: 'How to activate the KTC DIGITAL credit card?', answer: 'Activate the KTC DIGITAL credit card by enable the Card-Not-Present spending limit via the KTC Mobile app. The Card can be used instantly after activated. adjust the Card-Not-Present spending limit, go to the "Spending Control" menu via the KTC Mobile app.' },
                { question: 'Where can the KTC DIGITAL credit card be used?', answer: 'All types of Card-Not-Present transactions\nLink the cards to the Wallet application.\nLink the cards to Device Payment services.' }
            ]
        },
        view_info: {
            steps: [
                { title: '1. Select "Card Info"', img: 'https://placehold.co/300x600/1e293b/white?text=Info+Step+1' },
                { title: '2. Enter PIN to view details securely', img: 'https://placehold.co/300x600/334155/white?text=Info+Step+2' }
            ],
            faqs: [
                { question: 'How to view my digital card information?', answer: 'The card information shown on the KTC Mobile app includes: Cardholder Name, Card Name, Card Number, Expiration Date, CVV' },
                { question: 'Is it safe to view card details in the app?', answer: 'The CVV of the KTC DIGITAL credit card is dynamic, changing every time you request it.' }
            ]
        },
        activation: { steps: [{ title: '1. Enter physical card details', img: 'https://placehold.co/300x600/1e293b/white?text=Physical+Card' }], faqs: [] },
        link_card: { steps: [{ title: '1. Choose Wallet to link', img: 'https://placehold.co/300x600/1e293b/white?text=Link+Wallet' }], faqs: [] },
        qr_pay: { steps: [{ title: '1. Scan Merchant QR code', img: 'https://placehold.co/300x600/1e293b/white?text=Scan+QR' }], faqs: [] }
    };

    const currentData = tabContent[activeTab] || tabContent.activate;
    const nextStep = () => { if (currentStep < currentData.steps.length - 1) setCurrentStep(prev => prev + 1); };
    const prevStep = () => { if (currentStep > 0) setCurrentStep(prev => prev - 1); };

    const vdoCategories = ['Activate Digital Card', 'View Card Info', 'Request Numberless Card', 'Activate Numberless Card'];
    const vdoPlaylist = [
        { id: 1, title: 'Activate Digital Card', active: false },
        { id: 2, title: 'View Card Info', active: false },
        { id: 3, title: 'Request Numberless Card', active: true, desc: 'ວິທີເບິ່ງລາຍລະອຽດບັດ Numberless' },
        { id: 4, title: 'Activate Numberless Card', active: false }
    ];

    const appCategories = [
        'Regular Income Earner',
        'Business Owner',
        'Self-Employed Professional',
        'Savings Holder',
        'Rights Transferor Holder'
    ];

    const appContent = {
        'Regular Income Earner': {
            qualifications: [
                'Age : 20 – 80 years',
                'Minimum total income : 15,000 Baht/month',
                'Employed in the current job for at least 4 months'
            ],
            documents: [
                {
                    title: 'Identification documents',
                    items: ['Copy of National ID card']
                },
                {
                    title: 'Proof of income',
                    items: [
                        'Proof of income (at least one of the following) : Salary certificate, or latest salary slip (original), or withholding tax certificate (Form Bis. 50)',
                        'Copy of bank statements for the past 6 months and the first page of passbook, stating account holder\'s name and account number.'
                    ]
                }
            ],
            remark: 'KTC reserves the right to decline if your credit card was cancelled within less than 2 years (24 months)'
        },
        'Business Owner': {
            qualifications: [
                'Age : 20 – 80 years',
                'Minimum total income : 15,000 Baht/month',
                'Owned and operated a business established and registered in Thailand for at least 2 years'
            ],
            documents: [
                {
                    title: 'Identification documents',
                    items: ['Copy of National ID card']
                },
                {
                    title: 'Proof of income',
                    items: [
                        'Copy of personal bank statements for the past 6 months and the first page of passbook, stating account holder\'s name and account number; OR Copy of the corporate bank account statement for the past 6 months and the first page of passbook, stating company\'s name and account number with a copy of the shareholder list (the applicant must hold at least 50% of shares)',
                        'Copy of the company registration certificate, including the last page stating the business objectives, or a commercial registration (if applicable)'
                    ]
                }
            ],
            remark: 'KTC reserves the right to decline if your credit card was cancelled within less than 2 years (24 months)'
        },
        'Self-Employed Professional': {
            qualifications: [
                'Thai Nationals only',
                'Age : 20 – 80 years',
                'Minimum total income : 20,000 Baht/month'
            ],
            documents: [
                {
                    title: 'Identification documents',
                    items: ['Copy of National ID card']
                },
                {
                    title: 'Proof of income',
                    items: [
                        'Copy of personal bank statements for the past 6 months and the first page of passbook, stating account holder\'s name and account number',
                        'Withholding tax certificate (Form Bis.50)'
                    ]
                }
            ],
            remark: 'KTC reserves the right to decline if your credit card was cancelled within less than 2 years (24 months)'
        },
        'Savings Holder': {
            qualifications: [
                'Age : 20 – 80 years',
                'Have deposits/investments for at least 6 months in one or a combination of the following;',
            ],
            qualificationsSub: [
                'Have fixed bank deposit for a continuous period of 6 months with a minimum balance of 500,000 Baht, or',
                'Have fixed deposit in a savings cooperative for a continuous period of 6 months with a minimum balance of 1,000,000 Baht, or',
                'Have any of or a combination of savings account, fixed deposit account, GSB (Government Savings Bank) lottery savings bond, BAAC (Bank for Agriculture and Agricultural Cooperatives) lottery savings bond, government bond, corporate debenture, or mutual fund for a continuous period of 6 months with a total balance of at least 1,000,000 Baht, or',
                'Have account investing in private funds with a minimum investment period of 6 months and a value of no less than 1,000,000 Bath'
            ],
            documents: [
                {
                    title: 'Identification documents',
                    items: ['Copy of National ID card']
                },
                {
                    title: 'Identification documents',
                    items: [
                        'Copy of bank deposit statement or investment statement for the past 6 months and the first page of passbook stating account holder\'s name and account number, in one or a combination of the following;',
                    ],
                    subItems: [
                        'Copy of fixed bank deposit statement for a continuous period of 6 months with a minimum balance of 500,000 Baht or',
                        'Copy of fixed savings cooperative deposit statement for a continuous period of 6 months with a minimum balance of 1,000,000 Baht, or',
                        'Copy of any of or a combination of savings account, fixed deposit account, GSB (Government Savings Bank) lottery savings bond, BAAC (Bank for Agriculture and Agricultural Cooperatives) lottery savings bond, government bond*, corporate debenture**, or mutual fund for a continuous period of 6 months with a total balance of at least 1,000,000 Baht, or',
                        'Copy of account investing in private funds for a continuous period of at least 6 months with a balance of at least 1,000,000 Baht'
                    ],
                    footnotes: [
                        '* Government bond: Attach proof of latest interest payment (50 bis).',
                        '** Corporate debenture: Attach copies of the front and back plus proof of latest interest payment (50 bis).'
                    ]
                }
            ],
            remark: 'KTC reserves the right to decline if your credit card was cancelled within less than 2 years (24 months)'
        },
        'Rights Transferor Holder': {
            qualifications: [
                'Age : 20 – 80 years'
            ],
            documents: [
                {
                    title: 'Identification documents',
                    items: ['Copy of National ID card']
                },
                {
                    title: 'Supporting documents',
                    items: [
                        'Assignment of Deposit Account Rights Agreement for amounts ranging from 20,000 to 1,000,000 Baht (Conditions apply based on the type of credit card application, and the agreement must be made at Krungthai Bank only)'
                    ]
                }
            ],
            remark: 'KTC reserves the right to decline if your credit card was cancelled within less than 2 years (24 months)'
        }
    };

    const gradientBg = 'linear-gradient(135deg, #172554 0%, #0f172a 40%, #9a3412 100%)';

    return (
        <div className="w-full font-sans overflow-hidden">

            {/* ========================================================
                Section 1: How To Use
            ======================================================== */}
            <div style={{ background: gradientBg }} className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12" data-aos="fade-down">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">How to use</h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 mb-10" data-aos="fade-up" data-aos-delay="100">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                                    activeTab === tab.id
                                        ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/40'
                                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-12 border border-white/10 shadow-2xl" data-aos="zoom-in" data-aos-delay="200">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                            <div className="flex flex-col items-center lg:items-start" data-aos="fade-right" data-aos-delay="300">
                                <div className="h-20 flex items-center">
                                    <h3 className="text-2xl font-bold text-orange-400 text-center lg:text-left transition-all duration-300">
                                        {currentData.steps[currentStep]?.title}
                                    </h3>
                                </div>
                                <div className="relative w-[280px] mt-4">
                                    <div className="border-[6px] border-gray-800 rounded-[2.5rem] overflow-hidden bg-black aspect-[9/19] relative shadow-2xl">
                                        <div className="flex transition-transform duration-500 ease-in-out h-full" style={{ transform: `translateX(-${currentStep * 100}%)` }}>
                                            {currentData.steps.map((step, idx) => (
                                                <div key={idx} className="w-full h-full flex-shrink-0 bg-gray-900">
                                                    <img src={step.img} alt={`Step ${idx + 1}`} className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {currentData.steps.length > 1 && (
                                        <div className="flex justify-between items-center mt-6 px-4">
                                            <button onClick={prevStep} disabled={currentStep === 0} className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${currentStep === 0 ? 'opacity-30 cursor-not-allowed text-gray-500 bg-gray-800' : 'bg-gray-700 hover:bg-orange-500 text-white'}`}>&#8592;</button>
                                            <div className="flex gap-2">
                                                {currentData.steps.map((_, idx) => (
                                                    <span key={idx} className={`h-2 rounded-full transition-all duration-300 ${idx === currentStep ? 'w-6 bg-orange-500' : 'w-2 bg-gray-500'}`} />
                                                ))}
                                            </div>
                                            <button onClick={nextStep} disabled={currentStep === currentData.steps.length - 1} className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${currentStep === currentData.steps.length - 1 ? 'opacity-30 cursor-not-allowed text-gray-500 bg-gray-800' : 'bg-gray-700 hover:bg-orange-500 text-white'}`}>&#8594;</button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-black/20 rounded-2xl p-6 lg:p-8 border border-white/5 w-full mt-12 lg:mt-0" data-aos="fade-left" data-aos-delay="400">
                                <h3 className="text-xl font-bold mb-6 flex items-center text-white">
                                    <svg className="w-6 h-6 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    FAQs
                                </h3>
                                <div className="space-y-5">
                                    {currentData.faqs.length > 0 ? (
                                        currentData.faqs.map((faq, index) => (
                                            <div key={index} className={`pb-5 ${index !== currentData.faqs.length - 1 ? 'border-b border-white/10' : ''}`}>
                                                <h4 className="font-semibold text-orange-300 mb-2">{faq.question}</h4>
                                                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{faq.answer}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-400 text-sm">ບໍ່ມີຂໍ້ມູນ FAQ ສຳລັບໜ້ານີ້</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* ========================================================
                Section 2: VDO How to use
            ======================================================== */}
            <div className="bg-slate-900 py-16 px-4 sm:px-6 lg:px-8 text-white border-t border-white/10">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" data-aos="fade-up">VDO How to use</h2>

                    <div className="flex flex-nowrap overflow-x-auto justify-start md:justify-center gap-4 mb-8 pb-2" data-aos="fade-up" data-aos-delay="100">
                        {vdoCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveVdoTab(cat)}
                                className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-300 ${
                                    activeVdoTab === cat
                                        ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/40'
                                        : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10'
                                }`}
                            >
                                {activeVdoTab === cat && (
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                )}
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-grow bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center min-h-[300px] lg:min-h-[450px]" data-aos="fade-right" data-aos-delay="200">
                            <svg className="w-16 h-16 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="w-full lg:w-80 flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden" data-aos="fade-left" data-aos-delay="300">
                            <div className="p-4 bg-white/5 border-b border-white/10">
                                <h3 className="font-bold text-white">See more video</h3>
                            </div>
                            <div className="overflow-y-auto max-h-[300px] lg:max-h-[400px]">
                                {vdoPlaylist.map((item) => (
                                    <div key={item.id} className={`flex gap-4 p-4 cursor-pointer transition-colors border-b border-white/5 last:border-0 ${item.active ? 'bg-orange-600/20' : 'hover:bg-white/5'}`}>
                                        <div className="mt-1 flex-shrink-0">
                                            <svg className={`w-5 h-5 ${item.active ? 'text-orange-400' : 'text-white/30'}`} fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className={`text-sm font-medium leading-snug ${item.active ? 'text-orange-300' : 'text-gray-200'}`}>{item.title}</h4>
                                            {item.desc && <p className="text-xs text-gray-400 mt-1">{item.desc}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* ========================================================
                Section 3: Application details
            ======================================================== */}
            <div className="bg-slate-900 py-16 px-4 sm:px-6 lg:px-8 text-white border-t border-white/10">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-8" data-aos="fade-down">Application details</h2>

                    {/* App Category Tabs */}
                    <div className="flex flex-nowrap overflow-x-auto justify-start md:justify-center gap-2 mb-10 pb-2" data-aos="fade-up" data-aos-delay="100">
                        {appCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveAppTab(cat)}
                                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                    activeAppTab === cat
                                        ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/40'
                                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* App Content */}
                    {(() => {
                        const content = appContent[activeAppTab];
                        if (!content) return null;
                        return (
                            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-10 border border-white/10 shadow-2xl mb-8" data-aos="fade-up" data-aos-delay="200">
                                {/* Qualifications */}
                                <div className="mb-8" data-aos="fade-right" data-aos-delay="300">
                                    <h3 className="font-bold text-lg mb-4 text-white">Qualifications</h3>
                                    <ul className="space-y-2 text-sm text-gray-300">
                                        {content.qualifications.map((q, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0"></span>
                                                <span>{q}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {content.qualificationsSub && (
                                        <ul className="mt-2 ml-4 space-y-2 text-sm text-gray-300">
                                            {content.qualificationsSub.map((q, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400/50 flex-shrink-0"></span>
                                                    <span>{q}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                {/* Documents */}
                                <div className="mb-6" data-aos="fade-right" data-aos-delay="400">
                                    <h3 className="font-bold text-lg mb-4 text-white">Documents</h3>
                                    <div className="space-y-5">
                                        {content.documents.map((doc, di) => (
                                            <div key={di}>
                                                <h4 className="text-sm font-semibold text-orange-300 underline mb-2">{doc.title}</h4>
                                                <ul className="space-y-2 text-sm text-gray-300">
                                                    {doc.items.map((item, ii) => (
                                                        <li key={ii} className="flex items-start gap-2">
                                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0"></span>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                {doc.subItems && (
                                                    <ul className="mt-2 ml-4 space-y-2 text-sm text-gray-300">
                                                        {doc.subItems.map((sub, si) => (
                                                            <li key={si} className="flex items-start gap-2">
                                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400/50 flex-shrink-0"></span>
                                                                <span>{sub}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                                {doc.footnotes && (
                                                    <div className="mt-3 space-y-1">
                                                        {doc.footnotes.map((fn, fi) => (
                                                            <p key={fi} className="text-xs text-gray-500 italic">{fn}</p>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Remark */}
                                {content.remark && (
                                    <p className="text-xs text-gray-500 italic border-t border-white/10 pt-4" data-aos="fade-up" data-aos-delay="500">{`Remark: ${content.remark}`}</p>
                                )}
                            </div>
                        );
                    })()}

                    {/* Sub Tabs */}
                    <div className="flex justify-center gap-6 border-b border-white/10" data-aos="fade-up">
                        {['Supplementary Card', 'Foreigner Details'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveSubTab(tab)}
                                className={`pb-3 text-sm font-medium transition-colors ${
                                    activeSubTab === tab ? 'text-white border-b-2 border-orange-500' : 'text-gray-400 hover:text-gray-200'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}