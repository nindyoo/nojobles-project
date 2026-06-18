import { useState, useMemo } from 'react';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  DollarSign, 
  ChevronRight, 
  FileText, 
  Star, 
  CheckCircle, 
  SlidersHorizontal, 
  ArrowRight, 
  Check, 
  Send,
  Building,
  Bookmark,
  AlertCircle,
  TrendingUp,
  Shield,
  Code,
  LineChart,
  Share2,
  Coins,
  Users,
  Layers,
  Sparkles,
  LayoutDashboard,
  LogOut,
  Upload,
  PlusCircle,
  Clock,
  Settings,
  Mail,
  Lock
} from 'lucide-react';

// ==========================================
// DATA MOCK (Sesuai dengan lampiran PDF)
// ==========================================

const INITIAL_JOBS = [
  {
    id: 'job-1',
    title: 'Sales Promoter Team Leader - Pekanbaru',
    company: 'PT. Jaya Sakti Makmur',
    companyLogo: 'J',
    posted: '2 hari lalu',
    applicants: 120,
    experience: 'Min 1 tahun pengalaman',
    level: 'Senior level',
    type: 'Full-time',
    policy: 'On-site',
    location: 'Tangerang',
    salaryMin: 6000000,
    salaryMax: 6500000,
    isSponsored: false,
    description: 'Membangun dan mempertahankan hubungan yang baik dengan dealer dan debitur. Menyiapkan dokumen dan data yang diperlukan untuk melakukan survey. Melakukan survey kelayakan kredit dan verifikasi legalitas dokumen persyaratan kredit calon debitur. Melakukan analisa kelayakan kredit.',
    requirements: [
      'Pendidikan minimal D3 semua jurusan.',
      'Terbuka untuk fresh graduate maupun yang sudah memiliki pengalaman kerja.',
      'Memiliki kendaraan bermotor serta SIM C aktif.',
      'Mampu berkomunikasi dan membina hubungan baik dengan dealer.',
      'Mempunyai kemampuan analisa yang baik, teliti, kritis, tekun, ulet, loyal dan disiplin.',
      'Memiliki integritas yang baik.',
      'Dapat bekerja di bawah tekanan.',
      'Memiliki pengetahuan seputar dunia pembiayaan.',
      'Bersedia ditempatkan di Cabang Pekanbaru.'
    ]
  },
  {
    id: 'job-2',
    title: 'Senior UI Designer',
    company: 'PT. Jaya Sakti Makmur',
    companyLogo: 'J',
    posted: '22 hari lalu',
    applicants: 45,
    experience: 'Min 3 tahun pengalaman',
    level: 'Senior level',
    type: 'Full-time',
    policy: 'Remote',
    location: 'Tangerang',
    salaryMin: 8000000,
    salaryMax: 9500000,
    isSponsored: true,
    sponsorType: 'Featured',
    description: 'Kami mencari Senior UI Designer berbakat untuk merancang platform digital yang intuitif dan estetis bagi ekosistem Nojobles. Anda akan berkolaborasi dengan tim produk dan engineer untuk mewujudkan desain yang bernilai guna tinggi.',
    requirements: [
      'Pengalaman kerja minimal 3 tahun sebagai UI/UX Designer.',
      'Portofolio desain UI yang kuat untuk aplikasi web dan mobile.',
      'Keahlian tinggi menggunakan Figma, Adobe XD, atau Framer.',
      'Memahami dasar-dasar HTML/CSS merupakan nilai tambah.'
    ]
  },
  {
    id: 'job-3',
    title: 'Junior Front-End Developer',
    company: 'Macrosoft Indonesia',
    companyLogo: 'M',
    posted: '3 hari lalu',
    applicants: 89,
    experience: 'Fresh Graduate / Entry Level',
    level: 'Junior level',
    type: 'Full-time',
    policy: 'Hybrid',
    location: 'Jakarta',
    salaryMin: 5000000,
    salaryMax: 7000000,
    isSponsored: false,
    description: 'Membantu tim engineer dalam mengimplementasikan potongan desain UI/UX menjadi komponen web interaktif yang responsif dan berkinerja tinggi menggunakan React.js.',
    requirements: [
      'Pendidikan minimal D3/S1 Teknik Informatika atau rumpun sejenis.',
      'Memiliki pemahaman dasar HTML, CSS, JavaScript, dan React.js.',
      'Mampu bekerja secara kolaboratif menggunakan Git.'
    ]
  }
];

const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    owner: 'Erik Nindy',
    ownerBadge: true,
    posted: '2 hari lalu',
    title: 'Webshield Target Platform Negara Brasil',
    description: 'Selamat Pagi/Siang/Sore/Malam. Saat ini, saya hendak melakukan penelitian terkait penyintas banjir di DKI Jakarta. Oleh karena itu, saya membutuhkan bantuan untuk penyebaran kuesioner mengenai pengalaman psikologis banjir di daerah-daerah DKI Jakarta.\n\nAdapun responden HARUS memiliki ketiga kriteria ini:\n1. Berusia 18 - 60 tahun.\n2. Berdomisili di DKI Jakarta.\n3. Pernah terdampak langsung bencana banjir dalam kurun waktu TIGA BULAN terakhir.\n\nKuesioner ini terdiri dari 4 bagian (1 halaman pengantar dan persetujuan responden, 1 halaman data demografis responden, dan 2 halaman pengukuran). Dalam mengisi kuesioner ini, diperkirakan membutuhkan waktu 5-10 menit. Saya berharap responden benar-benar memenuhi kriteria yang ada.',
    skills: ['Web designer', 'UI/UX designer', 'Framer designer'],
    budgetMin: 6000000,
    budgetMax: 6500000,
    deadline: '10 hari',
    proposalsCount: 90,
    status: 'Open'
  },
  {
    id: 'proj-2',
    owner: 'Agung Pratama',
    ownerBadge: false,
    posted: '5 hari lalu',
    title: 'Pembuatan Website Landing Page Framer Keren',
    description: 'Kami membutuhkan desainer Framer profesional untuk merancang landing page interaktif guna meluncurkan produk SaaS terbaru kami. Konsep sudah siap dalam bentuk kawat (wireframe), Anda tinggal melakukan eksekusi visual di Framer.',
    skills: ['Framer designer', 'UI/UX designer', 'Copywriting'],
    budgetMin: 2000000,
    budgetMax: 4000000,
    deadline: '7 hari',
    proposalsCount: 34,
    status: 'Open'
  },
  {
    id: 'proj-3',
    owner: 'PT. Sentosa Abadi',
    ownerBadge: true,
    posted: '1 hari lalu',
    title: 'Sistem CMS WordPress Company Profile',
    description: 'Butuh web developer untuk membuat website company profile dengan CMS sederhana. Stack bebas, bisa WordPress atau custom. Harus responsif dan SEO-friendly.',
    skills: ['Web designer', 'WordPress', 'SEO Specialist'],
    budgetMin: 4500000,
    budgetMax: 5500000,
    deadline: '14 hari',
    proposalsCount: 12,
    status: 'Open'
  }
];

