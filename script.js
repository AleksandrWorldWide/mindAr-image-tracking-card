

document.addEventListener('DOMContentLoaded', () => {
	const images = [
		'./assets/target/cover.jpg',
		'./assets/slider/slides/Bugatti-Chiron-X-Hermes-01.jpg',
		'./assets/slider/slides/Lamborghini-Murcielago-LP-640-X-Versace-01.jpg',
		'./assets/slider/slides/Maserati-Quattroporte-X-Ermenegildo-Zegna-01.jpg',
		'./assets/slider/slides/Mercedes-Benz-S-class-X-Swarovski-01.jpg',
		'./assets/slider/slides/Thom-Browne-X-Infiniti-Q50-01.jpg'
	]

	let num = 0;

	const arrows = document.querySelectorAll('a');
	const slider = document.querySelector('#slider');

	let slide = document.createElement('img');
	slide.src = images[0];
	slider.appendChild(slide);

	arrows.forEach(item => {
		item.addEventListener('click', () => {
			if (item.classList.contains('next')) {
				if (num < images.length-1) {
					num++;
				} else {
					num = 0;
				}
			} else {
				if (num > 0) {
					num--;
				} else {
					num = images.length-1;
				}

			}
			slide.src = images[num];
		})
	})
})