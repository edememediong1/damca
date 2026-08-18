import { 
  Project, 
  AcademyProgram, 
  RoadmapWeek, 
  IndustryItem, 
  ServiceItem, 
  PricingPackage, 
  Testimonial, 
  AcademyFeeOption, 
  FAQItem,
  ContactInquiry,
  StudentRegistration,
  SiteMediaConfig
} from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'apex-formula-cinematic',
    title: 'Velocity & Precision: Red Bull Apex',
    client: 'Red Bull Racing / Puma',
    category: 'Sports',
    shortDescription: 'High-octane commercial cut synchronized to custom sound design and dynamic speed-ramps.',
    duration: '01:45',
    year: '2025',
    softwareUsed: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    thumbnail: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-car-racing-on-a-track-41551-large.mp4',
    heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-car-racing-on-a-track-41551-large.mp4',
    featured: true,
    caseStudy: {
      heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-car-racing-on-a-track-41551-large.mp4',
      overview: 'A high-impact campaign engineered to capture the intense visceral energy of Formula motorsport for digital billboards and global social channels.',
      challenge: 'Over 40 hours of raw multi-cam footage shot across various lighting conditions, requiring seamless speed-ramping, tight match-cuts, and heavy color unification.',
      creativeProcess: 'We developed a rhythmic pacing structure built around the 130BPM acoustic heartbeat track, blending mechanical foley with cinematic sub-bass risers.',
      editingWorkflow: [
        'Organized 4K S-Log3 footage with strict metadata tagging',
        'Built dynamic rhythmic rhythm cut matching tire squeals and exhaust pops',
        'Applied optical flow time remapping for silky smooth 1000fps slow-motion transitions',
        'Implemented customized kinetic text typography in After Effects'
      ],
      motionGraphicsSummary: 'Custom HUD overlays with telemetry readouts and bespoke typography tracking vehicle movement.',
      colorGradingSummary: 'Pushed deep contrast in DaVinci Resolve using custom Kodak 2383 film emulation curves with lifted blacks and metallic gold highlights.',
      audioDesignSummary: 'Multi-layered 32-bit float audio design incorporating raw turbocharger spools, doppler passes, and bespoke bass impacts.',
      beforeAfter: {
        beforeLabel: 'Raw Flat S-Log3',
        afterLabel: 'Final Film Emulation Grade',
        beforeImage: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1000&auto=format&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1000&auto=format&fit=crop',
        description: 'Transformed washed-out flat sensor profiles into high-contrast, gold-flecked commercial grade.'
      },
      testimonial: {
        quote: 'The rhythm and storytelling elevated our campaign beyond anything we anticipated. The speed-ramping and audio design are masterclass.',
        author: 'Marcus Vance',
        role: 'Global Creative Lead',
        company: 'Red Bull Brand Studio',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'
      },
      results: [
        '4.2M+ organic views within 72 hours',
        'Selected for Awwwards Site of the Day Video Feature',
        '38% higher retention rate compared to previous brand campaigns'
      ]
    }
  },
  {
    id: 'chronicles-of-light',
    title: 'Chronicles of Light: The Alpine Watchmaker',
    client: 'Vacheron Constantin',
    category: 'Commercial',
    shortDescription: 'An intimate luxury documentary commercial exploring master horology in the Swiss Jura.',
    duration: '02:30',
    year: '2025',
    softwareUsed: ['DaVinci Resolve', 'Premiere Pro'],
    thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-craftsman-assembling-a-watch-42861-large.mp4',
    heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-craftsman-assembling-a-watch-42861-large.mp4',
    featured: true,
    caseStudy: {
      heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-craftsman-assembling-a-watch-42861-large.mp4',
      overview: 'A quiet, deeply atmospheric brand film focusing on micro-mechanics, heritage craft, and the philosophical weight of time.',
      challenge: 'Crafting tension and profound beauty from slow, minute mechanical adjustments without losing audience attention.',
      creativeProcess: 'We embraced negative space and ambient foley—letting the tick of the balance wheel lead the rhythm, paired with macro lens rack-focus cuts.',
      editingWorkflow: [
        'Constructed a 3-act emotional arc moving from dawn raw metal to finished timepiece',
        'Fine-tuned micro-pacing with cuts timed to the balance wheel oscillation',
        'Cleaned and amplified intimate macro sounds using iZotope RX'
      ],
      motionGraphicsSummary: 'Minimalist gold serif chapter cards and micro coordinates.',
      colorGradingSummary: 'Warm candlelight hues with golden amber brass tones and rich velvety midnight shadows.',
      audioDesignSummary: 'Binaural macro foley recording of gears, ruby bearings, and tweezers.',
      beforeAfter: {
        beforeLabel: 'Rec.709 Neutral',
        afterLabel: 'Warm Luxury Amber Grade',
        beforeImage: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop',
        description: 'Separated gold dial components with targeted hue isolation and rich atmospheric halation.'
      },
      testimonial: {
        quote: 'A breathtaking piece of visual poetry that truly honored the quiet soul of luxury watchmaking.',
        author: 'Elena Rinaldi',
        role: 'Head of Content',
        company: 'Vacheron & Co',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop'
      },
      results: [
        'Featured on Motionographer and Vimeo Staff Pick',
        'Over 98% average watch duration on YouTube Premium'
      ]
    }
  },
  {
    id: 'voices-of-the-savanna',
    title: 'Voices of the Savanna: Conservation Frontier',
    client: 'National Geographic Wild',
    category: 'Documentary',
    shortDescription: 'Award-winning featurette documenting ranger anti-poaching operations at twilight.',
    duration: '14:20',
    year: '2024',
    softwareUsed: ['DaVinci Resolve', 'Premiere Pro', 'ProTools'],
    thumbnail: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop',
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-elephants-walking-in-the-savannah-42867-large.mp4',
    heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-elephants-walking-in-the-savannah-42867-large.mp4',
    featured: true,
    caseStudy: {
      heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-elephants-walking-in-the-savannah-42867-large.mp4',
      overview: 'A gritty yet cinematic documentary chronicling the human and wildlife stories across the Serengeti ecosystem.',
      challenge: 'Harsh midday African sun footage mixed with extreme low-light night-vision drone sensors needing uniform treatment.',
      creativeProcess: 'We cut the story not as a lecture, but as a suspenseful human journey intertwining ranger interviews with raw wilderness tension.',
      editingWorkflow: [
        'Built extensive A-roll stringouts of indigenous ranger oral histories',
        'Layered ambient natural soundscapes recorded on ambisonic microphones',
        'Graded challenging mixed-color temperature lighting with custom node trees'
      ],
      motionGraphicsSummary: 'Hand-drawn cartography maps and wildlife tracking telemetry graphics.',
      colorGradingSummary: 'Deep cinematic earth tones, sun-drenched golden hour dust, and rich foliage greens.',
      audioDesignSummary: 'Wild spatial audio mixes blending crickets, wind rustles, and distant thunder.',
      beforeAfter: {
        beforeLabel: 'Overexposed Midday RAW',
        afterLabel: 'Golden Dust Cinema Grade',
        beforeImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1000&auto=format&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1000&auto=format&fit=crop',
        description: 'Recovered sky highlights and added organic 35mm film grain texture.'
      },
      results: [
        'Winner: Best Short Documentary at Tribeca X',
        'Helped raise $1.4M for African Wildlife Foundation'
      ]
    }
  },
  {
    id: 'sacred-fire-worship',
    title: 'Resonance: Global Worship Conference',
    client: 'Elevation Worship & Hillsong London',
    category: 'Church',
    shortDescription: 'Multi-camera stadium praise experience with immersive visual rhythm and stage graphics.',
    duration: '06:40',
    year: '2025',
    softwareUsed: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-stage-lights-at-a-music-concert-40292-large.mp4',
    heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-stage-lights-at-a-music-concert-40292-large.mp4',
    featured: false,
    caseStudy: {
      heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-stage-lights-at-a-music-concert-40292-large.mp4',
      overview: 'A 24-camera live concert edit capturing raw devotion, stage lighting choreography, and crowd connection.',
      challenge: 'Managing 24 synchronous 4K angles with rapid strobing lights and extreme dynamic range from stage spotlights.',
      creativeProcess: 'Synced to multi-track stems, cutting precisely on harmonic chord resolutions and crowd emotion swells.',
      editingWorkflow: [
        'Built a 24-angle multicam sequence with timecode synchronization',
        'Customized light flare transitions matching moving spotlights',
        'Mastered 5.1 surround sound audio balance'
      ],
      motionGraphicsSummary: 'Kinetic lyric typography and subtle ambient bokeh particles.',
      colorGradingSummary: 'Controlled deep concert blues with warm skin tones and protected neon saturation.',
      audioDesignSummary: 'Master stereo & Dolby Atmos mix blending live room crowd microphones.',
      beforeAfter: {
        beforeLabel: 'Blown-out Stage Lighting',
        afterLabel: 'Balanced Concert Master',
        beforeImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop',
        description: 'Tamed harsh LED banding and preserved natural human skin highlights.'
      },
      results: [
        '2.1M YouTube views within 2 weeks',
        'Standardized editing template adopted for 12 global tours'
      ]
    }
  },
  {
    id: 'titan-cyber-trailer',
    title: 'Neon Odyssey: AAA Game Official Launch Trailer',
    client: 'Sony Interactive / Ghost Games',
    category: 'Trailers',
    shortDescription: 'Cinematic game trailer blending in-engine capture with kinetic typography and glitch VFX.',
    duration: '01:30',
    year: '2024',
    softwareUsed: ['After Effects', 'Premiere Pro', 'Cinema 4D'],
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-tunnel-with-neon-lights-42998-large.mp4',
    heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-tunnel-with-neon-lights-42998-large.mp4',
    featured: false,
    caseStudy: {
      heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-tunnel-with-neon-lights-42998-large.mp4',
      overview: 'A fast-paced reveal trailer built for E3 & Summer Game Fest to drive pre-orders for a cyber-noir RPG.',
      challenge: 'Syncing complex narrative voiceovers with non-stop action set pieces in exactly 90 seconds.',
      creativeProcess: 'Designed with a three-drop trailer structure: teasing mysterious lore before an explosive crescendo.',
      editingWorkflow: [
        'Cut to custom trailer music with sub-bass drops and risers',
        'Integrated 3D camera projections and custom HUD optics in After Effects',
        'Crafted sound design with sci-fi weaponry foley'
      ],
      motionGraphicsSummary: '3D floating UI, cybernetic scan lines, and stylized 3D logo resolve.',
      colorGradingSummary: 'Cyberpunk teal and neon magenta contrast curves.',
      audioDesignSummary: 'Sub-bass trailer thuds and custom synthesized UI clicks.',
      beforeAfter: {
        beforeLabel: 'Flat Gameplay Capture',
        afterLabel: 'Cinematic Trailer Grade',
        beforeImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop',
        description: 'Added volumetric glow, anamorphic lens flares, and cinematic letterboxing.'
      },
      results: [
        'Trended #1 on YouTube Gaming globally for 48 hours',
        'Drove 320,000+ Steam Wishlists in first week'
      ]
    }
  },
  {
    id: 'founders-mindset-podcast',
    title: 'The Unfiltered Mind: Masterclass Series',
    client: 'Silicon Valley Founders Network',
    category: 'Podcast',
    shortDescription: 'Multi-camera talking head series with dynamic b-roll cutaways and social short-form chops.',
    duration: '45:00',
    year: '2025',
    softwareUsed: ['Premiere Pro', 'Descript', 'After Effects'],
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop',
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-interview-in-a-studio-with-professional-microphones-43282-large.mp4',
    heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-interview-in-a-studio-with-professional-microphones-43282-large.mp4',
    featured: false,
    caseStudy: {
      heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-interview-in-a-studio-with-professional-microphones-43282-large.mp4',
      overview: 'Turned dry executive conversations into gripping, documentary-style visual podcast episodes.',
      challenge: 'Maintaining engaging visual pacing across 60+ minute continuous interviews.',
      creativeProcess: 'We cut dead air, inserted cinematic illustrative B-roll, and rendered 15 viral 9:16 reels per episode.',
      editingWorkflow: [
        'AI transcription pacing optimization',
        'Dynamic multi-camera angle switching based on vocal inflection',
        'Automated hook highlighting for TikTok & Shorts conversion'
      ],
      motionGraphicsSummary: 'Minimal lower thirds with founder stats and animated quote highlights.',
      colorGradingSummary: 'Clean, modern studio grading with natural skin tones.',
      audioDesignSummary: 'Studio broadcast leveling with noise suppression and vocal warmth.',
      beforeAfter: {
        beforeLabel: 'Raw Room Audio & Lighting',
        afterLabel: 'Polished Studio Broadcast',
        beforeImage: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1000&auto=format&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1000&auto=format&fit=crop',
        description: 'Cleaned acoustic reflections and balanced skin exposure across multi-cam.'
      },
      results: [
        'Spotify Top 10 Business Podcasts debut',
        'Generated 12M+ total short-form impressions'
      ]
    }
  }
];

