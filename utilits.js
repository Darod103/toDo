export function alertInput (){
    document.querySelector('#task-input').classList.add('is-danger');
    document.querySelector('#task-input').placeholder = 'ЗАДАЧА НЕ ВВЕДЕНА......';
    document.querySelector('#task-input').focus();
};

export function clearAlert() {
    document.querySelector('#task-input').classList.remove('is-danger');
    document.querySelector('#task-input').placeholder = 'Добавить задачу';
}