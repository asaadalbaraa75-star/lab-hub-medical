/**
 * BIOCHEMISTRY DATA SOURCE: PROTEINS & PROTEIN PRACTICAL
 * Primary Curriculum: First-Year Medical Practical Biochemistry
 * References: Harper's Illustrated Biochemistry, Sana'a University Faculty of Medicine Practical Manual
 */

export interface AminoAcidClass {
  id: string;
  nameEn: string;
  nameAr: string;
  description: string;
  examples: string[];
  clinicalPearl: string;
}

export interface ProteinStructureLevel {
  level: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
  titleEn: string;
  titleAr: string;
  definition: string;
  stabilizingBonds: string[];
  architecturalFeatures: string[];
  clinicalSignificance: string;
}

export interface ProteinPracticalExperiment {
  id: 'biuret' | 'casein';
  titleEn: string;
  titleAr: string;
  experimentSubSection: 'A' | 'B';
  aim: string;
  principle: string;
  materialsAndReagents: string[];
  procedureSteps: {
    stepNumber: number;
    action: string;
    note?: string;
  }[];
  observation: {
    visualAppearance: string;
    colorHex: string;
    positiveResult: string;
    negativeResult: string;
  };
  interpretation: string;
  precautions: string[];
  practicalExamQuestion: {
    question: string;
    correctAnswer: string;
    explanation: string;
  };
}

// ==========================================
// 17. PROTEINS THEORY DATA
// ==========================================
export const AMINO_ACID_GENERAL_STRUCTURE = {
  titleEn: 'General Amino Acid Molecular Architecture',
  titleAr: 'التركيب الجزيئي العام للأحماض الأمينية',
  description: 'All 20 standard amino acids sharing a common tetrahedral alpha-carbon (Cα) bonded to four distinct chemical moieties (except glycine which has two hydrogens):',
  components: [
    {
      name: 'Alpha-Carbon (Cα)',
      formula: '—CH—',
      role: 'Central chiral carbon holding all four groups in a specific L-stereoisomeric configuration (all natural human proteins contain L-amino acids).'
    },
    {
      name: 'Primary Amino Group (—NH₂ / —NH₃⁺)',
      formula: '—NH₂ (pK ≈ 9.0–10.5)',
      role: 'Basic amino group protonated at physiological pH (7.4) to carry a positive charge.'
    },
    {
      name: 'Carboxylic Acid Group (—COOH / —COO⁻)',
      formula: '—COOH (pK ≈ 2.0–2.4)',
      role: 'Acidic carboxyl group dissociated at physiological pH (7.4) to carry a negative charge.'
    },
    {
      name: 'Distinct Side Chain (R-Group)',
      formula: '—R',
      role: 'Dictates unique biochemical properties, polarity, charge, hydrophobicity, steric hindrance, and biological function of each amino acid.'
    }
  ],
  zwitterionConcept: {
    titleEn: 'Zwitterion (Dipolar Ion) State',
    titleAr: 'الحالة ثنائية القطب (Zwitterion)',
    description: 'At physiological pH 7.4, the carboxyl group is deprotonated (—COO⁻) and the amino group is protonated (—NH₃⁺), producing a dipolar zwitterion with net electrical charge of zero at its isoelectric point (pI).'
  }
};