export const INITIAL_PROGRAMS: AcademyProgram[] = [
  {
    id: 'prog-beginner',
    number: '01',
    title: 'Beginner Editing',
    duration: '4 Weeks',
    level: 'Foundations',
    description: 'No experience needed. Master the fundamentals of video editing — cuts, timing, transitions, and storytelling basics using Adobe Premiere Pro.',
    skills: ['Premiere Pro Basics', 'Timeline Assembly', 'Basic Color', 'Audio Sync', 'Export Settings', 'File Management'],
    price: '$450',
    isPopular: false
  },
  {
    id: 'prog-intermediate',
    number: '02',
    title: 'Intermediate Editing',
    duration: '6 Weeks',
    level: 'Skill Accelerator',
    description: 'Elevate your editing with advanced techniques — multi-cam workflows, dynamic transitions, motion graphics, and professional color grading.',
    skills: ['Advanced Cuts', 'Multi-cam Editing', 'After Effects Basics', 'Color Grading', 'Audio Mixing', 'Speed Ramping'],
    price: '$750',
    isPopular: false
  },
  {
    id: 'prog-advanced',
    number: '03',
    title: 'Advanced Editing',
    duration: '8 Weeks',
    level: 'Mastery',
    description: 'Master cinematic storytelling, complex motion graphics, broadcast-quality color science, and professional post-production workflows.',
    skills: ['Cinematic Editing', 'Complex VFX', 'DaVinci Resolve', 'Professional Workflow', 'Client Management', 'Audio Mastering'],
    price: '$1,200',
    isPopular: true
  },
  {
    id: 'prog-mentorship',
    number: '04',
    title: 'Private Mentorship',
    duration: 'Flexible',
    level: '1-on-1 Personalized',
    description: '1-on-1 sessions with your mentor tailored to your exact goals — whether launching a freelance career, building a reel, or landing your first client.',
    skills: ['Personalized Curriculum', 'Portfolio Review', 'Career Strategy', 'Client Acquisition', 'Business Setup', 'Direct Project Feedback'],
    price: '$1,800',
    isPopular: false
  },
  {
    id: 'prog-corporate',
    number: '05',
    title: 'Corporate Training',
    duration: 'Custom',
    level: 'Enterprise Teams',
    description: 'Bespoke training programs for marketing teams, content studios, and media organizations looking to build or upskill an in-house editing team.',
    skills: ['Team Training', 'Brand Video Workflows', 'Standardized Processes', 'Tool Mastery', 'Quality Control', 'Asset Architecture'],
    price: 'Custom Quote',
    isPopular: false
  }
];

