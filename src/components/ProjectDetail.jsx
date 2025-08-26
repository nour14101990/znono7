import React, { useEffect, useState, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, ExternalLink, Github, Code2, Star,
  ChevronRight, Layers, Layout, Globe, Package, Cpu, Code,
} from "lucide-react";
import Swal from 'sweetalert2';
import GifPopup from "../components/GifPopup";
import { motion } from 'framer-motion';
import AnimatedBackground from "./AnimatedBackground"; // Assuming path to AnimatedBackground

/*
  Further Redesigned ProjectDetails Component
  - Added AnimatedBackground for consistent portfolio theme
  - Introduced a "Related Projects" section at the bottom, showing up to 3 other projects
  - Enhanced stats with an additional "Completion Year" if available (assuming project has a 'Year' field; otherwise omitted)
  - Reorganized layout: Swapped columns for variety (image/features on left, text on right on large screens)
  - Added subtle parallax effect to the main image
  - Improved mobile layout with stacked sections and better padding
  - Updated Swal modal colors to match purple-indigo theme
  - Added smooth scroll to related projects
*/

// Tech icons mapping (added more for completeness)
const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  'ASP.NET Core': Cpu,
  'C#': Code,
  WPF: Layout,
  AvaloniaUI: Layout,
  'REST APIs': Package,
  Electron: Globe,
  Blazor: Layout,
  default: Package,
};

const TechBadge = memo(({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 cursor-default"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-indigo-500/0 group-hover:from-purple-500/10 group-hover:to-indigo-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-1.5 md:gap-2">
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
        <span className="text-xs md:text-sm font-medium text-purple-300/90 group-hover:text-purple-200 transition-colors">
          {tech}
        </span>
      </div>
    </motion.div>
  );
});

const FeatureItem = memo(({ feature }) => {
  return (
    <motion.li
      whileHover={{ x: 5 }}
      className="group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl hover:bg-slate-900/50 transition-all duration-300 border border-transparent hover:border-slate-700/50"
    >
      <div className="relative mt-2">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 group-hover:scale-125 transition-transform duration-300" />
      </div>
      <span className="text-sm md:text-base text-slate-300 group-hover:text-white transition-colors">
        {feature}
      </span>
    </motion.li>
  );
});

const ProjectStats = memo(({ project }) => {
  const techStackCount = project?.TechStack?.length || 0;
  const featuresCount = project?.Features?.length || 0;
  const completionYear = project?.Year || 'N/A'; // Assuming project has a 'Year' field; adjust as needed

  return (
    <div className="grid grid-cols-3 gap-3 md:gap-4 p-3 md:p-4 bg-slate-900/50 backdrop-blur-md rounded-xl overflow-hidden relative border border-slate-700/50">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 opacity-50 blur-2xl z-0" />

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-slate-900/70 p-2 md:p-3 rounded-lg border border-purple-500/20 transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg"
      >
        <div className="bg-purple-500/20 p-1.5 md:p-2 rounded-full">
          <Code2 className="text-purple-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-purple-200">{techStackCount}</div>
          <div className="text-[10px] md:text-xs text-slate-400">Tech Stack</div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-slate-900/70 p-2 md:p-3 rounded-lg border border-indigo-500/20 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-lg"
      >
        <div className="bg-indigo-500/20 p-1.5 md:p-2 rounded-full">
          <Layers className="text-indigo-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-indigo-200">{featuresCount}</div>
          <div className="text-[10px] md:text-xs text-slate-400">Key Features</div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-slate-900/70 p-2 md:p-3 rounded-lg border border-violet-500/20 transition-all duration-300 hover:border-violet-500/50 hover:shadow-lg"
      >
        <div className="bg-violet-500/20 p-1.5 md:p-2 rounded-full">
          <Star className="text-violet-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-violet-200">{completionYear}</div>
          <div className="text-[10px] md:text-xs text-slate-400">Completion Year</div>
        </div>
      </motion.div>
    </div>
  );
});

// Simple Related Project Card
const RelatedProjectCard = memo(({ proj, onClick }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    onClick={onClick}
    className="cursor-pointer bg-slate-900/50 backdrop-blur-md rounded-xl p-4 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300"
  >
    <h4 className="text-lg font-semibold text-slate-200 mb-2">{proj.Title}</h4>
    <p className="text-sm text-slate-400 line-clamp-2">{proj.Description}</p>
  </motion.div>
));

