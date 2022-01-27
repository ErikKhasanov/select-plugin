# Select-plugin

#### Создать базовый dom элемент `<div id="your_id"></div>`

#### Импортируем плагин
    import {Select} from "./select/select";
    import './select/select.scss';

#### Инициализация компонента `const your_select = new Select(#your_id, {options})`

#### Options: `{placeholder, selectedId, data, callBack}`
    placeholder: string - текстовая заглушка
    selectedId: string - элемент по-умолчанию
    data: [] - массив элементов списка [{id: number, value: string}]
    callBack: () => {} - функция callback при выборе элемента, возвращает сам элемент