export const INITIAL_ROADMAP: RoadmapWeek[] = [
  {
    weekNumber: '01',
    title: 'Foundations & Ingestion Architecture',
    description: 'Software setup, interface mastery, project management, and high-speed workflow ergonomics.',
    topics: ['Folder structuring & strict metadata tagging', 'Keyboard shortcuts & speed ergonomics', 'Workspace customization', 'Codec, ProRes & timeline color space setup'],
    tool: 'Adobe Premiere Pro',
    deliverable: 'Organized Multi-cam Stringout & Timeline Project Template',
    resourceLink: 'https://damca.academy/assets/week1-ingestion-pack.zip'
  },
  {
    weekNumber: '02',
    title: 'Editing Principles & Rhythmic Cutting',
    description: 'The language of editing — cuts, continuity, acoustic timing, match-cuts, and pacing fundamentals.',
    topics: ['J-cuts, L-cuts, & rhythmic match cuts', 'Establishing acoustic rhythm & breath', 'Montage theory & eye-tracking guidance', 'Trimming & sub-frame ripple mastery'],
    tool: 'Premiere Pro / Timeline',
    deliverable: '60-Second Rhythmic Commercial Cut with Foley Sync',
    resourceLink: 'https://damca.academy/assets/week2-rhythm-footage.zip'
  },
  {
    weekNumber: '03',
    title: 'Cinematic Storytelling & Narrative Arcs',
    description: 'Story arcs, emotional rhythm, radio edit interview structuring, and strategic B-roll weaving.',
    topics: ['3-Act narrative emotional structures', 'Radio edit technique & speech pacing', 'Emotional resonance mapping', 'B-roll context insertion & match transitions'],
    tool: 'Narrative Theory',
    deliverable: '2-Minute Character Documentary Mini-Feature',
    resourceLink: 'https://damca.academy/assets/week3-doc-interviews.zip'
  },
  {
    weekNumber: '04',
    title: 'DaVinci Resolve Color Science & Film Emulation',
    description: 'Correction vs. artistic grading, LUT engineering, primary and secondary color node science.',
    topics: ['Exposure calibration & skin tone vectorscope isolation', 'Node tree architecture & gamut mapping', 'Custom Kodak 2383 / Fuji film emulation curves', 'Halation, bloom & grain texture integration'],
    tool: 'DaVinci Resolve Studio',
    deliverable: 'Color Graded Commercial Spot with Before/After Stills',
    resourceLink: 'https://damca.academy/assets/week4-raw-slog3-pack.zip'
  },
  {
    weekNumber: '05',
    title: 'Motion Graphics & Kinetic Typography',
    description: 'Kinetic title sequences, animated lower-thirds, rotoscoping, HUD telemetry overlays.',
    topics: ['Keyframing & graph editor speed curves', 'Masking, tracking & rotoscoping', 'Kinetic typography & expression linking', 'MOGRT template development'],
    tool: 'Adobe After Effects',
    deliverable: 'Custom Broadcast Lower-Third & Title Sequence Package',
    resourceLink: 'https://damca.academy/assets/week5-ae-assets.zip'
  },
  {
    weekNumber: '06',
    title: 'Sound Design, Foley & Stem Mixing',
    description: 'Immersive sound architecture, frequency cleaning, sub-bass risers, and broadcast loudness.',
    topics: ['32-bit float foley layering & panning', 'Dialogue cleaning with iZotope RX spectral repair', 'Sub-bass risers, whooshes & impact sound design', 'LUFS loudness compliance for Web & Broadcast'],
    tool: 'ProTools / Audition / Premiere',
    deliverable: '5.1 / Stereo Sound Design Mix for Action Trailer',
    resourceLink: 'https://damca.academy/assets/week6-sound-fx-vault.zip'
  },
  {
    weekNumber: '07',
    title: 'Live Client Briefs & Production Simulation',
    description: 'Work on actual commercial briefs from real brand partners with mentor feedback rounds.',
    topics: ['Client brief breakdown & pitch treatments', 'Delivering v1, v2, vFinal cut workflows', 'Handling tough client revisions & timecode notes', 'Quality control checklists & delivery specs'],
    tool: 'Live Client Briefs',
    deliverable: 'Approved Client Deliverable with Full Stem Exports',
    resourceLink: 'https://damca.academy/assets/week7-brand-briefs.zip'
  },
  {
    weekNumber: '08',
    title: 'Showreel Polish, Portfolio & Career Launch',
    description: 'Final project submission, showreel critique panel, certificate ceremony, and client pipeline onboarding.',
    topics: ['Curating your killer 60-second industry showreel', 'Case study presentation & pricing architecture', 'Personal brand positioning & cold outreach system', 'Alumni referral network & DAMCA certification'],
    tool: 'DAMCA Industry Certification',
    deliverable: 'Master 60-Second Industry Showreel & Case Study',
    resourceLink: 'https://damca.academy/assets/week8-showreel-toolkit.zip'
  }
];

