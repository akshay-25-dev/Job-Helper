import React, { useState, useRef } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'

const Home = () => {

    const { loading, generateReport, reports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }

    if (loading) {
        return (
            <main className='min-h-screen w-full flex items-center justify-center bg-page text-txt font-sans'>
                <h1 className='text-2xl font-bold'>Loading your interview plan...</h1>
            </main>
        )
    }

    return (
        <div className='w-full min-h-screen bg-page text-txt font-sans flex flex-col items-center justify-center px-6 py-12 gap-8'>

            {/* Page Header */}
            <header className='text-center'>
                <h1 className='text-4xl font-bold mb-2 text-txt'>
                    Create Your Custom <span className='text-accent'>Interview Plan</span>
                </h1>
                <p className='text-muted text-[0.95rem] max-w-[480px] mx-auto leading-relaxed'>
                    Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                </p>
            </header>

            {/* Main Card */}
            <div className='w-full max-w-[900px] bg-card border border-border rounded-2xl overflow-hidden'>
                <div className='flex min-h-[520px]'>

                    {/* Left Panel - Job Description */}
                    <div className='flex-1 flex flex-col gap-4 p-6 relative'>
                        <div className='flex items-center gap-2 mb-1'>
                            <span className='flex items-center text-accent'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </span>
                            <h2 className='text-base font-semibold text-txt flex-1'>Target Job Description</h2>
                            <span className='text-[0.7rem] font-semibold py-0.5 px-2 rounded-[0.3rem] uppercase tracking-wide bg-accent/15 text-accent border border-accent/30'>
                                Required
                            </span>
                        </div>
                        <textarea
                            onChange={(e) => setJobDescription(e.target.value)}
                            className='flex-1 w-full bg-input border border-border rounded-lg px-4 py-3 text-txt font-sans text-sm resize-none outline-none transition-colors duration-200 leading-relaxed placeholder:text-muted focus:border-accent'
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                        />
                        <div className='absolute bottom-9 right-8 text-xs text-muted'>0 / 5000 chars</div>
                    </div>

                    {/* Vertical Divider */}
                    <div className='w-px bg-border shrink-0' />

                    {/* Right Panel - Profile */}
                    <div className='flex-1 flex flex-col gap-3 p-6'>
                        <div className='flex items-center gap-2 mb-1'>
                            <span className='flex items-center text-accent'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </span>
                            <h2 className='text-base font-semibold text-txt flex-1'>Your Profile</h2>
                        </div>

                        {/* Upload Resume */}
                        <div className='flex flex-col gap-2'>
                            <label className='flex items-center gap-2 text-sm font-medium text-txt'>
                                Upload Resume
                                <span className='text-[0.7rem] font-semibold py-0.5 px-2 rounded-[0.3rem] uppercase tracking-wide bg-accent/15 text-accent border border-accent/30'>
                                    Best Results
                                </span>
                            </label>
                            <label className='flex flex-col items-center justify-center gap-1.5 py-6 px-4 bg-input border-2 border-dashed border-border rounded-[0.6rem] cursor-pointer transition-all duration-200 hover:border-accent hover:bg-accent/5' htmlFor='resume'>
                                <span className='text-accent mb-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                </span>
                                <p className='text-sm font-medium text-txt m-0'>Click to upload or drag &amp; drop</p>
                                <p className='text-xs text-muted m-0'>PDF or DOCX (Max 5MB)</p>
                                <input ref={resumeInputRef} hidden type='file' id='resume' name='resume' accept='.pdf,.docx' />
                            </label>
                        </div>

                        {/* OR Divider */}
                        <div className='or-divider flex items-center gap-3 text-muted text-xs'>
                            <span className='whitespace-nowrap'>OR</span>
                        </div>

                        {/* Quick Self-Description */}
                        <div className='flex flex-col gap-2'>
                            <label className='flex items-center gap-2 text-sm font-medium text-txt' htmlFor='selfDescription'>
                                Quick Self-Description
                            </label>
                            <textarea
                                onChange={(e) => setSelfDescription(e.target.value)}
                                id='selfDescription'
                                name='selfDescription'
                                className='w-full h-24 bg-input border border-border rounded-lg px-4 py-3 text-txt font-sans text-sm resize-none outline-none transition-colors duration-200 leading-relaxed placeholder:text-muted focus:border-accent'
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className='flex items-start gap-2.5 py-3 px-4 bg-info-bg border border-info-border rounded-lg'>
                            <span className='shrink-0 text-info-icon mt-px'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
                            </span>
                            <p className='m-0 text-[0.8rem] text-info-text leading-relaxed'>
                                Either a <strong className='text-txt'>Resume</strong> or a <strong className='text-txt'>Self Description</strong> is required to generate a personalized plan.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className='flex items-center justify-between px-6 py-4 border-t border-border'>
                    <span className='text-[0.8rem] text-muted'>AI-Powered Strategy Generation &bull; Approx 30s</span>
                    <button
                        onClick={handleGenerateReport}
                        className='flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-accent to-[#cc1a5e] text-white text-[0.9rem] font-semibold border-none rounded-lg cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.98] font-sans'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>

            {/* Recent Reports List */}
            {reports.length > 0 && (
                <section className='flex flex-col gap-3 w-full max-w-[900px]'>
                    <h2 className='text-xl font-bold text-txt'>My Recent Interview Plans</h2>
                    <ul className='flex gap-3 flex-wrap list-none p-0'>
                        {reports.map(report => (
                            <li
                                key={report._id}
                                className='bg-card border border-border rounded-lg p-4 flex-1 flex flex-col gap-2 cursor-pointer shrink-0 hover:border-accent/50 transition-colors'
                                onClick={() => navigate(`/interview/${report._id}`)}
                            >
                                <h3 className='text-sm font-semibold text-txt'>{report.title || 'Untitled Position'}</h3>
                                <p className='text-xs text-muted'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`text-[0.8rem] font-semibold ${report.matchScore >= 80 ? 'text-severity-low' : report.matchScore >= 60 ? 'text-severity-medium' : 'text-severity-high'}`}>
                                    Match Score: {report.matchScore}%
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Page Footer */}
            <footer className='flex gap-6'>
                <a href='#' className='text-[0.8rem] text-muted no-underline transition-colors duration-200 hover:text-txt'>Privacy Policy</a>
                <a href='#' className='text-[0.8rem] text-muted no-underline transition-colors duration-200 hover:text-txt'>Terms of Service</a>
                <a href='#' className='text-[0.8rem] text-muted no-underline transition-colors duration-200 hover:text-txt'>Help Center</a>
            </footer>
        </div>
    )
}

export default Home