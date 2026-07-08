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

    if (loading) {
        return (
            <main className='min-h-screen w-full flex flex-col items-center justify-center bg-white'>
                <div className="w-10 h-10 border-[3px] border-orange-200 border-t-orange-500 rounded-full animate-spin" />
                <p className='text-gray-400 text-sm mt-4'>Generating your interview plan...</p>
            </main>
        )
    }

    return (
        <div className='w-full min-h-screen bg-white relative overflow-hidden'>

            {/* Decorative blurs */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />

            {/* Top bar */}
            <nav className='relative z-10 flex items-center justify-between px-8 py-5 max-w-[1100px] mx-auto'>
                <h2 className='text-lg font-bold text-gray-900'>
                    Job<span className='text-orange-500'>Helper</span>
                </h2>
                <button
                    onClick={handleLogout}
                    className='text-sm text-gray-400 hover:text-gray-900 transition-colors cursor-pointer bg-transparent border-none font-medium'
                >
                    Log out
                </button>
            </nav>

            <div className='relative z-10 flex flex-col items-center px-6 pb-16 gap-8'>

                {/* Header */}
                <header className='text-center mt-4'>
                    <h1 className='text-[2.2rem] font-bold text-gray-900 tracking-tight'>
                        Create Your Custom <span className='text-orange-500'>Interview Plan</span>
                    </h1>
                    <p className='text-gray-400 text-[0.95rem] max-w-[520px] mx-auto leading-relaxed mt-3'>
                        Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                    </p>
                </header>

                {/* Main Card */}
                <div className='w-full max-w-[920px] bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-[0_2px_24px_rgba(0,0,0,0.06)]'>
                    <div className='flex min-h-[480px]'>

                        {/* Left Panel */}
                        <div className='flex-1 flex flex-col gap-4 p-7 relative'>
                            <div className='flex items-center gap-2.5 mb-1'>
                                <span className='flex items-center text-orange-500'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                                </span>
                                <h2 className='text-[0.95rem] font-semibold text-gray-900 flex-1'>Target Job Description</h2>
                                <span className='text-[0.68rem] font-bold py-1 px-2.5 rounded-full uppercase tracking-wider bg-orange-50 text-orange-500 border border-orange-200'>
                                    Required
                                </span>
                            </div>
                            <textarea
                                onChange={(e) => setJobDescription(e.target.value)}
                                className='flex-1 w-full bg-[#f5f5f5] border border-transparent rounded-xl px-4 py-3.5 text-gray-900 font-sans text-sm resize-none outline-none transition-all duration-200 leading-relaxed placeholder:text-gray-400 focus:border-gray-300 focus:bg-white'
                                placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                                maxLength={5000}
                            />
                            <div className='absolute bottom-9 right-9 text-xs text-gray-400'>{jobDescription.length} / 5000 chars</div>
                        </div>

                        {/* Divider */}
                        <div className='w-px bg-gray-200 shrink-0' />

                        {/* Right Panel */}
                        <div className='flex-1 flex flex-col gap-4 p-7'>
                            <div className='flex items-center gap-2.5 mb-1'>
                                <span className='flex items-center text-orange-500'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                </span>
                                <h2 className='text-[0.95rem] font-semibold text-gray-900 flex-1'>Your Profile</h2>
                            </div>

                            {/* Upload */}
                            <div className='flex flex-col gap-2'>
                                <label className='flex items-center gap-2 text-sm font-medium text-gray-900'>
                                    Upload Resume
                                    <span className='text-[0.68rem] font-bold py-0.5 px-2 rounded-full uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200'>
                                        Best Results
                                    </span>
                                </label>
                                <label className='flex flex-col items-center justify-center gap-1.5 py-6 px-4 bg-[#f5f5f5] border-2 border-dashed border-gray-300 rounded-xl cursor-pointer transition-all duration-200 hover:border-orange-400 hover:bg-orange-50/30' htmlFor='resume'>
                                    <span className='text-orange-500 mb-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                    </span>
                                    <p className='text-sm font-medium text-gray-900 m-0'>
                                        {fileName || 'Click to upload or drag & drop'}
                                    </p>
                                    <p className='text-xs text-gray-400 m-0'>PDF or DOCX (Max 5MB)</p>
                                    <input ref={resumeInputRef} onChange={handleFileChange} hidden type='file' id='resume' name='resume' accept='.pdf,.docx' />
                                </label>
                            </div>

                            {/* OR */}
                            <div className='or-divider flex items-center gap-3 text-gray-400 text-xs'>
                                <span className='whitespace-nowrap'>OR</span>
                            </div>

                            {/* Self Description */}
                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-medium text-gray-900' htmlFor='selfDescription'>
                                    Quick Self-Description
                                </label>
                                <textarea
                                    onChange={(e) => setSelfDescription(e.target.value)}
                                    id='selfDescription'
                                    name='selfDescription'
                                    className='w-full h-24 bg-[#f5f5f5] border border-transparent rounded-xl px-4 py-3.5 text-gray-900 font-sans text-sm resize-none outline-none transition-all duration-200 leading-relaxed placeholder:text-gray-400 focus:border-gray-300 focus:bg-white'
                                    placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                />
                            </div>

                            {/* Info */}
                            <div className='flex items-start gap-2.5 py-3 px-4 bg-blue-50 border border-blue-200 rounded-xl'>
                                <span className='shrink-0 text-blue-500 mt-px'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                                </span>
                                <p className='m-0 text-[0.8rem] text-blue-600 leading-relaxed'>
                                    Either a <strong className='text-gray-900'>Resume</strong> or a <strong className='text-gray-900'>Self Description</strong> is required to generate a personalized plan.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className='flex items-center justify-between px-7 py-4 border-t border-gray-200 bg-[#fafafa]'>
                        <span className='text-[0.8rem] text-gray-400'>AI-Powered Strategy Generation &bull; Approx 30s</span>
                        <button
                            onClick={handleGenerateReport}
                            className='flex items-center gap-2 px-7 py-3 bg-orange-500 hover:bg-orange-600 text-white text-[0.9rem] font-semibold border-none rounded-full cursor-pointer transition-all duration-300 hover:shadow-[0_4px_20px_rgba(249,115,22,0.35)] active:scale-[0.98] font-sans'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                            Generate My Interview Strategy
                        </button>
                    </div>
                </div>

                {/* Recent Reports */}
                {reports.length > 0 && (
                    <section className='flex flex-col gap-4 w-full max-w-[920px]'>
                        <h2 className='text-xl font-bold text-gray-900'>My Recent Interview Plans</h2>
                        <ul className='flex gap-4 flex-wrap list-none p-0'>
                            {reports.map(report => (
                                <li
                                    key={report._id}
                                    className='bg-white border border-gray-200 rounded-xl p-5 flex-1 min-w-[250px] flex flex-col gap-2 cursor-pointer shrink-0 hover:border-orange-300 hover:shadow-md transition-all duration-200'
                                    onClick={() => navigate(`/interview/${report._id}`)}
                                >
                                    <h3 className='text-sm font-semibold text-gray-900'>{report.title || 'Untitled Position'}</h3>
                                    <p className='text-xs text-gray-400'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                    <p className={`text-[0.8rem] font-semibold ${report.matchScore >= 80 ? 'text-emerald-500' : report.matchScore >= 60 ? 'text-amber-500' : 'text-red-500'}`}>
                                        Match Score: {report.matchScore}%
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Footer */}
                <footer className='flex gap-6 mt-4'>
                    <a href='#' className='text-[0.8rem] text-gray-400 no-underline transition-colors duration-200 hover:text-gray-900'>Privacy Policy</a>
                    <a href='#' className='text-[0.8rem] text-gray-400 no-underline transition-colors duration-200 hover:text-gray-900'>Terms of Service</a>
                    <a href='#' className='text-[0.8rem] text-gray-400 no-underline transition-colors duration-200 hover:text-gray-900'>Help Center</a>
                </footer>
            </div>
        </div>
    )
}

export default Home