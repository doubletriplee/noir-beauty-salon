const menu = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
menu?.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', open); });
document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => { nav.classList.remove('open'); menu?.setAttribute('aria-expanded', 'false'); }));
document.querySelectorAll('.master-pills button').forEach((button) => button.addEventListener('click', () => { document.querySelector('.master-pills .selected')?.classList.remove('selected'); button.classList.add('selected'); document.querySelector('.booking-copy .button').innerHTML = `Записаться к ${button.textContent.split(' · ')[0]} <span>↗</span>`; }));
document.querySelector('.request form')?.addEventListener('submit', (event) => { event.preventDefault(); const btn = event.currentTarget.querySelector('button'); btn.textContent = 'Демо проверено — данные не отправлены ✓'; btn.disabled = true; });
