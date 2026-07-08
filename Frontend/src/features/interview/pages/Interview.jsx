import React, { useState, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className='bg-[#fcfcfc] border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-gray-300 shadow-[0_1px_3px_rgba(0,0,0,0.02)]'>
            <div className='flex items-start gap-3.5 py-4 px-5 cursor-pointer select-none' onClick={() => setOpen(o => !o)}>
                <span className='shrink-0 text-[0.7rem] font-bold text-orange-600 bg-orange-50 border border-orange-200/50 rounded-lg py-1 px-2 mt-0.5'>
                    Q{index + 1}
                </span>
                <p className='flex-1 m-0 text-[0.92rem] font-semibold text-gray-900 leading-relaxed'>{item.question}</p>
                <span className={`shrink-0 text-gray-400 transition-transform duration-200 mt-1 ${open ? 'rotate-180 text-orange-500' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className='px-5 pb-5 flex flex-col gap-4 border-t border-gray-100 pt-4 bg-white'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-[0.68rem] font-bold uppercase tracking-wider w-fit py-1 px-2.5 rounded-md text-purple-600 bg-purple-50 border border-purple-100'>
                            Intention
                        </span>
                        <p className='m-0 text-[0.875rem] text-gray-600 leading-relaxed'>{item.intention}</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-[0.68rem] font-bold uppercase tracking-wider w-fit py-1 px-2.5 rounded-md text-emerald-600 bg-emerald-50 border border-emerald-100'>
                            Model Answer
                        </span>
                        <p className='m-0 text-[0.875rem] text-gray-600 leading-relaxed'>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='roadmap-day flex flex-col gap-2.5 py-4 pl-14'>
        <div className='flex items-center gap-3'>
            <span className='text-[0.7rem] font-bold text-orange-600 bg-orange-50 border border-orange-200 py-1 px-3 rounded-full'>
                Day {day.day}
            </span>
            <h3 className='m-0 text-[0.98rem] font-bold text-gray-900'>{day.focus}</h3>
        </div>
        <ul className='list-none m-0 p-0 flex flex-col gap-2'>
            {day.tasks.map((task, i) => (
                <li key={i} className='flex items-start gap-2.5 text-[0.875rem] text-gray-500 leading-relaxed'>
                    <span className='shrink-0 w-1.5 h-1.5 rounded-full bg-gray-400 mt-2.5' />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { handleLogout } = useAuth()
    const { interviewId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [interviewId])

    if (loading || !report) {
        return (
            <main className='min-h-screen w-full flex flex-col items-center justify-center bg-white'>
                <div className="w-10 h-10 border-[3px] border-orange-200 border-t-orange-500 rounded-full animate-spin" />
                <p className='text-gray-400 text-sm mt-4'>Loading your interview plan...</p>
            </main>
        )
    }

    const scoreColor =
        report.matchScore >= 80 ? 'border-emerald-500 text-emerald-600 bg-emerald-50/20' :
            report.matchScore >= 60 ? 'border-amber-500 text-amber-600 bg-amber-50/20' : 'border-red-500 text-red-600 bg-red-50/20'

    return (
        <div className='w-full min-h-screen bg-white relative overflow-hidden flex flex-col'>

            {/* Decorative blurs */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />

            {/* Top bar */}
            <nav className='relative z-10 flex items-center justify-between px-8 py-5 w-full max-w-[1280px] mx-auto'>
                <div className='flex items-center gap-3 cursor-pointer' onClick={() => navigate('/')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800 hover:text-orange-500 transition-colors">
                        <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                    </svg>
                    <h2 className='text-lg font-bold text-gray-900'>
                        Job<span className='text-orange-500'>Helper</span>
                    </h2>
                </div>
                <button
                    onClick={handleLogout}
                    className='text-sm text-gray-400 hover:text-gray-900 transition-colors cursor-pointer bg-transparent border-none font-medium'
                >
                    Log out
                </button>
            </nav>

            {/* Main Content Area */}
            <div className='relative z-10 flex-1 flex w-full max-w-[1280px] mx-auto px-6 pb-12'>
                <div className='flex w-full bg-white border border-gray-200 rounded-2xl justify-between shadow-[0_2px_24px_rgba(0,0,0,0.04)] overflow-hidden min-h-[550px]'>

                    {/* ── Left Nav ── */}
                    <nav className='w-[240px] shrink-0 py-8 px-4 flex flex-col justify-between gap-4 border-r border-gray-150 bg-[#fafafa]'>
                        <div className="flex flex-col gap-1">
                            <p className='text-[0.68rem] font-bold uppercase tracking-wider text-gray-400 px-3 mb-3'>Sections</p>
                            {NAV_ITEMS.map(item => (
                                <button
                                    key={item.id}
                                    className={`flex items-center gap-3 w-full py-3 px-4 bg-transparent border-none rounded-xl font-sans text-[0.875rem] font-semibold cursor-pointer text-left transition-all duration-150
                                        ${activeNav === item.id
                                            ? 'bg-orange-50 text-orange-600 border border-orange-100'
                                            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-transparent'
                                        }`}
                                    onClick={() => setActiveNav(item.id)}
                                >
                                    <span className={`flex items-center shrink-0 ${activeNav === item.id ? 'text-orange-500' : 'text-gray-400'}`}>
                                        {item.icon}
                                    </span>
                                    {item.label}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => getResumePdf(interviewId)}
                            className='flex items-center justify-center gap-2 border-none outline-none px-6 py-3.5 rounded-full cursor-pointer transition-all duration-300 bg-orange-500 hover:bg-orange-600 text-white font-sans text-xs font-bold shadow-[0_4px_12px_rgba(249,115,22,0.25)] hover:shadow-[0_6px_16px_rgba(249,115,22,0.35)] active:scale-95'
                        >
                            <svg height="0.8rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
                            Download Resume
                        </button>
                    </nav>

                    {/* ── Center Content ── */}
                    <main className='flex-1 py-8 px-9 overflow-y-auto max-h-[calc(100vh-8rem)] pb-20 bg-white'>
                        {activeNav === 'technical' && (
                            <section className='min-h-full'>
                                <div className='flex items-baseline gap-3.5 mb-7 pb-4 border-b border-gray-150'>
                                    <h2 className='text-[1.15rem] font-bold text-gray-900 m-0'>Technical Questions</h2>
                                    <span className='text-[0.78rem] font-semibold text-orange-600 bg-orange-50 border border-orange-100 py-0.5 px-3 rounded-full'>
                                        {report.technicalQuestions.length} questions
                                    </span>
                                </div>
                                <div className='flex flex-col gap-3.5'>
                                    {report.technicalQuestions.map((q, i) => (
                                        <QuestionCard key={i} item={q} index={i} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeNav === 'behavioral' && (
                            <section className='min-h-full'>
                                <div className='flex items-baseline gap-3.5 mb-7 pb-4 border-b border-gray-150'>
                                    <h2 className='text-[1.15rem] font-bold text-gray-900 m-0'>Behavioral Questions</h2>
                                    <span className='text-[0.78rem] font-semibold text-orange-600 bg-orange-50 border border-orange-100 py-0.5 px-3 rounded-full'>
                                        {report.behavioralQuestions.length} questions
                                    </span>
                                </div>
                                <div className='flex flex-col gap-3.5'>
                                    {report.behavioralQuestions.map((q, i) => (
                                        <QuestionCard key={i} item={q} index={i} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeNav === 'roadmap' && (
                            <section className='min-h-full'>
                                <div className='flex items-baseline gap-3.5 mb-7 pb-4 border-b border-gray-150'>
                                    <h2 className='text-[1.15rem] font-bold text-gray-900 m-0'>Preparation Road Map</h2>
                                    <span className='text-[0.78rem] font-semibold text-orange-600 bg-orange-50 border border-orange-100 py-0.5 px-3 rounded-full'>
                                        {report.preparationPlan.length}-day plan
                                    </span>
                                </div>
                                <div className='roadmap-list flex flex-col'>
                                    {report.preparationPlan.map((day) => (
                                        <RoadMapDay key={day.day} day={day} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </main>

                    {/* ── Right Sidebar ── */}
                    <aside className='w-[250px] shrink-0 py-8 px-6 flex flex-col gap-6 border-l border-gray-150 bg-[#fafafa]'>

                        {/* Match Score */}
                        <div className='flex flex-col items-center gap-3.5'>
                            <p className='text-[0.68rem] font-bold uppercase tracking-wider text-gray-400 m-0 self-start'>Match Score</p>
                            <div className={`w-[96px] h-[96px] rounded-full flex flex-col items-center justify-center border-4 shadow-sm ${scoreColor}`}>
                                <span className='text-[1.8rem] font-black leading-none'>{report.matchScore}</span>
                                <span className='text-[0.7rem] font-bold uppercase mt-0.5 opacity-80'>%</span>
                            </div>
                            <p className='m-0 text-xs font-semibold text-gray-500 text-center leading-relaxed'>
                                {report.matchScore >= 80 ? 'Excellent match for this role' : report.matchScore >= 60 ? 'Good match with some gaps' : 'Requires significant preparation'}
                            </p>
                        </div>

                        <div className='h-px bg-gray-200' />

                        {/* Skill Gaps */}
                        <div className='flex flex-col gap-3.5'>
                            <p className='text-[0.68rem] font-bold uppercase tracking-wider text-gray-400 m-0'>Skill Gaps</p>
                            <div className='flex flex-wrap gap-2'>
                                {report.skillGaps.map((gap, i) => (
                                    <span
                                        key={i}
                                        className={`text-[0.75rem] font-semibold py-1 px-3 rounded-full border cursor-default
                                            ${gap.severity === 'high'
                                                ? 'text-red-650 bg-red-50 border-red-200/60'
                                                : gap.severity === 'medium'
                                                    ? 'text-amber-600 bg-amber-50 border-amber-200/60'
                                                    : 'text-emerald-600 bg-emerald-50 border-emerald-200/60'
                                            }`}
                                    >
                                        {gap.skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </aside>
                </div>
            </div>
        </div>
    )
}

export default Interview