import * as THREE from "three";

// Configuration de base
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
console.log(document.querySelector(".webgl"));
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".webgl"),
  alpha: true, // Activer la transparence
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Rendre le fond transparent
renderer.setClearColor(0x000000, 0); // Le deuxième paramètre 0 définit une opacité de 0

// Chemins des textures avec leurs liens associés
const textureData = [
  {
    texture: "/img/diginight-esd-24.jpeg",
    link: "https://jchambon.esd-monsite.fr/hub-gaming-pop-corn-2024/",
  },
  {
    texture: "/img/projet-php.jpg",
    link: "https://jchambon.esd-monsite.fr/restau_thai/",
  },
  {
    texture: "/img/diginight-esd-25.jpeg",
    link: "https://esd-digital-event.com",
  },
  {
    texture: "/img/diginight-esd-24.jpeg",
    link: "https://jchambon.esd-monsite.fr/hub-gaming-pop-corn-2024/",
  },
  {
    texture: "/img/projet-php.jpg",
    link: "https://jchambon.esd-monsite.fr/restau_thai/",
  },
  {
    texture: "/img/diginight-esd-25.jpeg",
    link: "https://esd-digital-event.com",
  },
];

// Tableau pour stocker les plans
const planes = [];

// Chargement des textures
const textureLoader = new THREE.TextureLoader();

// Fonction pour créer un plan avec position aléatoire
function createRandomPlane(textureInfo) {
  const texture = textureLoader.load(textureInfo.texture);

  const geometry = new THREE.PlaneGeometry(5, 3.75);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    transparent: true,
  });

  const plane = new THREE.Mesh(geometry, material);
  plane.userData.link = textureInfo.link; // Stockage du lien dans l'objet

  // Position aléatoire
  plane.position.x = (Math.random() - 0.5) * 20; // Plage x de -10 à 10
  plane.position.y = (Math.random() - 0.5) * 20; // Plage y de -10 à 10
  plane.position.z = -50 + Math.random() * 100; // Plage z de -50 à 50

  scene.add(plane);
  planes.push(plane);

  return plane;
}

// Créer des plans pour chaque texture
textureData.forEach((data) => createRandomPlane(data));

// Positionnement de la caméra
camera.position.z = 5;

// Gestion du scroll
let scrollY = 0.6;

// Raycaster pour la détection de clic
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Fonction de gestion du clic
function onMouseClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    if (clickedObject.userData.link) {
      window.open(clickedObject.userData.link, "_blank");
    }
  }
}

window.addEventListener("click", onMouseClick, false);

// Boucle de rendu
function animate() {
  requestAnimationFrame(animate);

  // Mouvement des plans selon le scroll
  planes.forEach((plane, index) => {
    plane.position.z += scrollY;

    // Réinitialiser la position si le plan est trop loin
    if (plane.position.z > camera.position.z + 50) {
      plane.position.z = -50;
      plane.position.x = (Math.random() - 0.5) * 20;
      plane.position.y = (Math.random() - 0.5) * 20;
    }
  });

  renderer.render(scene, camera);
}
animate();

// Gestion du redimensionnement de la fenêtre
window.addEventListener(
  "resize",
  () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);