export const INDUSTRIES_SERVED: IndustryItem[] = [
  { id: 'sports', name: 'Sports & Athletics', description: 'High-energy cuts, dynamic speed ramps, and adrenaline-fueled sound design.', iconName: 'Flame', tag: 'High-Paced', projectCount: '28+ Projects' },
  { id: 'documentary', name: 'Documentary Films', description: 'Intimate storytelling, nuanced pacing, and raw human emotional depth.', iconName: 'Film', tag: 'Story-Driven', projectCount: '19+ Projects' },
  { id: 'commercial', name: 'Commercial Brands', description: 'High-conversion advertising, bold color grading, and razor-sharp product pacing.', iconName: 'Sparkles', tag: 'Broadcast', projectCount: '45+ Projects' },
  { id: 'corporate', name: 'Corporate & Tech', description: 'Polished investor reels, tech keynote visual narratives, and culture pieces.', iconName: 'Building', tag: 'Corporate', projectCount: '32+ Projects' },
  { id: 'podcast', name: 'Podcasts & Talk', description: 'Seamless multi-cam switching, audio enhancement, and high-impact short cuts.', iconName: 'Mic', tag: 'Multi-Cam', projectCount: '50+ Episodes' },
  { id: 'church', name: 'Church & Ministry', description: 'Inspiring worship experiences, sermon series promos, and testimony films.', iconName: 'Cross', tag: 'Inspirational', projectCount: '38+ Projects' },
  { id: 'education', name: 'Education & Courses', description: 'Clear instructional architecture, engaging visuals, and learner retention.', iconName: 'GraduationCap', tag: 'Instructional', projectCount: '22+ Courses' },
  { id: 'youtube', name: 'YouTube Creators', description: 'Retention-optimized pacing, visual hooks, sound effects, and kinetic text.', iconName: 'PlaySquare', tag: 'Growth-Focused', projectCount: '120+ Videos' },
  { id: 'luxury', name: 'Luxury Brands', description: 'Elegant typography, macro-detail focus, and timeless film color palettes.', iconName: 'Crown', tag: 'High-End', projectCount: '15+ Brands' },
  { id: 'events', name: 'Events & Galas', description: 'Cinematic aftermovies, stage recaps, and emotional memory reels.', iconName: 'Calendar', tag: 'Live Experience', projectCount: '26+ Events' },
  { id: 'social', name: 'Social Media & Reels', description: '9:16 viral storytelling, stop-scrolling hooks, and modern motion graphics.', iconName: 'Share2', tag: 'Viral Formats', projectCount: '200+ Shorts' },
  { id: 'music', name: 'Music Videos', description: 'Rhythmic cutting, stylized VFX, glitch aesthetics, and artistic narrative sync.', iconName: 'Music', tag: 'Creative VFX', projectCount: '18+ Videos' }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'video-editing',
    title: 'Video Editing',
    subtitle: 'Rhythm & Narrative Flow',
    description: 'Precision cutting that transforms raw footage into compelling, high-retention visual stories.',
    deliverables: ['Rough cut & fine cut reviews', 'Multi-camera synchronization', 'Frame-accurate audio sync', 'Optimized aspect ratios (16:9, 9:16, 1:1)'],
    icon: 'Scissors'
  },
  {
    id: 'motion-graphics',
    title: 'Motion Graphics',
    subtitle: 'Kinetic Visual Identity',
    description: 'Bespoke 2D/3D animated titles, HUD overlays, lower thirds, and kinetic typography that enrich your visual brand.',
    deliverables: ['Custom animated title sequences', 'Kinetic typography overlays', 'Logo resolves & stings', 'Custom After Effects templates'],
    icon: 'Layers'
  },
  {
    id: 'color-grading',
    title: 'Color Grading',
    subtitle: 'Film Science & Mood',
    description: 'Broadcast-standard color correction and artistic cinema grading in DaVinci Resolve.',
    deliverables: ['Exposure & white balance calibration', 'Custom film emulation LUTs', 'Shot-to-shot color continuity', 'HDR & SDR delivery standards'],
    icon: 'Palette'
  },
  {
    id: 'commercial-editing',
    title: 'Commercial Editing',
    subtitle: 'Conversion & Brand Power',
    description: 'Fast-paced, impactful commercial spots engineered to stop the scroll and drive measurable action.',
    deliverables: ['TV & digital cutdowns (:60, :30, :15, :06)', 'Brand guideline adherence', 'Hook & CTA optimization', 'Master broadcast exports'],
    icon: 'Tv'
  },
  {
    id: 'documentary-editing',
    title: 'Documentary Editing',
    subtitle: 'Deep Emotional Resonance',
    description: 'Long-form narrative construction with extensive interview weaving, archival curation, and pacing control.',
    deliverables: ['Radio edit & interview transcription', 'Archival footage integration', 'Subtle narrative pacing', 'Chapter markers & subtitle files'],
    icon: 'Clapperboard'
  },
  {
    id: 'youtube-editing',
    title: 'YouTube Editing',
    subtitle: 'Retention & Audience Growth',
    description: 'Data-driven YouTube editing engineered for 50%+ retention with sound design, zoom snaps, and pop-ups.',
    deliverables: ['Pattern interrupts & zoom cuts', 'Sound effects & meme integration', 'Thumbnail freeze frame picks', 'Full chapter markers'],
    icon: 'Video'
  },
  {
    id: 'podcast-editing',
    title: 'Podcast Editing',
    subtitle: 'Clean Audio & Multi-Cam Visuals',
    description: 'Comprehensive studio podcast production with pristine audio leveling and automated vertical short chops.',
    deliverables: ['Noise suppression & EQ vocal polish', 'Multi-camera intelligent switching', '3-5 viral short clips per episode', 'Full video & audio feeds'],
    icon: 'Radio'
  },
  {
    id: 'creative-direction',
    title: 'Creative Direction',
    subtitle: 'Holistic Visual Architecture',
    description: 'End-to-end post-production supervision, creative treatment drafting, and team leadership for high-stakes projects.',
    deliverables: ['Creative moodboards & treatments', 'Post-production supervision', 'Music & voiceover curation', 'Complete delivery architecture'],
    icon: 'Compass'
  }
];

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'price-basic',
    name: 'Basic',
    subtitle: 'Perfect for creators and individuals',
    price: '$750',
    turnaroundTime: '3-4 Business Days',
    revisions: '2 Rounds Included',
    deliverables: ['1 Finished Video (up to 3 min)', '1080p Full HD Master', 'Basic Color Correction', 'Standard Sound Balancing'],
    features: [
      'Raw footage assembly up to 30 mins',
      'Standard cut & pacing',
      'Basic royalty-free music track',
      'Social media aspect ratio cutdown (1 format)'
    ],
    isPopular: false
  },
  {
    id: 'price-intermediate',
    name: 'Intermediate',
    subtitle: 'Growing businesses and brands',
    price: '$1,500',
    turnaroundTime: '5-6 Business Days',
    revisions: '3 Rounds Included',
    deliverables: ['1 Finished Video (up to 5 min)', '4K Master + 1080p Web', '2 Vertical Shorts (9:16)', 'Full DaVinci Color Grade'],
    features: [
      'Raw footage assembly up to 2 hours',
      'Custom motion titles & lower thirds',
      'Multi-track sound design & foley',
      'Speed ramping & kinetic transitions',
      'Direct Slack communication channel'
    ],
    isPopular: false
  },
  {
    id: 'price-advanced',
    name: 'Advanced',
    subtitle: 'Premium editing for established companies',
    price: '$2,800',
    turnaroundTime: '7-9 Business Days',
    revisions: 'Unlimited Rounds',
    deliverables: ['Hero Master Video (up to 10 min)', '4K ProRes 422 HQ Masters', '5 Vertical Hooks / Cutdowns', 'Full Audio Stem Delivery'],
    features: [
      'Multi-cam & extensive raw footage handling',
      'Custom 2D/3D motion graphics & VFX',
      'Cinematic Kodak/Fuji film emulation grade',
      'Bespoke sound design & audio mastering',
      'Dedicated project manager & rush queue'
    ],
    isPopular: true
  },
  {
    id: 'price-custom',
    name: 'Custom',
    subtitle: 'Enterprise projects with custom requirements',
    price: 'Custom',
    turnaroundTime: 'Tailored Schedule',
    revisions: 'Dedicated SLA',
    deliverables: ['Full Campaign Suite', 'Documentary Feature / Series', 'Global Broadcast Masters', 'Comprehensive Source Files'],
    features: [
      'On-demand creative director involvement',
      'High-security NDA workflow',
      'White-glove revisions & live sessions',
      'Custom original musical score curation',
      'Retainer or multi-project volume discount'
    ],
    isPopular: false
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    name: 'Julian Montgomery',
    role: 'Executive Creative Director',
    company: 'Vanguard Media Group',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    quote: 'Working with this team was an absolute game-changer. The timing, the audio dynamics, and the subtle color nuances took our brand film from good to an award-winning cinematic spectacle.',
    projectOrCourse: 'Vacheron Constantin Campaign',
    type: 'portfolio',
    rating: 5
  },
  {
    id: 't-2',
    name: 'Sarah Chen',
    role: 'Head of Content',
    company: 'Apex Athletics',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    quote: 'The level of craftsmanship is rare. Every beat hits with intention. They delivered our campaign ahead of deadline, and it crushed our previous engagement metrics by 300%.',
    projectOrCourse: 'Red Bull Velocity Commercial',
    type: 'portfolio',
    rating: 5
  },
  {
    id: 't-3',
    name: 'David Adeleke',
    role: 'Lead Editor',
    company: 'Now at Studio 24',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    quote: 'DAMCA Academy completely changed the trajectory of my career. In 8 weeks, I went from knowing basic cuts to mastering DaVinci color curves and landing high-paying international clients.',
    projectOrCourse: 'DAMCA Advanced Editing Cohort 4',
    type: 'student',
    rating: 5
  },
  {
    id: 't-4',
    name: 'Kemi Balogun',
    role: 'Commercial Filmmaker',
    company: 'Freelance Director',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
    quote: 'The mentorship gave me the exact confidence and technical depth I needed. The direct feedback on my real client edits alone was worth ten times the tuition.',
    projectOrCourse: 'DAMCA Private Mentorship',
    type: 'student',
    rating: 5
  }
];