export const AMINO_ACID_CLASSIFICATIONS = {
  byPolarity: [
    {
      id: 'non_polar',
      nameEn: 'Non-Polar (Hydrophobic) Amino Acids',
      nameAr: 'أحماض أمينية غير قطبية (كارهة للماء)',
      description: 'Side chains lack oxygen or nitrogen; strictly insoluble in water, burying themselves inside the hydrophobic core of globular proteins.',
      examples: ['Alanine (Ala)', 'Valine (Val)', 'Leucine (Leu)', 'Isoleucine (Ile)', 'Proline (Pro)', 'Phenylalanine (Phe)', 'Tryptophan (Trp)', 'Methionine (Met)'],
      clinicalPearl: 'In Sickle Cell Anemia (HbS), hydrophilic glutamate at position 6 of the β-globin chain is mutated to hydrophobic valine, causing abnormal hydrophobic polymer aggregation under deoxygenated conditions.'
    },
    {
      id: 'polar_uncharged',
      nameEn: 'Polar Uncharged (Hydrophilic) Amino Acids',
      nameAr: 'أحماض أمينية قطبية متعادلة الشحنة',
      description: 'Contain hydroxyl (—OH), amide (—CONH₂), or sulfhydryl (—SH) groups capable of forming hydrogen bonds with water on the protein surface.',
      examples: ['Glycine (Gly)', 'Serine (Ser)', 'Threonine (Thr)', 'Cysteine (Cys)', 'Tyrosine (Tyr)', 'Asparagine (Asn)', 'Glutamine (Gln)'],
      clinicalPearl: 'Serine, threonine, and tyrosine provide hydroxyl groups targeted for reversible phosphorylation by protein kinases, the master switch of metabolic regulation.'
    },
    {
      id: 'acidic_neg',
      nameEn: 'Acidic Amino Acids (Negatively Charged at pH 7.4)',
      nameAr: 'أحماض أمينية حامضية (سالبة الشحنة)',
      description: 'Side chains possess an extra carboxylic acid group (—COO⁻) that loses a proton at physiological pH, conferring a net negative charge.',
      examples: ['Aspartate / Aspartic Acid (Asp)', 'Glutamate / Glutamic Acid (Glu)'],
      clinicalPearl: 'Abundant in DNA-binding proteins and enzymatic catalytic sites; act as major excitatory neurotransmitters in the central nervous system.'
    },
    {
      id: 'basic_pos',
      nameEn: 'Basic Amino Acids (Positively Charged at pH 7.4)',
      nameAr: 'أحماض أمينية قاعدية (موجبة الشحنة)',
      description: 'Side chains contain basic nitrogenous groups (amino, guanidinium, or imidazole) that accept a proton at physiological pH to carry a net positive charge.',
      examples: ['Lysine (Lys)', 'Arginine (Arg)', 'Histidine (His)'],
      clinicalPearl: 'Histone proteins are rich in basic lysine and arginine, forming strong electrostatic ionic bonds with the negatively charged phosphate backbone of DNA.'
    }
  ],

  byNutrition: [
    {
      id: 'essential',
      nameEn: 'Essential Amino Acids (Indispensable)',
      nameAr: 'أحماض أمينية أساسية (حتمية)',
      description: 'Cannot be synthesized de novo by the human body and MUST be supplied regularly in the dietary intake.',
      examples: ['Valine', 'Leucine', 'Isoleucine', 'Threonine', 'Methionine', 'Phenylalanine', 'Tryptophan', 'Lysine', 'Histidine'],
      clinicalPearl: 'Mnemonic: "PVT TIM HaLL" (Phenylalanine, Valine, Threonine, Tryptophan, Isoleucine, Methionine, Histidine, Leucine, Lysine). Kwashiorkor occurs from inadequate dietary intake of essential amino acids.'
    },
    {
      id: 'semi_essential',
      nameEn: 'Semi-Essential Amino Acids (Conditionally Essential)',
      nameAr: 'أحماض أمينية شبه أساسية (مشروطة)',
      description: 'Synthesized in the body in adequate amounts for healthy adults, but synthesis rates are insufficient during periods of rapid growth, pregnancy, childhood, or severe metabolic trauma.',
      examples: ['Arginine (Arg)', 'Histidine (His) in growing infants'],
      clinicalPearl: 'Arginine is required in large quantities for the urea cycle, protein synthesis, and nitric oxide (NO) generation during neonatal development.'
    },
    {
      id: 'non_essential',
      nameEn: 'Non-Essential Amino Acids (Dispensable)',
      nameAr: 'أحماض أمينية غير أساسية (قابلة للتخليق)',
      description: 'Can be readily synthesized in the human body from carbohydrate intermediates (glycolysis and citric acid cycle) via transamination reactions.',
      examples: ['Alanine', 'Asparagine', 'Aspartate', 'Glutamate', 'Glutamine', 'Glycine', 'Proline', 'Serine', 'Tyrosine', 'Cysteine'],
      clinicalPearl: 'Tyrosine is synthesized from phenylalanine; in Phenylketonuria (PKU) where phenylalanine hydroxylase is defective, tyrosine becomes an essential dietary amino acid.'
    }
  ]
};

export const PEPTIDE_BOND_FORMATION = {
  titleEn: 'Peptide Bond Formation & Planar Characteristics',
  titleAr: 'تكوين الرابطة الببتيدية وخصائصها الفراغية',
  mechanism: 'A covalent amide bond formed through a condensation (dehydration) reaction between the alpha-carboxyl group of one amino acid and the alpha-amino group of the adjacent amino acid, releasing one molecule of water (H₂O).',
  formula: '—COOH + H₂N— ⟶ —CO—NH— + H₂O',
  characteristics: [
    'Partial Double-Bond Character (40%): Due to resonance delocalization of electrons between the carbonyl oxygen and amide nitrogen, the C—N bond has significant double-bond character.',
    'Planar and Rigid: Free rotation around the C—N peptide bond is completely restricted; all 6 atoms of the peptide group lie in a flat plane.',
    'Trans Configuration: The alpha-carbons and R-groups almost universally lie on opposite sides of the peptide bond (trans) to minimize steric steric hindrance.',
    'Directionality (Polarity): Polypeptides always have a free N-terminus (amino end, written on the left) and a free C-terminus (carboxyl end, written on the right).'
  ]
};

