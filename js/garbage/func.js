function customizeSelect(select, options) {
    let elems = document.querySelectorAll(select);
    let wrapperClass = options.wrapperClass || 'select-wrapper',
        resultClass = options.resultClass || 'result-wrapper',
        listClass = options.listClass || 'options-list',
        itemClass = options.itemClass || 'options-item';
    elems.forEach(select => {
        let text = select.dataset.text;
        select.hidden = true;
        select.value = '';
        let wrapper = document.createElement('div');
        wrapper.classList.add(wrapperClass);
        let result = document.createElement('div');
        result.classList.add(resultClass);
        result.textContent = text;
        let list = document.createElement('ul');
        list.classList.add(listClass);
        let options = select.querySelectorAll('option');
        let selOpt = [...options].filter(opt => opt.getAttribute('selected') !== null);
        if (selOpt[0]) {
            result.textContent = selOpt[0].textContent || selOpt[0].value;
            select.value = selOpt[0].value || selOpt[0].textContent;
        }
        options.forEach(option => {
            let item = document.createElement('li');
            item.textContent = option.value || option.textContent;
            item.classList.add(itemClass);
            list.appendChild(item);
            item.addEventListener('click', function () {
                list.classList.remove('active');
                select.value = this.textContent.trim();
                result.textContent = this.textContent.trim();
                result.classList.remove('active');
                result.classList.remove('error');
            })
        });
        result.addEventListener('click', function () {
            list.classList.toggle('active');
            this.classList.toggle('active');
        });
        wrapper.appendChild(result);
        wrapper.appendChild(list);
        select.parentNode.appendChild(wrapper);
    });
    document.addEventListener('mousedown', function (e) {
        if (e.target.closest('.' + wrapperClass) === null) {
            document.querySelectorAll('.' + resultClass).forEach(res => res.classList.remove('active'));
            document.querySelectorAll('.' + listClass).forEach(list => list.classList.remove('active'));
        }
    });
}

function getFullData(form) {
    let data = {};
    form
        .querySelectorAll("input[type='text'], input[type='hidden'], input[type='email'], input[type='password'], select, textarea")
        .forEach(function (elem) {
            data[elem.name] = elem.value;
        });
    form
        .querySelectorAll("input[type='file']")
        .forEach(function (elem) {
            data[elem.name] = elem.files[0];
        });
    return data;
}