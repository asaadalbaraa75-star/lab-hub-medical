import * as THREE from 'three';
import { AnatomicalLayerId, AnatomicalAnimationMode } from './Anatomy3DTypes';

export interface SceneMeshRecord {
  id: string;
  mesh: THREE.Object3D;
  layer: AnatomicalLayerId;
  defaultMaterial: THREE.Material | THREE.Material[];
  currentMaterial: THREE.Material | THREE.Material[];
}

export class AnatomySceneManager {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public container: HTMLElement;
  private animationFrameId: number | null = null;
  private clock: THREE.Clock;

  // Orbit & Camera state
  public isDragging = false;
  public isPanning = false;
  private previousMousePosition = { x: 0, y: 0 };
  public cameraTarget = new THREE.Vector3(0, 0.2, 0);
  private spherical = new THREE.Spherical(7.0, Math.PI / 2, 0);

  // Mesh Registry for fast filtering & raycasting
  public meshRecords: Map<string, SceneMeshRecord> = new Map();
  public layerGroups: Map<AnatomicalLayerId, THREE.Group> = new Map();

  // Animation nodes
  private heartMesh: THREE.Mesh | null = null;
  private lungLeftMesh: THREE.Mesh | null = null;
  private lungRightMesh: THREE.Mesh | null = null;
  private bicepsLeftMesh: THREE.Mesh | null = null;
  private forearmLeftGroup: THREE.Group | null = null;
  private kneeRightGroup: THREE.Group | null = null;
  private bloodParticles: THREE.Points | null = null;

