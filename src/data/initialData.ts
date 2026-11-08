import { CMSData } from '../types';

export const initialCMSData: CMSData = {
  homepage: {
    heroHeading: 'ENGINEERED FOR STRENGTH. BUILT FOR PERFORMANCE.',
    heroSubtext: 'Discover world-class fitness equipment engineered with precision, superior biomechanics and uncompromising durability. Manufactured in Pune, India in technical collaboration with Realleader USA.',
    heroImageUrl: '/src/assets/images/hero_commercial_gym_1794110545322.jpg',
    ctaPrimaryText: 'EXPLORE OUR PRODUCTS',
    ctaSecondaryText: 'REQUEST A QUOTE',
    stats: [
      { label: 'Customization Combinations', value: '1,200+', description: 'Frame & upholstery options' },
      { label: 'Metro Distribution Cities', value: '20+', description: 'Pan-India sales and service support' },
      { label: 'Commercial Installations', value: '450+', description: 'Across gyms, corporate & defence' },
      { label: 'Manufacturing Facility', value: 'Chakan, Pune', description: 'Robotic precision engineering plant' }
    ],
    sectionVisibility: {
      about: true,
      products: true,
      whyUs: true,
      customization: true,
      installations: true,
      timeline: true,
      blogs: true,
      contact: true
    }
  },

  seriesList: [
    {
      id: 'hs-pro',
      name: 'HS Pro Series',
      category: 'strength',
      tagline: 'Flagship Heavy-Duty Plate Loaded Precision',
      description: 'Engineered with converging and diverging axes replicating natural human biomechanical motion curves. Manufactured with 11-gauge 3mm steel and laser-calibrated pivot bearings.',
      idealFor: 'High-end commercial gyms, athlete performance centers & bodybuilding hubs'
    },
    {
      id: 'hs',
      name: 'HS Series',
      category: 'strength',
      tagline: 'Commercial Plate Loaded Powerhouse',
      description: 'The industry benchmark for rugged plate-loaded strength. Built for continuous heavy load cycles with industrial grade textured grips and counterbalanced movement arms.',
      idealFor: 'Commercial gyms and heavy free-weight training facilities'
    },
    {
      id: 'm7',
      name: 'M7 Series',
      category: 'strength',
      tagline: 'Luxury Dual-Action Pin-Loaded Strength',
      description: 'Dual-exercise selectorized machines combining space optimization with seamless weight adjustments. Equipped with aircraft-grade lubricated cables and ergonomic gas-assist seat adjustments.',
      idealFor: 'Premium corporate fitness centers, clubhouses, and upscale gyms'
    },
    {
      id: 'm2',
      name: 'M2 Series',
      category: 'strength',
      tagline: 'Single-Station Commercial Pin-Loaded Line',
      description: 'Dedicated single-movement selectorized stations offering targeted muscle isolation, intuitive instructional placards, and cold-rolled solid steel weight stacks.',
      idealFor: 'Full-scale commercial gym floors requiring high throughput'
    },
    {
      id: 'pf',
      name: 'PF Series',
      category: 'strength',
      tagline: 'Compact High-Efficiency Commercial Line',
      description: 'Designed for space-conscious facilities requiring full commercial durability without sacrificing range of motion or user biomechanics.',
      idealFor: 'Hotel fitness centers, residential towers, and boutique studios'
    },
    {
      id: 'fm',
      name: 'FM Series',
      category: 'strength',
      tagline: 'Functional Multi-Station & Cable Crossovers',
      description: '4-Stack, 5-Stack, and 8-Stack functional jungle systems with dual adjustable pulleys. Smooth dual swivel pulleys enable limitless athletic movement patterns.',
      idealFor: 'High-traffic functional training zones and athletic academies'
    },
    {
      id: 'transformer',
      name: 'Transformer Series',
      category: 'strength',
      tagline: 'Modular Space-Saving Dual Function Stations',
      description: 'Intelligent dual-function architecture engineered to perform two opposing compound movements in one ultra-compact footprint.',
      idealFor: 'Boutique fitness centers, personal training studios, and luxury apartments'
    },
    {
      id: 'fw',
      name: 'FW Series',
      category: 'benches-racks',
      tagline: 'Commercial Free Weight Systems & Racks',
      description: 'Heavy Olympic flat, incline, and decline benches, power racks, half cages, and dumbbell storage systems constructed with heavy-duty structural steel tubing.',
      idealFor: 'All commercial gym strength areas and strength-and-conditioning centers'
    },
    {
      id: 'lc',
      name: 'LC Series',
      category: 'strength',
      tagline: 'Light Commercial Precision Line',
      description: 'Robust selectorized and plate-loaded units engineered specifically for corporate gyms, society clubhouses, and executive training spaces.',
      idealFor: 'Corporate wellness spaces, institutional facilities, and residential complexes'
    },
    {
      id: 'cardio',
      name: 'Cardio Series',
      category: 'cardio',
      tagline: 'Commercial High-Intensity & Endurance Equipment',
      description: 'Uncompromising cardiovascular conditioning units including wind-resistance air bikes, rowers, ski ergometers, commercial treadmills, and commercial stair steppers.',
      idealFor: 'CrossFit boxes, HIIT studios, cardio zones, and sports training centers'
    }
  ],

  products: [
    {
      id: 'hsp-01',
      name: 'HS Pro Iso-Lateral Incline Chest Press',
      seriesId: 'hs-pro',
      seriesName: 'HS Pro Series',
      category: 'strength',
      description: 'Replicates natural converging upward press path with independent moving arms for balanced unilateral muscle activation. Fitted with heavy-gauge 100x50mm oval steel tubing.',
      imageUrl: '/src/assets/images/hs_pro_chest_press_1794110546275.jpg',
      specifications: {
        dimensions: '1480 x 1350 x 1780 mm',
        weight: '168 kg (Empty frame)',
        steelGauge: '3.0 mm (11-Gauge Structural Steel)',
        powderCoating: 'Dual-coat electrostatic thermo-cured finish',
        upholsteryGrade: 'High-density molded PU foam with antimicrobial leatherette',
        maxUserWeight: '180 kg'
      },
      features: [
        'Iso-lateral independent movement arms for unilateral balance',
        'Natural converging motion curve mimicking anatomical pectoralis contraction',
        'Gas-assisted seat adjustment for rapid single-handed setup',
        'Integrated Olympic plate storage horns (4 pins)',
        'Knurled aerospace aluminum handgrips'
      ],
      customOptions: ['25 Custom Frame Colors', '5 Upholstery Leather Shades', 'Custom Facility Logo Embroidery'],
      published: true,
      isFeatured: true
    },
    {
      id: 'hsp-02',
      name: 'HS Pro Iso-Lateral Front Lat Pulldown',
      seriesId: 'hs-pro',
      seriesName: 'HS Pro Series',
      category: 'strength',
      description: 'Diverging downward movement pattern provides unmatched latissimus dorsi recruitment while protecting rotator cuffs. Counterbalanced arms guarantee smooth resistance.',
      imageUrl: '/src/assets/images/hs_pro_chest_press_1794110546275.jpg',
      specifications: {
        dimensions: '1580 x 1420 x 2050 mm',
        weight: '175 kg',
        steelGauge: '3.0 mm (11-Gauge)',
        powderCoating: 'Dual electro-deposition powder coating',
        upholsteryGrade: 'Industrial contour foam cushions',
        maxUserWeight: '180 kg'
      },
      features: [
        'Diverging movement arc maximizes back muscle contraction',
        'Adjustable thigh roller pads lock user firmly in place',
        'Dual grip options: neutral and pronated grips',
        'Heavy-duty stainless steel plate load horns'
      ],
      customOptions: ['25 Custom Frame Colors', '5 Upholstery Shades'],
      published: true,
      isFeatured: true
    },
    {
      id: 'hs-01',
      name: 'HS Iso-Lateral Leg Press 45 Degree',
      seriesId: 'hs',
      seriesName: 'HS Series',
      category: 'strength',
      description: 'Massive linear bearing 45-degree commercial leg press. Oversized textured diamond-plate footplate enables multiple foot stances for quad, hamstring, and glute emphasis.',
      imageUrl: '/src/assets/images/hs_pro_chest_press_1794110546275.jpg',
      specifications: {
        dimensions: '2280 x 1620 x 1500 mm',
        weight: '280 kg',
        steelGauge: '3.2 mm heavy structural steel',
        powderCoating: 'Industrial scratch-resistant matte powder coat',
        maxUserWeight: '500 kg maximum load capacity'
      },
      features: [
        'Ultra-smooth linear ball bearing slide rails',
        'Oversized multi-angle footplate with rubberized traction',
        'Dual-locking safety stop handles with 3 catch levels',
        'Backrest with 3-position angle adjustment'
      ],
      customOptions: ['25 Frame Colors', '5 Upholstery Colors'],
      published: true,
      isFeatured: false
    },
    {
      id: 'm7-01',
      name: 'M7 Bicep Curl & Tricep Extension Dual',
      seriesId: 'm7',
      seriesName: 'M7 Series',
      category: 'strength',
      description: 'Dual-function selectorized arm machine. Intuitive cam mechanism maintains continuous tension throughout both bicep flexion and tricep extension ranges.',
      imageUrl: '/src/assets/images/hs_pro_chest_press_1794110546275.jpg',
      specifications: {
        dimensions: '1360 x 1120 x 1600 mm',
        weight: '215 kg',
        weightStack: '100 kg solid steel stack',
        cableCapacity: 'Military-spec 2000 kg tensile aviation cable',
        pulleyRatio: '1:1 precise biomechanical resistance'
      },
      features: [
        'Quick magnetic weight stack selector pin',
        'Rotational multi-position arm pad adapts to varying limb lengths',
        'Enclosed translucent shroud for supreme user safety',
        'Cold-rolled machined steel weight plates'
      ],
      customOptions: ['25 Frame Colors', '5 Upholstery Colors', 'Weight Stack Upgrade to 120kg'],
      published: true,
      isFeatured: true
    },
    {
      id: 'm2-01',
      name: 'M2 Seated Leg Extension',
      seriesId: 'm2',
      seriesName: 'M2 Series',
      category: 'strength',
      description: 'Isolated quadricep developer featuring self-adjusting tibia pad and adjustable back pad. Engineered with a biomechanical drop cam that mirrors the quad strength curve.',
      imageUrl: '/src/assets/images/hs_pro_chest_press_1794110546275.jpg',
      specifications: {
        dimensions: '1420 x 1150 x 1620 mm',
        weight: '230 kg',
        weightStack: '100 kg premium steel stack',
        pulleyRatio: '1:1',
        cableCapacity: '2000 kg proof-tested cable'
      },
      features: [
        'Range of motion limiter for rehabilitation and sports conditioning',
        'Self-aligning shin roller pad reduces knee shear',
        'Ergonomic side handles with tactile grip',
        'Magnetic selector pin with lanyard'
      ],
      customOptions: ['25 Frame Colors', '5 Upholstery Colors'],
      published: true,
      isFeatured: false
    },
    {
      id: 'pf-01',
      name: 'PF Compact Lat Pulldown / Low Row',
      seriesId: 'pf',
      seriesName: 'PF Series',
      category: 'strength',
      description: 'Space-saving dual pin-loaded station executing both vertical lat pulldowns and horizontal seated rows without cable changes.',
      imageUrl: '/src/assets/images/hs_pro_chest_press_1794110546275.jpg',
      specifications: {
        dimensions: '1720 x 1050 x 2220 mm',
        weight: '210 kg',
        weightStack: '95 kg steel stack',
        pulleyRatio: '1:1'
      },
      features: [
        'Dual pulley ports for high and low cable exercises',
        'Diamond-tread footplates for seated low rows',
        'Adjustable thigh hold-down rollers with spring pin',
        'Compact vertical footprint'
      ],
      customOptions: ['25 Frame Colors', '5 Upholstery Colors'],
      published: true,
      isFeatured: false
    },
    {
      id: 'fm-01',
      name: 'FM 8-Stack Multi-Jungle System',
      seriesId: 'fm',
      seriesName: 'FM Series',
      category: 'strength',
      description: 'The ultimate commercial fitness centerpiece. Incorporates dual adjustable pulleys, tricep pushdown, high lat pulldown, low row, and multi-grip chin-up crossbars.',
      imageUrl: '/src/assets/images/hs_pro_chest_press_1794110546275.jpg',
      specifications: {
        dimensions: '5900 x 3600 x 2400 mm',
        weight: '1420 kg',
        weightStack: '8 x 100 kg independent steel stacks',
        cableCapacity: 'Military grade 2000 kg load per station',
        steelGauge: '3.0 mm heavy-wall structural steel'
      },
      features: [
        'Accommodates up to 8 simultaneous users without cross-interference',
        'Smooth rotating aluminum cable pulleys with sealed bearings',
        'Modular expandability for facility customization',
        'Multi-angle rock climbing and neutral grip pull-up bars'
      ],
      customOptions: ['Custom Frame Colors', 'Shroud Panel Branding', 'Weight Stack Upgrades'],
      published: true,
      isFeatured: true
    },
    {
      id: 'tf-01',
      name: 'Transformer Dual Leg Extension / Prone Leg Curl',
      seriesId: 'transformer',
      seriesName: 'Transformer Series',
      category: 'strength',
      description: 'Revolutionary dual biomechanical station allowing quad extensions and hamstring curls on a single precision machine with zero compromise in pivot alignment.',
      imageUrl: '/src/assets/images/hs_pro_chest_press_1794110546275.jpg',
      specifications: {
        dimensions: '1540 x 1080 x 1620 mm',
        weight: '228 kg',
        weightStack: '100 kg weight stack',
        pulleyRatio: '1:1'
      },
      features: [
        'Single-click switch between leg extension and leg curl',
        'Counterbalanced cam preserves anatomical muscle resistance curve',
        'Gas-assisted backrest positioning',
        'Heavy molded polyurethane padding'
      ],
      customOptions: ['25 Frame Colors', '5 Upholstery Colors'],
      published: true,
      isFeatured: false
    },
    {
      id: 'fw-01',
      name: 'FW Olympic Multi-Incline Bench',
      seriesId: 'fw',
      seriesName: 'FW Series',
      category: 'benches-racks',
      description: 'Commercial Olympic bench press engineered with 3-tier laser-cut bar catches and integrated spotter platform. Supports high-density competition padding.',
      imageUrl: '/src/assets/images/hs_pro_chest_press_1794110546275.jpg',
      specifications: {
        dimensions: '1750 x 1650 x 1400 mm',
        weight: '98 kg',
        steelGauge: '3.0 mm heavy structural tubing',
        powderCoating: 'Electrostatic anti-corrosive powder finish'
      },
      features: [
        'High-density double stitched upholstery with vinyl shield',
        'Molded polyurethane bar rest protectors prevent bar knurling wear',
        'Heavy-duty non-slip spotter footplate',
        '4 integrated Olympic plate storage pegs'
      ],
      customOptions: ['25 Frame Colors', '5 Upholstery Colors'],
      published: true,
      isFeatured: false
    },
    {
      id: 'cardio-01',
      name: 'Into Air Bike Commercial',
      seriesId: 'cardio',
      seriesName: 'Cardio Series',
      category: 'cardio',
      description: 'Heavy-duty steel fan air bike engineered for brutal anaerobic conditioning, cross-training, and metabolic conditioning. Unlimited exponential air resistance.',
      imageUrl: '/src/assets/images/cardio_air_bike_1794110546733.jpg',
      specifications: {
        dimensions: '1300 x 600 x 1320 mm',
        weight: '64 kg',
        driveSystem: 'Reinforced heavy-duty belt and chain dual drive',
        flywheelWeight: '27-inch steel resistance fan blade',
        maxUserWeight: '160 kg'
      },
      features: [
        'High-contrast LCD console tracking Watts, RPM, Heart Rate, Interval Programs',
        'Reinforced forged chromoly cranks with sealed bearings',
        '4-way micro-adjustable saddle (height & fore/aft)',
        'Heavy-duty industrial transport wheels'
      ],
      customOptions: ['Frame Accent Color', 'Phone / Tablet Mount'],
      published: true,
      isFeatured: true
    },
    {
      id: 'cardio-02',
      name: 'Into Commercial Air Rower',
      seriesId: 'cardio',
      seriesName: 'Cardio Series',
      category: 'cardio',
      description: 'Precision air-resistance rowing machine with spiral damper mechanism. Monorail design with stainless steel track ensures seamless glide and long service life.',
      imageUrl: '/src/assets/images/cardio_air_bike_1794110546733.jpg',
      specifications: {
        dimensions: '2440 x 610 x 360 mm',
        weight: '32 kg',
        resistanceLevels: '10 Damper settings (Air Resistance)',
        maxUserWeight: '220 kg'
      },
      features: [
        'Ergonomic 10-degree bend handle for natural wrist posture',
        'Quick-disconnect frame locks for convenient upright storage',
        'Multi-function back-lit performance monitor with split times',
        'Stainless steel glide rail resists corrosion and sweat'
      ],
      customOptions: ['Frame Color'],
      published: true,
      isFeatured: true
    },
    {
      id: 'cardio-03',
      name: 'Into Commercial Air Ski',
      seriesId: 'cardio',
      seriesName: 'Cardio Series',
      category: 'cardio',
      description: 'Vertical air-resistance ski trainer designed for upper body explosive power and stamina. Wall-mounted or standalone floor-stand configuration available.',
      imageUrl: '/src/assets/images/cardio_air_bike_1794110546733.jpg',
      specifications: {
        dimensions: '1260 x 590 x 2160 mm (with floor stand)',
        weight: '48 kg',
        resistanceLevels: '1-10 Flywheel Damper control'
      },
      features: [
        'High-tenacity dyneema drive cords for quiet, unbreakable pulls',
        'Strapless ergonomic handles accommodating all hand sizes',
        'Works both double-pole and classic alternating stride techniques',
        'Performance computer with pacing and watt output'
      ],
      customOptions: ['Floor Stand or Wall Mount Kit'],
      published: true,
      isFeatured: false
    },
    {
      id: 'cardio-04',
      name: 'Into Commercial Ultra Bike',
      seriesId: 'cardio',
      seriesName: 'Cardio Series',
      category: 'cardio',
      description: 'Next-generation silent belt-driven performance fan bike. Provides zero-slack power transfer for sprint intervals with minimal maintenance.',
      imageUrl: '/src/assets/images/cardio_air_bike_1794110546733.jpg',
      specifications: {
        dimensions: '1340 x 640 x 1350 mm',
        weight: '68 kg',
        driveSystem: 'Poly-V ribbed automotive belt drive',
        maxUserWeight: '175 kg'
      },
      features: [
        'Ultra-quiet belt drive eliminates greasy chain maintenance',
        'Anti-slip oversized footpegs for isolated upper-body work',
        'Bluetooth and ANT+ heart rate receiver connectivity',
        'Heavy industrial steel chassis with anti-vibration stabilizers'
      ],
      customOptions: ['Matte Black / Metallic Red accents'],
      published: true,
      isFeatured: false
    },
    {
      id: 'cardio-05',
      name: 'Into Commercial Studio Spin Bike',
      seriesId: 'cardio',
      seriesName: 'Cardio Series',
      category: 'cardio',
      description: 'Commercial magnetic resistance indoor cycle with 20kg perimeter-weighted flywheel and dual SPD pedals for boutique spin studios.',
      imageUrl: '/src/assets/images/cardio_air_bike_1794110546733.jpg',
      specifications: {
        dimensions: '1200 x 540 x 1180 mm',
        weight: '56 kg',
        flywheelWeight: '20 kg precision balanced steel',
        driveSystem: 'Smooth Hutchinson belt drive'
      },
      features: [
        'Neodymium frictionless magnetic resistance brake',
        'Emergency stop lever with instant lock',
        'Dual-sided pedals with toe cages and SPD clipless bindings',
        'Sweat-shield shroud protecting flywheel and mechanics'
      ],
      customOptions: ['Frame Colors: Matte Black, White, Red'],
      published: true,
      isFeatured: false
    },
    {
      id: 'cardio-06',
      name: 'Into Heavy-Duty Commercial Treadmill',
      seriesId: 'cardio',
      seriesName: 'Cardio Series',
      category: 'cardio',
      description: 'Non-stop commercial runner driven by a continuous 4.5 HP AC industrial motor. Multi-ply orthopaedic running belt with advanced shock dissipation.',
      imageUrl: '/src/assets/images/hero_commercial_gym_1794110545322.jpg',
      specifications: {
        dimensions: '2200 x 950 x 1600 mm',
        weight: '210 kg',
        driveSystem: '4.5 HP Continuous (7.0 HP Peak) Commercial AC Motor',
        resistanceLevels: 'Speed: 1-22 km/h; Incline: 0-18%',
        maxUserWeight: '200 kg'
      },
      features: [
        'Multi-layer orthopaedic running deck absorbs up to 40% joint impact',
        'LED console with telemetry heart rate tracking and HIIT protocols',
        'Emergency pull-cord and safety side rail sensors',
        'Heavy-duty cast steel frame designed for 18-hour daily use'
      ],
      customOptions: ['Entertainment Screen Upgrade', 'Custom Side Rail Accents'],
      published: true,
      isFeatured: true
    },
    {
      id: 'cardio-07',
      name: 'Into Commercial Elliptical Cross Trainer',
      seriesId: 'cardio',
      seriesName: 'Cardio Series',
      category: 'cardio',
      description: 'Rear-drive commercial elliptical providing a natural 21-inch low-impact stride path with smooth self-generating electromagnetic resistance.',
      imageUrl: '/src/assets/images/hero_commercial_gym_1794110545322.jpg',
      specifications: {
        dimensions: '2150 x 780 x 1750 mm',
        weight: '145 kg',
        resistanceLevels: '24 Levels of electromagnetic resistance',
        maxUserWeight: '180 kg'
      },
      features: [
        'Self-powered generator system requires no external power outlet',
        'Ergonomic converging moving handles engage upper body',
        'Extra-wide cushioned pedals with internal toe angle',
        'Integrated device shelf and bottle holder'
      ],
      customOptions: ['Custom Accent Color'],
      published: true,
      isFeatured: false
    },
    {
      id: 'cardio-08',
      name: 'Into Commercial Stair Stepper / Climber',
      seriesId: 'cardio',
      seriesName: 'Cardio Series',
      category: 'cardio',
      description: 'Continuous revolving stair climber with revolving staircase. Delivers the ultimate cardiovascular lower body stamina and calorie burn.',
      imageUrl: '/src/assets/images/hero_commercial_gym_1794110545322.jpg',
      specifications: {
        dimensions: '1500 x 950 x 2150 mm',
        weight: '225 kg',
        resistanceLevels: '20-160 Steps per minute adjustable speed',
        maxUserWeight: '180 kg'
      },
      features: [
        'Infrared safety sensor automatically halts stairs if user steps off',
        'Deep anti-slip stairs accommodating all shoe sizes',
        'Multi-position ergonomically angled handrails with speed triggers',
        'Full color LED console with heart rate integration'
      ],
      customOptions: ['Custom Accent Colors'],
      published: true,
      isFeatured: false
    }
  ],

  installations: [
    {
      id: 'inst-01',
      name: 'Forge Hub Elite Strength Facility',
      location: 'Pune, Maharashtra',
      category: 'Commercial Gym',
      completionDate: '2024',
      description: 'Full-facility turnkey strength equipment outfitting with custom Matte Black frames and Crimson Red leather upholstery. Installed complete HS Pro plate-loaded lineup and 8-Stack functional jungle.',
      imageUrl: '/src/assets/images/hero_commercial_gym_1794110545322.jpg',
      equipmentCount: 42,
      highlightSeries: ['HS Pro Series', 'FM Multi-Jungle', 'Air Bike Range'],
      published: true
    },
    {
      id: 'inst-02',
      name: "Peter's Gym & Athletic Club",
      location: 'Mumbai, Maharashtra',
      category: 'Commercial Gym',
      completionDate: '2024',
      description: 'Iconic flagship commercial gym outfitting with custom Textured Graphite frames and Royal Blue cushions. Equipped with full M7 dual selectorized stations and Olympic free weights.',
      imageUrl: '/src/assets/images/hero_commercial_gym_1794110545322.jpg',
      equipmentCount: 38,
      highlightSeries: ['M7 Dual Series', 'FW Free Weights', 'Cardio Rower & Bike'],
      published: true
    },
    {
      id: 'inst-03',
      name: "Wolf'N'Lean Performance Gym",
      location: 'Bengaluru, Karnataka',
      category: 'Commercial Gym',
      completionDate: '2023',
      description: 'High-intensity strength and bodybuilding training ground outfitted with heavy-duty HS Series plate-loaded machines and multi-station cable towers with custom laser-etched facility logos.',
      imageUrl: '/src/assets/images/hero_commercial_gym_1794110545322.jpg',
      equipmentCount: 46,
      highlightSeries: ['HS Series', 'FM Series', 'Transformer'],
      published: true
    },
    {
      id: 'inst-04',
      name: 'Olympian Gym & Wellness Center',
      location: 'Hyderabad, Telangana',
      category: 'Commercial Gym',
      completionDate: '2023',
      description: 'Comprehensive fitness center featuring full-spectrum Into Wellness equipment: M2 pin-loaded circuit, HS Pro strength line, and commercial cardiovascular conditioning stations.',
      imageUrl: '/src/assets/images/hero_commercial_gym_1794110545322.jpg',
      equipmentCount: 52,
      highlightSeries: ['M2 Series', 'HS Pro Series', 'Commercial Treadmills'],
      published: true
    },
    {
      id: 'inst-05',
      name: 'Indian Armed Forces Regimental Training Center',
      location: 'Pune Cantonment, Maharashtra',
      category: 'Defence / Forces',
      completionDate: '2023',
      description: 'Heavy-gauge commercial strength and endurance facility engineered for combat fitness and tactical conditioning under continuous high-load operations.',
      imageUrl: '/src/assets/images/hero_commercial_gym_1794110545322.jpg',
      equipmentCount: 65,
      highlightSeries: ['HS Series Heavy Duty', 'FW Power Racks', 'Air Bikes'],
      published: true
    },
    {
      id: 'inst-06',
      name: 'Tata Consultancy Services Executive Wellness',
      location: 'Hinjawadi IT Park, Pune',
      category: 'Corporate',
      completionDate: '2024',
      description: 'State-of-the-art corporate wellness facility featuring space-saving M7 and Transformer dual series machines, quiet cardio equipment, and customized corporate finishes.',
      imageUrl: '/src/assets/images/hero_commercial_gym_1794110545322.jpg',
      equipmentCount: 28,
      highlightSeries: ['M7 Series', 'Transformer Dual', 'Commercial Cardio'],
      published: true
    }
  ],

  milestones: [
    {
      id: 'm-2015-01',
      monthYear: 'January 2015',
      dateSort: '2015-01',
      title: 'World-Class Factory Established in Chakan, Pune',
      description: 'Founded with a bold vision to pioneer world-class commercial fitness equipment manufacturing on Indian soil with advanced CNC fabrication.',
      tag: 'Founding'
    },
    {
      id: 'm-2016-04',
      monthYear: 'April 2016',
      dateSort: '2016-04',
      title: 'Technical Joint Venture with Realleader USA',
      description: 'Forged a landmark international partnership with Realleader USA to incorporate American biomechanical engineering, converging/diverging motion patents, and global testing standards.',
      tag: 'Global Partnership'
    },
    {
      id: 'm-2017-01',
      monthYear: 'January 2017',
      dateSort: '2017-01',
      title: 'Corporate Head Office Established in Baner, Pune',
      description: 'Inaugurated the central corporate headquarters at Supreme Headquarters, Baner, Pune to centralize engineering, nationwide sales, and customer operations.',
      tag: 'Headquarters'
    },
    {
      id: 'm-2018-02',
      monthYear: 'February 2018',
      dateSort: '2018-02',
      title: 'Product Display at Magnetic Maharashtra',
      description: 'Honored to showcase indigenous manufacturing capabilities to global investors and government dignitaries under the Make in India initiative.',
      tag: 'Exhibition'
    },
    {
      id: 'm-2018-04',
      monthYear: 'April 2018',
      dateSort: '2018-04',
      title: 'FIBO Exhibition in Cologne, Germany',
      description: 'Represented Indian fitness manufacturing on the world stage at FIBO Germany, earning praise from European fitness operators for build quality and biomechanics.',
      tag: 'Global Stage'
    },
    {
      id: 'm-2018-10',
      monthYear: 'October 2018',
      dateSort: '2018-10',
      title: '1,200+ Customization Options Introduced',
      description: 'Pioneered custom electrostatic frame colors and automotive-grade upholstery matching in the Indian fitness industry to allow gym owners distinct brand identities.',
      tag: 'Innovation'
    },
    {
      id: 'm-2019-04',
      monthYear: 'April 2019',
      dateSort: '2019-04',
      title: 'Exports to the Middle East Started',
      description: 'Began regular equipment exports to UAE, Saudi Arabia, Oman, and Qatar, establishing an international presence across premier Middle Eastern fitness clubs.',
      tag: 'International'
    },
    {
      id: 'm-2019-11',
      monthYear: 'November 2019',
      dateSort: '2019-11',
      title: 'Product Experience Centre Established in Pune',
      description: 'Opened a dedicated 10,000 sq. ft. live experience center allowing prospective gym owners and architects to test every machine in a live environment.',
      tag: 'Experience Center'
    },
    {
      id: 'm-2020-01',
      monthYear: 'January 2020',
      dateSort: '2020-01',
      title: 'Dedicated R&D Center Launched',
      description: 'Formed an in-house biomechanical research and computer-aided finite element analysis (FEA) team dedicated to stress simulation and ergonomic testing.',
      tag: 'R&D'
    },
    {
      id: 'm-2020-02',
      monthYear: 'February 2020',
      dateSort: '2020-02',
      title: 'Distribution Network in 20 Metro Cities',
      description: 'Expanded dedicated sales and regional service centers across Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata, Ahmedabad, and 13 other key cities.',
      tag: 'Distribution'
    },
    {
      id: 'm-2020-07',
      monthYear: 'July 2020',
      dateSort: '2020-07',
      title: 'Home Fitness & Executive Training Segment Launched',
      description: 'Engineered compact premium machines tailored for luxury residential estates, celebrity villas, and executive home gyms.',
      tag: 'Product Expansion'
    },
    {
      id: 'm-2020-10',
      monthYear: 'October 2020',
      dateSort: '2020-10',
      title: 'Land Purchased for Future Factory Expansion',
      description: 'Acquired additional industrial land adjacent to the Chakan facility to scale robotic manufacturing capacity to over 5,000 commercial machines annually.',
      tag: 'Expansion'
    },
    {
      id: 'm-2021-03',
      monthYear: 'March 2021',
      dateSort: '2021-03',
      title: 'Expansion into Defence, Corporate, Real Estate & Hospitality',
      description: 'Secured national vendor approvals and turnkey supply contracts with top-tier Indian armed forces units, Fortune 500 tech campuses, and 5-star hotel chains.',
      tag: 'Institutional'
    },
    {
      id: 'm-2022-05',
      monthYear: 'May 2022',
      dateSort: '2022-05',
      title: 'IFBB Pro Sunit Jadhav Onboarded as Brand Ambassador',
      description: 'Mr. World and legendary IFBB Pro Sunit Jadhav partnered with Into Wellness to rigorously test equipment under extreme professional bodybuilding demands.',
      tag: 'Brand Ambassador'
    },
    {
      id: 'm-2023-12',
      monthYear: 'December 2023',
      dateSort: '2023-12',
      title: 'HS Pro Series Launched Nationally',
      description: 'Unveiled the next-generation HS Pro flagship plate-loaded series featuring aerospace-grade bearings, dual-axis motion, and luxury aesthetics.',
      tag: 'Flagship Launch'
    },
    {
      id: 'm-2024-01',
      monthYear: 'January 2024',
      dateSort: '2024-01',
      title: 'Accessories & Cardio Range Launched',
      description: 'Introduced high-intensity conditioning air bikes, air rowers, ski ergometers, polyurethane dumbbells, and Olympic lifting plates.',
      tag: 'Cardio Range'
    },
    {
      id: 'm-2024-04',
      monthYear: 'April 2024',
      dateSort: '2024-04',
      title: 'Vaishali Bhoir Onboarded as Brand Athlete',
      description: 'International champion athlete Vaishali Bhoir joined the Into Wellness roster to represent female athletic strength and functional conditioning excellence.',
      tag: 'Athlete Partner'
    },
    {
      id: 'm-2025-05',
      monthYear: 'May 2025',
      dateSort: '2025-05',
      title: 'ZED Silver Certification Awarded',
      description: 'Conferred the prestigious Government of India ZED (Zero Defect Zero Effect) Silver Certification for environmentally responsible, quality-assured manufacturing.',
      tag: 'Certification'
    },
    {
      id: 'm-2025-09',
      monthYear: 'September 2025',
      dateSort: '2025-09',
      title: 'Stanford Seed Transformation Program, Class of 2026',
      description: 'Selected for the prestigious Stanford Graduate School of Business Seed Transformation Program, accelerating global competitiveness and governance.',
      tag: 'Global Leadership'
    }
  ],

  blogs: [
    {
      id: 'b-01',
      slug: 'strong-core-vs-six-pack-balance',
      title: 'Strong Core vs. Six-Pack: Finding the Right Balance in Fitness',
      category: 'Biomechanics & Training',
      author: 'Into Wellness Editorial Team',
      date: 'May 14, 2025',
      readTime: '5 min read',
      excerpt: 'Why visible abdominal aesthetics do not always equal functional core stability, and how commercial gym equipment should train multi-planar spinal support.',
      content: [
        'In mainstream fitness culture, visible abdominal muscles—colloquially celebrated as the six-pack—have long been considered the ultimate badge of peak fitness. However, in functional biomechanics and athletic performance, a chiseled rectus abdominis is merely the superficial surface of a far more intricate kinetic system.',
        'The deep core comprises the transverse abdominis, internal and external obliques, multifidus, pelvic floor, and diaphragm. Together, these muscles act as an anatomical weight belt that stabilizes the spine under heavy axial loads, transfers kinetic energy between the lower and upper extremities, and protects against degenerative spinal pathology.',
        'When designing gym floor layouts and programming for longevity, commercial fitness operators must balance aesthetic isolation machines (such as rotary abdominal crunches) with multi-planar core stability equipment like hyper-extension benches, glute-ham developers, and functional cable stations.'
      ],
      imageUrl: '/src/assets/images/hero_commercial_gym_1794110545322.jpg',
      published: true
    },
    {
      id: 'b-02',
      slug: 'why-do-gyms-fail-mistakes-and-solutions',
      title: 'Why Do Gyms Fail? Mistakes and How to Avoid Them',
      category: 'Business of Fitness',
      author: 'Ritesh Mahindrakar, MD',
      date: 'June 22, 2025',
      readTime: '7 min read',
      excerpt: 'Analyzing the commercial pitfalls of fitness facility planning: equipment selection mistakes, poor biomechanics, maintenance downtime, and spatial bottlenecks.',
      content: [
        'India’s commercial fitness industry is experiencing an unprecedented structural boom. Yet, over 30% of newly launched gyms encounter critical financial distress within their first 24 months of operation. Having advised and outfitted over 450 fitness facilities, we have identified repetitive patterns that lead to failure.',
        '1. Undervaluing Equipment Reliability: Many operators succumb to the temptation of cheap unbranded imports or low-grade sheet metal machines. Within 6 to 9 months, broken cables, bent weight pins, chipped paint, and torn vinyl destroy member trust.',
        '2. Disregarding Floor Biomechanics and Flow: Gyms frequently cram machines together to boast high machine counts, creating cramped and hazardous lifting zones. Proper zone separation between free weights, pin-loaded circuits, and high-intensity cardio is critical for user retention.',
        '3. Ignoring Long-Term After-Sales Support: When an imported machine breaks down, waiting 8 to 12 weeks for a spare pulley or cable from overseas directly causes member churn. Sourcing from a domestic manufacturer with guaranteed 48-hour parts availability is an insurance policy on your revenue.'
      ],
      imageUrl: '/src/assets/images/manufacturing_facility_1794110545984.jpg',
      published: true
    },
    {
      id: 'b-03',
      slug: 'plate-loaded-vs-pin-loaded-machines',
      title: 'Plate-Loaded vs Pin-Loaded Machines: Which One Actually Helps You Grow?',
      category: 'Equipment Engineering',
      author: 'Into Wellness R&D Team',
      date: 'July 18, 2025',
      readTime: '6 min read',
      excerpt: 'A comprehensive engineering and hypertrophy comparison between selectorized pin-loaded stacks and lever-arm plate-loaded machinery.',
      content: [
        'One of the most persistent debates on commercial gym floors centers on plate-loaded versus selectorized (pin-loaded) equipment. While both utilize leverage and cam mechanics to apply tension to skeletal muscle, they serve distinctly complementary physiological purposes.',
        'Plate-loaded machines, such as our HS Pro Series, utilize rigid structural steel lever arms that rotate on heavy sealed pillow-block bearings. Because there are no cables or pulley friction, the resistance feels organic and immediate, closely mimicking barbell movements while providing converging or diverging paths that protect vulnerable joints.',
        'Pin-loaded selectorized machines, exemplified by our M7 and M2 series, feature precision cams and cable systems that allow instant 2-second weight adjustments via magnetic selector pins. They excel at progressive overload, rapid drop sets, and beginner-to-intermediate training where loading heavy 20kg plates is inconvenient.',
        'The verdict for premier facilities is clear: a 60/40 ratio of selectorized to plate-loaded stations ensures both high training throughput for busy evening rushes and hardcore athletic credibility.'
      ],
      imageUrl: '/src/assets/images/hs_pro_chest_press_1794110546275.jpg',
      published: true
    },
    {
      id: 'b-04',
      slug: 'into-wellness-at-ihff-2025-mumbai',
      title: 'Into Wellness at IHFF 2025 Mumbai: Unveiling Next-Gen Biomechanics',
      category: 'Exhibitions & Events',
      author: 'Corporate Communications',
      date: 'October 30, 2025',
      readTime: '4 min read',
      excerpt: 'Highlights and key announcements from Asia’s premier fitness expo, featuring live demonstrations by IFBB Pro Sunit Jadhav and athlete Vaishali Bhoir.',
      content: [
        'At the International Health, Sports & Fitness Festival (IHFF) 2025 held at the Bombay Exhibition Centre in Mumbai, Into Wellness Private Limited showcased its most comprehensive lineup of commercial fitness machinery to date.',
        'The center of attention was the live demonstration area where brand ambassador IFBB Pro Sunit Jadhav and international athlete Vaishali Bhoir put our HS Pro Iso-Lateral Chest Press and 8-Stack Multi-Jungle through rigorous high-volume workouts.',
        'Over 3,500 gym owners, franchise operators, hotel wellness directors, and fitness enthusiasts visited the Into Wellness pavilion, resulting in record turnkey facility contracts and reaffirming our position as India’s leading premium fitness manufacturer.'
      ],
      imageUrl: '/src/assets/images/hero_commercial_gym_1794110545322.jpg',
      published: true
    }
  ],

  colors: [
    { id: 'c-01', name: 'Matte Jet Black', hex: '#1C1C1E', type: 'frame', description: 'Understated stealth finish' },
    { id: 'c-02', name: 'Textured Gunmetal Grey', hex: '#374151', type: 'frame', description: 'Heavy industrial finish' },
    { id: 'c-03', name: 'Metallic Crimson Red', hex: '#B91C1C', type: 'frame', description: 'High-energy brand accent' },
    { id: 'c-04', name: 'Racing Yellow', hex: '#EAB308', type: 'frame', description: 'Vibrant contrast' },
    { id: 'c-05', name: 'Cobalt Performance Blue', hex: '#1D4ED8', type: 'frame', description: 'Athletic dynamic finish' },
    { id: 'c-06', name: 'Polar White High Gloss', hex: '#F8FAFC', type: 'frame', description: 'Clean modern luxury' },
    { id: 'c-07', name: 'Silver Metallic Sparkle', hex: '#94A3B8', type: 'frame', description: 'Classic Realleader USA silver' },
    { id: 'c-08', name: 'Deep Emerald Green', hex: '#065F46', type: 'frame', description: 'Natural athletic prestige' },
    { id: 'c-09', name: 'Burnt Bronze Satin', hex: '#78350F', type: 'frame', description: 'Premium bespoke studio' },
    { id: 'c-10', name: 'Anthracite Carbon', hex: '#111827', type: 'frame', description: 'Ultra-dark texture' },
    { id: 'c-11', name: 'Electric Cyan', hex: '#0284C7', type: 'frame', description: 'Modern energetic accent' },
    { id: 'c-12', name: 'Deep Royal Navy', hex: '#1E3A8A', type: 'frame', description: 'Corporate wellness executive' },
    { id: 'c-13', name: 'Satin Champagne Gold', hex: '#CA8A04', type: 'frame', description: 'Luxury hotel tier' },
    { id: 'c-14', name: 'Steel Blue Matte', hex: '#475569', type: 'frame', description: 'Rugged commercial' },
    { id: 'c-15', name: 'Signal Orange', hex: '#EA580C', type: 'frame', description: 'High-visibility power' },
    { id: 'c-16', name: 'Graphite Pearl', hex: '#4B5563', type: 'frame', description: 'Subtle metallic sheen' },
    { id: 'c-17', name: 'Matte Military Olive', hex: '#3F4F38', type: 'frame', description: 'Tactical conditioning' },
    { id: 'c-18', name: 'Copper Rush', hex: '#9A3412', type: 'frame', description: 'Warm metallic luxury' },
    { id: 'c-19', name: 'Titanium Grey', hex: '#64748B', type: 'frame', description: 'Clean aerospace aesthetic' },
    { id: 'c-20', name: 'Velvet Midnight Purple', hex: '#4C1D95', type: 'frame', description: 'Distinctive boutique' },
    { id: 'c-21', name: 'Arctic Silver Sand', hex: '#E2E8F0', type: 'frame', description: 'Refined neutral' },
    { id: 'c-22', name: 'Magma Orange Red', hex: '#DC2626', type: 'frame', description: 'High-intensity athletic' },
    { id: 'c-23', name: 'Slate Industrial Charcoal', hex: '#1F2937', type: 'frame', description: 'Anti-scratch powder coat' },
    { id: 'c-24', name: 'Deep Forest Pine', hex: '#14532D', type: 'frame', description: 'Clubhouse elegance' },
    { id: 'c-25', name: 'Onyx Black Satin', hex: '#09090B', type: 'frame', description: 'Pure zero-reflection black' },

    // Upholstery choices (5 authentic choices)
    { id: 'u-01', name: 'Classic Burgundy Red', hex: '#881337', type: 'upholstery', description: 'Signature Into Wellness luxury wine leather' },
    { id: 'u-02', name: 'Carbon Stealth Black', hex: '#18181B', type: 'upholstery', description: 'Reinforced textured anti-slip black' },
    { id: 'u-03', name: 'Saddle Tan Vintage', hex: '#9A3412', type: 'upholstery', description: 'Handcrafted warm saddle leather aesthetic' },
    { id: 'u-04', name: 'Royal Club Blue', hex: '#1E40AF', type: 'upholstery', description: 'Deep nautical blue commercial grade' },
    { id: 'u-05', name: 'Steel Mist Grey', hex: '#475569', type: 'upholstery', description: 'Modern architectural neutral grey' }
  ],

  companyInfo: {
    legalName: 'Into Wellness Private Limited',
    brandName: 'INTO WELLNESS',
    headOffice: {
      line1: '805 Supreme Headquarters',
      line2: 'Mumbai-Pune-Highway',
      area: 'Baner',
      city: 'Pune',
      pincode: '411045',
      state: 'Maharashtra',
      country: 'India'
    },
    manufacturingPlant: {
      name: 'Into Wellness Chakan Manufacturing Complex',
      location: 'MIDC Chakan Phase II, Pune',
      city: 'Pune',
      areaSqFt: '50,000+ sq. ft. precision fabrication plant'
    },
    contacts: {
      salesWestSouth: '+91-7420925709',
      salesEast: '+91-7744910050',
      salesNorth: '+91-8669697799',
      salesExport: '+91-7420925709',
      service1: '+91-8669697779',
      service2: '+91-9271180503',
      email: 'info@intowellness.in',
      whatsapp: '917420925709'
    },
    leadership: {
      name: 'Ritesh Mahindrakar',
      title: 'Managing Director & Founder',
      roleBio: 'A mechanical engineering visionary and entrepreneur with over two decades of industrial leadership. Ritesh established Into Wellness with the conviction that Indian manufacturing can match and exceed international fitness equipment standards through uncompromising biomechanical research and precision robotics.',
      quote: 'We do not simply fabricate steel; we engineer instruments of human performance. Our machines are built with the conviction that quality, biomechanical fidelity, and reliability must never be compromised.',
      partnershipNote: 'In 2016, under Ritesh’s leadership, Into Wellness established a technical joint venture with Realleader USA, bridging world-class American biomechanical designs with advanced domestic manufacturing in Chakan, Pune.'
    }
  },

  enquiries: [
    {
      id: 'enq-01',
      type: 'quote',
      customerName: 'Vikramaditya Shinde',
      email: 'vikram.shinde@titanfitness.co.in',
      phone: '+91 98220 11442',
      city: 'Pune',
      facilityType: 'Commercial Gym',
      seriesInterest: ['HS Pro Series', 'M7 Series', 'Cardio Series'],
      machineCount: '35 Machines',
      message: 'Setting up a 6,000 sq. ft. premium commercial gym in Viman Nagar, Pune. Interested in turnkey equipment outfitting, custom color scheme (Matte Black with Burgundy cushions) and delivery timeline.',
      status: 'New',
      createdAt: '2026-11-06T14:32:00Z'
    },
    {
      id: 'enq-02',
      type: 'quote',
      customerName: 'Ananya Deshmukh',
      email: 'ananya@crestresorts.com',
      phone: '+91 98900 88219',
      city: 'Goa',
      facilityType: 'Hotel / Resort',
      seriesInterest: ['M7 Series', 'Air Bike Range', 'FW Series'],
      machineCount: '15 Machines',
      message: 'Requesting quotation for our luxury beach resort fitness pavilion. Need durable corrosion-resistant powder coating for coastal atmosphere.',
      status: 'In Review',
      createdAt: '2026-11-05T09:15:00Z'
    },
    {
      id: 'enq-03',
      type: 'contact',
      customerName: 'Rajesh Nair',
      email: 'rajesh.nair@ironcoregyms.com',
      phone: '+91 97410 43210',
      city: 'Bengaluru',
      message: 'Looking to visit your live Pune Experience Center next Thursday with our gym architects to test the HS Pro Iso-Lateral series.',
      status: 'Contacted',
      createdAt: '2026-11-04T16:20:00Z'
    }
  ],

  seo: {
    metaTitle: 'Into Wellness | Premium Commercial Fitness Equipment Manufacturer India',
    metaDescription: 'Engineered for strength, built for performance. Commercial fitness equipment manufacturing in Pune, India in collaboration with Realleader USA. HS Pro, M7, M2, Cardio and Custom gym equipment.',
    keywords: 'commercial gym equipment manufacturer India, Into Wellness, Realleader USA, plate loaded gym machines, commercial fitness manufacturer Pune Chakan, HS Pro series, gym equipment supplier Baner',
    canonicalUrl: 'https://intowellness.in',
    ogImageUrl: '/src/assets/images/hero_commercial_gym_1794110545322.jpg'
  }
};
