const container = document.querySelector('.container')
const btn = document.querySelectorAll('.btn')

const icons = {
		'default' : 'fas fa-circle',
		'success' : 'fas fa-check-circle',
		'info' : 'fas fa-info-circle',
		'warning' : 'fas fa-exclamation-circle',
		'danger' : 'fas fa-exclamation-circle',
}

const data = [
		{
			'title' : 'default',
			'desc' : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
			'type' : 'default',
			'duration' : 5000
		},
		{
			'title' : 'success',
			'desc' : 'Congratulation you sign up success!',
			'type' : 'success',
			'duration' : 5000
		},
		{
			'title' : 'info',
			'desc' : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
			'type' : 'info',
			'duration' : 5000
		},
		{
			'title' : 'warning',
			'desc' : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
			'type' : 'warning',
			'duration' : 5000
		},
		{
			'title' : 'danger',
			'desc' : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
			'type' : 'danger',
			'duration' : 5000
		},
]

//  Kiểm tra xem type của button có trong danh sách type hay không
const checkType = (type='default', types) => {
	let offset = -1
	for(let i = 0; i < types.length; i++) {
		if(type === types[i].type) {
			offset = i
			break
		}
	}

	return offset
}

//  Ham render ra màn hình giao diện toast
const toast = ({title="", desc="", type="default", duration=3000}) => {

	const delay = duration / 1000
	const icon = icons[type]

	let toast = document.createElement('div')

	toast.classList.add(`alert-section`, `alert-section--${type}`)
	toast.style.animation = `sliderInRight ease-in-out 1s, fadeOut linear 1s ${delay}s forwards`

	toast.innerHTML = `
				<div class="alert-section__icon">
					<i class="${icon}"></i>
				</div>

				<div class="alert-section__text">
					<div class="alert-section__title">
						<h3>${title}</h3>
					</div>

					<div class="alert-section__desc">
						<p>${desc}</p>
					</div>
				</div>

				<div class="alert-section__icon alert-section__icon--close">
					<i class="fas fa-times"></i>
				</div>
	`

	container.appendChild(toast)

	// Xóa phần tử toast khi hết thời gian 
	let clearToast = setTimeout(() => {
		container.removeChild(toast)
	}, duration+1000)

	toast.addEventListener('click', (event) => {
		if(event.target.closest('.alert-section__icon--close')) {
			// console.log(event.target.closest('.alert-section__icon--close'))
			container.removeChild(toast)
			clearTimeout(clearToast)
		}
	})
}

document.addEventListener("DOMContentLoaded", () => {

	for(let i = 0; i < btn.length; i++) {
		btn[i].addEventListener('click', () => {
			const type = btn[i].dataset.type
			const offset = checkType(type, data)

			if(offset !== -1 ) {
				toast(data[offset])
			}
		})
	}
})