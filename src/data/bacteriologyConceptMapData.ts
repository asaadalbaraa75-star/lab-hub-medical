export interface ConceptMapOrganism {
  id: string;
  scientificName: string;
  commonName: string;
  gramCategory: 'gram_positive' | 'gram_negative' | 'acid_fast';
  shape: 'cocci' | 'bacilli' | 'coccobacilli' | 'spirochetes' | 'pleomorphic';
  arrangement: 'clusters' | 'chains' | 'pairs_diplococci' | 'singles' | 'palisades' | 'filaments';
  oxygenRequirement: 'obligate_aerobe' | 'facultative_anaerobe' | 'obligate_anaerobe' | 'microaerophilic';
  motility: 'motile' | 'non_motile';
  sporeFormation: 'spore_former' | 'non_spore_former';
  keyVirulenceFactors: string[];
  majorDiseases: string[];
  transmission: string[];
  diagnosticHallmarks: {
    gramStainDescription: string;
    cultureMedia: string;
    biochemicalTests: string[];
    specialIdentification: string;
  };
  firstLineTreatment: string;
  prevention: string;
  highYieldPearl: string;
}

export const BACTERIOLOGY_CONCEPT_ORGANISMS: ConceptMapOrganism[] = [
  {
    id: 'staph-aureus',
    scientificName: 'Staphylococcus aureus',
    commonName: 'Golden Staph',
    gramCategory: 'gram_positive',
    shape: 'cocci',
    arrangement: 'clusters',
    oxygenRequirement: 'facultative_anaerobe',
    motility: 'non_motile',
    sporeFormation: 'non_spore_former',
    keyVirulenceFactors: [
      'Protein A (binds Fc portion of IgG, prevents opsonization)',
      'Coagulase (activates prothrombin to form fibrin clot shield)',
      'TSST-1 (superantigen -> Massive cytokine storm IL-1, IL-2, TNF-alpha)',
      'Exfoliatin toxin (causes Staphylococcal Scalded Skin Syndrome)',
      'Alpha-toxin / Hemolysin (pore-forming cytolysin)'
    ],
    majorDiseases: [
      'Skin & soft tissue: Impetigo, folliculitis, furuncles, carbuncles, abscesses',
      'Toxin-mediated: Toxic Shock Syndrome (TSST-1), Rapid Food Poisoning (preformed enterotoxin 1-6 hrs)',
      'Invasive: Acute infective endocarditis (IV drug users, tricuspid valve), Osteomyelitis (most common cause), Septic arthritis'
    ],
    transmission: [
      'Direct contact / Hands of healthcare workers',
      'Anterior nares colonization (~30% of normal population)'
    ],
    diagnosticHallmarks: {
      gramStainDescription: 'Gram-positive cocci in irregular grape-like clusters (purple spherical cells ~1 µm)',
      cultureMedia: 'Blood Agar (Golden-yellow colonies with wide zone of Beta-hemolysis); Mannitol Salt Agar (ferments mannitol turning phenol red to yellow)',
      biochemicalTests: ['Catalase POSITIVE (rapid effervescence with 3% H2O2)', 'Coagulase POSITIVE (forms firm plasma clot in tube)', 'DNase POSITIVE'],
      specialIdentification: 'Distinguished from S. epidermidis by positive coagulase and yellow mannitol fermentation.'
    },
    firstLineTreatment: 'MSSA: Nafcillin, Oxacillin, or Cefazolin. MRSA (mecA gene alteration of PBP2a): Vancomycin, Daptomycin, or Linezolid.',
    prevention: 'Strict hand hygiene in clinical wards, chlorhexidine body wash, mupirocin nasal ointment for preoperative decolonization.',
    highYieldPearl: 'Most common cause of post-viral secondary bacterial pneumonia, osteomyelitis, septic arthritis, and acute native valve endocarditis.'
  },
  {
    id: 'strep-pneumoniae',
    scientificName: 'Streptococcus pneumoniae',
    commonName: 'Pneumococcus',
    gramCategory: 'gram_positive',
    shape: 'cocci',
    arrangement: 'pairs_diplococci',
    oxygenRequirement: 'facultative_anaerobe',
    motility: 'non_motile',
    sporeFormation: 'non_spore_former',
    keyVirulenceFactors: [
      'Polysaccharide capsule (>100 serotypes; primary antiphagocytic factor)',
      'IgA1 protease (cleaves secretory IgA, facilitating mucosal colonization in respiratory tract)',
      'Pneumolysin (cytotoxin causing pore formation in ciliated bronchial cells)'
    ],
    majorDiseases: [
      'Community-Acquired Pneumonia (CAP) with typical "rusty sputum" and lobar consolidation',
      'Meningitis (most common cause in adults & elderly)',
      'Otitis media and sinusitis in children'
    ],
    transmission: ['Respiratory droplets from asymptomatic nasopharyngeal carriers'],
    diagnosticHallmarks: {
      gramStainDescription: 'Gram-positive lancet-shaped (flame-shaped) diplococci in pairs or short chains',
      cultureMedia: 'Blood Agar under 5% CO2 (shows Alpha-hemolysis with greenish/brown clearing and draughtsman central colony collapse due to autolysin)',
      biochemicalTests: ['Catalase NEGATIVE', 'Optochin ("P" disc) SENSITIVE (zone of inhibition >=14 mm)', 'Bile soluble (lysed by sodium deoxycholate)'],
      specialIdentification: 'Positive Quellung reaction (capsular swelling when mixed with specific antiserum).'
    },
    firstLineTreatment: 'Amoxicillin / Ceftriaxone. If high-level penicillin resistance: Vancomycin + Ceftriaxone.',
    prevention: 'Pneumococcal conjugate vaccine (PCV13 / PCV15 / PCV20) for infants/elderly; Polysaccharide vaccine (PPSV23) for high-risk adults.',
    highYieldPearl: 'Classic "MOPS" mnemonic for S. pneumoniae diseases: Meningitis, Otitis media, Pneumonia, Sinusitis.'
  },
  {
    id: 'strep-pyogenes',
    scientificName: 'Streptococcus pyogenes (Group A Strep / GAS)',
    commonName: 'Group A Streptococcus',
    gramCategory: 'gram_positive',
    shape: 'cocci',
    arrangement: 'chains',
    oxygenRequirement: 'facultative_anaerobe',
    motility: 'non_motile',
    sporeFormation: 'non_spore_former',
    keyVirulenceFactors: [
      'M protein (antiphagocytic; molecular mimicry triggers Acute Rheumatic Fever)',
      'Streptolysin O (oxygen-labile hemolysin; stimulates Anti-Streptolysin O / ASO titers)',
      'Streptococcal pyrogenic exotoxins (SpeA, SpeB, SpeC -> Scarlet fever rash, Toxic Shock)',
      'Hyaluronidase ("spreading factor") & Streptokinase (fibrinolysin)'
    ],
    majorDiseases: [
      'Suppurative: Strep throat (pharyngitis), Impetigo, Erysipelas, Cellulitis, Necrotizing fasciitis ("flesh-eating")',
      'Toxin-mediated: Scarlet fever (strawberry tongue, sandpaper rash)',
      'Post-streptococcal sequelae: Acute Rheumatic Fever (follows pharyngitis only), Post-Streptococcal Glomerulonephritis (follows pharyngitis OR skin infection)'
    ],
    transmission: ['Respiratory droplets and direct skin contact with infected exudate'],
    diagnosticHallmarks: {
      gramStainDescription: 'Gram-positive spherical cocci arranged in long graceful chains',
      cultureMedia: 'Blood Agar (clear, wide transparent zone of complete Beta-hemolysis)',
      biochemicalTests: ['Catalase NEGATIVE', 'Bacitracin ("A" disc) SENSITIVE (inhibited by low dose 0.04 units)', 'PYR test POSITIVE (hydrolyzes pyrrolidonyl-beta-naphthylamide)'],
      specialIdentification: 'Group A Lancefield antigen detected by rapid latex agglutination.'
    },
    firstLineTreatment: 'Penicillin V (oral) or Penicillin G (intramuscular). If penicillin allergy: Macrolides (Azithromycin) or Clindamycin.',
    prevention: 'Prompt antibiotic therapy for strep throat prevents acute rheumatic fever; strict wound asepsis.',
    highYieldPearl: 'Acute Rheumatic Fever follows pharyngitis ONLY; Post-Streptococcal Glomerulonephritis follows both pharyngitis and skin impetigo.'
  },
  {
    id: 'escherichia-coli',
    scientificName: 'Escherichia coli',
    commonName: 'E. coli',
    gramCategory: 'gram_negative',
    shape: 'bacilli',
    arrangement: 'singles',
    oxygenRequirement: 'facultative_anaerobe',
    motility: 'motile',
    sporeFormation: 'non_spore_former',
    keyVirulenceFactors: [
      'Type 1 fimbriae & P-pili (adhere to uroepithelium -> Urinary Tract Infections)',
      'LPS Endotoxin (Lipid A causes septic shock, fever, DIC)',
      'K1 capsular antigen (major cause of neonatal meningitis)',
      'Shiga-like toxins (Stx-1, Stx-2 / Verotoxins in EHEC O157:H7 -> Hemolytic Uremic Syndrome)',
      'Heat-labile (LT) & Heat-stable (ST) enterotoxins in ETEC (traveler\'s watery diarrhea)'
    ],
    majorDiseases: [
      'Urinary Tract Infection (UTI) / Pyelonephritis (#1 cause >80%)',
      'Neonatal Meningitis (K1 capsule strains; #2 cause after GBS)',
      'Traveler\'s diarrhea (ETEC: "montezuma\'s revenge")',
      'Hemolytic Uremic Syndrome (EHEC O157:H7: triad of microangiopathic hemolytic anemia, thrombocytopenia, acute renal failure)'
    ],
    transmission: ['Fecal-oral route, contaminated undercooked ground beef/raw milk, ascending urethral colonization from perineum'],
    diagnosticHallmarks: {
      gramStainDescription: 'Gram-negative straight bacilli with rounded ends (pink/red rods ~2 µm)',
      cultureMedia: 'MacConkey Agar (rapid lactose fermenter producing bright pink colonies with bile precipitation); EMB Agar (striking green metallic sheen)',
      biochemicalTests: ['Indole POSITIVE (cleaves tryptophan to indole, red Kovac\'s ring)', 'Methyl Red POSITIVE', 'Voges-Proskauer NEGATIVE', 'Citrate NEGATIVE (IMViC: ++--)'],
      specialIdentification: 'EHEC O157:H7 is sorbitol non-fermenting on Sorbitol-MacConkey (SMAC) agar.'
    },
    firstLineTreatment: 'Uncomplicated UTI: Nitrofurantoin or TMP-SMX. Pyelonephritis/Sepsis: Ceftriaxone, Fluoroquinolones, or Carbapenems. EHEC: Supportive care ONLY (antibiotics increase Shiga toxin release!).',
    prevention: 'Thorough cooking of ground meat, hand washing, urinary catheter stewardship, drinking bottled water while traveling.',
    highYieldPearl: 'Avoid prescribing antibiotics for EHEC (O157:H7) diarrhea because lysing bacteria increases Shiga-toxin release, worsening HUS risk.'
  },
  {
    id: 'pseudomonas-aeruginosa',
    scientificName: 'Pseudomonas aeruginosa',
    commonName: 'Pseudomonas',
    gramCategory: 'gram_negative',
    shape: 'bacilli',
    arrangement: 'singles',
    oxygenRequirement: 'obligate_aerobe',
    motility: 'motile',
    sporeFormation: 'non_spore_former',
    keyVirulenceFactors: [
      'Alginate exopolysaccharide capsule (forms dense mucoid biofilms in Cystic Fibrosis airways)',
      'Exotoxin A (inactivates Elongation Factor-2 / EF-2 by ADP-ribosylation, arresting protein synthesis)',
      'Pyocyanin (blue-green phenazine pigment generating reactive oxygen species) and Pyoverdine (yellow-green fluorescent siderophore)',
      'Elastase and alkaline protease (degrade tissue and blood vessels -> Ecthyma gangrenosum)'
    ],
    majorDiseases: [
      'Pneumonia in Cystic Fibrosis and ventilated ICU patients',
      'Burn wound and chronic diabetic ulcer infections with blue-green purulent exudate',
      'Otitis externa ("swimmer\'s ear") and malignant otitis externa in diabetics',
      'Hot tub folliculitis and puncture wound osteomyelitis (through rubber sole of athletic shoes)'
    ],
    transmission: ['Moist hospital environments (sinks, respirators, dialysis tubing, humidifiers, catheters); ubiquitous in water and soil'],
    diagnosticHallmarks: {
      gramStainDescription: 'Gram-negative slender rod (pink/red bacilli) occurring singly or in pairs',
      cultureMedia: 'Nutrient Agar (diffusible blue-green pyocyanin pigment with distinctive sweet grape-like / corn tortilla aroma); MacConkey Agar (lactose non-fermenter, pale colonies)',
      biochemicalTests: ['Oxidase POSITIVE (turns tetramethyl-p-phenylenediamine dark purple within 10 seconds)', 'Catalase POSITIVE', 'Non-fermentative obligate aerobe'],
      specialIdentification: 'Oxidase-positive, non-lactose fermenting Gram-negative rod with blue-green pigment.'
    },
    firstLineTreatment: 'Antipseudomonal Beta-lactams: Piperacillin-tazobactam (Zosyn), Cefepime, Ceftazidime, Meropenem, or Ciprofloxacin (oral).',
    prevention: 'Strict infection control and sterilization of hospital respiratory gear, catheter maintenance, avoidance of contaminated pools/hot tubs.',
    highYieldPearl: 'Mnemonic "PSEUDO": Pneumonia/Pyocyanin, Sepsis, Ecthyma gangrenosum, Ulcers/Burns, Diabetes/Osteomyelitis, Otitis externa.'
  },
  {
    id: 'neisseria-meningitidis',
    scientificName: 'Neisseria meningitidis',
    commonName: 'Meningococcus',
    gramCategory: 'gram_negative',
    shape: 'cocci',
    arrangement: 'pairs_diplococci',
    oxygenRequirement: 'obligate_aerobe',
    motility: 'non_motile',
    sporeFormation: 'non_spore_former',
    keyVirulenceFactors: [
      'Polysaccharide capsule (groups A, B, C, W-135, Y; resists phagocytosis; Group B is poorly immunogenic polysialic acid)',
      'Lipooligosaccharide (LOS) Endotoxin (shed in massive amounts into bloodstream -> severe septic shock, vascular necrosis, DIC, petechial purpura)',
      'IgA1 protease and Pili for nasopharyngeal mucosal attachment'
    ],
    majorDiseases: [
      'Meningococcal Meningitis (epidemics in college dormitories, military barracks, Hajj pilgrimage)',
      'Meningococcemia with petechial/purpuric skin rash',
      'Waterhouse-Friderichsen Syndrome (fulminant sepsis with bilateral adrenal hemorrhage and acute adrenal cortical failure)'
    ],
    transmission: ['Close contact with respiratory secretions/droplets from asymptomatic nasopharyngeal carriers'],
    diagnosticHallmarks: {
      gramStainDescription: 'Gram-negative kidney-bean (coffee-bean) shaped diplococci with adjacent flat surfaces, frequently intracellular within neutrophils in CSF',
      cultureMedia: 'Chocolate Agar and Thayer-Martin Selective Agar (contains Vancomycin, Colistin, Nystatin, Trimethoprim) in 5% CO2 candle jar',
      biochemicalTests: ['Oxidase POSITIVE', 'Ferments MALTOSE and GLUCOSE with acid production (Meningitidis = Maltose + MeninGococci)'],
      specialIdentification: 'Differentiated from N. gonorrhoeae (ferments Glucose ONLY) by ability to ferment Maltose.'
    },
    firstLineTreatment: 'Empiric: Ceftriaxone or Cefotaxime + Vancomycin. Once confirmed penicillin-susceptible: Penicillin G.',
    prevention: 'Meningococcal conjugate vaccines (MenACWY and MenB); Chemoprophylaxis for close household/dorm contacts with Rifampin, Ciprofloxacin, or Ceftriaxone.',
    highYieldPearl: 'Neisseria meningitidis ferments Maltose AND Glucose; Neisseria gonorrhoeae ferments Glucose ONLY.'
  },
  {
    id: 'mycobacterium-tuberculosis',
    scientificName: 'Mycobacterium tuberculosis',
    commonName: 'TB Bacillus / Koch\'s Bacillus',
    gramCategory: 'acid_fast',
    shape: 'bacilli',
    arrangement: 'filaments',
    oxygenRequirement: 'obligate_aerobe',
    motility: 'non_motile',
    sporeFormation: 'non_spore_former',
    keyVirulenceFactors: [
      'Mycolic acids and rich cell wall lipids (resists desiccation, Gram staining, and chemical disinfectants)',
      'Cord Factor (trehalose 6,6\'-dimycolate; inhibits leukocyte migration, disrupts mitochondrial membranes, induces granuloma formation)',
      'Sulfatides (inhibit phagosome-lysosome fusion inside alveolar macrophages)'
    ],
    majorDiseases: [
      'Primary Pulmonary TB (Ghon complex in mid/lower lung + hilar lymph node)',
      'Secondary (Reactivation) Pulmonary TB (cavitary lesions in oxygen-rich apices of lungs with hemoptysis, night sweats, weight loss)',
      'Extrapulmonary TB: Potts disease (vertebral osteomyelitis), Scrofula (cervical lymphadenitis), Tuberculous meningitis, Miliary TB'
    ],
    transmission: ['Airborne droplet nuclei (<5 µm) generated during coughing, sneezing, or speaking by patients with active cavitary pulmonary TB'],
    diagnosticHallmarks: {
      gramStainDescription: 'Does not stain well with standard Gram stain ("ghost cells"); Stains intensely bright red/pink with Ziehl-Neelsen (ZN) or Kinyoun Acid-Fast stain against a blue background',
      cultureMedia: 'Lowenstein-Jensen (LJ) egg-based medium (produces rough, crumbly, buff/cream-colored "cauliflower-like" colonies after 3-6 weeks of incubation)',
      biochemicalTests: ['Niacin test POSITIVE', 'Nitrate reduction POSITIVE', 'Catalase POSITIVE (heat-labile)'],
      specialIdentification: 'Acid-fast bacillus (resists decolorization with 3% acid-alcohol due to mycolic acids); GeneXpert MTB/RIF NAAT assay.'
    },
    firstLineTreatment: 'Standard "RIPE" therapy for 2 months (Rifampin, Isoniazid, Pyrazinamide, Ethambutol) followed by 4 months of Rifampin + Isoniazid.',
    prevention: 'BCG (Bacille Calmette-Guérin) live-attenuated vaccine in endemic areas; Airborne isolation rooms with negative pressure (HEPA filters and N95 respirators).',
    highYieldPearl: 'Reactivation TB preferentially targets the lung apices because M. tuberculosis is a strict obligate aerobe and the apical lung regions have the highest ventilation/perfusion (V/Q) ratio.'
  },
  {
    id: 'clostridium-tetani',
    scientificName: 'Clostridium tetani',
    commonName: 'Tetanus Bacillus',
    gramCategory: 'gram_positive',
    shape: 'bacilli',
    arrangement: 'singles',
    oxygenRequirement: 'obligate_anaerobe',
    motility: 'motile',
    sporeFormation: 'spore_former',
    keyVirulenceFactors: [
      'Tetanospasmin (potent AB-neurotoxin; retrogradely transported along motor axons to spinal cord inhibitory interneurons)',
      'Cleaves synaptobrevin (VAMP SNARE protein), blocking the vesicular release of inhibitory neurotransmitters GABA and Glycine from Renshaw cells',
      'Terminal round endospore resistant to boiling, desiccation, and disinfectants'
    ],
    majorDiseases: [
      'Generalized Tetanus: Trismus / Lockjaw (masseter spasm), Risus sardonicus (sardonic grin), Opisthotonos (arching backward spasms of spine)',
      'Neonatal Tetanus (infection of unhealed umbilical stump with contaminated instruments in non-immunized mothers)'
    ],
    transmission: ['Spore contamination of puncture wounds, rusty nails, lacerations, or unsterile umbilical cord ligation'],
    diagnosticHallmarks: {
      gramStainDescription: 'Gram-positive straight bacillus with a prominent round, terminal spore giving a classic "drumstick" or "tennis racket" appearance',
      cultureMedia: 'Cooked Meat Medium and Blood Agar incubated under strict anaerobic conditions (forms a thin spreading film of swarming growth)',
      biochemicalTests: ['Gelatin liquefaction POSITIVE', 'Indole POSITIVE', 'Strict obligate anaerobe (killed by atmospheric oxygen)'],
      specialIdentification: 'Clinical diagnosis primarily based on symptoms; drumstick spore morphology on Gram stain.'
    },
    firstLineTreatment: 'Wound debridement, Human Tetanus Immune Globulin (HTIG) to neutralize unbound toxin, Metronidazole (preferred over penicillin), Muscle relaxants/Benzodiazepines, Dark/quiet ICU environment.',
    prevention: 'Tetanus toxoid vaccine (in DTaP / Tdap combination) given every 10 years; Post-exposure prophylaxis with toxoid +/- HTIG.',
    highYieldPearl: 'Tetanospasmin blocks GABA and Glycine release, leading to SPASTIC paralysis (contrast with Botulinum toxin which blocks Acetylcholine release, causing FLACCID paralysis).'
  }
];