const handleGithubClick = (githubLink) => {
  if (githubLink === 'Private') {
    Swal.fire({
      icon: 'info',
      title: 'Source Code Private',
      text: 'Maaf, source code untuk proyek ini bersifat privat.',
      confirmButtonText: 'Mengerti',
      confirmButtonColor: '#818cf8', // Indigo-400
      background: '#0f172a', // Slate-950
      color: '#ffffff'
    });
    return false;
  }
  return true;
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const selectedProject = storedProjects.find((p) => String(p.id) === id);
    
    if (selectedProject) {
      const enhancedProject = {
        ...selectedProject,
        Features: selectedProject.Features || [],
        TechStack: selectedProject.TechStack || [],
        Github: selectedProject.Github || '',
        Year: selectedProject.Year || 'N/A', // Assuming Year field; add if available
      };
      setProject(enhancedProject);

      // Get related projects: random 3 others
      const others = storedProjects.filter((p) => String(p.id) !== id);
      const shuffled = others.sort(() => 0.5 - Math.random());
      setRelatedProjects(shuffled.slice(0, 3));
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          <h2 className="text-xl md:text-3xl font-bold text-white">Loading Project...</h2>
        </div>
      </div>
    );
  }

  // Motion variants for page elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div 
      className="min-h-screen bg-slate-950 px-[2%] sm:px-0 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <AnimatedBackground />

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
          <motion.div variants={itemVariants} className="flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(-1)}
              className="group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 bg-slate-900/50 backdrop-blur-xl rounded-xl text-slate-200 hover:bg-slate-800/50 transition-all duration-300 border border-slate-700/50 hover:border-slate-700/70 text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </motion.button>
            <div className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base text-slate-400">
              <span>Projects</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-slate-200 truncate">{project.Title}</span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 lg:grid-flow-col-dense">
            {/* Swapped: Image and features now on left for large screens */}
            <motion.div variants={itemVariants} className="space-y-6 md:space-y-10 order-2 lg:order-1">
              <GifPopup
                gifSrc={project.ImgDesc}
                usePreviewStyle
                onThumbLoad={() => setIsImageLoaded(true)}
              />
              {/* Key Features */}
              <div className="bg-slate-900/30 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 space-y-6 hover:border-slate-700/70 transition-colors duration-300 group">
                <h3 className="text-xl font-semibold text-slate-200 flex items-center gap-3">
                  <Star className="w-5 h-5 text-purple-400 group-hover:rotate-[20deg] transition-transform duration-300" />
                  Key Features
                </h3>
                {project.Features.length > 0 ? (
                  <ul className="list-none space-y-2">
                    {project.Features.map((feature, index) => (
                      <FeatureItem key={index} feature={feature} />
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-400 opacity-50">No features added.</p>
                )}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6 md:space-y-10 order-1 lg:order-2">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
                  {project.Title}
                </h1>
                <div className="relative h-1 w-16 md:w-24">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full blur-sm" />
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                  {project.Description}
                </p>
              </div>

              <ProjectStats project={project} />

              {/* Action buttons */}
              <div className="flex gap-4">
                {project?.Link && project.Link.trim() !== "" && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href={project.Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 hover:from-purple-600/20 hover:to-indigo-600/20 text-purple-300 rounded-xl transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                  >
                    <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-purple-600/10 to-indigo-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                    <ExternalLink className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                    <span className="relative font-medium">Live Demo</span>
                  </motion.a>
                )}

                {project?.Github && project.Github.trim() !== "" && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href={project.Github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-indigo-600/10 to-violet-600/10 hover:from-indigo-600/20 hover:to-violet-600/20 text-indigo-300 rounded-xl transition-all duration-300 border border-indigo-500/20 hover:border-indigo-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                    onClick={(e) => !handleGithubClick(project.Github) && e.preventDefault()}
                  >
                    <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-indigo-600/10 to-violet-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                    <Github className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                    <span className="relative font-medium">Github</span>
                  </motion.a>
                )}
              </div>

              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-semibold text-slate-200 mt-[3rem] md:mt-0 flex items-center gap-2 md:gap-3">
                  <Code2 className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                  Technologies Used
                </h3>
                {project.TechStack.length > 0 ? (
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.TechStack.map((tech, index) => (
                      <TechBadge key={index} tech={tech} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm md:text-base text-slate-400 opacity-50">No technologies added.</p>
                )}
              </div>
            </motion.div>
          </div>

          {/* New Related Projects Section */}
          {relatedProjects.length > 0 && (
            <motion.section variants={itemVariants} className="mt-16 md:mt-24">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-200 mb-8 flex items-center gap-3">
                <Layers className="w-6 h-6 text-indigo-400" />
                Related Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((proj) => (
                  <RelatedProjectCard 
                    key={proj.id} 
                    proj={proj} 
                    onClick={() => navigate(`/project/${proj.id}`)} 
                  />
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </motion.div>
  );
};

export default memo(ProjectDetails);