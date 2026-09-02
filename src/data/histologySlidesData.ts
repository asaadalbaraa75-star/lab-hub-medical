export interface HistologyPin {
  id: string;
  pinNumber: number;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  structureName: string;
  structureNameAr?: string;
  histologicalFeatures: string;
  stainingNotes: string;
  clinicalSignificance: string;
}

export interface HistologySlide {
  id: string;
  title: string;
  titleAr: string;
  category: 'epithelia' | 'connective' | 'muscle' | 'nervous' | 'organ_systems';
  tissueType: string;
  stain: string; // e.g. "Hematoxylin & Eosin (H&E)"
  organSource: string;
  description: string;
  magnifications: {
    '4x': string;
    '10x': string;
    '40x': string;
    '100x': string;
  };
  baseImage: string;
  pins: HistologyPin[];
  highYieldPearls: string[];
  diagnosticChecklist: string[];
}

export const HISTOLOGY_SLIDES_CATALOG: HistologySlide[] = [
  // 1. SKELETAL MUSCLE
  {
    id: 'slide-skeletal-muscle',
    title: 'Skeletal Muscle (Longitudinal & Cross Section)',
    titleAr: 'النسيج العضلي الهيكلي (مقطع طولي وعرضي)',
    category: 'muscle',
    tissueType: 'Striated Voluntary Muscle',
    stain: 'Hematoxylin & Eosin (H&E)',
    organSource: 'Tongue / Biceps brachii',
    description: 'Long, cylindrical multinucleated syncytial fibers with distinct alternating light (I-bands) and dark (A-bands) cross-striations. Multiple flattened nuclei are strictly positioned peripherally immediately under the sarcolemma.',
    magnifications: {
      '4x': 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800',
      '10x': 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200',
      '40x': 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1600',
      '100x': 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=2000'
    },
    baseImage: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1600',
    pins: [
      {
        id: 'pin-skm-1',
        pinNumber: 1,
        x: 32,
        y: 28,
        structureName: 'Peripheral Nucleus (Flattened beneath sarcolemma)',
        structureNameAr: 'نواة طرفية مسطحة تحت الغشاء العضلي',
        histologicalFeatures: 'Multiple elongated, heterochromatic nuclei situated exclusively at the periphery of the muscle fiber.',
        stainingNotes: 'Intensely basophilic (blue/purple) due to nuclear DNA content with H&E stain.',
        clinicalSignificance: 'Central nucleation in adult skeletal muscle fibers is a diagnostic hallmark of regenerative myopathies or Duchenne Muscular Dystrophy (DMD).'
      },
      {
        id: 'pin-skm-2',
        pinNumber: 2,
        x: 62,
        y: 54,
        structureName: 'Cross-Striations (Sarcomeric A and I bands)',
        structureNameAr: 'التخطيطات المستعرضة (أشرطة A و I)',
        histologicalFeatures: 'Alternating anisotropic A-bands (dark, myosin filaments) and isotropic I-bands (light, actin filaments) spanning the myofibrils.',
        stainingNotes: 'Eosinophilic (pink/red) staining with alternating birefringence under polarizing light.',
        clinicalSignificance: 'Disruption of sarcomeric z-disc proteins causes myopathies and post-ischemic muscle injury.'
      },
      {
        id: 'pin-skm-3',
        pinNumber: 3,
        x: 78,
        y: 82,
        structureName: 'Endomysium (Delicate loose connective tissue)',
        structureNameAr: 'غلاف الحزمة العضلية الداخلي',
        histologicalFeatures: 'Delicate network of reticular fibers and capillaries enclosing each individual skeletal muscle fiber.',
        stainingNotes: 'Lightly eosinophilic with collagen fibers and capillary endothelial nuclei.',
        clinicalSignificance: 'Polymyositis involves inflammatory lymphocytic infiltrate located primarily in the endomysium surrounding non-necrotic fibers.'
      }
    ],
    highYieldPearls: [
      'Multinucleated syncytium with peripheral nuclei only',
      'Non-branching cylindrical fibers',
      'Sarcomeric cross-striations clearly visible at 40x and 100x'
    ],
    diagnosticChecklist: [
      'Check nuclear position: peripheral indicates skeletal muscle',
      'Look for longitudinal striations and Z-disc alignment',
      'Confirm absence of branching and intercalated discs'
    ]
  },

  // 2. CARDIAC MUSCLE
  {
    id: 'slide-cardiac-muscle',
    title: 'Cardiac Muscle (Myocardium with Intercalated Discs)',
    titleAr: 'عضلة القلب (الأقراص البينية والتفرعات)',
    category: 'muscle',
    tissueType: 'Striated Involuntary Muscle',
    stain: 'Phosphotungstic Acid Hematoxylin (PTAH) / H&E',
    organSource: 'Ventricular Myocardium',
    description: 'Branching and anastomosing striated muscle cells with 1 or 2 centrally placed oval nuclei. Prominent transverse step-like intercalated discs provide mechanical adhesion and electrical syncytium.',
    magnifications: {
      '4x': 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800',
      '10x': 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1200',
      '40x': 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1600',
      '100x': 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=2000'
    },
    baseImage: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1600',
    pins: [
      {
        id: 'pin-cm-1',
        pinNumber: 1,
        x: 45,
        y: 40,
        structureName: 'Intercalated Disc (Transverse junctional complex)',
        structureNameAr: 'القرص البيني (الوصلة البينية)',
        histologicalFeatures: 'Step-like transverse dark lines marking the boundaries between adjoining cardiac myocytes.',
        stainingNotes: 'Darkly stained transverse band across the fiber width with PTAH and specialized H&E.',
        clinicalSignificance: 'Contains desmosomes (mechanical anchor) and gap junctions (rapid ion passage for synchronized contraction). Mutations in desmosomal plakoglobin cause Arrhythmogenic Right Ventricular Cardiomyopathy (ARVC).'
      },
      {
        id: 'pin-cm-2',
        pinNumber: 2,
        x: 65,
        y: 30,
        structureName: 'Central Nucleus & Perinuclear Halo',
        structureNameAr: 'نواة مركزية وهالة حول النواة',
        histologicalFeatures: 'Single or paired oval euchromatic nucleus located right in the center of the cell, flanked by a pale glycogen/organelle rich zone.',
        stainingNotes: 'Basophilic nucleus surrounded by a pale non-fibrillar perinuclear cytoplasmic zone.',
        clinicalSignificance: 'Lipofuscin ("wear-and-tear" brown pigment) accumulates in the perinuclear zone with aging.'
      },
      {
        id: 'pin-cm-3',
        pinNumber: 3,
        x: 25,
        y: 70,
        structureName: 'Branching Anastomosing Fiber',
        structureNameAr: 'ألياف متفرعة ومتشابكة',
        histologicalFeatures: 'Bifurcating cardiac muscle cells forming a continuous 3D contracting network.',
        stainingNotes: 'Eosinophilic cytoplasm with cross-striations less prominent than skeletal muscle.',
        clinicalSignificance: 'Branching facilitates mechanical wave propagation across chambers.'
      }
    ],
    highYieldPearls: [
      '1 to 2 CENTRALLY placed nuclei per myocyte',
      'Step-like intercalated discs present',
      'Branching 3D network with rich capillary beds'
    ],
    diagnosticChecklist: [
      'Locate intercalated discs traversing fibers perpendicular to striations',
      'Verify central nuclear placement',
      'Notice high vascularity in surrounding endomysium'
    ]
  },

  // 3. COMPACT BONE
  {
    id: 'slide-compact-bone',
    title: 'Compact Bone (Ground Section with Osteons / Haversian Systems)',
    titleAr: 'العظم المكتنز (أجهزة هافرس والصفائح متحدة المركز)',
    category: 'connective',
    tissueType: 'Specialized Mineralized Connective Tissue',
    stain: 'Ground Bone Section (Unstained / India Ink)',
    organSource: 'Diaphysis of Long Bone (Femur)',
    description: 'Ground cross-section displaying cylindrical Osteons (Haversian systems) composed of concentric lamellae around a central neurovascular Haversian canal, osteocyte lacunae, and radiating canaliculi.',
    magnifications: {
      '4x': 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800',
      '10x': 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200',
      '40x': 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1600',
      '100x': 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=2000'
    },
    baseImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1600',
    pins: [
      {
        id: 'pin-bone-1',
        pinNumber: 1,
        x: 50,
        y: 50,
        structureName: 'Haversian Canal (Central neurovascular canal)',
        structureNameAr: 'قناة هافرس المركزية',
        histologicalFeatures: 'Central longitudinal vascular channel containing capillaries, postcapillary venules, unmyelinated nerve fibers, and endosteal lining.',
        stainingNotes: 'Appears dark circular hollow space in ground bone sections.',
        clinicalSignificance: 'Connects to neighboring canals and periosteum via transverse Volkmann\'s canals.'
      },
      {
        id: 'pin-bone-2',
        pinNumber: 2,
        x: 68,
        y: 42,
        structureName: 'Concentric Lamellae & Osteocyte Lacunae',
        structureNameAr: 'الصفائح العظمية متحدة المركز والفجوات',
        histologicalFeatures: '4 to 20 concentric rings of calcified collagenous matrix surrounding the central canal with small dark almond-shaped lacunae.',
        stainingNotes: 'Mineralized hydroxyapatite matrix with black refractive lacunae in ground preparation.',
        clinicalSignificance: 'Collagen fibers in adjacent lamellae run at right angles (orthogonal pitch) to resist torsional stress.'
      },
      {
        id: 'pin-bone-3',
        pinNumber: 3,
        x: 35,
        y: 65,
        structureName: 'Canaliculi (Radiating micro-channels)',
        structureNameAr: 'القنيات العظمية المشعة',
        histologicalFeatures: 'Extremely fine dark spider-leg channels radiating between lacunae and Haversian canal.',
        stainingNotes: 'Filled with optical air/India ink, appearing as delicate dark hair-like lines.',
        clinicalSignificance: 'Houses osteocytic cytoplasmic dendritic processes linked by gap junctions for calcium sensing and mechanotransduction.'
      }
    ],
    highYieldPearls: [
      'Concentric target-like rings = Osteon (Haversian system)',
      'Lacunae contain Osteocytes in living bone',
      'Volkmann\'s canals run perpendicularly without concentric rings'
    ],
    diagnosticChecklist: [
      'Identify central circular Haversian canal',
      'Trace concentric lamellae surrounding the canal',
      'Observe fine radiating spider-like canaliculi'
    ]
  },

  // 4. HYALINE CARTILAGE
  {
    id: 'slide-hyaline-cartilage',
    title: 'Hyaline Cartilage (Tracheal Ring)',
    titleAr: 'الغضروف الزجاجي (حلقة القصبة الهوائية)',
    category: 'connective',
    tissueType: 'Specialized Avascular Connective Tissue',
    stain: 'Hematoxylin & Eosin (H&E)',
    organSource: 'Trachea / Articular surface',
    description: 'Glassy, homogeneous, basophilic matrix rich in Type II collagen and chondroitin sulfate proteoglycans. Chondrocytes reside in lacunae, often clustered in isogenous groups (cell nests) surrounded by dark territorial matrix.',
    magnifications: {
      '4x': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      '10x': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200',
      '40x': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600',
      '100x': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=2000'
    },
    baseImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600',
    pins: [
      {
        id: 'pin-hy-1',
        pinNumber: 1,
        x: 48,
        y: 52,
        structureName: 'Isogenous Group of Chondrocytes (Cell nest)',
        structureNameAr: 'المجموعات المتجانسة لخلايا الغضروف',
        histologicalFeatures: 'Clusters of 2 to 8 daughter chondrocytes derived from mitotic division of a single parent chondroblast.',
        stainingNotes: 'Chondrocytes appear shrunk inside lacunae with basophilic nuclei and pale lipid-rich cytoplasm.',
        clinicalSignificance: 'Represents interstitial growth of cartilage from within.'
      },
      {
        id: 'pin-hy-2',
        pinNumber: 2,
        x: 58,
        y: 44,
        structureName: 'Territorial Matrix (Capsule around lacunae)',
        structureNameAr: 'المادة الخلالية المحيطة بالفجوات',
        histologicalFeatures: 'Intensely basophilic rim immediately surrounding each lacuna, rich in sulfated glycosaminoglycans (chondroitin sulfate) and low in collagen.',
        stainingNotes: 'Deeper blue/purple staining than the lighter interterritorial matrix.',
        clinicalSignificance: 'Provides electrostatic charge trap retaining water for compressive elasticity.'
      },
      {
        id: 'pin-hy-3',
        pinNumber: 3,
        x: 20,
        y: 20,
        structureName: 'Perichondrium (Fibrous & Chondrogenic layers)',
        structureNameAr: 'سمحاق الغضروف (الطبقة الليفية والمولدة)',
        histologicalFeatures: 'Dense irregular connective tissue capsule surrounding cartilage (absent on articular cartilage). Outer fibrous layer with fibroblasts; inner chondrogenic layer with chondroblasts.',
        stainingNotes: 'Pink eosinophilic collagenous band with blood vessels supplying nutrients via diffusion.',
        clinicalSignificance: 'Source of new chondroblasts for appositional growth and repair.'
      }
    ],
    highYieldPearls: [
      'Type II collagen matrix with glassy/amorphous appearance',
      'Avascular tissue dependent on synovial fluid or perichondrial diffusion',
      'Chondrocytes in lacunae forming isogenous nests'
    ],
    diagnosticChecklist: [
      'Look for smooth glassy matrix with no visible coarse fiber bundles',
      'Observe round chondrocytes in lacunae',
      'Check for perichondrium at margins (unless articular cartilage)'
    ]
  },

  // 5. SIMPLE COLUMNAR EPITHELIUM & SMALL INTESTINE VILLI
  {
    id: 'slide-small-intestine',
    title: 'Small Intestine Villi & Crypts of Lieberkühn',
    titleAr: 'زغابات الأمعاء الدقيقة والغدد المعوية',
    category: 'organ_systems',
    tissueType: 'Simple Columnar Absorptive Epithelium with Goblet Cells',
    stain: 'Hematoxylin & Eosin (H&E)',
    organSource: 'Jejunum / Ileum',
    description: 'Finger-like mucosal projections (villi) lined by tall simple columnar enterocytes with a dense apical microvillous brush border and interspersed pale mucus-secreting goblet cells.',
    magnifications: {
      '4x': 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800',
      '10x': 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200',
      '40x': 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1600',
      '100x': 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=2000'
    },
    baseImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1600',
    pins: [
      {
        id: 'pin-gut-1',
        pinNumber: 1,
        x: 42,
        y: 35,
        structureName: 'Enterocyte Brush Border (Microvilli)',
        structureNameAr: 'الحافة الفرشاتية للخلايا المعوية',
        histologicalFeatures: 'Dense uniform apical border of actin-supported microvilli increasing absorptive surface area ~20-30 fold.',
        stainingNotes: 'Eosinophilic apical stripe at the luminal surface of enterocytes.',
        clinicalSignificance: 'Celiac disease causes blunting and flattening of villi (villous atrophy) and loss of brush border enzymes.'
      },
      {
        id: 'pin-gut-2',
        pinNumber: 2,
        x: 58,
        y: 42,
        structureName: 'Goblet Cell (Mucus-secreting unicellular gland)',
        structureNameAr: 'الخلية الكأسية المفرزة للمخاط',
        histologicalFeatures: 'Wine-glass shaped cell with a basal flattened nucleus and an expanded apical mucinogen droplet chamber.',
        stainingNotes: 'Pale/clear or weakly basophilic on standard H&E; stains bright magenta with Periodic Acid-Schiff (PAS).',
        clinicalSignificance: 'Number of goblet cells increases progressively from duodenum to colon.'
      },
      {
        id: 'pin-gut-3',
        pinNumber: 3,
        x: 48,
        y: 78,
        structureName: 'Paneth Cells (Base of Crypts of Lieberkühn)',
        structureNameAr: 'خلايا بانيث في قاع الغدد المعوية',
        histologicalFeatures: 'Pyramidal cells at crypt bases containing large, refractile apical secretory granules packed with antimicrobial defensins and lysozyme.',
        stainingNotes: 'Intensely bright eosinophilic (red/pink) granules in apical cytoplasm.',
        clinicalSignificance: 'Crucial for innate mucosal immunity and regulation of intestinal microbiome.'
      }
    ],
    highYieldPearls: [
      'Simple columnar epithelium with basal oval nuclei',
      'Apical brush border + Goblet cells',
      'Lamina propria core contains central lacteal capillary'
    ],
    diagnosticChecklist: [
      'Observe tall columnar cells with single basal nuclei',
      'Spot pale goblet cells interspersed along the villus',
      'Look for bright eosinophilic Paneth granules in crypt bases'
    ]
  },

  // 6. RENAL GLOMERULUS & BOWMAN'S CAPSULE
  {
    id: 'slide-renal-cortex',
    title: 'Renal Cortex (Glomerulus, Bowman\'s Capsule & Tubules)',
    titleAr: 'قشرة الكلية (الكبيبة ومحفظة بومان والأنيبيبات)',
    category: 'organ_systems',
    tissueType: 'Renal Corpuscle & Simple Cuboidal Tubules',
    stain: 'Hematoxylin & Eosin (H&E)',
    organSource: 'Kidney Cortex',
    description: 'Renal corpuscle containing a lobulated glomerular capillary tuft surrounded by Bowman\'s urinary space and the simple squamous parietal layer of Bowman\'s capsule, flanked by proximal and distal convoluted tubules.',
    magnifications: {
      '4x': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      '10x': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200',
      '40x': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600',
      '100x': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=2000'
    },
    baseImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600',
    pins: [
      {
        id: 'pin-kid-1',
        pinNumber: 1,
        x: 50,
        y: 48,
        structureName: 'Glomerular Capillary Tuft & Podocytes',
        structureNameAr: 'الكبيبة الكلوية والخلايا القدمية',
        histologicalFeatures: 'Anastomosing fenestrated capillary loops covered by visceral podocytes with interdigitating foot processes (pedicels).',
        stainingNotes: 'Hypercellular cluster of endothelial, mesangial, and podocyte nuclei.',
        clinicalSignificance: 'Site of primary ultrafiltration. Podocyte effacement is the hallmark of Minimal Change Disease in nephrotic syndrome.'
      },
      {
        id: 'pin-kid-2',
        pinNumber: 2,
        x: 65,
        y: 35,
        structureName: 'Bowman\'s Space & Parietal Layer',
        structureNameAr: 'فراغ بومان والطبقة الجدارية البسيطة',
        histologicalFeatures: 'Clear urinary space collecting primary filtrate, bounded externally by simple squamous epithelium.',
        stainingNotes: 'Parietal layer shows flattened simple squamous nuclei outlining the capsule.',
        clinicalSignificance: 'Crescent formation in Rapidly Progressive Glomerulonephritis (RPGN) involves parietal epithelial cell proliferation.'
      },
      {
        id: 'pin-kid-3',
        pinNumber: 3,
        x: 28,
        y: 68,
        structureName: 'Proximal Convoluted Tubule (PCT)',
        structureNameAr: 'الأنيبيب الملتف القريب',
        histologicalFeatures: 'Simple cuboidal epithelium with an extensive apical microvillar brush border that often occludes the lumen on H&E.',
        stainingNotes: 'Intensely acidophilic/eosinophilic cytoplasm with round central nuclei.',
        clinicalSignificance: 'Reabsorbs ~65-70% of filtered water, sodium, and 100% of glucose and amino acids.'
      }
    ],
    highYieldPearls: [
      'Glomerulus + Bowman\'s Capsule = Renal Corpuscle',
      'Parietal Bowman\'s layer is simple squamous epithelium',
      'PCT has intensely eosinophilic cytoplasm and brush border; DCT has clear wide lumen'
    ],
    diagnosticChecklist: [
      'Find round corpuscle with glomerular tuft and urinary space',
      'Trace outer simple squamous capsule',
      'Distinguish cloudy PCT lumens from clear DCT lumens'
    ]
  }
];