export const ACADEMY_FEES: AcademyFeeOption[] = [
  {
    id: 'fee-standard',
    title: 'Standard',
    price: '$650',
    originalPrice: '$850',
    installmentNote: 'Or 2 monthly payments of $350',
    features: [
      'Access to all 8 core curriculum modules',
      'Weekly live group Q&A sessions',
      'Course project files & raw cinema footage',
      'Private student community Discord access',
      'Certificate of Completion upon graduation'
    ],
    isPopular: false
  },
  {
    id: 'fee-private',
    title: 'Private Mentorship',
    price: '$1,250',
    originalPrice: '$1,600',
    installmentNote: 'Or 3 monthly payments of $450',
    badge: 'MOST POPULAR',
    features: [
      'Everything in Standard',
      'Four 1-on-1 private video review calls',
      'Direct feedback on your personal client projects',
      'Exclusive DAMCA Master LUT & Sound FX Library',
      'Direct portfolio & reel polish before launch',
      'Priority client referral board access'
    ],
    isPopular: true
  },
  {
    id: 'fee-vip',
    title: 'VIP Masterclass',
    price: '$2,400',
    originalPrice: '$3,000',
    installmentNote: 'Or 4 monthly payments of $650',
    features: [
      'Everything in Private Mentorship',
      'Unlimited 1-on-1 direct WhatsApp voice note access',
      'Co-editing on your first high-ticket live client project',
      'Complete Freelance Contract & Proposal Master Templates',
      'Lifetime access to all future course updates',
      '1-year ongoing alumni mentorship circle'
    ],
    isPopular: false
  }
];

