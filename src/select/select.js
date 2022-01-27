const getTemplate = (placeholder, data, selectedId) => {
    let text = placeholder
    const items = data.map(item => {
        let cls = ''

        if (+selectedId === +item.id) {
            text = item.value
            cls = 'select__item__selected'
        }
        return `<li class="select__item ${cls}" data-type="item" data-value=${item.id}>${item.value}</li>`
    })
    return (
        `
         <div id="select" class="select">
              <div class="select__input" data-type="input">
                  ${text}
              </div>
              <div class="select__dropdown">
                   <ul class="select__list">
                      ${items.join('')}
                   </ul>
              </div>
              <div class="select__backdrop" data-type="backdrop"></div>
         </div>
        `
    )
}

export class Select {
    constructor(selector, options) {
        this.el = document.querySelector(selector)
        this.options = options
        this.selectedId = null
        this.#render()
        this.#setup()
    }

    #render() {
        const {placeholder, data, selectedId} = this.options
        this.el.innerHTML = getTemplate(placeholder, data, selectedId)
    }

    #setup() {
        this.clickHandler = this.clickHandler.bind(this)
        this.el.addEventListener('click', this.clickHandler)
        this.placehodler = document.querySelector('[data-type="input"]')
        this.items = document.querySelectorAll('[data-type="item"]')
    }

    clickHandler(event) {
        const {type} = event.target.dataset;
        if (type === 'input') {
            this.toggle()
        } else if (type === 'item') {
            this.items.forEach(item => item.classList.remove('select__item__selected'))
            event.target.classList.add('select__item__selected')
            this.select(event.target.dataset.value)
        } else if (type === 'backdrop'){
            this.close()
        }
    }

    select(id) {
        this.selectedId = id
        this.placehodler.textContent = this.current.value
        this.options.onSelect ? this.options.onSelect(this.current) : ''
        this.close()
    }

    toggle() {
        if (this.isOpen) {
            this.close()
            return
        }
        this.open()
    }

    get current() {
        return this.options.data.find(item => +item.id === +this.selectedId)
    }

    get isOpen() {
        return this.el.classList.contains('select__open')
    }

    open() {
        this.el.classList.add('select__open')
    }

    close() {
        this.el.classList.remove('select__open')
    }

    destroy() {
        this.el.removeEventListener('click', this.clickHandler)
        this.el.innerHTML = ''
    }
}