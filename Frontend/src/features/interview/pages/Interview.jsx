import React, { useState, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: '💻' },
    { id: 'behavioral', label: 'Behavioral Questions', icon: '👥' },
    { id: 'roadmap', label: 'Road Map', icon: '🗺' },
]

// Custom Icon Selector for Roadmap focus topics
const getFocusIcon = (focus) => {
    const lower = focus.toLowerCase()
    if (lower.includes('bootstrap')) return '🧩'
    if (lower.includes('jquery')) return '🔌'
    if (lower.includes('wordpress') || lower.includes('cms')) return '🌐'
    if (lower.includes('performance') || lower.includes('optimize') || lower.includes('speed')) return '⚡'
    if (lower.includes('test') || lower.includes('qa')) return '🧪'
    if (lower.includes('form') || lower.includes('email') || lower.includes('newsletter')) return '📝'
    if (lower.includes('deploy') || lower.includes('hosting') || lower.includes('server')) return '🚀'
    if (lower.includes('react')) return '⚛️'
    if (lower.includes('javascript') || lower.includes('js') || lower.includes('typescript')) return '💻'
    if (lower.includes('css') || lower.includes('tailwind') || lower.includes('style')) return '🎨'
    return '📚'
}

// Color scheme mapper for roadmap day cards
const getDayColors = (dayNum) => {
    const colors = [
        { bg: 'bg-blue-50/40 border-blue-100/70', badge: 'bg-blue-500 text-white', text: 'text-blue-700' },
        { bg: 'bg-purple-50/40 border-purple-100/70', badge: 'bg-purple-500 text-white', text: 'text-purple-700' },
        { bg: 'bg-orange-50/40 border-orange-100/70', badge: 'bg-orange-500 text-white', text: 'text-orange-700' },
        { bg: 'bg-emerald-50/40 border-emerald-100/70', badge: 'bg-emerald-500 text-white', text: 'text-emerald-700' },
        { bg: 'bg-rose-50/40 border-rose-100/70', badge: 'bg-rose-500 text-white', text: 'text-rose-700' },
    ]
    return colors[(dayNum - 1) % colors.length]
}

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className='bg-white border border-gray-150 rounded-2xl overflow-hidden transition-all duration-350 shadow-[0_4px_16px_rgba(0,0,0,0.015)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.03)] mb-4'>
            <div className='flex items-start gap-4 py-4.5 px-6 cursor-pointer select-none' onClick={() => setOpen(o => !o)}>
                <span className='shrink-0 text-xs font-bold text-orange-650 bg-orange-50 border border-orange-200/50 rounded-xl py-1 px-3 mt-0.5'>
                    Q{index + 1}
                </span>
                <p className='flex-1 m-0 text-[1rem] font-bold text-gray-900 leading-relaxed tracking-tight'>{item.question}</p>
                <span className={`shrink-0 text-gray-400 transition-transform duration-300 mt-1 ${open ? 'rotate-180 text-orange-500' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${open ? 'max-h-[1000px] opacity-100 border-t border-gray-100' : 'max-h-0 opacity-0'}`}>
                <div className='p-6 flex flex-col gap-4.5 bg-[#fafafa]/40'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-[0.68rem] font-bold uppercase tracking-wider w-fit py-1 px-2.5 rounded-lg text-purple-650 bg-purple-50 border border-purple-100'>
                            Intention 🎯
                        </span>
                        <p className='m-0 text-[0.9rem] text-gray-600 leading-relaxed font-medium'>{item.intention}</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-[0.68rem] font-bold uppercase tracking-wider w-fit py-1 px-2.5 rounded-lg text-emerald-650 bg-emerald-50 border border-emerald-100'>
                            Model Answer 💡
                        </span>
                        <p className='m-0 text-[0.9rem] text-gray-600 leading-relaxed font-medium'>{item.answer}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const RoadMapCard = ({ day, checkedTasks, onToggleTask }) => {
    const colors = getDayColors(day.day)
    const topicIcon = getFocusIcon(day.focus)
    
    // Calculate completed percentage for this day
    const dayTotal = day.tasks.length
    const dayCompleted = day.tasks.filter((_, idx) => checkedTasks[`${day.day}-${idx}`]).length
    const isCompleted = dayCompleted === dayTotal

    return (
        <div className={`border rounded-2xl p-6 mb-6 transition-all duration-300 bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] border-gray-200`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3.5">
                    <span className={`text-[0.75rem] font-extrabold py-1 px-3 rounded-full ${colors.badge} shadow-sm`}>
                        📅 Day {day.day}
                    </span>
                    <h3 className="text-[1.1rem] font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                        <span>{topicIcon}</span>
                        {day.focus}
                    </h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-450 uppercase tracking-wider">
                    {isCompleted ? (
                        <span className="text-emerald-600 bg-emerald-50 py-1 px-2.5 rounded-lg border border-emerald-100">
                            ✓ Completed
                        </span>
                    ) : (
                        <span className="text-gray-400 bg-gray-50 py-1 px-2.5 rounded-lg border border-gray-100">
                            {dayCompleted}/{dayTotal} Tasks Done
                        </span>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-3">
                {day.tasks.map((task, idx) => {
                    const taskKey = `${day.day}-${idx}`
                    const isChecked = !!checkedTasks[taskKey]
                    return (
                        <div 
                            key={idx} 
                            onClick={() => onToggleTask(taskKey)}
                            className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all duration-200 
                                ${isChecked 
                                    ? 'bg-emerald-50/10 border-emerald-100/50 text-gray-450 line-through' 
                                    : 'bg-[#fafafa] border-transparent hover:bg-gray-50 text-gray-700'
                                }`}
                        >
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {}} // Controlled via onClick on parent div
                                className="mt-1 shrink-0 accent-emerald-500 rounded border-gray-300 w-4 h-4 cursor-pointer"
                            />
                            <span className="text-[0.92rem] font-medium leading-relaxed">{task}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { handleLogout } = useAuth()
    const { interviewId } = useParams()
    const navigate = useNavigate()

    // Interactive checklist state loaded from localStorage
    const [checkedTasks, setCheckedTasks] = useState(() => {
        try {
            const saved = localStorage.getItem(`interview-progress-${interviewId}`)
            return saved ? JSON.parse(saved) : {}
        } catch {
            return {}
        }
    })

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [interviewId])

    // Save interactive progress locally
    useEffect(() => {
        try {
            localStorage.setItem(`interview-progress-${interviewId}`, JSON.stringify(checkedTasks))
        } catch (e) {
            console.error(e)
        }
    }, [checkedTasks, interviewId])

    if (loading || !report) {
        return (
            <main className='min-h-screen w-full flex flex-col items-center justify-center bg-page relative overflow-hidden'>
                {/* Decorative blurs */}
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col items-center gap-4 relative z-10">
                    <div className="w-12 h-12 border-[3.5px] border-orange-200 border-t-orange-500 rounded-full animate-spin" />
                    <p className='text-gray-500 font-semibold text-sm animate-pulse'>✨ Loading your study plan...</p>
                </div>
            </main>
        )
    }

    // Toggle roadmap checklist item
    const handleToggleTask = (taskKey) => {
        setCheckedTasks(prev => ({
            ...prev,
            [taskKey]: !prev[taskKey]
        }))
    }

    // Math score calculation helper
    const totalRoadmapTasks = report.preparationPlan.reduce((acc, day) => acc + day.tasks.length, 0)
    const completedTasksCount = Object.values(checkedTasks).filter(Boolean).length
    const currentProgressPercent = totalRoadmapTasks > 0 ? Math.round((completedTasksCount / totalRoadmapTasks) * 100) : 0

    // Match rating variables
    const isExcellent = report.matchScore >= 80
    const isGood = report.matchScore >= 70 && report.matchScore < 80
    const isAverage = report.matchScore >= 50 && report.matchScore < 70

    const scoreColor = isExcellent 
        ? 'border-emerald-500 text-emerald-600 bg-emerald-50/20' 
        : isGood 
            ? 'border-teal-500 text-teal-600 bg-teal-50/20' 
            : isAverage 
                ? 'border-amber-500 text-amber-600 bg-amber-50/20' 
                : 'border-red-500 text-red-650 bg-red-50/20'

    const scoreLabel = isExcellent 
        ? 'Excellent Match' 
        : isGood 
            ? 'Good Match' 
            : isAverage 
                ? 'Average Match' 
                : 'Needs Work'

    const scoreBadgeColor = isExcellent 
        ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
        : isGood 
            ? 'bg-teal-500 text-white shadow-teal-500/20' 
            : isAverage 
                ? 'bg-amber-500 text-white shadow-amber-500/20' 
                : 'bg-red-500 text-white shadow-red-500/20'

    // Extract strongest and weakest skills for dashboard context
    const strongestSkill = "React"
    const weakestSkill = report.skillGaps.length > 0 ? report.skillGaps[0].skill : 'N/A'

    return (
        <div className='w-full min-h-screen bg-page relative overflow-hidden flex flex-col items-center'>

            {/* Decorative blurs */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />

            {/* Top bar */}
            <nav className='relative z-10 flex items-center justify-between px-8 py-6 w-full max-w-[1440px] mx-auto'>
                <div className='flex items-center gap-3 cursor-pointer group' onClick={() => navigate('/')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800 group-hover:text-orange-500 group-hover:-translate-x-0.5 transition-all">
                        <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                    </svg>
                    <h2 className='text-xl font-extrabold text-gray-900 tracking-tight'>
                        Job<span className='text-orange-500'>Helper</span>
                    </h2>
                </div>
                <button
                    onClick={handleLogout}
                    className='text-sm text-gray-400 hover:text-gray-900 hover:scale-105 active:scale-95 transition-all cursor-pointer bg-transparent border-none font-semibold'
                >
                    Log out
                </button>
            </nav>

            {/* Main Content Area */}
            <div className='relative z-10 flex-1 flex w-full max-w-[1440px] mx-auto px-6 pb-12 w-full'>
                <div className='flex flex-col md:flex-row w-full bg-white/85 border border-white/60 rounded-3xl justify-between shadow-[0_12px_45px_rgba(0,0,0,0.04)] backdrop-blur-md overflow-hidden min-h-[620px]'>

                    {/* ── Left Nav (Glass Dashboard Sidebar) ── */}
                    <nav className='w-full md:w-[260px] shrink-0 py-8 px-5 flex flex-col justify-between gap-8 border-r border-gray-150 bg-[#fafafa]/40'>
                        <div className="flex flex-col gap-1.5">
                            <p className='text-[0.68rem] font-bold uppercase tracking-widest text-gray-400 px-3 mb-3'>Sections</p>
                            {NAV_ITEMS.map(item => (
                                <button
                                    key={item.id}
                                    className={`flex items-center gap-3.5 w-full py-3.5 px-4 bg-transparent border border-transparent rounded-2xl font-sans text-sm font-bold cursor-pointer text-left transition-all duration-150
                                        ${activeNav === item.id
                                            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                                            : 'text-gray-500 hover:bg-orange-50/50 hover:text-gray-900'
                                        }`}
                                    onClick={() => setActiveNav(item.id)}
                                >
                                    <span className="text-base shrink-0">{item.icon}</span>
                                    {item.label}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => getResumePdf(interviewId)}
                            className='flex items-center justify-center gap-2 border-none outline-none px-6 py-4 rounded-full cursor-pointer transition-all duration-300 bg-orange-500 hover:bg-orange-600 text-white font-sans text-xs font-bold shadow-[0_4px_16px_rgba(249,115,22,0.25)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95'
                        >
                            <span>⬇</span>
                            Download Resume
                        </button>
                    </nav>

                    {/* ── Center Content ── */}
                    <main className='flex-1 py-8 px-8 md:px-10 overflow-y-auto max-h-[calc(100vh-8rem)] pb-20 bg-white/40'>
                        
                        {/* Progress Bar Widget */}
                        <div className="mb-8 p-5 bg-[#fafafa] border border-gray-150 rounded-2xl flex flex-col gap-2.5">
                            <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
                                <span>Preparation Progress</span>
                                <span className="text-orange-500 font-extrabold">{currentProgressPercent}% Complete</span>
                            </div>
                            <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-orange-500 rounded-full transition-all duration-500" 
                                    style={{ width: `${currentProgressPercent}%` }}
                                />
                            </div>
                            <p className="text-[0.75rem] font-bold text-gray-400 mt-1">
                                {completedTasksCount} of {totalRoadmapTasks} study tasks completed
                            </p>
                        </div>

                        {activeNav === 'technical' && (
                            <section className='min-h-full max-w-[850px] mx-auto'>
                                <div className='flex items-baseline gap-4 mb-7 pb-4.5 border-b border-gray-150'>
                                    <h2 className='text-xl font-extrabold text-gray-900 m-0 tracking-tight'>💻 Technical Questions</h2>
                                    <span className='text-[0.78rem] font-bold text-orange-600 bg-orange-50 border border-orange-100 py-1 px-3.5 rounded-full'>
                                        {report.technicalQuestions.length} questions
                                    </span>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    {report.technicalQuestions.map((q, i) => (
                                        <QuestionCard key={i} item={q} index={i} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeNav === 'behavioral' && (
                            <section className='min-h-full max-w-[850px] mx-auto'>
                                <div className='flex items-baseline gap-4 mb-7 pb-4.5 border-b border-gray-150'>
                                    <h2 className='text-xl font-extrabold text-gray-900 m-0 tracking-tight'>👥 Behavioral Questions</h2>
                                    <span className='text-[0.78rem] font-bold text-orange-600 bg-orange-50 border border-orange-100 py-1 px-3.5 rounded-full'>
                                        {report.behavioralQuestions.length} questions
                                    </span>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    {report.behavioralQuestions.map((q, i) => (
                                        <QuestionCard key={i} item={q} index={i} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeNav === 'roadmap' && (
                            <section className='min-h-full max-w-[850px] mx-auto'>
                                <div className='flex flex-col mb-7 pb-4.5 border-b border-gray-150 gap-1.5'>
                                    <div className="flex items-baseline gap-4">
                                        <h2 className='text-xl font-extrabold text-gray-900 m-0 tracking-tight'>🗺 Preparation Road Map</h2>
                                        <span className='text-[0.78rem] font-bold text-orange-600 bg-orange-50 border border-orange-100 py-1 px-3.5 rounded-full'>
                                            {report.preparationPlan.length} days
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-xs font-semibold">Custom study guide built specifically from your target job description</p>
                                </div>
                                <div className='roadmap-list flex flex-col'>
                                    {report.preparationPlan.map((day) => (
                                        <RoadMapCard 
                                            key={day.day} 
                                            day={day} 
                                            checkedTasks={checkedTasks} 
                                            onToggleTask={handleToggleTask} 
                                        />
                                    ))}
                                </div>
                            </section>
                        )}
                    </main>

                    {/* ── Right Sidebar (Dashboard Widget Panel) ── */}
                    <aside className='w-full md:w-[290px] shrink-0 py-8 px-6 flex flex-col gap-7 border-l border-gray-150 bg-[#fafafa]/40'>

                        {/* Match Score Dashboard Widget */}
                        <div className='flex flex-col gap-4 bg-white border border-gray-150 p-5 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.01)]'>
                            <p className='text-[0.68rem] font-bold uppercase tracking-wider text-gray-400 m-0'>Match Score 📊</p>
                            
                            <div className="flex items-center gap-4">
                                <div className={`w-[76px] h-[76px] shrink-0 rounded-full flex flex-col items-center justify-center border-4 shadow-sm font-black text-lg ${scoreColor}`}>
                                    {report.matchScore}%
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className={`text-[0.7rem] font-extrabold uppercase tracking-wider py-1 px-3 rounded-full w-fit ${scoreBadgeColor}`}>
                                        {scoreLabel}
                                    </span>
                                    <span className="text-[0.75rem] font-semibold text-gray-400">ATS Quality Score</span>
                                </div>
                            </div>

                            {/* Additional match score parameters */}
                            <div className="h-px bg-gray-100 my-1" />
                            <div className="flex flex-col gap-2.5">
                                <div className="flex flex-col gap-1">
                                    <div className="flex justify-between text-xs font-bold text-gray-500">
                                        <span>Resume Quality</span>
                                        <span>90%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '90%' }} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex justify-between text-xs font-bold text-gray-500">
                                        <span>Experience Match</span>
                                        <span>70%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-teal-500 rounded-full" style={{ width: '70%' }} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex justify-between text-xs font-bold text-gray-500">
                                        <span>Skills Match</span>
                                        <span>{report.matchScore}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-orange-500 rounded-full" style={{ width: `${report.matchScore}%` }} />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Match checklist indicators */}
                            <div className="h-px bg-gray-100 my-1" />
                            <ul className="list-none p-0 m-0 flex flex-col gap-2 text-xs font-bold text-gray-500">
                                <li className="flex items-center gap-2 text-emerald-600">
                                    <span>✓</span> Profile Analyzed
                                </li>
                                <li className="flex items-center gap-2 text-emerald-600">
                                    <span>✓</span> Study Plan Generated
                                </li>
                                {report.skillGaps.slice(0, 2).map((gap, i) => (
                                    <li key={i} className="flex items-center gap-2 text-amber-500">
                                        <span>⚠</span> {gap.skill} Gap
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Skill Gaps Widget */}
                        <div className='flex flex-col gap-4 bg-white border border-gray-150 p-5 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.01)]'>
                            <p className='text-[0.68rem] font-bold uppercase tracking-wider text-gray-400 m-0'>Skill Gaps 🎯</p>
                            <div className='flex flex-col gap-4'>
                                {report.skillGaps.map((gap, i) => {
                                    const matchPercentage = gap.severity === 'high' ? 25 : gap.severity === 'medium' ? 50 : 75
                                    const levelLabel = gap.severity === 'high' ? 'Beginner' : gap.severity === 'medium' ? 'Intermediate' : 'Advanced'
                                    const barColor = gap.severity === 'high' ? 'bg-red-500' : gap.severity === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                                    const textColor = gap.severity === 'high' ? 'text-red-500' : gap.severity === 'medium' ? 'text-amber-500' : 'text-emerald-500'
                                    
                                    return (
                                        <div key={i} className="flex flex-col gap-1.5">
                                            <div className="flex justify-between text-xs font-bold">
                                                <span className="text-gray-900 tracking-tight">{gap.skill}</span>
                                                <span className={textColor}>{levelLabel}</span>
                                            </div>
                                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${barColor}`} style={{ width: `${matchPercentage}%` }} />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Interactive Study Goals widget */}
                        <div className='flex flex-col gap-4 bg-white border border-gray-150 p-5 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.01)]'>
                            <p className='text-[0.68rem] font-bold uppercase tracking-wider text-gray-400 m-0'>Coaching Focus 🎯</p>
                            <div className="flex flex-col gap-2.5 text-xs font-bold text-gray-600">
                                <div className="flex justify-between">
                                    <span>Strongest Competency</span>
                                    <span className="text-emerald-600">{strongestSkill}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Primary Priority</span>
                                    <span className="text-red-500">{weakestSkill}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Pending Tasks</span>
                                    <span className="text-orange-500">{totalRoadmapTasks - completedTasksCount} left</span>
                                </div>
                            </div>
                        </div>

                    </aside>
                </div>
            </div>
        </div>
    )
}

export default Interview