export const ACADEMY_FAQS: FAQItem[] = [
  {
    question: 'Do I need prior editing experience to enroll?',
    answer: 'No! Our Beginner and Foundations tracks are specifically structured from ground zero. We start with interface orientation, shortcut ergonomics, and file ingestion before progressing to cinematic storytelling.',
    category: 'General'
  },
  {
    question: 'What computer hardware and software do I need?',
    answer: 'A Mac or PC with at least 16GB of RAM (32GB recommended for 4K workflows) and a dedicated GPU. We primarily teach on Adobe Premiere Pro, After Effects, and DaVinci Resolve Studio.',
    category: 'Hardware'
  },
  {
    question: 'How do the live sessions and homework reviews work?',
    answer: 'All weekly theory lectures are accompanied by hands-on editing challenges using real raw footage provided by DAMCA. Your mentor reviews your timeline live on screen, giving exact timestamped feedback.',
    category: 'Curriculum'
  },
  {
    question: 'Are installment payment plans available?',
    answer: 'Yes! We provide flexible 2-month, 3-month, and 4-month installment options with instant access upon your initial deposit.',
    category: 'Billing'
  },
  {
    question: 'Will I receive a recognized certificate upon graduation?',
    answer: 'Yes. Students who complete all module assignments and submit an approved capstone showreel receive the verified DAMCA Academy Industry Editor Certificate.',
    category: 'Graduation'
  }
];