export const PROTEIN_STRUCTURE_LEVELS: ProteinStructureLevel[] = [
  {
    level: 'primary',
    titleEn: 'Primary Structure (1°)',
    titleAr: 'التركيب الأولي للبروتين',
    definition: 'The unique linear sequence of amino acids linked covalently by rigid peptide bonds from the N-terminus to the C-terminus, genetically encoded by mRNA.',
    stabilizingBonds: ['Covalent Peptide (amide) Bonds', 'Disulfide bonds between cysteine residues'],
    architecturalFeatures: [
      'Determines all higher-order folding patterns (primary structure contains all folding information).',
      'Extremely resistant to heat and chemical denaturation (requires boiling with strong 6M HCl to break peptide bonds).'
    ],
    clinicalSignificance: 'A single amino acid substitution can cause catastrophic disease (e.g., Sickle Cell Anemia: Glu6Val in β-globin).'
  },
  {
    level: 'secondary',
    titleEn: 'Secondary Structure (2°)',
    titleAr: 'التركيب الثانوي (ألفا-حلزون وبيتا-صفائح)',
    definition: 'Periodic, regular local spatial folding of the polypeptide backbone without involving side-chain R-groups.',
    stabilizingBonds: ['Hydrogen Bonds between carbonyl oxygen (C=O) and amide hydrogen (N—H) of the peptide backbone'],
    architecturalFeatures: [
      'Alpha-Helix (α-Helix): Right-handed spiral with 3.6 residues per turn. Hydrogen bonds run parallel to the helical axis (every 4th residue). Proline disrupts α-helices.',
      'Beta-Pleated Sheet (β-Sheet): Extended zigzag polypeptide strands aligned side-by-side. Can be parallel or anti-parallel, stabilized by inter-strand hydrogen bonds.',
      'Beta-Turns and Random Coils: Reverse turns that reverse direction of polypeptide chains.'
    ],
    clinicalSignificance: 'Abnormal accumulation of insoluble β-sheet rich amyloid fibrils causes Alzheimer’s disease and Prion encephalopathies.'
  },
  {
    level: 'tertiary',
    titleEn: 'Tertiary Structure (3°)',
    titleAr: 'التركيب الثالثي (الشكل الفراغي ثلاثي الأبعاد)',
    definition: 'The complete three-dimensional compact spatial conformation of a single polypeptide chain, folding into active structural domains.',
    stabilizingBonds: [
      'Hydrophobic Interactions (burying non-polar R-groups inside the core — strongest driving force)',
      'Hydrogen Bonds (between polar side chains)',
      'Ionic Bonds / Salt Bridges (between positively charged Arg/Lys and negatively charged Asp/Glu)',
      'Disulfide Bonds (Covalent S—S bridges between cysteine residues)',
      'Van der Waals forces'
    ],
    architecturalFeatures: [
      'Forms active catalytic enzyme pockets and antigen-binding sites.',
      'Denaturation disrupts tertiary bonds (loss of enzymatic activity) without cleaving peptide bonds.'
    ],
    clinicalSignificance: 'Chaperone proteins (heat shock proteins) assist proper folding; misfolding leads to cystic fibrosis.'
  },
  {
    level: 'quaternary',
    titleEn: 'Quaternary Structure (4°)',
    titleAr: 'التركيب الرابعي (اتحاد الوحدات الفرعية)',
    definition: 'The spatial arrangement and association of two or more independent polypeptide subunits (monomers) into a functional multimeric protein complex.',
    stabilizingBonds: ['Non-covalent bonds (Hydrophobic interactions, Hydrogen bonds, Electrostatic salt bridges)'],
    architecturalFeatures: [
      'Examples: Hemoglobin (tetramer: 2α + 2β chains), Immunoglobulin G (heterotetramer: 2 heavy + 2 light chains).',
      'Enables Allosteric Regulation and Cooperativity (e.g., oxygen binding to one hemoglobin subunit increases affinity in others).'
    ],
    clinicalSignificance: 'Carbon monoxide (CO) poisoning locks hemoglobin in high-affinity R-state, preventing oxygen delivery to tissues.'
  }
];

