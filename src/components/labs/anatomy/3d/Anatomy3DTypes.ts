export type AnatomicalLayerId =
  | 'skin'
  | 'fascia'
  | 'superficial_muscles'
  | 'deep_muscles'
  | 'bones'
  | 'joints'
  | 'organs'
  | 'arteries'
  | 'veins'
  | 'nerves';

export interface AnatomicalLayerConfig {
  id: AnatomicalLayerId;
  nameEn: string;
  nameAr: string;
  color: string;
  defaultVisible: boolean;
  defaultOpacity: number;
  iconName: string;
  description: string;
}

export interface AnatomicalRelation {
  anterior?: string;
  posterior?: string;
  medial?: string;
  lateral?: string;
  superior?: string;
  inferior?: string;
  superficial?: string;
  deep?: string;
  proximal?: string;
  distal?: string;
  [key: string]: string | undefined;
}

export interface AnatomicalStructure {
  id: string;
  nameEn: string;
  nameAr: string;
  latinName: string;
  layer: AnatomicalLayerId;
  region: 'head_neck' | 'thorax' | 'abdomen_pelvis' | 'upper_limb' | 'lower_limb';
  regionAr: string;
  location: string;
  function: string;
  relations: AnatomicalRelation;
  highYieldExamInfo: string;
  clinicalCorrelates: string;
  innervationOrSupply?: string;
  originInsertionOrCourse?: string;
  pinPosition: [number, number, number]; // 3D coordinates [x, y, z] in scene space
  meshTargetName: string;
  quickSpotterQuiz: {
    question: string;
    questionAr: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export type AnatomicalAnimationMode = 
  | 'none'
  | 'heartbeat'
  | 'respiration'
  | 'biceps_flexion'
  | 'knee_motion'
  | 'blood_flow';

export interface CameraViewPreset {
  id: string;
  nameEn: string;
  nameAr: string;
  position: [number, number, number];
  target: [number, number, number];
}
