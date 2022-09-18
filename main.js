const THREE = window.MINDAR.IMAGE.THREE;
import {loadAudio, loadGLTF} from './libs/loader.js';
import {CSS3DObject} from './libs/CSS3DRenderer.js';


document.addEventListener('DOMContentLoaded', () => {
	const start = async() => {
    // initialize MindAR 
   const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/target/targets.mind',
   });
   const {renderer, cssRenderer, scene, cssScene, camera} = mindarThree;

	const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
	scene.add(light);

    // create anchor
   const anchor = mindarThree.addAnchor(0);

	// audio listener
	const listener = new THREE.AudioListener;
	camera.add(listener);

	// car model
	const scaleCar = 0.07;
	const car = await loadGLTF('./assets/model/car/scene.gltf');
	car.scene.userData.clickable = true;
	car.scene.scale.set(scaleCar,scaleCar,scaleCar);
	car.scene.position.set(-0.4,-0.25,0);
	car.scene.rotation.set(0,45,-100);
	anchor.group.add(car.scene);

	// beep
	const audioBeep = await loadAudio('./assets/audio/car-honk-1.mp3');
	const beep = new THREE.Audio(listener);
	beep.setBuffer(audioBeep);

	//ringtone
	const audioRingtone = await loadAudio('./assets/audio/Stromae_Alors_On_Danse_Extended_Version_Ringtone_(by Fringster.com).mp3');
	const ringtone = new THREE.Audio(listener);
	ringtone.setBuffer(audioRingtone);

	//mail model
	const mail = await loadGLTF('./assets/model/mail/scene.gltf');
	mail.scene.userData.clickable = true;
	mail.scene.scale.set(0.03,0.03,0.03);
	mail.scene.position.set(0.1,-0.25,0);
	mail.scene.rotation.set(0.3,-0.7,0);
	anchor.group.add(mail.scene);

	// drone
	const drone = await loadGLTF('./assets/model/drone/scene.gltf');
	drone.scene.userData.clickable = true;
	drone.scene.scale.set(0.0003,0.0003,0.0003);
	drone.scene.position.set(-0.05,-0.2,0);
	drone.scene.visible = false;
	anchor.group.add(drone.scene);


	// animation drone
	const mixer = new THREE.AnimationMixer(drone.scene);
	const action = mixer.clipAction(drone.animations[0]);
	action.play();

	// phone model
	const phone = await loadGLTF('./assets/model/pnohe/scene.gltf');
	phone.scene.userData.clickable = true;
	phone.scene.scale.set(0.005,0.005,0.005);
	phone.scene.position.set(0.32,-0.22,0);
	phone.scene.rotation.set(0.3,-0.7,0);
	anchor.group.add(phone.scene);

	// globus model
	const globus = await loadGLTF('./assets/model/globus/scene.gltf');
	globus.scene.userData.clickable = true;
	globus.scene.scale.set(0.0001,0.0001,0.0001);
	globus.scene.position.set(-0.1,-0.2,0);
	anchor.group.add(globus.scene);

	/// globus animation
	const clock = new THREE.Clock();

	// css renderer
	const obj = new CSS3DObject(document.querySelector('#slider'));
	obj.position.set(0,150,0);
	const cssAnchor = mindarThree.addCSSAnchor(0);
	cssAnchor.group.add(obj);


	// events
	document.body.addEventListener('click', (e) => {
		const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
		const mouseY = -1 * ((e.clientY / window.innerHeight) * 2 - 1);
		const mouse = new THREE.Vector2(mouseX, mouseY);

		const raycaster = new THREE.Raycaster();
		raycaster.setFromCamera(mouse, camera);

		const intersects = raycaster.intersectObjects(scene.children, true);

		if (intersects.length) {
			let o = intersects[0].object;


			while (o.parent && !o.userData.clickble) {
				if (o === car.scene || o === globus.scene || o === mail.scene || o === phone.scene) break;
				o = o.parent;
			}

			if (o.userData.clickable) {
				if (o === car.scene) {
					beep.play();
				}
				if (o === globus.scene) {
					window.location.href = 'https://www.fashiondistrictnw.com/events/2022coutureandcars'
				}
				if (o === mail.scene) {
					if (mail.scene.visible) {
						mail.scene.visible = false;
						drone.scene.visible = true;
					} else {
						mail.scene.visible = true;
						drone.scene.visible = false;
					}
					
				}
				if (o === phone.scene) {
					ringtone.play();
				}
			}
		}
	})

    // start AR
   await mindarThree.start();
   renderer.setAnimationLoop(() => {
		const delta = clock.getDelta();
		globus.scene.rotation.set(0,globus.scene.rotation.y + delta,0);
		// drone.scene.rotation.set(0,drone.scene.rotation.y + delta,0);
      renderer.render(scene, camera);
		cssRenderer.render(cssScene, camera);
   });
  }
  start();
});