export const PROTEIN_CLASSIFICATIONS_AND_FUNCTIONS = {
  classifications: [
    {
      titleEn: 'Fibrous Proteins (الألياف)',
      definition: 'Long, insoluble filamentous molecules with structural and protective roles.',
      examples: ['Collagen (bone, cartilage, tendon)', 'Keratin (hair, nails, epidermis)', 'Elastin (aorta, lungs)']
    },
    {
      titleEn: 'Globular Proteins (الكروية)',
      definition: 'Compact, rounded, water-soluble molecules carrying dynamic metabolic functions.',
      examples: ['Enzymes (catalysis)', 'Hemoglobin & Myoglobin (oxygen transport)', 'Immunoglobulins (antibodies)', 'Albumin (osmotic pressure)']
    },
    {
      titleEn: 'Conjugated Proteins (المقترنة)',
      definition: 'Polypeptide chains combined covalently or non-covalently with a non-protein Prosthetic Group.',
      examples: [
        'Glycoproteins: Bound to carbohydrates (Mucin, TSH, LH)',
        'Lipoproteins: Bound to lipids (Chylomicrons, VLDL, LDL, HDL)',
        'Hemoproteins: Bound to heme iron (Hemoglobin, Cytochrome c)',
        'Phosphoproteins: Bound to phosphate (Casein of milk)'
      ]
    }
  ],
  biologicalFunctions: [
    'Enzymatic Catalysis: All biochemical reactions in humans are catalyzed by protein enzymes.',
    'Transport & Storage: Hemoglobin transports O₂, Albumin carries fatty acids/drugs, Ferritin stores iron.',
    'Immune Defense: Antibodies (IgG, IgM, IgA) neutralize foreign bacterial and viral antigens.',
    'Mechanical Support: Collagen and elastin provide tensile strength and elasticity to tissues.',
    'Movement & Contractility: Actin and myosin mediate skeletal, smooth, and cardiac muscle contraction.',
    'Hormonal Regulation: Insulin, glucagon, and growth hormone regulate systemic metabolism.'
  ]
};

