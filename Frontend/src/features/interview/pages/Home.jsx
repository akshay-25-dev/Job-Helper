import React, { useState, useRef } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'

const Home = () => {

    const { loading, generateReport, reports } = useInterview()
    const { handleLogout } = useAuth()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [fileName, setFileName] = useState("")
    const [isDragging, setIsDragging] = useState(false)
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }

    const handleFileChange = () => {
        const file = resumeInputRef.current.files[0]
        setFileName(file ? file.name : "")
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            resumeInputRef.current.files = e.dataTransfer.files
            handleFileChange()
        }
    }

    if (loading) {
        return (
            <main className='min-h-screen w-full flex flex-col items-center justify-center bg-page relative overflow-hidden'>
                {/* Decorative blurs */}
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col items-center gap-4 relative z-10">
                    <div className="w-12 h-12 border-[3.5px] border-orange-200 border-t-orange-500 rounded-full animate-spin" />
                    <p className='text-gray-500 font-semibold text-sm animate-pulse'>✨ Generating your custom strategy...</p>
                </div>
            </main>
        )
    }

    return (
        <div className='w-full min-h-screen bg-page relative overflow-hidden flex flex-col'>

            {/* Decorative blurs */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />

            {/* Top bar */}
            <nav className='relative z-10 flex items-center justify-between px-8 py-6 w-full max-w-[1240px] mx-auto'>
                <h2 className='text-xl font-extrabold text-gray-900 tracking-tight'>
                    Job<span className='text-orange-500'>Helper</span>
                </h2>
                <button
                    onClick={handleLogout}
                    className='text-sm text-gray-400 hover:text-gray-900 hover:scale-105 active:scale-95 transition-all cursor-pointer bg-transparent border-none font-semibold'
                >
                    Log out
                </button>
            </nav>

            <div className='relative z-10 flex-1 flex flex-col items-center px-6 pb-20 gap-10 w-full max-w-[1240px] mx-auto'>

                {/* Header */}
                <header className='text-center mt-6 max-w-[700px]'>
                    <h1 className='text-[2.75rem] font-extrabold text-gray-900 tracking-tight leading-tight'>
                        Create Your Custom <span className='text-orange-500'>Interview Plan</span>
                    </h1>
                    <p className='text-gray-500 text-lg leading-relaxed mt-4 font-medium'>
                        Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                    </p>
                </header>

                {/* Main Card */}
                <div className='w-full bg-white/80 border border-white/60 rounded-3xl overflow-hidden shadow-[0_12px_45px_rgba(0,0,0,0.04)] backdrop-blur-md'>
                    <div className='flex flex-col md:flex-row min-h-[500px]'>

                        {/* Left Panel */}
                        <div className='flex-1 flex flex-col gap-5 p-8 relative bg-white/40'>
                            <div className='flex items-center gap-3 mb-1'>
                                <span className='flex items-center text-orange-500 p-2 bg-orange-50 rounded-xl'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                                </span>
                                <h2 className='text-[1rem] font-bold text-gray-900 flex-1 tracking-tight'>Target Job Description</h2>
                                <span className='text-[0.68rem] font-bold py-1 px-3 rounded-full uppercase tracking-wider bg-orange-50 text-orange-500 border border-orange-100'>
                                    Required
                                </span>
                            </div>
                            <textarea
                                onChange={(e) => setJobDescription(e.target.value)}
                                className='flex-1 w-full min-h-[300px] md:min-h-0 bg-[#f8f8f8] border border-transparent rounded-2xl px-5 py-4 text-gray-900 font-sans text-sm resize-none outline-none transition-all duration-200 leading-relaxed placeholder:text-gray-400 focus:border-gray-200 focus:bg-white focus:shadow-[0_4px_16px_rgba(0,0,0,0.02)]'
                                placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                                maxLength={5000}
                            />
                            <div className='absolute bottom-11 right-11 text-xs font-semibold text-gray-400 bg-white/80 py-1 px-2.5 rounded-full border border-gray-100 shadow-sm'>
                                {jobDescription.length} / 5000
                            </div>
                        </div>

                        {/* Divider */}
                        <div className='w-px bg-gray-200/80 shrink-0 hidden md:block' />

                        {/* Right Panel */}
                        <div className='flex-1 flex flex-col gap-6 p-8 bg-white/70'>
                            <div className='flex items-center gap-3 mb-1'>
                                <span className='flex items-center text-orange-500 p-2 bg-orange-50 rounded-xl'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                </span>
                                <h2 className='text-[1rem] font-bold text-gray-900 flex-1 tracking-tight'>Your Profile</h2>
                            </div>

                            {/* Upload */}
                            <div className='flex flex-col gap-2.5'>
                                <label className='flex items-center gap-2.5 text-sm font-bold text-gray-900 tracking-tight'>
                                    Upload Resume
                                    <span className='text-[0.68rem] font-bold py-0.5 px-2.5 rounded-full uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100'>
                                        Best Results
                                    </span>
                                </label>
                                <label
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`flex flex-col items-center justify-center gap-2 py-7 px-5 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 ${isDragging ? 'border-orange-500 bg-orange-50/20' : 'border-gray-250 bg-[#f8f8f8] hover:border-orange-400 hover:bg-orange-50/10'}`}
                                    htmlFor='resume'
                                >
                                    <span className='text-orange-500 mb-1 flex items-center justify-center w-10 h-10 bg-orange-50 rounded-full'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                                    </span>
                                    <p className='text-sm font-bold text-gray-900 m-0'>
                                        {fileName || 'Drop Resume Here'}
                                    </p>
                                    <p className='text-xs text-gray-400 font-semibold m-0'>
                                        {fileName ? 'Click to replace' : 'or browse files • PDF / DOCX'}
                                    </p>
                                    <input ref={resumeInputRef} onChange={handleFileChange} hidden type='file' id='resume' name='resume' accept='.pdf,.docx' />
                                </label>
                            </div>

                            {/* OR */}
                            <div className='or-divider flex items-center gap-3 text-gray-450 text-xs font-bold'>
                                <span className='whitespace-nowrap'>OR</span>
                            </div>

                            {/* Self Description */}
                            <div className='flex flex-col gap-2.5'>
                                <label className='text-sm font-bold text-gray-900 tracking-tight' htmlFor='selfDescription'>
                                    Quick Self-Description
                                </label>
                                <textarea
                                    onChange={(e) => setSelfDescription(e.target.value)}
                                    id='selfDescription'
                                    name='selfDescription'
                                    className='w-full h-24 bg-[#f8f8f8] border border-transparent rounded-2xl px-5 py-4 text-gray-900 font-sans text-sm resize-none outline-none transition-all duration-200 leading-relaxed placeholder:text-gray-400 focus:border-gray-200 focus:bg-white focus:shadow-[0_4px_16px_rgba(0,0,0,0.02)]'
                                    placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                />
                            </div>

                            {/* Info */}
                            <div className='flex items-start gap-3 py-3 px-4 bg-blue-50/50 border border-blue-100 rounded-2xl'>
                                <span className='shrink-0 text-blue-500 mt-0.5 bg-blue-100/60 p-1 rounded-lg'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                                </span>
                                <p className='m-0 text-[0.82rem] text-blue-600 font-semibold leading-relaxed'>
                                    Either a <strong className='text-gray-900'>Resume</strong> or a <strong className='text-gray-900'>Self Description</strong> is required to generate a personalized plan.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className='flex flex-col sm:flex-row items-center justify-between px-8 py-5 border-t border-gray-200/80 bg-gray-50/40 gap-4'>
                        <span className='text-[0.8rem] font-semibold text-gray-400'>AI-Powered Strategy Generation &bull; Approx 30s</span>
                        <button
                            onClick={handleGenerateReport}
                            className='flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white text-[0.92rem] font-bold border-none rounded-full cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5 active:translate-y-0 active:scale-98 font-sans'
                        >
                            <span className="text-base">✨</span>
                            Generate Interview Strategy
                        </button>
                    </div>
                </div>

                {/* Recent Reports */}
                {reports.length > 0 && (
                    <section className='flex flex-col gap-5 w-full max-w-[920px]'>
                        <h2 className='text-xl font-bold text-gray-900 tracking-tight'>My Recent Interview Plans</h2>
                        <ul className='flex gap-4 flex-wrap list-none p-0'>
                            {reports.map(report => (
                                <li
                                    key={report._id}
                                    className='bg-white border border-gray-150 rounded-2xl p-6 flex-1 min-w-[260px] flex flex-col gap-2.5 cursor-pointer shrink-0 hover:border-orange-400 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-200'
                                    onClick={() => navigate(`/interview/${report._id}`)}
                                >
                                    <h3 className='text-[0.95rem] font-bold text-gray-900 tracking-tight'>{report.title || 'Untitled Position'}</h3>
                                    <p className='text-xs font-semibold text-gray-400'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                    <p className={`text-[0.82rem] font-bold ${report.matchScore >= 80 ? 'text-emerald-600' : report.matchScore >= 60 ? 'text-amber-600' : 'text-red-500'}`}>
                                        Match Score: {report.matchScore}%
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Footer */}
                <footer className='flex gap-6 mt-6'>
                    <a href='#' className='text-[0.8rem] font-semibold text-gray-400 no-underline transition-colors duration-200 hover:text-gray-900'>Privacy Policy</a>
                    <a href='#' className='text-[0.8rem] font-semibold text-gray-400 no-underline transition-colors duration-200 hover:text-gray-900'>Terms of Service</a>
                    <a href='#' className='text-[0.8rem] font-semibold text-gray-400 no-underline transition-colors duration-200 hover:text-gray-900'>Help Center</a>
                </footer>
            </div>
        </div>
    )
}

export default Home