export const INITIAL_CONTACTS: ContactInquiry[] = [
  {
    id: 'cnt-01',
    name: 'Marcus Vance',
    email: 'marcus.vance@redbull.com',
    company: 'Red Bull Racing / Brand Studio',
    budget: '$10,000+',
    projectType: 'Commercial',
    description: 'Looking to produce a 4-part adrenaline mini-documentary series following our junior driver academy in Europe. Need heavy speed ramping, sound design, and broadcast color grading.',
    date: '2026-08-12 14:32',
    status: 'new',
    phone: '+44 20 7946 0912',
    notes: 'High priority lead. Scheduled discovery call for Friday 3 PM GMT.'
  },
  {
    id: 'cnt-02',
    name: 'Elena Rostova',
    email: 'elena@voguemag.it',
    company: 'Condé Nast / Milan Fashion',
    budget: '$5,000 - $10,000',
    projectType: 'Commercial',
    description: 'Need editorial runway recap videos with luxury macro focus, 35mm grain emulation, and dynamic 9:16 reels for Milan Fashion Week.',
    date: '2026-08-11 09:15',
    status: 'in-discussion',
    phone: '+39 02 8901 2345',
    notes: 'Sent initial rate card & treatment deck. Awaiting moodboard approval.'
  },
  {
    id: 'cnt-03',
    name: 'Pastor Michael Davies',
    email: 'mdavies@gracecity.church',
    company: 'Grace City Global Church',
    budget: '$2,500 - $5,000',
    projectType: 'Church',
    description: 'Multi-camera Easter & Summer conference worship experience edit. 16 cameras 4K with stadium lighting. Need master audio stems balanced.',
    date: '2026-08-10 17:40',
    status: 'booked',
    phone: '+1 (512) 555-0199',
    notes: 'Deposit received. Footage delivered via Aspera server.'
  },
  {
    id: 'cnt-04',
    name: 'Jason Sterling',
    email: 'jason@hypersonicgames.io',
    company: 'Hypersonic Studios (Sony Pub)',
    budget: '$10,000+',
    projectType: 'Trailers',
    description: 'Need a 90-second reveal trailer for an upcoming Unreal Engine 5 sci-fi extraction shooter. High tempo kinetic cuts, 3D HUD typography, sub-bass trailer drops.',
    date: '2026-08-08 11:20',
    status: 'contacted',
    phone: '+1 (415) 890-3411',
    notes: 'NDA signed. Sent Dropbox capture folder.'
  },
  {
    id: 'cnt-05',
    name: 'Tariq Al-Mansoor',
    email: 'tariq@visionarypodcast.co',
    company: 'Visionary Founders Podcast',
    budget: '$2,500 - $5,000',
    projectType: 'Podcast',
    description: 'Weekly 3-camera founder interviews with B-roll cutaways and 10 viral short-form clips per episode on a monthly retainer.',
    date: '2026-08-06 16:05',
    status: 'in-discussion',
    phone: '+971 50 123 4567',
    notes: 'Testing pilot episode turnaround time.'
  }
];