export default function App() {
  // Navigasi Utama Halaman
  const [currentPage, setCurrentPage] = useState('home'); 
  
  // State Autentikasi Pengguna (Simulasi)
  const [user, setUser] = useState(null); // null atau { email, name, role: 'candidate' | 'recruiter' }

  // State Pelacakan Pilihan Lowongan & Freelance
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [selectedJob, setSelectedJob] = useState(INITIAL_JOBS[0]);
  const [selectedProject, setSelectedProject] = useState(INITIAL_PROJECTS[0]);

  // State Filter Pencarian Lowongan Kerja
  const [jobSearch, setJobSearch] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('Semua');
  const [jobPolicyFilter, setJobPolicyFilter] = useState('Semua');

  // State Filter Pencarian Proyek Freelance
  const [freelanceSearch, setFreelanceSearch] = useState('');
  const [budgetFilter, setBudgetFilter] = useState('Semua');

  // State Tab Aktif di Beranda
  const [homeTab, setHomeTab] = useState('seeker'); 

  // State Modal Interaksi
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [proposalModalOpen, setProposalModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  // State Input Form Login & Register
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authCompany, setAuthCompany] = useState('');

  // State Form Lowongan Baru (Dashboard Recruiter)
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobType, setNewJobJobType] = useState('Full-time');
  const [newJobPolicy, setNewJobPolicy] = useState('Remote');
  const [newJobSalaryMin, setNewJobSalaryMin] = useState(5000000);
  const [newJobSalaryMax, setNewJobSalaryMax] = useState(7000000);
  const [newJobDesc, setNewJobDesc] = useState('');

  // Alur Alur Publikasi Lowongan: 'form' | 'package' | 'payment' | 'success'
  const [postingStep, setPostingStep] = useState('form');
  const [selectedPackage, setSelectedPackage] = useState(null); // { name, price, badge }

  // State AI Resume Health Check (Dashboard Candidate)
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeScore, setResumeScore] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Simulasi Lamaran Masuk (Recruiter Dashboard)
  const [appliedCandidates, setAppliedCandidates] = useState([
    { id: 1, name: 'Budi Santoso', job: 'Sales Promoter Team Leader - Pekanbaru', cv: 'budi-cv.pdf', status: 'Review', score: 85 },
    { id: 2, name: 'Siti Rahma', job: 'Senior UI Designer', cv: 'siti-portfolio.pdf', status: 'Interview', score: 94 },
    { id: 3, name: 'Hendra Wijaya', job: 'Junior Front-End Developer', cv: 'hendra-cv.pdf', status: 'Review', score: 72 }
  ]);

  // Simulasi Lamaran Pengguna Aktif (Candidate Dashboard)
  const [myApplications, setMyApplications] = useState([
    { id: 101, jobTitle: 'Senior UI Designer', company: 'PT. Jaya Sakti Makmur', status: 'Interview', date: '12 Juni 2026' }
  ]);

  // Fungsi Pemicu Notifikasi Toast
  const triggerToast = (message) => {
    setSuccessToast(message);
    setTimeout(() => {
      setSuccessToast('');
    }, 4000);
  };

  // Handler Login Simulasi
  const handleLogin = (e, roleOverride = null) => {
    e?.preventDefault();
    const finalRole = roleOverride || (authEmail.includes('recruiter') || authEmail.includes('hr') || authCompany ? 'recruiter' : 'candidate');
    const finalName = authName || (finalRole === 'recruiter' ? 'HR PT. Sinar Baru' : 'Andi Pratama');
    
    const loggedUser = {
      email: authEmail || 'user@nojobles.com',
      name: finalName,
      role: finalRole,
      company: authCompany || (finalRole === 'recruiter' ? 'PT. Sinar Baru' : null)
    };

    setUser(loggedUser);
    triggerToast(`Selamat datang kembali, ${loggedUser.name}!`);
    
    if (loggedUser.role === 'recruiter') {
      setCurrentPage('dashboard-recruiter');
    } else {
      setCurrentPage('dashboard-candidate');
    }

    // Reset input
    setAuthEmail('');
    setAuthPassword('');
    setAuthName('');
    setAuthCompany('');
  };

  // Handler Register Simulasi
  const handleRegisterCandidate = (e) => {
    e.preventDefault();
    handleLogin(null, 'candidate');
  };

  const handleRegisterRecruiter = (e) => {
    e.preventDefault();
    handleLogin(null, 'recruiter');
  };

  // Handler Logout
  const handleLogout = () => {
    setUser(null);
    triggerToast('Anda berhasil keluar.');
    setCurrentPage('home');
  };

  // Filter Lowongan Kerja secara Real-time
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchSearch = job.title.toLowerCase().includes(jobSearch.toLowerCase()) || 
                          job.company.toLowerCase().includes(jobSearch.toLowerCase());
      const matchType = jobTypeFilter === 'Semua' || job.type === jobTypeFilter;
      const matchPolicy = jobPolicyFilter === 'Semua' || job.policy === jobPolicyFilter;
      return matchSearch && matchType && matchPolicy;
    });
  }, [jobs, jobSearch, jobTypeFilter, jobPolicyFilter]);

  // Filter Proyek Freelance secara Real-time
  const filteredProjects = useMemo(() => {
    return projects.filter(proj => {
      const matchSearch = proj.title.toLowerCase().includes(freelanceSearch.toLowerCase()) || 
                          proj.description.toLowerCase().includes(freelanceSearch.toLowerCase());
      
      let matchBudget = true;
      if (budgetFilter === 'under-500k') {
        matchBudget = proj.budgetMax < 500000;
      } else if (budgetFilter === '500k-2m') {
        matchBudget = proj.budgetMin >= 500000 && proj.budgetMax <= 2000000;
      } else if (budgetFilter === '2m-5m') {
        matchBudget = proj.budgetMin >= 2000000 && proj.budgetMax <= 5000000;
      } else if (budgetFilter === 'above-5m') {
        matchBudget = proj.budgetMin >= 5000000;
      }
      return matchSearch && matchBudget;
    });
  }, [projects, freelanceSearch, budgetFilter]);

  // Kirim Lamaran Pekerjaan Baru
  const submitApplication = (applicantName, email) => {
    const newApplicant = {
      id: Date.now(),
      name: applicantName,
      job: selectedJob.title,
      cv: 'CV_Terupload.pdf',
      status: 'Review',
      score: Math.floor(Math.random() * (100 - 65) + 65)
    };
    setAppliedCandidates([newApplicant, ...appliedCandidates]);

    const newApp = {
      id: Date.now(),
      jobTitle: selectedJob.title,
      company: selectedJob.company,
      status: 'Review',
      date: 'Hari ini'
    };
    setMyApplications([newApp, ...myApplications]);

    triggerToast(`Lamaran untuk ${selectedJob.title} sukses terkirim!`);
  };

  // Submit Detail Lowongan Kerja (Memasuki Alur Pemilihan Paket & Pembayaran Otomatis)
  const handlePostJobSubmit = (e) => {
    e.preventDefault();
    // Lanjut ke pemilihan paket
    setPostingStep('package');
  };

  // Konfirmasi Paket & Bayar secara Otomatis
  const confirmAndPublishJob = () => {
    const newJob = {
      id: `job-${Date.now()}`,
      title: newJobTitle || 'Kualifikasi Desain Tambahan',
      company: user?.company || 'Perusahaan Klien',
      companyLogo: user?.company ? user.company[0] : 'C',
      posted: 'Baru saja',
      applicants: 0,
      experience: 'Fresh graduate / Berpengalaman',
      level: 'Mid level',
      type: newJobType,
      policy: newJobPolicy,
      location: 'Jakarta (HQ)',
      salaryMin: Number(newJobSalaryMin),
      salaryMax: Number(newJobSalaryMax),
      isSponsored: selectedPackage.price > 0,
      sponsorType: selectedPackage.price > 0 ? selectedPackage.badge : null,
      description: newJobDesc || 'Membutuhkan profesional berbakat di bidangnya.',
      requirements: ['Memiliki keterampilan analitis yang baik.', 'Dapat bekerja dengan tim.', 'Komunikatif.']
    };

    setJobs([newJob, ...jobs]);
    setPostingStep('success');
    triggerToast('Pembayaran Diterima! Lowongan otomatis dipublikasikan.');
  };

  // AI Resume Scanner Simulator
  const handleResumeScan = (e) => {
    e.preventDefault();
    if (!resumeFile) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setResumeScore({
        score: Math.floor(Math.random() * (98 - 72) + 72),
        grammar: 'Sangat Baik (Bebas dari kesalahan fatal)',
        ats: 'Format Sesuai (Readable by Parser)',
        missing: ['Framer UI', 'TypeScript', 'Agile Scrum']
      });
      triggerToast('Selesai memindai CV dengan sistem kecerdasan AI Nojobles!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col selection:bg-indigo-500 selection:text-white">
      
      {/* Notifikasi Toast Sukses */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300 transform translate-y-0">
          <CheckCircle className="w-6 h-6 shrink-0" />
          <span className="font-semibold">{successToast}</span>
        </div>
      )}

      {/* ==========================================
          HEADER / NAVIGASI UTAMA
          ========================================== */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => setCurrentPage('home')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
              N
            </div>
            <span className="text-2xl font-black text-slate-800 tracking-tight">
              Nojobles<span className="text-indigo-600">.</span>
            </span>
          </div>

          {/* Navigasi Tengah */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <button 
              onClick={() => setCurrentPage('home')} 
              className={`hover:text-indigo-600 transition-colors py-2 border-b-2 font-semibold ${currentPage === 'home' ? 'text-indigo-600 border-indigo-600' : 'border-transparent'}`}
            >
              Beranda
            </button>
            <button 
              onClick={() => setCurrentPage('jobs')} 
              className={`hover:text-indigo-600 transition-colors py-2 border-b-2 font-semibold ${(currentPage === 'jobs' || currentPage === 'job-detail') ? 'text-indigo-600 border-indigo-600' : 'border-transparent'}`}
            >
              Cari Lowongan
            </button>
            <button 
              onClick={() => setCurrentPage('freelance')} 
              className={`hover:text-indigo-600 transition-colors py-2 border-b-2 font-semibold ${(currentPage === 'freelance' || currentPage === 'freelance-detail') ? 'text-indigo-600 border-indigo-600' : 'border-transparent'}`}
            >
              Freelance
            </button>
            <button 
              onClick={() => triggerToast('Daftar direktori perusahaan sedang disiapkan!')}
              className="hover:text-indigo-600 transition-colors py-2 border-transparent border-b-2 font-semibold"
            >
              Perusahaan
            </button>
          </nav>

          {/* Tombol Aksi Kanan (Sekarang Dinamis Berdasarkan Login & Sitemap) */}
          <div className="flex items-center gap-3">
            
            {user ? (
              // Jika Sudah Login, tampilkan shortcut Dashboard & Logout
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setCurrentPage(user.role === 'recruiter' ? 'dashboard-recruiter' : 'dashboard-candidate')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard Saya
                </button>
                <div className="hidden lg:block text-right">
                  <p className="text-xs font-bold text-slate-800 leading-tight">{user.name}</p>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase">{user.role === 'recruiter' ? 'Recruiter' : 'Kandidat'}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-500 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              // Jika Belum Login, tampilkan Login & Daftar sesuai sitemap
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setCurrentPage('register-recruiter')}
                  className="hidden lg:inline-flex text-sm font-bold text-slate-700 hover:text-indigo-600 transition-colors"
                >
                  Untuk Perusahaan
                </button>
                <button 
                  onClick={() => setCurrentPage('login')}
                  className="text-sm font-bold text-indigo-600 border border-indigo-200 px-4 py-2 rounded-xl hover:bg-indigo-50 transition-colors"
                >
                  Masuk
                </button>
                <button 
                  onClick={() => setCurrentPage('register-candidate')}
                  className="text-sm font-bold text-white bg-indigo-600 px-4 py-2 rounded-xl hover:bg-indigo-700 transition-all shadow-sm"
                >
                  Daftar
                </button>
              </div>
            )}

          </div>
        </div>
      </header>

      {/* ==========================================
          HALAMAN KONTEN UTAMA (DINAMIS)
          ========================================== */}
      <main className="grow">
        
        {/* 1. HALAMAN BERANDA (HOMEPAGE) */}
        {currentPage === 'home' && (
          <div className="animate-fade-in space-y-24 pb-20">
            {/* HERO SECTION */}
            <section className="relative bg-white pt-20 pb-24 overflow-hidden border-b border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase tracking-wider">
                    <Star className="w-3.5 h-3.5 fill-indigo-600 text-indigo-600" /> No. 1 Job Searching Platform Indonesia
                  </span>
                  <h1 className="text-5xl sm:text-7xl font-extrabold text-slate-950 tracking-tight leading-none">
                    Launch your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900">
                      Rewarding Career Today!
                    </span>
                  </h1>
                  <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                    Discover handpicked chief of staff opportunities across the world's most interesting startups and scale-ups.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => setCurrentPage('jobs')}
                      className="bg-indigo-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200 flex items-center justify-center gap-2 group"
                    >
                      Explore Jobs
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                      onClick={() => {
                        if (user?.role === 'recruiter') {
                          setPostingStep('form');
                          setCurrentPage('dashboard-recruiter');
                        } else {
                          setCurrentPage('register-recruiter');
                        }
                      }}
                      className="bg-white border border-slate-200 text-slate-800 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center justify-center gap-2"
                    >
                      Post a Job
                    </button>
                  </div>

                  <div className="pt-6 flex flex-wrap items-center gap-6 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <Check className="w-3 h-3 stroke-[3px]" />
                      </div>
                      <span>Simple, quick applications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <Check className="w-3 h-3 stroke-[3px]" />
                      </div>
                      <span>Personalized support</span>
                    </div>
                  </div>
                </div>

                {/* Hero Right - Image/AI mockup */}
                <div className="lg:col-span-5 relative">
                  <div className="relative mx-auto max-w-md lg:max-w-none">
                    <div className="absolute -inset-4 bg-indigo-100 rounded-3xl transform rotate-2"></div>
                    <div className="relative bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
                      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="bg-slate-900 text-[10px] text-slate-500 px-3 py-0.5 rounded-md ml-4 select-none">nojobles.com/career-launcher</div>
                      </div>

                      <div className="p-8 space-y-6">
                        <div className="bg-slate-800/50 aspect-video rounded-2xl flex items-center justify-center border border-slate-700/50 relative overflow-hidden group">
                          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/40 to-slate-900/10"></div>
                          <img 
                            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80" 
                            alt="" 
                            className="w-full h-full object-cover opacity-80"
                            onError={(e) => {
                              e.target.onerror = null; 
                              e.target.src = "https://via.placeholder.com/600x400?text=Premium+Job+Platform";
                            }}
                          />
                          <div className="absolute bottom-3 left-3 bg-slate-950/80 px-3 py-1 rounded-lg text-[10px] font-bold text-white tracking-wide border border-slate-800">
                            Launch Your Career
                          </div>
                        </div>

                        <div className="bg-slate-950/95 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-lg text-white">
                            AI
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-xs font-bold text-white">Saran Karir AI Cocok</h4>
                            <p className="text-[10px] text-slate-400">Match score: 96% untuk Senior UI Designer</p>
                            <span className="inline-block bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded mt-1">
                              Sangat Direkomendasikan
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEKSI MAKING YOUR JOB SEARCH EASY */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                  Making Your Job Search Easy
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Quick apply shows you recommended jobs based off your most recent search and allows you to apply to 25+ jobs in a seconds.
                </p>

                <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 mt-6">
                  <button
                    onClick={() => setHomeTab('seeker')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${homeTab === 'seeker' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Benefit for Job Seeker
                  </button>
                  <button
                    onClick={() => setHomeTab('company')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${homeTab === 'company' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Benefit for Company
                  </button>
                </div>
              </div>

              <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 relative overflow-hidden group hover:border-indigo-300 transition-all">
                  <div className="text-4xl font-black text-indigo-100 group-hover:text-indigo-200 transition-colors">01</div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-base">Login or Register</h3>
                    <p className="text-xs text-indigo-600 font-bold">Daftar pertama</p>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Masuk ke platform menggunakan akun email atau Google OAuth hanya dalam 5 detik.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 relative overflow-hidden group hover:border-indigo-300 transition-all">
                  <div className="text-4xl font-black text-indigo-100 group-hover:text-indigo-200 transition-colors">02</div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-base">AI cocokkan kamu</h3>
                    <p className="text-xs text-indigo-600 font-bold">Deskripsi otomatis tanpa repot</p>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Kecerdasan AI kami membaca resume dan skill Anda untuk mencocokkan lowongan terbaik otomatis.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 relative overflow-hidden group hover:border-indigo-300 transition-all">
                  <div className="text-4xl font-black text-indigo-100 group-hover:text-indigo-200 transition-colors">03</div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-base">Apply dalam satu klik</h3>
                    <p className="text-xs text-indigo-600 font-bold">Kirim lamaran kilat</p>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Tidak ada lagi pengisian form panjang. Kirim CV secara instan ke rekruter perusahaan.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 relative overflow-hidden group hover:border-indigo-300 transition-all">
                  <div className="text-4xl font-black text-indigo-100 group-hover:text-indigo-200 transition-colors">04</div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 text-base">Pantau status real-time</h3>
                    <p className="text-xs text-indigo-600 font-bold">Ketahui setiap perkembangan</p>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Lacak apakah berkas sudah dibaca, masuk sesi interview, atau tahap akhir penawaran kerja.
                  </p>
                </div>
              </div>
            </section>

            {/* SEKSI REAL STORIES */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-2 mb-12">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Real stories. Real results</span>
                <h2 className="text-3xl font-extrabold text-slate-950">Success Stories</h2>
              </div>

              <div className="grid lg:grid-cols-12 gap-8 items-stretch">
                <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-32 h-32 md:w-44 md:h-44 rounded-2xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80" 
                      alt="" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "https://via.placeholder.com/300?text=Jacob+Wilson";
                      }}
                    />
                  </div>
                  <div className="space-y-4 flex-grow">
                    <span className="inline-block bg-pink-50 text-pink-600 text-xs font-bold px-2.5 py-1 rounded-full">
                      Success stories
                    </span>
                    <p className="text-slate-700 text-sm md:text-base italic leading-relaxed font-medium">
                      "I love Infokerjadesign! It is so easy to work with. Especially with uploading ACORD forms, I can literally quote in 3 minutes."
                    </p>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">Jacob Wilson</h4>
                      <p className="text-xs text-slate-500">Co-Founder of Bold Agency</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-indigo-900 p-8 rounded-3xl text-white flex flex-col justify-between space-y-6 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-800 rounded-full filter blur-xl opacity-50 -mr-10 -mt-10"></div>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight leading-snug relative z-10">
                    Ready to build your own success story?
                  </h3>
                  <button 
                    onClick={() => {
                      if (user?.role === 'recruiter') {
                        setCurrentPage('dashboard-recruiter');
                      } else {
                        setCurrentPage('register-recruiter');
                      }
                    }}
                    className="w-full bg-white text-slate-900 hover:bg-slate-50 font-bold py-3.5 px-6 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm relative z-10"
                  >
                    Post a Job <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 2. DAFTAR LOWONGAN (JOB SEARCH LISTING) */}
        {currentPage === 'jobs' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            {/* ... Kode Job Listing Tetap Konsisten ... */}
            <div className="bg-indigo-900 rounded-3xl p-6 md:p-10 text-white mb-8 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800 rounded-full filter blur-2xl opacity-50 -mr-20 -mt-20"></div>
              <div className="relative space-y-4 max-w-3xl">
                <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">Temukan Pekerjaan Impian Anda</h1>
                <p className="text-indigo-200 text-sm md:text-base">Daftar lowongan kerja terpercaya dari perusahaan terkemuka di Indonesia.</p>
                <div className="bg-white rounded-2xl p-2 flex flex-col md:flex-row gap-2 shadow-lg">
                  <div className="flex items-center gap-2 px-3 py-2 grow border-b md:border-b-0 md:border-r border-slate-200">
                    <Search className="w-5 h-5 text-slate-400 shrink-0" />
                    <input 
                      type="text" 
                      placeholder="Cari judul pekerjaan atau nama perusahaan..." 
                      className="w-full text-slate-800 text-sm focus:outline-none bg-transparent"
                      value={jobSearch}
                      onChange={(e) => setJobSearch(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 text-slate-500 shrink-0">
                    <MapPin className="w-5 h-5 text-slate-400" />
                    <span className="text-sm font-semibold">Seluruh Indonesia</span>
                  </div>
                  <button className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-indigo-700 transition-colors text-sm">
                    Cari Sekarang
                  </button>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 h-fit sticky top-24">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2 text-base">
                    <SlidersHorizontal className="w-5 h-5 text-indigo-600" /> Filter Lowongan
                  </h3>
                  <button 
                    onClick={() => {
                      setJobSearch('');
                      setJobTypeFilter('Semua');
                      setJobPolicyFilter('Semua');
                    }}
                    className="text-xs font-bold text-indigo-600 hover:underline"
                  >
                    Reset
                  </button>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Tipe Pekerjaan</h4>
                  <div className="space-y-2">
                    {['Semua', 'Full-time', 'Part-time', 'Contract'].map((type) => (
                      <label key={type} className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer font-medium">
                        <input 
                          type="radio" 
                          name="jobType" 
                          className="accent-indigo-600 w-4 h-4"
                          checked={jobTypeFilter === type}
                          onChange={() => setJobTypeFilter(type)}
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Kebijakan Tempat Kerja</h4>
                  <div className="space-y-2">
                    {['Semua', 'On-site', 'Remote', 'Hybrid'].map((pol) => (
                      <label key={pol} className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer font-medium">
                        <input 
                          type="radio" 
                          name="jobPolicy" 
                          className="accent-indigo-600 w-4 h-4"
                          checked={jobPolicyFilter === pol}
                          onChange={() => setJobPolicyFilter(pol)}
                        />
                        <span>{pol}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 space-y-4">
                <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
                  <span>Menampilkan <b>{filteredJobs.length}</b> lowongan kerja aktif</span>
                  <span>Urutan: Terbaru</span>
                </div>

                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <div 
                      key={job.id}
                      className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between gap-4"
                      onClick={() => {
                        setSelectedJob(job);
                        setCurrentPage('job-detail');
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center font-bold text-xl shrink-0">
                            {job.companyLogo}
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs text-slate-400 font-semibold">{job.posted}</span>
                            <h3 className="font-extrabold text-slate-800 text-lg hover:text-indigo-600 transition-colors leading-snug">
                              {job.title}
                            </h3>
                            <p className="text-sm text-slate-600 font-medium flex items-center gap-1">
                              <Building className="w-4 h-4" /> {job.company}
                            </p>
                          </div>
                        </div>
                        <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
                          {job.policy}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="bg-slate-100 px-3 py-1 rounded-lg flex items-center gap-1">
                          <Briefcase className="w-3.5 h-3.5" /> {job.type}
                        </span>
                        <span className="bg-slate-100 px-3 py-1 rounded-lg flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {job.location}
                        </span>
                        <span className="bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-lg flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5" /> Rp {job.salaryMin.toLocaleString('id-ID')} - {job.salaryMax.toLocaleString('id-ID')} / bln
                        </span>
                      </div>

                      <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                        <p className="text-xs text-slate-400 font-medium">Batas pendaftaran: Segera</p>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors flex items-center gap-1">
                          Detail & Lamar <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                    <AlertCircle className="w-12 h-12 text-slate-300 mx-auto" />
                    <h3 className="font-bold text-slate-800 text-lg">Tidak ada lowongan ditemukan</h3>
                    <p className="text-slate-500 text-sm max-w-md mx-auto">Silakan ubah kata kunci pencarian Anda atau atur ulang opsi filter di panel sebelah kiri.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3. DETAIL LOWONGAN (JOB DETAIL) */}
        {currentPage === 'job-detail' && selectedJob && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            <button 
              onClick={() => setCurrentPage('jobs')}
              className="mb-6 inline-flex items-center gap-1 text-slate-600 hover:text-indigo-600 font-semibold text-sm transition-colors"
            >
              ← Kembali ke Daftar Lowongan
            </button>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-100">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-indigo-100 text-indigo-700 rounded-2xl flex items-center justify-center font-extrabold text-2xl shrink-0 shadow-sm">
                      {selectedJob.companyLogo}
                    </div>
                    <div className="space-y-1.5">
                      <h1 className="text-xl md:text-2xl font-black text-slate-800 leading-snug">
                        {selectedJob.title}
                      </h1>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 font-medium">
                        <span className="text-indigo-600 font-bold">{selectedJob.company}</span>
                        <span className="text-slate-300">•</span>
                        <span>Diposting {selectedJob.posted}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs font-bold">{selectedJob.applicants} Pelamar</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4 border-t border-slate-200/60 pt-6">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Level</span>
                    <span className="font-bold text-slate-800 text-sm mt-0.5 block">{selectedJob.level}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Pengalaman</span>
                    <span className="font-bold text-slate-800 text-sm mt-0.5 block">{selectedJob.experience}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Tipe Kerja</span>
                    <span className="font-bold text-slate-800 text-sm mt-0.5 block">{selectedJob.type}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Kebijakan</span>
                    <span className="font-bold text-slate-800 text-sm mt-0.5 block">{selectedJob.policy}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Lokasi</span>
                    <span className="font-bold text-slate-800 text-sm mt-0.5 block">{selectedJob.location}</span>
                  </div>
                </div>

                <div className="mt-5 p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider block">Estimasi Gaji Bulanan</span>
                    <span className="text-lg font-black text-emerald-800">
                      Rp {selectedJob.salaryMin.toLocaleString('id-ID')} - Rp {selectedJob.salaryMax.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-1 rounded">Transparan</span>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-8">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-800">Deskripsi Pekerjaan</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {selectedJob.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-800">Kualifikasi Utama</h3>
                  <ul className="space-y-2.5">
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i} className="flex gap-2.5 items-start text-sm text-slate-600 leading-relaxed">
                        <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-slate-100 pt-6 flex items-center gap-4">
                  <button 
                    onClick={() => {
                      if (!user) {
                        setCurrentPage('login');
                        triggerToast('Harap login/daftar terlebih dahulu sebelum melamar kerja.');
                      } else {
                        setApplyModalOpen(true);
                      }
                    }}
                    className="grow bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-indigo-100 flex items-center justify-center gap-2"
                  >
                    Lamar Pekerjaan Ini <Send className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => triggerToast('Lowongan disimpan ke penanda buku')}
                    className="border border-slate-200 text-slate-700 hover:bg-slate-50 p-4 rounded-xl transition-colors"
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. MARKETPLACE FREELANCE */}
        {currentPage === 'freelance' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            {/* ... Kode Freelance Marketplace Tetap Konsisten ... */}
            <div className="bg-slate-900 rounded-3xl p-6 md:p-10 text-white mb-8 shadow-md">
              <div className="max-w-3xl space-y-4">
                <span className="inline-block py-1 px-2.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  Freelance Hub
                </span>
                <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">Temukan Proyek Sampingan Terbaik</h1>
                <p className="text-slate-400 text-sm md:text-base">Ribuan freelancer dipertemukan dengan pemilik bisnis dan penyebar kuesioner berskala nasional.</p>
                <div className="bg-white rounded-2xl p-2 flex flex-col md:flex-row gap-2 shadow-lg">
                  <div className="flex items-center gap-2 px-3 py-2 grow">
                    <Search className="w-5 h-5 text-slate-400 shrink-0" />
                    <input 
                      type="text" 
                      placeholder="Cari keterampilan (Framer, Developer, Kuesioner)..." 
                      className="w-full text-slate-800 text-sm focus:outline-none bg-transparent"
                      value={freelanceSearch}
                      onChange={(e) => setFreelanceSearch(e.target.value)}
                    />
                  </div>
                  <button className="bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-emerald-700 transition-colors text-sm shrink-0">
                    Cari Proyek
                  </button>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 h-fit sticky top-24">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2 text-base">
                    <SlidersHorizontal className="w-5 h-5 text-emerald-600" /> Filter Anggaran
                  </h3>
                  <button 
                    onClick={() => {
                      setFreelanceSearch('');
                      setBudgetFilter('Semua');
                    }}
                    className="text-xs font-bold text-emerald-600 hover:underline"
                  >
                    Reset
                  </button>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Rentang Harga</h4>
                  <div className="space-y-2">
                    {[
                      { label: 'Semua Anggaran', value: 'Semua' },
                      { label: 'Di bawah Rp 500.000', value: 'under-500k' },
                      { label: 'Rp 500.000 - Rp 2.000.000', value: '500k-2m' },
                      { label: 'Rp 2.000.000 - Rp 5.000.000', value: '2m-5m' },
                      { label: 'Di atas Rp 5.000.000', value: 'above-5m' }
                    ].map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer font-medium">
                        <input 
                          type="radio" 
                          name="budgetFilter" 
                          className="accent-emerald-600 w-4 h-4"
                          checked={budgetFilter === opt.value}
                          onChange={() => setBudgetFilter(opt.value)}
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 space-y-4">
                {filteredProjects.map((proj) => (
                  <div 
                    key={proj.id}
                    className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between gap-4"
                    onClick={() => {
                      setSelectedProject(proj);
                      setCurrentPage('freelance-detail');
                    }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700 border border-slate-200">
                            {proj.owner.split(' ').map(n=>n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-700 flex items-center gap-1">
                              {proj.owner}
                              {proj.ownerBadge && <span className="text-[9px] bg-indigo-100 text-indigo-700 font-extrabold px-1 py-0.2 rounded">✓ Terverifikasi</span>}
                            </p>
                            <p className="text-[10px] text-slate-400">{proj.posted}</p>
                          </div>
                        </div>
                        <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
                          {proj.status}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-slate-800 text-lg hover:text-emerald-600 transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-slate-500 text-sm line-clamp-2">{proj.description}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {proj.skills.map((skill, index) => (
                          <span key={index} className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-md font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Anggaran Proyek</p>
                          <p className="text-sm font-extrabold text-emerald-600">
                            Rp {proj.budgetMin.toLocaleString('id-ID')} - {proj.budgetMax.toLocaleString('id-ID')}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Durasi Kerja</p>
                          <p className="text-sm font-extrabold text-slate-700">{proj.deadline}</p>
                        </div>
                      </div>
                      <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors">
                        Kirim Proposal
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. DETAIL PROYEK FREELANCE */}
        {currentPage === 'freelance-detail' && selectedProject && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            <button 
              onClick={() => setCurrentPage('freelance')}
              className="mb-6 inline-flex items-center gap-1 text-slate-600 hover:text-emerald-600 font-semibold text-sm transition-colors"
            >
              ← Kembali ke Daftar Freelance
            </button>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-lg">
                      {selectedProject.owner.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                      <h2 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
                        {selectedProject.owner}
                        {selectedProject.ownerBadge && <span className="bg-indigo-100 text-indigo-700 text-[10px] px-2 py-0.5 rounded-full font-bold">Klien Terverifikasi</span>}
                      </h2>
                      <p className="text-xs text-slate-400 font-semibold">Diposting {selectedProject.posted}</p>
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {selectedProject.status} Project
                  </span>
                </div>

                <h1 className="mt-6 text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-snug">
                  {selectedProject.title}
                </h1>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-base font-extrabold text-slate-800 uppercase tracking-wider">Deskripsi Proyek</h3>
                  <div className="text-sm text-slate-600 leading-relaxed space-y-4 whitespace-pre-line font-medium">
                    {selectedProject.description}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 mt-6 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Anggaran</span>
                    <span className="text-sm md:text-base font-black text-emerald-600 mt-1 block">
                      Rp {selectedProject.budgetMin.toLocaleString('id-ID')} - {selectedProject.budgetMax.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Batas Waktu</span>
                    <span className="text-sm md:text-base font-black text-slate-800 mt-1 block">
                      {selectedProject.deadline}
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <button 
                    onClick={() => {
                      if (!user) {
                        setCurrentPage('login');
                        triggerToast('Harap login/daftar terlebih dahulu sebelum mengajukan proposal.');
                      } else {
                        setProposalModalOpen(true);
                      }
                    }}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-emerald-100 flex items-center justify-center gap-2"
                  >
                    Kirim Proposal Penawaran Anda <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. HALAMAN LOGIN (Sesuai Sitemap AUTH SYSTEM) */}
        {currentPage === 'login' && (
          <div className="max-w-md mx-auto px-4 py-16 animate-fade-in">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-black text-slate-900">Masuk ke Nojobles</h2>
                <p className="text-xs text-slate-500">Peluang karir terbaik Anda telah menanti di balik pintu ini.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Alamat Email</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3.5 text-slate-400"><Mail className="w-4 h-4" /></span>
                    <input 
                      required 
                      type="email" 
                      placeholder="nama@email.com" 
                      className="w-full text-sm border border-slate-200 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500" 
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Kata Sandi</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3.5 text-slate-400"><Lock className="w-4 h-4" /></span>
                    <input 
                      required 
                      type="password" 
                      placeholder="••••••••" 
                      className="w-full text-sm border border-slate-200 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500" 
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                    />
                  </div>
                </div>

                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-md">
                  Masuk Sekarang
                </button>
              </form>

              <div className="relative flex py-2 items-center text-xs text-slate-400">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 font-semibold uppercase tracking-wider text-[10px]">Atau Masuk Dengan</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <button 
                onClick={() => {
                  setUser({ email: 'siti@nojobles.com', name: 'Siti Rahma', role: 'candidate' });
                  triggerToast('Berhasil masuk menggunakan akun Google!');
                  setCurrentPage('dashboard-candidate');
                }}
                className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" alt="Google" className="w-4 h-4" />
                Google OAuth
              </button>

              <p className="text-center text-xs text-slate-500 font-medium">
                Belum punya akun?{' '}
                <button onClick={() => setCurrentPage('register-candidate')} className="text-indigo-600 font-bold hover:underline">
                  Daftar di sini
                </button>
              </p>
            </div>
          </div>
        )}

        {/* 7. REGISTER CANDIDATE (Sesuai sitemap AUTH SYSTEM) */}
        {currentPage === 'register-candidate' && (
          <div className="max-w-md mx-auto px-4 py-16 animate-fade-in">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <div className="text-center space-y-2">
                <span className="inline-block bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Daftar Kandidat</span>
                <h2 className="text-2xl font-black text-slate-900">Daftar Akun Baru</h2>
                <p className="text-xs text-slate-500">Mulai perjalanan karir profesional baru bersama Nojobles.</p>
              </div>

              <form onSubmit={handleRegisterCandidate} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Nama Lengkap</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Masukkan nama lengkap Anda" 
                    className="w-full text-sm border border-slate-200 p-3 rounded-xl focus:outline-none focus:border-indigo-500" 
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Alamat Email</label>
                  <input 
                    required 
                    type="email" 
                    placeholder="nama@email.com" 
                    className="w-full text-sm border border-slate-200 p-3 rounded-xl focus:outline-none focus:border-indigo-500" 
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Kata Sandi</label>
                  <input 
                    required 
                    type="password" 
                    placeholder="Min. 8 karakter" 
                    className="w-full text-sm border border-slate-200 p-3 rounded-xl focus:outline-none focus:border-indigo-500" 
                  />
                </div>

                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-md">
                  Daftar Sebagai Pelamar
                </button>
              </form>

              <p className="text-center text-xs text-slate-500 font-medium">
                Punya perusahaan rekrutmen?{' '}
                <button onClick={() => setCurrentPage('register-recruiter')} className="text-emerald-600 font-bold hover:underline">
                  Daftar sebagai Recruiter
                </button>
              </p>
            </div>
          </div>
        )}

        {/* 8. REGISTER RECRUITER (Sesuai sitemap AUTH SYSTEM & "Untuk Perusahaan") */}
        {currentPage === 'register-recruiter' && (
          <div className="max-w-md mx-auto px-4 py-16 animate-fade-in">
            <div className="bg-white p-8 rounded-3xl border border-emerald-200 shadow-xl space-y-6">
              <div className="text-center space-y-2">
                <span className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Dashboard Recruiter</span>
                <h2 className="text-2xl font-black text-slate-900">Registrasi Perusahaan</h2>
                <p className="text-xs text-slate-500">Pasang lowongan kerja, filter kandidat, dan kelola seleksi rekrutmen.</p>
              </div>

              <form onSubmit={handleRegisterRecruiter} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Nama Recruiter / HRD</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Nama Anda" 
                    className="w-full text-sm border border-slate-200 p-3 rounded-xl focus:outline-none focus:border-emerald-500" 
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Nama Perusahaan</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Contoh: PT. Jaya Sakti Makmur" 
                    className="w-full text-sm border border-slate-200 p-3 rounded-xl focus:outline-none focus:border-emerald-500" 
                    value={authCompany}
                    onChange={(e) => setAuthCompany(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Alamat Email Kantor</label>
                  <input 
                    required 
                    type="email" 
                    placeholder="hr@perusahaan.com" 
                    className="w-full text-sm border border-slate-200 p-3 rounded-xl focus:outline-none focus:border-emerald-500" 
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                  />
                </div>

                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-md">
                  Daftar Akun HR Recruiter
                </button>
              </form>

              <p className="text-center text-xs text-slate-500 font-medium">
                Kembali ke pendaftaran kandidat?{' '}
                <button onClick={() => setCurrentPage('register-candidate')} className="text-indigo-600 font-bold hover:underline">
                  Klik di sini
                </button>
              </p>
            </div>
          </div>
        )}

        {/* 9. DASHBOARD CANDIDATE (Sesuai sitemap DASHBOARD CANDIDATE) */}
        {currentPage === 'dashboard-candidate' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
              <div className="space-y-1">
                <h1 className="text-2xl font-black text-slate-900">Halo, {user?.name || 'Kandidat Nojobles'}!</h1>
                <p className="text-xs text-slate-500">Kelola berkas lamaran, cek skor ATS resume, dan lihat perkembangan seleksi kerja.</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setCurrentPage('jobs')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
                >
                  Cari Lowongan Baru
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Kolom Kiri: Resume Health Check (AI Embedded Feature) */}
              <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" /> Resume Health Check (AI)
                </h3>
                <p className="text-xs text-slate-500">Unggah berkas CV Anda untuk dianalisa skor kelolosan ATS, keyword kurang, dan tata bahasa.</p>

                <form onSubmit={handleResumeScan} className="space-y-4">
                  <div className="border-2 border-dashed border-slate-200 hover:border-indigo-300 p-6 rounded-2xl text-center cursor-pointer transition-colors relative bg-slate-50">
                    <input 
                      required
                      type="file" 
                      accept=".pdf,.doc"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => setResumeFile(e.target.files[0]?.name || 'CV_Terpilih.pdf')}
                    />
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <span className="text-xs text-slate-600 font-bold block">{resumeFile || 'Pilih Berkas CV Utama'}</span>
                    <span className="text-[10px] text-slate-400">PDF atau Word (Maksimal 5MB)</span>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isAnalyzing}
                    className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold py-2.5 rounded-xl text-xs transition-colors"
                  >
                    {isAnalyzing ? 'Sedang Memindai...' : 'Mulai Pindai Resume'}
                  </button>
                </form>

                {resumeScore && (
                  <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 space-y-3 animate-scale-up text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-700">Skor Kelolosan ATS:</span>
                      <span className="font-extrabold text-indigo-700 text-base">{resumeScore.score}%</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-400 block">Kualitas Tata Bahasa:</span>
                      <span className="font-bold text-slate-700">{resumeScore.grammar}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-400 block">Kata Kunci Kurang:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {resumeScore.missing.map((sk, i) => (
                          <span key={i} className="bg-white border border-indigo-100 text-indigo-700 text-[10px] px-2 py-0.5 rounded font-bold">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Kolom Kanan: Status Applied Jobs */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-600" /> Applied Jobs (Status Lamaran)
                  </h3>

                  <div className="divide-y divide-slate-100">
                    {myApplications.map((app) => (
                      <div key={app.id} className="py-4 flex justify-between items-center gap-4">
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">{app.jobTitle}</h4>
                          <p className="text-xs text-slate-500 font-medium">{app.company} • {app.date}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${app.status === 'Interview' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-600" /> Rekomendasi Karir AI Untuk Anda
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {INITIAL_JOBS.slice(1).map((jb) => (
                      <div key={jb.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white transition-colors space-y-2">
                        <h4 className="font-bold text-slate-800 text-xs">{jb.title}</h4>
                        <p className="text-[10px] text-slate-400 font-bold">{jb.company}</p>
                        <span className="inline-block bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                          ATS match: 91%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 10. DASHBOARD RECRUITER (Sesuai sitemap DASHBOARD RECRUITER) */}
        {currentPage === 'dashboard-recruiter' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-emerald-200 shadow-xs">
              <div className="space-y-1">
                <span className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Pemberi Kerja</span>
                <h1 className="text-2xl font-black text-slate-900">Dashboard {user?.company || 'PT. Jaya Sakti Makmur'}</h1>
                <p className="text-xs text-slate-500">Pasang iklan lowongan premium, kelola pelamar, dan pantau performa rekrutmen.</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => triggerToast('Sistem sinkronisasi eksternal sedang berjalan')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" /> Integrasi ATS
                </button>
              </div>
            </div>

            {/* Statistik Widget */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center">
                <p className="text-2xl font-black text-emerald-600">3</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Lowongan Aktif</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center">
                <p className="text-2xl font-black text-indigo-600">{appliedCandidates.length}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Total Pelamar Masuk</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center">
                <p className="text-2xl font-black text-indigo-600">1</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Dalam Tahap Wawancara</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center">
                <p className="text-2xl font-black text-slate-400">92%</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Response Rate HR</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Kolom Kiri: Form Pasang Lowongan Baru (Sesuai sitemap Post Job) */}
              <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-emerald-600" /> Pasang Lowongan Baru
                </h3>
                
                <form onSubmit={handlePostJobSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">Judul Pekerjaan</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="Contoh: Senior UI Designer" 
                      className="w-full text-xs border border-slate-200 p-3 rounded-xl focus:outline-none focus:border-emerald-500" 
                      value={newJobTitle}
                      onChange={(e) => setNewJobTitle(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Tipe Kerja</label>
                      <select 
                        className="w-full text-xs border border-slate-200 p-3 rounded-xl focus:outline-none focus:border-emerald-500 bg-white"
                        value={newJobType}
                        onChange={(e) => setNewJobJobType(e.target.value)}
                      >
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Contract</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Kebijakan</label>
                      <select 
                        className="w-full text-xs border border-slate-200 p-3 rounded-xl focus:outline-none focus:border-emerald-500 bg-white"
                        value={newJobPolicy}
                        onChange={(e) => setNewJobPolicy(e.target.value)}
                      >
                        <option>Remote</option>
                        <option>On-site</option>
                        <option>Hybrid</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Min Gaji (Rp)</label>
                      <input 
                        required 
                        type="number" 
                        className="w-full text-xs border border-slate-200 p-3 rounded-xl focus:outline-none focus:border-emerald-500" 
                        value={newJobSalaryMin}
                        onChange={(e) => setNewJobSalaryMin(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Maks Gaji (Rp)</label>
                      <input 
                        required 
                        type="number" 
                        className="w-full text-xs border border-slate-200 p-3 rounded-xl focus:outline-none focus:border-emerald-500" 
                        value={newJobSalaryMax}
                        onChange={(e) => setNewJobSalaryMax(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">Deskripsi & Syarat Lowongan</label>
                    <textarea 
                      required 
                      rows="3" 
                      placeholder="Jelaskan kualifikasi dan kriteria kandidat yang dicari..." 
                      className="w-full text-xs border border-slate-200 p-3 rounded-xl focus:outline-none focus:border-emerald-500"
                      value={newJobDesc}
                      onChange={(e) => setNewJobDesc(e.target.value)}
                    ></textarea>
                  </div>

                  <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors">
                    Publikasikan Lowongan
                  </button>
                </form>
              </div>

              {/* Kolom Kanan: ATS Board & Pelamar (Sesuai sitemap ATS Board) */}
              <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                    <Users className="w-5 h-5 text-emerald-600" /> Board Rekrutmen Pelamar (ATS Board)
                  </h3>
                  <span className="text-xs text-slate-400 font-bold">Terurut Berdasarkan AI Match Score</span>
                </div>

                <div className="space-y-4">
                  {appliedCandidates.map((candidate) => (
                    <div key={candidate.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-800 text-sm">{candidate.name}</h4>
                          <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                            Skor AI: {candidate.score}%
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">Lowongan: <b>{candidate.job}</b></p>
                        <p className="text-[10px] text-indigo-600 font-bold underline cursor-pointer mt-1 inline-block">Lampiran: {candidate.cv}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <select 
                          className="text-[10px] border border-slate-200 bg-white p-1.5 rounded-lg focus:outline-none focus:border-indigo-500 font-bold"
                          value={candidate.status}
                          onChange={(e) => {
                            const updated = appliedCandidates.map(c => c.id === candidate.id ? { ...c, status: e.target.value } : c);
                            setAppliedCandidates(updated);
                            triggerToast(`Status lamaran ${candidate.name} diupdate ke ${e.target.value}`);
                          }}
                        >
                          <option>Review</option>
                          <option>Interview</option>
                          <option>Hired</option>
                          <option>Rejected</option>
                        </select>

                        <button 
                          onClick={() => {
                            setAppliedCandidates(appliedCandidates.filter(c => c.id !== candidate.id));
                            triggerToast(`Kandidat ${candidate.name} telah diproses.`);
                          }}
                          className="bg-slate-200 hover:bg-slate-300 text-slate-700 p-1.5 rounded-lg text-[10px] font-bold transition-colors"
                        >
                          Selesai
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ==========================================
          FOOTER INFORMASI
          ========================================== */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  N
                </div>
                <span className="text-lg font-black text-white">Nojobles.</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Infokerjadesign platform has transformed our workflog! The ease of uploading ACCORD forms means I can generate quotes in just a few minutes. It's a game changer for our agency.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Socials</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="hover:text-white cursor-pointer transition-colors">instagram</li>
                <li className="hover:text-white cursor-pointer transition-colors">Linkedin</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Contact</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>infokerjadesign@gmail.com</li>
                <li>+6285314108320</li>
                <li>Based in Riau, Indonesia</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Legalitas</h4>
              <ul className="space-y-2 text-xs text-slate-400 font-medium">
                <li className="hover:text-white cursor-pointer">Syarat & Ketentuan</li>
                <li className="hover:text-white cursor-pointer">Kebijakan Privasi</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} Nojobles. Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}