  public currentAnimation: AnatomicalAnimationMode = 'none';
  public selectedStructureId: string | null = null;
  public isolatedStructureId: string | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.clock = new THREE.Clock();

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x060913); // Deep midnight medical navy

    // 2. Camera
    const aspect = container.clientWidth / container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 100);
    this.updateCameraFromSpherical();

    // 3. WebGL Renderer with High-DPI & Antialiasing
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    container.appendChild(this.renderer.domElement);

    // 4. Lighting Rig
    this.setupLighting();

    // 5. Build Human Anatomy Layers
    this.buildAnatomyLayers();

    // 6. Setup Interaction Listeners
    this.setupEventListeners();

    // 7. Start Render Loop
    this.startRenderLoop();
  }

  private setupLighting(): void {
    // Ambient soft fill light
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 0.85);
    this.scene.add(ambientLight);

    // Key Directional Light (anterior-superior)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(3, 6, 5);
    keyLight.castShadow = true;
    this.scene.add(keyLight);

    // Rim Light (cool surgical cyan edge accent)
    const rimLight = new THREE.DirectionalLight(0x00f0ff, 1.1);
    rimLight.position.set(-4, 3, -4);
    this.scene.add(rimLight);

    // Back Light (warm magenta edge separation)
    const backLight = new THREE.DirectionalLight(0xa855f7, 0.7);
    backLight.position.set(0, -3, -4);
    this.scene.add(backLight);

    // Floor Medical Grid for spatial perspective
    const gridHelper = new THREE.GridHelper(10, 20, 0x3b82f6, 0x1e293b);
    gridHelper.position.y = -3.2;
    this.scene.add(gridHelper);
  }

  private buildAnatomyLayers(): void {
    // Initialize Groups for all 10 layers
    const layerIds: AnatomicalLayerId[] = [
      'skin',
      'fascia',
      'superficial_muscles',
      'deep_muscles',
      'bones',
      'joints',
      'organs',
      'arteries',
      'veins',
      'nerves'
    ];

    layerIds.forEach(id => {
      const group = new THREE.Group();
      group.name = `layer_${id}`;
      this.scene.add(group);
      this.layerGroups.set(id, group);
    });

    // Build Meshes by layer
    this.buildSkeletalBones();
    this.buildInternalOrgans();
    this.buildMusculature();
    this.buildCardiovascularVessels();
    this.buildNervousSystem();
    this.buildJointsAndLigaments();
    this.buildFasciaAndSkin();
  }

  /* =========================================================================
     1. BONES & SKELETON
     ========================================================================= */
  private buildSkeletalBones(): void {
    const bonesGroup = this.layerGroups.get('bones')!;
    const boneMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f3ed,
      roughness: 0.42,
      metalness: 0.04
    });

    // Skull & Cranium
    const craniumGeom = new THREE.SphereGeometry(0.42, 32, 24);
    craniumGeom.scale(0.9, 1.1, 1.0);
    const cranium = new THREE.Mesh(craniumGeom, boneMaterial.clone());
    cranium.position.set(0, 2.45, 0);
    cranium.userData = { structureId: 'skull_cranium', layer: 'bones' };
    bonesGroup.add(cranium);
    this.registerMesh('skull_cranium', cranium, 'bones');

    // Mandible (Jawbone)
    const mandibleGeom = new THREE.TorusGeometry(0.24, 0.05, 12, 24, Math.PI);
    mandibleGeom.rotateX(Math.PI / 2);
    const mandible = new THREE.Mesh(mandibleGeom, boneMaterial.clone());
    mandible.position.set(0, 2.12, 0.15);
    mandible.userData = { structureId: 'skull_cranium', layer: 'bones' };
    bonesGroup.add(mandible);

    // Vertebral Column (Spine: Cervical, Thoracic, Lumbar)
    const spineGroup = new THREE.Group();
    for (let i = 0; i < 24; i++) {
      const y = 2.05 - i * 0.1;
      const radius = 0.08 + (i > 15 ? 0.03 : 0);
      const discGeom = new THREE.CylinderGeometry(radius, radius, 0.07, 16);
      const disc = new THREE.Mesh(discGeom, boneMaterial.clone());
      disc.position.set(0, y, -0.08 + Math.sin(i * 0.25) * 0.04);
      spineGroup.add(disc);
    }
    spineGroup.userData = { structureId: 'ribcage_sternum', layer: 'bones' };
    bonesGroup.add(spineGroup);

    // Sternum (Manubrium + Body + Xiphoid)
    const sternumShape = new THREE.BoxGeometry(0.18, 0.72, 0.05);
    const sternum = new THREE.Mesh(sternumShape, boneMaterial.clone());
    sternum.position.set(0, 1.18, 0.48);
    sternum.userData = { structureId: 'ribcage_sternum', layer: 'bones' };
    bonesGroup.add(sternum);
    this.registerMesh('ribcage_sternum', sternum, 'bones');

    // Ribcage (12 Pairs of curved ribs)
    for (let r = 0; r < 12; r++) {
      const y = 1.6 - r * 0.085;
      const rx = 0.42 + Math.sin((r / 11) * Math.PI) * 0.32;
      const rz = 0.35 + Math.sin((r / 11) * Math.PI) * 0.22;

      // Curve path for rib pair
      [-1, 1].forEach(side => {
        const curve = new THREE.EllipseCurve(
          side * 0.1, y, rx, rz,
          0, Math.PI, false, 0
        );
        const points = curve.getPoints(24);
        const ribGeom = new THREE.BufferGeometry().setFromPoints(
          points.map(p => new THREE.Vector3(p.x, y, p.y * 0.75 + 0.15))
        );
        const ribTube = new THREE.TubeGeometry(
          new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(p.x, y, p.y * 0.8 + 0.1))),
          20, 0.022, 8, false
        );
        const ribMesh = new THREE.Mesh(ribTube, boneMaterial.clone());
        ribMesh.userData = { structureId: 'ribcage_sternum', layer: 'bones' };
        bonesGroup.add(ribMesh);
      });
    }

    // Clavicles (S-shaped Collarbones)
    [-1, 1].forEach(side => {
      const clavicleCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 0.1, 1.62, 0.42),
        new THREE.Vector3(side * 0.5, 1.65, 0.35),
        new THREE.Vector3(side * 0.95, 1.58, 0.2)
      ]);
      const clavicleGeom = new THREE.TubeGeometry(clavicleCurve, 16, 0.032, 8, false);
      const clavicle = new THREE.Mesh(clavicleGeom, boneMaterial.clone());
      clavicle.userData = { structureId: 'ribcage_sternum', layer: 'bones' };
      bonesGroup.add(clavicle);
    });

    // Pelvis (Os Coxae with iliac crests & sacrum)
    const pelvisGroup = new THREE.Group();
    const iliumGeom = new THREE.TorusGeometry(0.38, 0.12, 12, 24, Math.PI * 0.9);
    [-1, 1].forEach(side => {
      const ilium = new THREE.Mesh(iliumGeom, boneMaterial.clone());
      ilium.position.set(side * 0.32, -0.4, 0.05);
      ilium.rotation.z = side * -0.4;
      ilium.rotation.y = side * 0.3;
      pelvisGroup.add(ilium);
    });
    pelvisGroup.position.set(0, 0, 0);
    bonesGroup.add(pelvisGroup);

    // Femurs (Left & Right Thigh Bones)
    [-1, 1].forEach(side => {
      const femurCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 0.35, -0.52, 0.05), // Head/neck in acetabulum
        new THREE.Vector3(side * 0.48, -0.65, 0.02), // Greater trochanter
        new THREE.Vector3(side * 0.42, -1.25, 0.02), // Shaft
        new THREE.Vector3(side * 0.38, -1.85, 0.08)  // Condyles at knee
      ]);
      const femurGeom = new THREE.TubeGeometry(femurCurve, 20, 0.065, 12, false);
      const femurMesh = new THREE.Mesh(femurGeom, boneMaterial.clone());
      const femurId = side === 1 ? 'femur_thigh' : 'femur_thigh_left';
      femurMesh.userData = { structureId: 'femur_thigh', layer: 'bones' };
      bonesGroup.add(femurMesh);
      if (side === 1) this.registerMesh('femur_thigh', femurMesh, 'bones');

      // Patella (Kneecap)
      const patellaGeom = new THREE.SphereGeometry(0.065, 16, 12);
      patellaGeom.scale(1.0, 1.2, 0.5);
      const patella = new THREE.Mesh(patellaGeom, boneMaterial.clone());
      patella.position.set(side * 0.38, -1.88, 0.19);
      patella.userData = { structureId: 'joint_knee', layer: 'bones' };
      bonesGroup.add(patella);

      // Tibia & Fibula (Lower Leg Bones)
      const tibiaCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 0.38, -1.98, 0.08),
        new THREE.Vector3(side * 0.34, -2.5, 0.05),
        new THREE.Vector3(side * 0.32, -3.0, 0.02)
      ]);
      const tibiaGeom = new THREE.TubeGeometry(tibiaCurve, 16, 0.055, 10, false);
      const tibiaMesh = new THREE.Mesh(tibiaGeom, boneMaterial.clone());
      tibiaMesh.userData = { structureId: 'joint_knee', layer: 'bones' };
      bonesGroup.add(tibiaMesh);
    });

    // Upper Limbs: Humerus, Radius, Ulna
    [-1, 1].forEach(side => {
      const humerusCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 0.98, 1.52, 0.1),
        new THREE.Vector3(side * 1.05, 1.1, 0.08),
        new THREE.Vector3(side * 1.02, 0.65, 0.05)
      ]);
      const humerusGeom = new THREE.TubeGeometry(humerusCurve, 16, 0.052, 10, false);
      const humerus = new THREE.Mesh(humerusGeom, boneMaterial.clone());
      humerus.userData = { structureId: 'muscle_biceps', layer: 'bones' };
      bonesGroup.add(humerus);

      // Forearm bones group (hinged for flexion animation on left arm)
      const forearmGroup = new THREE.Group();
      forearmGroup.position.set(side * 1.02, 0.65, 0.05);

      const radiusCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(side * 0.03, -0.3, 0.02),
        new THREE.Vector3(side * 0.04, -0.6, 0.01)
      ]);
      const radiusGeom = new THREE.TubeGeometry(radiusCurve, 12, 0.035, 8, false);
      const radius = new THREE.Mesh(radiusGeom, boneMaterial.clone());
      forearmGroup.add(radius);

      bonesGroup.add(forearmGroup);
      if (side === -1) {
        this.forearmLeftGroup = forearmGroup;
      }
    });
  }

  /* =========================================================================
     2. INTERNAL ORGANS (HEART, LUNGS, LIVER, STOMACH, KIDNEYS)
     ========================================================================= */
  private buildInternalOrgans(): void {
    const organsGroup = this.layerGroups.get('organs')!;

    // 1. Heart
    const heartMaterial = new THREE.MeshStandardMaterial({
      color: 0x991b1b,
      roughness: 0.35,
      metalness: 0.1,
      emissive: 0x3f0707,
      emissiveIntensity: 0.2
    });
    const heartGeom = new THREE.SphereGeometry(0.24, 24, 20);
    heartGeom.scale(0.85, 1.15, 0.95);
    this.heartMesh = new THREE.Mesh(heartGeom, heartMaterial);
    this.heartMesh.position.set(-0.09, 1.02, 0.22);
    this.heartMesh.rotation.z = -0.28;
    this.heartMesh.userData = { structureId: 'heart_ventricles', layer: 'organs' };
    organsGroup.add(this.heartMesh);
    this.registerMesh('heart_ventricles', this.heartMesh, 'organs');

    // 2. Right Lung (3 Lobes)
    const lungMaterial = new THREE.MeshStandardMaterial({
      color: 0xf472b6,
      roughness: 0.55,
      metalness: 0.02,
      transparent: true,
      opacity: 0.92
    });
    const rightLungGeom = new THREE.SphereGeometry(0.38, 24, 20);
    rightLungGeom.scale(0.75, 1.55, 0.85);
    this.lungRightMesh = new THREE.Mesh(rightLungGeom, lungMaterial.clone());
    this.lungRightMesh.position.set(0.48, 1.1, 0.18);
    this.lungRightMesh.userData = { structureId: 'lung_right', layer: 'organs' };
    organsGroup.add(this.lungRightMesh);
    this.registerMesh('lung_right', this.lungRightMesh, 'organs');

    // 3. Left Lung (2 Lobes with cardiac notch)
    const leftLungGeom = new THREE.SphereGeometry(0.34, 24, 20);
    leftLungGeom.scale(0.68, 1.48, 0.8);
    this.lungLeftMesh = new THREE.Mesh(leftLungGeom, lungMaterial.clone());
    this.lungLeftMesh.position.set(-0.48, 1.12, 0.18);
    this.lungLeftMesh.userData = { structureId: 'lung_left', layer: 'organs' };
    organsGroup.add(this.lungLeftMesh);
    this.registerMesh('lung_left', this.lungLeftMesh, 'organs');

    // 4. Liver (Large triangular organ in right hypochondrium)
    const liverMaterial = new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.45,
      metalness: 0.05
    });
    const liverGeom = new THREE.SphereGeometry(0.42, 24, 18);
    liverGeom.scale(1.25, 0.65, 0.85);
    const liver = new THREE.Mesh(liverGeom, liverMaterial);
    liver.position.set(0.28, 0.38, 0.22);
    liver.rotation.z = -0.15;
    liver.userData = { structureId: 'liver_hepatic', layer: 'organs' };
    organsGroup.add(liver);
    this.registerMesh('liver_hepatic', liver, 'organs');

    // 5. Stomach (J-shaped hollow digestive organ)
    const stomachMaterial = new THREE.MeshStandardMaterial({
      color: 0xbe123c,
      roughness: 0.5,
      metalness: 0.05
    });
    const stomachCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.15, 0.58, 0.15), // Cardia
      new THREE.Vector3(-0.35, 0.52, 0.22), // Fundus
      new THREE.Vector3(-0.38, 0.28, 0.25), // Greater curvature body
      new THREE.Vector3(-0.18, 0.22, 0.24), // Incisura
      new THREE.Vector3(-0.02, 0.28, 0.18)  // Pylorus
    ]);
    const stomachGeom = new THREE.TubeGeometry(stomachCurve, 24, 0.16, 12, false);
    const stomach = new THREE.Mesh(stomachGeom, stomachMaterial);
    stomach.userData = { structureId: 'stomach_gastric', layer: 'organs' };
    organsGroup.add(stomach);
    this.registerMesh('stomach_gastric', stomach, 'organs');

    // 6. Kidneys (Retroperitoneal bean-shaped organs)
    const kidneyMaterial = new THREE.MeshStandardMaterial({
      color: 0x831843,
      roughness: 0.4,
      metalness: 0.05
    });
    [-1, 1].forEach(side => {
      const kidneyGeom = new THREE.SphereGeometry(0.14, 16, 12);
      kidneyGeom.scale(0.7, 1.25, 0.75);
      const kidney = new THREE.Mesh(kidneyGeom, kidneyMaterial.clone());
      const yOffset = side === 1 ? 0.12 : 0.18; // Right kidney slightly lower
      kidney.position.set(side * 0.36, yOffset, -0.16);
      kidney.rotation.z = side * 0.2;
      kidney.userData = { structureId: 'kidneys_renal', layer: 'organs' };
      organsGroup.add(kidney);
      if (side === 1) this.registerMesh('kidneys_renal', kidney, 'organs');
    });

    // 7. Intestines (Abdominal loops)
    const intestineMaterial = new THREE.MeshStandardMaterial({
      color: 0xfb7185,
      roughness: 0.6,
      metalness: 0.02
    });
    const intestineGeom = new THREE.TorusKnotGeometry(0.28, 0.08, 64, 8, 2, 3);
    const intestine = new THREE.Mesh(intestineGeom, intestineMaterial);
    intestine.position.set(-0.02, -0.15, 0.18);
    organsGroup.add(intestine);
  }

  /* =========================================================================
     3. MUSCULATURE (SUPERFICIAL & DEEP)
     ========================================================================= */
  private buildMusculature(): void {
    const superficialGroup = this.layerGroups.get('superficial_muscles')!;
    const muscleMaterial = new THREE.MeshStandardMaterial({
      color: 0xa33b32,
      roughness: 0.62,
      metalness: 0.04
    });

    // 1. Pectoralis Major (Chest muscles)
    [-1, 1].forEach(side => {
      const p向けGeom = new THREE.SphereGeometry(0.38, 20, 16);
      p向けGeom.scale(0.9, 0.65, 0.45);
      const pecMesh = new THREE.Mesh(p向けGeom, muscleMaterial.clone());
      pecMesh.position.set(side * 0.36, 1.28, 0.38);
      pecMesh.rotation.z = side * -0.25;
      pecMesh.userData = { structureId: 'muscle_pectoralis_major', layer: 'superficial_muscles' };
      superficialGroup.add(pecMesh);
      if (side === 1) this.registerMesh('muscle_pectoralis_major', pecMesh, 'superficial_muscles');
    });

    // 2. Deltoids (Shoulder caps)
    [-1, 1].forEach(side => {
      const deltoidGeom = new THREE.SphereGeometry(0.26, 16, 14);
      deltoidGeom.scale(0.8, 1.2, 0.75);
      const deltoid = new THREE.Mesh(deltoidGeom, muscleMaterial.clone());
      deltoid.position.set(side * 1.02, 1.5, 0.12);
      deltoid.userData = { structureId: 'muscle_biceps', layer: 'superficial_muscles' };
      superficialGroup.add(deltoid);
    });

    // 3. Biceps Brachii (Arm flexors)
    [-1, 1].forEach(side => {
      const bicepsGeom = new THREE.CylinderGeometry(0.1, 0.07, 0.42, 16);
      bicepsGeom.scale(1.1, 1.0, 0.8);
      const biceps = new THREE.Mesh(bicepsGeom, muscleMaterial.clone());
      biceps.position.set(side * 1.02, 1.02, 0.16);
      biceps.userData = { structureId: 'muscle_biceps', layer: 'superficial_muscles' };
      superficialGroup.add(biceps);
      if (side === -1) {
        this.bicepsLeftMesh = biceps;
        this.registerMesh('muscle_biceps', biceps, 'superficial_muscles');
      }
    });

    // 4. Rectus Abdominis (Six-pack muscles)
    for (let seg = 0; seg < 4; seg++) {
      [-1, 1].forEach(side => {
        const segGeom = new THREE.BoxGeometry(0.16, 0.12, 0.08);
        const segMesh = new THREE.Mesh(segGeom, muscleMaterial.clone());
        segMesh.position.set(side * 0.11, 0.78 - seg * 0.15, 0.32);
        superficialGroup.add(segMesh);
      });
    }

    // 5. Quadriceps Femoris (Thigh extensors)
    [-1, 1].forEach(side => {
      const quadGeom = new THREE.CylinderGeometry(0.18, 0.12, 0.85, 16);
      const quad = new THREE.Mesh(quadGeom, muscleMaterial.clone());
      quad.position.set(side * 0.42, -1.25, 0.18);
      quad.userData = { structureId: 'femur_thigh', layer: 'superficial_muscles' };
      superficialGroup.add(quad);
    });

    // 6. Gastrocnemius & Soleus (Calf bellies)
    [-1, 1].forEach(side => {
      const calfGeom = new THREE.SphereGeometry(0.16, 16, 12);
      calfGeom.scale(0.85, 1.6, 0.95);
      const calf = new THREE.Mesh(calfGeom, muscleMaterial.clone());
      calf.position.set(side * 0.35, -2.4, -0.08);
      superficialGroup.add(calf);
    });
  }

  /* =========================================================================
     4. CARDIOVASCULAR ARTERIAL & VENOUS SYSTEM
     ========================================================================= */
  private buildCardiovascularVessels(): void {
    const arteriesGroup = this.layerGroups.get('arteries')!;
    const veinsGroup = this.layerGroups.get('veins')!;

    const arteryMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      roughness: 0.3,
      metalness: 0.1,
      emissive: 0x991b1b,
      emissiveIntensity: 0.35
    });

    const veinMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.3,
      metalness: 0.1,
      emissive: 0x0369a1,
      emissiveIntensity: 0.35
    });

    // AORTA (Ascending, Arch, Descending)
    const aortaCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.06, 1.05, 0.22), // Valve origin
      new THREE.Vector3(0.04, 1.25, 0.25),  // Ascending aorta
      new THREE.Vector3(-0.02, 1.48, 0.18), // Peak of Arch
      new THREE.Vector3(-0.08, 1.28, 0.05), // Descending thoracic
      new THREE.Vector3(-0.06, 0.45, -0.02), // Abdominal aorta
      new THREE.Vector3(-0.02, -0.35, -0.05) // Iliac bifurcation
    ]);
    const aortaGeom = new THREE.TubeGeometry(aortaCurve, 32, 0.048, 12, false);
    const aortaMesh = new THREE.Mesh(aortaGeom, arteryMat.clone());
    aortaMesh.userData = { structureId: 'artery_aorta', layer: 'arteries' };
    arteriesGroup.add(aortaMesh);
    this.registerMesh('artery_aorta', aortaMesh, 'arteries');

    // Carotid Arteries (Head & Neck)
    [-1, 1].forEach(side => {
      const carotidCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 0.06, 1.45, 0.16),
        new THREE.Vector3(side * 0.14, 1.95, 0.12),
        new THREE.Vector3(side * 0.12, 2.3, 0.08)
      ]);
      const carotidGeom = new THREE.TubeGeometry(carotidCurve, 16, 0.024, 8, false);
      const carotid = new THREE.Mesh(carotidGeom, arteryMat.clone());
      carotid.userData = { structureId: 'artery_aorta', layer: 'arteries' };
      arteriesGroup.add(carotid);
    });

    // Femoral & Iliac Arteries
    [-1, 1].forEach(side => {
      const femoralCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 0.05, -0.35, -0.04),
        new THREE.Vector3(side * 0.25, -0.65, 0.12), // Inguinal ligament
        new THREE.Vector3(side * 0.35, -1.2, 0.12),
        new THREE.Vector3(side * 0.32, -1.8, 0.02)
      ]);
      const femoralGeom = new THREE.TubeGeometry(femoralCurve, 20, 0.028, 8, false);
      const femoral = new THREE.Mesh(femoralGeom, arteryMat.clone());
      arteriesGroup.add(femoral);
    });

    // INFERIOR VENA CAVA (IVC)
    const ivcCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.08, -0.35, -0.05),
      new THREE.Vector3(0.12, 0.35, -0.02),
      new THREE.Vector3(0.08, 0.95, 0.15)
    ]);
    const ivcGeom = new THREE.TubeGeometry(ivcCurve, 24, 0.055, 12, false);
    const ivcMesh = new THREE.Mesh(ivcGeom, veinMat.clone());
    ivcMesh.userData = { structureId: 'vein_ivc', layer: 'veins' };
    veinsGroup.add(ivcMesh);
    this.registerMesh('vein_ivc', ivcMesh, 'veins');

    // Superior Vena Cava (SVC)
    const svcCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.08, 0.95, 0.15),
      new THREE.Vector3(0.12, 1.35, 0.18),
      new THREE.Vector3(0.06, 1.52, 0.16)
    ]);
    const svcGeom = new THREE.TubeGeometry(svcCurve, 16, 0.045, 10, false);
    const svc = new THREE.Mesh(svcGeom, veinMat.clone());
    svc.userData = { structureId: 'vein_ivc', layer: 'veins' };
    veinsGroup.add(svc);

    // Directional Blood Flow Particles
    this.buildBloodFlowParticles();
  }

  private buildBloodFlowParticles(): void {
    const particleCount = 240;
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const isArtery = i % 2 === 0;
      const t = (i / particleCount) * Math.PI * 2;
      positions[i * 3] = Math.sin(t) * 0.25 + (isArtery ? -0.05 : 0.05);
      positions[i * 3 + 1] = Math.cos(t) * 1.5;
      positions[i * 3 + 2] = 0.15;

      if (isArtery) {
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.2;
        colors[i * 3 + 2] = 0.2;
      } else {
        colors[i * 3] = 0.1;
        colors[i * 3 + 1] = 0.6;
        colors[i * 3 + 2] = 1.0;
      }
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    this.bloodParticles = new THREE.Points(geom, pMaterial);
    this.layerGroups.get('arteries')!.add(this.bloodParticles);
  }

  /* =========================================================================
     5. NERVOUS SYSTEM (SCIATIC, BRACHIAL PLEXUS, PHRENIC)
     ========================================================================= */
  private buildNervousSystem(): void {
    const nervesGroup = this.layerGroups.get('nerves')!;
    const nerveMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.3,
      metalness: 0.1,
      emissive: 0xd97706,
      emissiveIntensity: 0.45
    });

    // Sciatic Nerves (Posterior thigh to popliteal)
    [-1, 1].forEach(side => {
      const sciaticCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 0.22, -0.42, -0.15), // Greater sciatic foramen
        new THREE.Vector3(side * 0.32, -0.85, -0.18),
        new THREE.Vector3(side * 0.35, -1.4, -0.12),
        new THREE.Vector3(side * 0.36, -1.85, -0.06)  // Popliteal bifurcation
      ]);
      const sciaticGeom = new THREE.TubeGeometry(sciaticCurve, 20, 0.026, 8, false);
      const sciaticMesh = new THREE.Mesh(sciaticGeom, nerveMat.clone());
      sciaticMesh.userData = { structureId: 'nerve_sciatic', layer: 'nerves' };
      nervesGroup.add(sciaticMesh);
      if (side === 1) this.registerMesh('nerve_sciatic', sciaticMesh, 'nerves');
    });

    // Brachial Plexus & Median Nerves
    [-1, 1].forEach(side => {
      const brachialCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 0.15, 1.85, 0.02),
        new THREE.Vector3(side * 0.55, 1.55, 0.12),
        new THREE.Vector3(side * 0.95, 1.05, 0.12),
        new THREE.Vector3(side * 0.98, 0.55, 0.08)
      ]);
      const brachialGeom = new THREE.TubeGeometry(brachialCurve, 20, 0.022, 8, false);
      const brachial = new THREE.Mesh(brachialGeom, nerveMat.clone());
      nervesGroup.add(brachial);
    });
  }

  /* =========================================================================
     6. JOINTS & LIGAMENTS
     ========================================================================= */
  private buildJointsAndLigaments(): void {
    const jointsGroup = this.layerGroups.get('joints')!;
    const jointMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.35,
      metalness: 0.1,
      transparent: true,
      opacity: 0.88
    });

    // Knee Joints (ACL, PCL, Collaterals, Menisci)
    [-1, 1].forEach(side => {
      const kneeGroup = new THREE.Group();
      kneeGroup.position.set(side * 0.38, -1.88, 0.08);

      // Capsular capsule & collateral rings
      const capsuleGeom = new THREE.TorusGeometry(0.12, 0.035, 12, 24);
      capsuleGeom.rotateX(Math.PI / 2);
      const capsule = new THREE.Mesh(capsuleGeom, jointMat.clone());
      kneeGroup.add(capsule);

      // Cruciate ligaments (Crossed tubes)
      const aclCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.04, -0.06, 0.04),
        new THREE.Vector3(0.04, 0.06, -0.04)
      ]);
      const aclGeom = new THREE.TubeGeometry(aclCurve, 8, 0.016, 6, false);
      const acl = new THREE.Mesh(aclGeom, jointMat.clone());
      kneeGroup.add(acl);

      kneeGroup.userData = { structureId: 'joint_knee', layer: 'joints' };
      jointsGroup.add(kneeGroup);
      if (side === 1) {
        this.kneeRightGroup = kneeGroup;
        this.registerMesh('joint_knee', kneeGroup, 'joints');
      }
    });

    // Glenohumeral (Shoulder) Joints
    [-1, 1].forEach(side => {
      const shoulderJointGeom = new THREE.SphereGeometry(0.09, 16, 12);
      const shoulderJoint = new THREE.Mesh(shoulderJointGeom, jointMat.clone());
      shoulderJoint.position.set(side * 0.98, 1.52, 0.1);
      jointsGroup.add(shoulderJoint);
    });
  }

  /* =========================================================================
     7. FASCIA & TRANSLUCENT SKIN SHELL
     ========================================================================= */
  private buildFasciaAndSkin(): void {
    const skinGroup = this.layerGroups.get('skin')!;
    const fasciaGroup = this.layerGroups.get('fascia')!;

    // Anatomical Body Silhouette Envelope (Smooth PBR physical transmission)
    const skinMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd4a373,
      roughness: 0.38,
      metalness: 0.02,
      transmission: 0.55,
      opacity: 0.35,
      transparent: true,
      clearcoat: 0.25,
      side: THREE.DoubleSide
    });

    // Torso Contour Shell
    const torsoGeom = new THREE.CylinderGeometry(0.55, 0.42, 2.4, 32, 16);
    torsoGeom.scale(1.25, 1.0, 0.75);
    const torsoSkin = new THREE.Mesh(torsoGeom, skinMaterial);
    torsoSkin.position.set(0, 0.85, 0.12);
    torsoSkin.userData = { structureId: 'skin_shell', layer: 'skin' };
    skinGroup.add(torsoSkin);

    // Head/Neck Shell
    const headGeom = new THREE.SphereGeometry(0.52, 32, 24);
    headGeom.scale(0.85, 1.15, 0.95);
    const headSkin = new THREE.Mesh(headGeom, skinMaterial.clone());
    headSkin.position.set(0, 2.45, 0);
    headSkin.userData = { structureId: 'skin_shell', layer: 'skin' };
    skinGroup.add(headSkin);

    // Deep Fascia (Rectus sheath & IT Band)
    const fasciaMaterial = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      roughness: 0.5,
      metalness: 0.05,
      transparent: true,
      opacity: 0.65
    });
    [-1, 1].forEach(side => {
      const itBandGeom = new THREE.BoxGeometry(0.06, 1.1, 0.12);
      const itBand = new THREE.Mesh(itBandGeom, fasciaMaterial.clone());
      itBand.position.set(side * 0.55, -1.25, 0.08);
      fasciaGroup.add(itBand);
    });
  }

  private registerMesh(id: string, obj: THREE.Object3D, layer: AnatomicalLayerId): void {
    const mesh = obj as THREE.Mesh;
    this.meshRecords.set(id, {
      id,
      mesh: obj,
      layer,
      defaultMaterial: mesh.material,
      currentMaterial: mesh.material
    });
  }

  /* =========================================================================
     CAMERA & INTERACTION LOGIC
     ========================================================================= */
  private setupEventListeners(): void {
    const dom = this.renderer.domElement;

    // Mouse Down
    dom.addEventListener('mousedown', (e: MouseEvent) => {
      e.preventDefault();
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
      if (e.button === 0) {
        this.isDragging = true;
      } else if (e.button === 2) {
        this.isPanning = true;
      }
    });

    // Mouse Move
    dom.addEventListener('mousemove', (e: MouseEvent) => {
      if (!this.isDragging && !this.isPanning) return;
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      if (this.isDragging) {
        // Orbit rotation
        this.spherical.theta -= deltaX * 0.0075;
        this.spherical.phi = Math.max(
          0.1,
          Math.min(Math.PI - 0.1, this.spherical.phi - deltaY * 0.0075)
        );
        this.updateCameraFromSpherical();
      } else if (this.isPanning) {
        // Pan target
        const panSpeed = 0.0035 * (this.spherical.radius / 7);
        this.cameraTarget.x -= deltaX * panSpeed;
        this.cameraTarget.y += deltaY * panSpeed;
        this.updateCameraFromSpherical();
      }

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    // Mouse Up
    const onMouseUp = () => {
      this.isDragging = false;
      this.isPanning = false;
    };
    window.addEventListener('mouseup', onMouseUp);

    // Context Menu Prevent
    dom.addEventListener('contextmenu', e => e.preventDefault());

    // Wheel Zoom
    dom.addEventListener('wheel', (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY * 0.0035;
      this.spherical.radius = Math.max(1.5, Math.min(18.0, this.spherical.radius + zoomFactor));
      this.updateCameraFromSpherical();
    }, { passive: false });

    // Touch Support for Mobile & Tablets
    let initialTouchDistance = 0;
    dom.addEventListener('touchstart', (e: TouchEvent) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        this.isDragging = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialTouchDistance = Math.hypot(dx, dy);
      }
    });

    dom.addEventListener('touchmove', (e: TouchEvent) => {
      if (e.touches.length === 1 && this.isDragging) {
        const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
        const deltaY = e.touches[0].clientY - this.previousMousePosition.y;
        this.spherical.theta -= deltaX * 0.008;
        this.spherical.phi = Math.max(
          0.1,
          Math.min(Math.PI - 0.1, this.spherical.phi - deltaY * 0.008)
        );
        this.updateCameraFromSpherical();
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const distance = Math.hypot(dx, dy);
        const diff = initialTouchDistance - distance;
        this.spherical.radius = Math.max(1.5, Math.min(18.0, this.spherical.radius + diff * 0.015));
        this.updateCameraFromSpherical();
        initialTouchDistance = distance;
      }
    });

    dom.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    // Window Resize
    window.addEventListener('resize', this.onWindowResize);
  }

  public updateCameraFromSpherical(): void {
    const position = new THREE.Vector3();
    position.setFromSpherical(this.spherical);
    position.add(this.cameraTarget);
    this.camera.position.copy(position);
    this.camera.lookAt(this.cameraTarget);
  }

  public onWindowResize = (): void => {
    if (!this.container) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  /* =========================================================================
     HIGHLIGHT, ISOLATE, & SELECTION
     ========================================================================= */
  public selectStructure(structureId: string | null): void {
    this.selectedStructureId = structureId;
    this.applyVisualHighlightState();
  }

  public isolateStructure(structureId: string | null): void {
    this.isolatedStructureId = structureId;
    this.applyVisualHighlightState();
  }

  private applyVisualHighlightState(): void {
    const selected = this.selectedStructureId;
    const isolated = this.isolatedStructureId;

    this.meshRecords.forEach((record, id) => {
      const mesh = record.mesh as THREE.Mesh;
      if (!mesh || !mesh.material) return;

      const isSelected = id === selected;
      const isIsolated = isolated ? id === isolated : true;

      // Highlight logic
      if (selected) {
        if (isSelected) {
          // Highlight with glowing emissive intensity
          const highlightMat = (record.defaultMaterial as THREE.MeshStandardMaterial).clone();
          highlightMat.emissive = new THREE.Color(0x00f0ff);
          highlightMat.emissiveIntensity = 0.8;
          mesh.material = highlightMat;
          mesh.visible = true;
        } else if (isolated) {
          // If isolated, hide everything else
          mesh.visible = false;
        } else {
          // Dim surrounding structures
          const dimMat = (record.defaultMaterial as THREE.MeshStandardMaterial).clone();
          dimMat.transparent = true;
          dimMat.opacity = 0.22;
          mesh.material = dimMat;
          mesh.visible = true;
        }
      } else {
        // Reset to default
        mesh.material = record.defaultMaterial;
        mesh.visible = true;
      }
    });
  }

  public setLayerVisibility(layerId: AnatomicalLayerId, visible: boolean): void {
    const group = this.layerGroups.get(layerId);
    if (group) {
      group.visible = visible;
    }
  }

  public setLayerOpacity(layerId: AnatomicalLayerId, opacity: number): void {
    const group = this.layerGroups.get(layerId);
    if (!group) return;

    group.traverse(child => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(m => {
            m.transparent = opacity < 1.0;
            m.opacity = opacity;
          });
        } else if (mesh.material) {
          mesh.material.transparent = opacity < 1.0;
          mesh.material.opacity = opacity;
        }
      }
    });
  }

  public setCameraView(position: [number, number, number], target: [number, number, number]): void {
    this.cameraTarget.set(target[0], target[1], target[2]);
    this.camera.position.set(position[0], position[1], position[2]);
    this.camera.lookAt(this.cameraTarget);

    // Resynchronize spherical coordinates
    const offset = new THREE.Vector3().subVectors(this.camera.position, this.cameraTarget);
    this.spherical.setFromVector3(offset);
  }

  public resetView(): void {
    this.cameraTarget.set(0, 0.2, 0);
    this.spherical.set(7.0, Math.PI / 2, 0);
    this.updateCameraFromSpherical();
    this.selectedStructureId = null;
    this.isolatedStructureId = null;
    this.currentAnimation = 'none';

    // Restore all layers to visible
    this.layerGroups.forEach(group => {
      group.visible = true;
    });
    this.applyVisualHighlightState();
  }

  /* =========================================================================
     RAYCASTING (CLICK ON 3D MODEL)
     ========================================================================= */
  public raycastStructure(clientX: number, clientY: number): string | null {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), this.camera);

    const intersects = raycaster.intersectObjects(this.scene.children, true);
    for (const hit of intersects) {
      let cur: THREE.Object3D | null = hit.object;
      while (cur) {
        if (cur.userData?.structureId) {
          return cur.userData.structureId;
        }
        cur = cur.parent;
      }
    }
    return null;
  }

  /* =========================================================================
     ANIMATION LOOP (HEARTBEAT, RESPIRATION, BICEPS FLEXION, BLOOD FLOW)
     ========================================================================= */
  private startRenderLoop(): void {
    const animate = () => {
      this.animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = this.clock.getElapsedTime();

      // 1. Heartbeat Animation
      if (this.currentAnimation === 'heartbeat' && this.heartMesh) {
        // Dual systolic pulse curve
        const beatCycle = (Math.sin(elapsedTime * 8) + Math.sin(elapsedTime * 16) * 0.3);
        const heartScale = 1.0 + Math.max(0, beatCycle) * 0.14;
        this.heartMesh.scale.set(0.85 * heartScale, 1.15 * heartScale, 0.95 * heartScale);

        // Pulsing glow during ventricular systole
        const heartMat = this.heartMesh.material as THREE.MeshStandardMaterial;
        heartMat.emissiveIntensity = 0.25 + Math.max(0, beatCycle) * 0.6;
      }

      // 2. Respiration Breathing Animation
      if (this.currentAnimation === 'respiration') {
        const breathCycle = (Math.sin(elapsedTime * 2.2) + 1) * 0.5; // 0 to 1
        const lungScale = 1.0 + breathCycle * 0.22;

        if (this.lungRightMesh) {
          this.lungRightMesh.scale.set(0.75 * lungScale, 1.55 * (1 + breathCycle * 0.1), 0.85 * lungScale);
        }
        if (this.lungLeftMesh) {
          this.lungLeftMesh.scale.set(0.68 * lungScale, 1.48 * (1 + breathCycle * 0.1), 0.8 * lungScale);
        }
      }

      // 3. Muscle & Joint Flexion (Biceps flexion & elbow)
      if (this.currentAnimation === 'biceps_flexion') {
        const flexCycle = (Math.sin(elapsedTime * 3) + 1) * 0.5; // 0 to 1

        if (this.forearmLeftGroup) {
          // Flex elbow up to 135 degrees (2.35 rad)
          this.forearmLeftGroup.rotation.x = -flexCycle * 2.1;
        }
        if (this.bicepsLeftMesh) {
          // Biceps muscle belly thickens and shortens during concentric contraction
          const muscleBulge = 1.0 + flexCycle * 0.45;
          const muscleShorten = 1.0 - flexCycle * 0.18;
          this.bicepsLeftMesh.scale.set(1.1 * muscleBulge, muscleShorten, 0.8 * muscleBulge);
        }
      }

      // 4. Knee Motion
      if (this.currentAnimation === 'knee_motion' && this.kneeRightGroup) {
        const kneeCycle = (Math.sin(elapsedTime * 2.5) + 1) * 0.5;
        this.kneeRightGroup.rotation.x = kneeCycle * 1.6;
      }

      // 5. Blood Flow Particles Animation
      if (this.bloodParticles) {
        const positions = this.bloodParticles.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] -= 0.015; // Move blood downwards
          if (positions[i] < -2.8) {
            positions[i] = 1.8; // Cycle back to aortic arch / head
          }
        }
        this.bloodParticles.geometry.attributes.position.needsUpdate = true;
      }

      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }

  public dispose(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.onWindowResize);

    // Dispose geometries & materials
    this.scene.traverse(obj => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(m => m.dispose());
        } else if (mesh.material) {
          mesh.material.dispose();
        }
      }
    });

    this.renderer.dispose();
    if (this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