export const INITIAL_STUDENTS: StudentRegistration[] = [
  {
    id: 'stu-101',
    fullName: 'David Adeleke',
    email: 'david.adeleke@gmail.com',
    phone: '+234 803 456 7890',
    programId: 'prog-advanced',
    programTitle: 'Advanced Mastery (8 Weeks)',
    paymentPreference: 'paid',
    enrollmentStatus: 'active',
    registeredDate: '2026-08-01',
    progressPercentage: 75,
    assignedMentor: 'DAMCA Lead Director',
    showreelUrl: 'https://vimeo.com/892341234',
    notes: 'Excelling in DaVinci Resolve color curves. Capstone project is a luxury perfume commercial.',
    tuitionAmount: '$1,200'
  },
  {
    id: 'stu-102',
    fullName: 'Kemi Balogun',
    email: 'kemi.balogun@filmmakers.ng',
    phone: '+234 812 987 6543',
    programId: 'prog-mentorship',
    programTitle: 'Private 1-on-1 Mentorship',
    paymentPreference: 'paid',
    enrollmentStatus: 'active',
    registeredDate: '2026-08-04',
    progressPercentage: 60,
    assignedMentor: 'Senior Motion Lead',
    showreelUrl: 'https://vimeo.com/781920394',
    notes: 'Co-editing first international commercial brief under direct supervision.',
    tuitionAmount: '$1,800'
  },
  {
    id: 'stu-103',
    fullName: 'Jordan Hayes',
    email: 'jordan.hayes@creatornet.io',
    phone: '+1 (310) 555-8392',
    programId: 'prog-intermediate',
    programTitle: 'Intermediate Accelerator (6 Weeks)',
    paymentPreference: 'installment',
    enrollmentStatus: 'onboarding',
    registeredDate: '2026-08-11',
    progressPercentage: 20,
    assignedMentor: 'Post-Production Supervisor',
    showreelUrl: '',
    notes: 'Completed Premiere Pro shortcut orientation. First homework due Friday.',
    tuitionAmount: '$750'
  },
  {
    id: 'stu-104',
    fullName: 'Sophia Zhang',
    email: 'sophia.zhang@vfxmotion.com',
    phone: '+1 (416) 555-0144',
    programId: 'prog-beginner',
    programTitle: 'Beginner Foundations (4 Weeks)',
    paymentPreference: 'paid',
    enrollmentStatus: 'active',
    registeredDate: '2026-08-08',
    progressPercentage: 45,
    assignedMentor: 'DAMCA Lead Director',
    showreelUrl: '',
    notes: 'Transitioning from graphic design to motion video editing.',
    tuitionAmount: '$450'
  },
  {
    id: 'stu-105',
    fullName: 'Mateo Rossi',
    email: 'mateo.rossi@studioitaly.it',
    phone: '+39 340 123 4567',
    programId: 'prog-advanced',
    programTitle: 'Advanced Mastery (8 Weeks)',
    paymentPreference: 'paid',
    enrollmentStatus: 'graduated',
    registeredDate: '2026-06-15',
    progressPercentage: 100,
    assignedMentor: 'Senior Colorist',
    showreelUrl: 'https://vimeo.com/901238491',
    notes: 'Graduated top of cohort. Landed lead editing contract with Red Bull Italy.',
    tuitionAmount: '$1,200'
  },
  {
    id: 'stu-106',
    fullName: 'Aisha Bello',
    email: 'aisha.bello@creativehub.org',
    phone: '+234 705 112 3344',
    programId: 'prog-beginner',
    programTitle: 'Beginner Foundations (4 Weeks)',
    paymentPreference: 'scholarship',
    enrollmentStatus: 'applied',
    registeredDate: '2026-08-13',
    progressPercentage: 0,
    notes: 'Applied for Women in Post-Production Diversity Grant. Under portfolio review.',
    tuitionAmount: '$450'
  }
];

export const INITIAL_MEDIA_CONFIG: SiteMediaConfig = {
  portfolioHeroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-car-racing-on-a-track-41551-large.mp4',
  portfolioHeroPoster: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1600&auto=format&fit=crop',
  portfolioHeroTagline: 'CRAFTING STORIES THROUGH MOTION, RHYTHM, AND EMOTION',
  academyHeroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-craftsman-assembling-a-watch-42861-large.mp4',
  academyHeroPoster: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop',
  academyHeroTagline: 'MASTER THE ART & SCIENCE OF CINEMATIC VIDEO EDITING',
  splitLandingPortfolioVideo: 'https://assets.mixkit.co/videos/preview/mixkit-car-racing-on-a-track-41551-large.mp4',
  splitLandingPortfolioImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1600&auto=format&fit=crop',
  splitLandingAcademyVideo: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-craftsman-assembling-a-watch-42861-large.mp4',
  splitLandingAcademyImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop'
};