// ==========================================
// 18. PROTEIN PRACTICAL LAB: EXPERIMENTS A & B
// ==========================================
export const PROTEIN_PRACTICAL_EXPERIMENTS: ProteinPracticalExperiment[] = [
  {
    id: 'biuret',
    titleEn: 'Detection of Protein — Biuret Test',
    titleAr: 'أ) الكشف عن البروتينات — اختبار البيوريت (Biuret Test)',
    experimentSubSection: 'A',
    aim: 'To detect the presence of peptide bonds (—CO—NH—) and confirm whether an unknown biological sample contains protein.',
    principle: 'In an alkaline medium (NaOH), cupric ions (Cu²⁺) from copper sulfate react with nitrogen atoms in two or more peptide bonds to form a coordination complex of cupric ions with peptide nitrogen atoms, yielding a characteristic violet / purple color.',
    materialsAndReagents: [
      'Protein Test Sample (1% Egg Albumin solution or Gelatin or Serum)',
      '10% Sodium Hydroxide (10% NaOH) — to provide alkaline medium',
      '0.5% Copper Sulfate solution (0.5% CuSO₄) — source of Cu²⁺ ions',
      'Clean dry test tubes and graduated pipettes'
    ],
    procedureSteps: [
      {
        stepNumber: 1,
        action: 'Add 2.0 mL of protein solution (e.g. egg albumin) into a clean, dry test tube.',
        note: 'Ensure the test tube is thoroughly clean and dry.'
      },
      {
        stepNumber: 2,
        action: 'Add 2.0 mL of 10% Sodium Hydroxide (10% NaOH) solution.',
        note: 'Mix well by gentle shaking to ensure a strongly alkaline medium.'
      },
      {
        stepNumber: 3,
        action: 'Add 2 to 3 drops of 0.5% Copper Sulfate (0.5% CuSO₄) solution.',
        note: 'CRITICAL: Add drops slowly; do NOT add excess copper sulfate!'
      },
      {
        stepNumber: 4,
        action: 'Mix thoroughly and observe the rapid development of color at room temperature.',
        note: 'No boiling or heating is required for the Biuret test!'
      }
    ],
    observation: {
      visualAppearance: 'Formation of an intense, luminous Violet / Purple coloration throughout the solution.',
      colorHex: '#8B5CF6',
      positiveResult: 'Violet / Purple color (indicates presence of two or more peptide bonds in proteins)',
      negativeResult: 'Blue color (remains unreacted copper sulfate blue solution, indicating absence of peptide bonds)'
    },
    interpretation: 'A positive violet color confirms the presence of proteins or polypeptides containing at least two peptide bonds (tripeptides and higher). Free amino acids (except histidine which gives a pinkish tint) and dipeptides do NOT give a positive Biuret reaction because they lack the minimum of two adjacent peptide bonds required to coordinate Cu²⁺.',
    precautions: [
      'DO NOT ADD EXCESS COPPER SULFATE: Adding too much CuSO₄ produces a cloudy blue precipitate of Cu(OH)₂, which completely masks and conceals the delicate violet color!',
      'Ensure the solution is sufficiently alkaline; the reaction cannot proceed in neutral or acidic media.',
      'Do not boil or heat the test tube; this is a room-temperature coordination complex reaction.'
    ],
    practicalExamQuestion: {
      question: 'Why do free amino acids and dipeptides give a negative result with the Biuret test?',
      correctAnswer: 'The Biuret reaction requires a minimum of two peptide bonds to coordinate with the cupric ion (Cu²⁺); free amino acids have zero peptide bonds and dipeptides have only one',
      explanation: 'Cu²⁺ must be coordinated by at least four nitrogen atoms belonging to two adjacent peptide linkages to generate the violet coordination chromophore.'
    }
  },
  {
    id: 'casein',
    titleEn: 'Detection of Casein — Isoelectric Precipitation',
    titleAr: 'ب) الكشف عن الكازين — الترسيب عند نقطة التعادل الكهربائي (Isoelectric Point pH 4.6)',
    experimentSubSection: 'B',
    aim: 'To isolate and detect Casein (the major milk phosphoprotein) by precipitation at its specific Isoelectric Point (pI = 4.6).',
    principle: 'Casein is a phosphoprotein soluble in milk at neutral pH (pH ≈ 6.6) due to its net negative charge and hydration shell. At its Isoelectric Point (pH 4.6), the net electrical charge on the casein molecule becomes exactly ZERO (Zwitterion state). Repulsive electrostatic charges vanish, molecular solubility reaches its absolute minimum, and casein aggregates and precipitates out as a dense curdy white precipitate.',
    materialsAndReagents: [
      'Fresh whole milk or skimmed milk',
      '10% Acetic acid (CH₃COOH) or 1M Acetic acid solution',
      'Distilled water',
      'Test tubes, 1 mL pipette, pH indicator paper / pH meter'
    ],
    procedureSteps: [
      {
        stepNumber: 1,
        action: 'Add 5.0 mL of milk into a clean 50 mL beaker or large test tube, and dilute with 5.0 mL of distilled water.',
        note: 'Diluting reduces viscosity and improves precipitant yield.'
      },
      {
        stepNumber: 2,
        action: 'Add 10% Acetic Acid drop-by-drop with continuous gentle swirling.',
        note: 'Count drops carefully; monitor pH down to approximately 4.6.'
      },
      {
        stepNumber: 3,
        action: 'Observe the formation of a flocculent, curdy white precipitate as pH reaches 4.6.',
        note: 'Notice the liquid clears (whey supernatant) as casein flocculates.'
      },
      {
        stepNumber: 4,
        action: 'Test effect of excess acid: add 2 mL of concentrated acid and observe resolution of precipitate.',
        note: 'Casein acquires positive charge in strong acid and re-dissolves!'
      }
    ],
    observation: {
      visualAppearance: 'Formation of a dense, curdy, flocculent White Precipitate of Casein with a clear supernatant whey.',
      colorHex: '#F8FAFC',
      positiveResult: 'Dense curdy white precipitate forming specifically at pH 4.6',
      negativeResult: 'Uniform milky white suspension with no clump formation'
    },
    interpretation: 'Casein precipitates selectively at pH 4.6 because its net charge is zero. When excess acid is added (pH < 3.0), casein molecules gain positive charges (—NH₃⁺), repulsive forces return, and the precipitate re-dissolves. Likewise, adding alkali (NaOH) re-dissolves casein by conferring negative charges.',
    precautions: [
      'ADD ACETIC ACID DROP-BY-DROP: Adding excess acid too quickly will overshoot the isoelectric point (pH 4.6), re-protonating the protein and re-dissolving it into solution!',
      'Swirl continuously between drops to distribute the acid evenly.',
      'Perform at room temperature or gentle warmth (40°C increases flocculation speed).'
    ],
    practicalExamQuestion: {
      question: 'What happens to the precipitated casein when excess hydrochloric acid is added to reduce the pH below 3.0, and why?',
      correctAnswer: 'The curdy white precipitate re-dissolves completely because casein molecules gain positive charges at low pH, restoring electrostatic repulsion',
      explanation: 'At pH below its isoelectric point (pI 4.6), carboxylate groups are protonated to uncharged —COOH while amino groups remain —NH₃⁺, giving casein a net positive charge and restoring solubility.'
    }
  }
];
