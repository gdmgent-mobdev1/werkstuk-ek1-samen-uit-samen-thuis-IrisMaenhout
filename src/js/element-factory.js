const elements = {
    createBtn({textContent = '', onClick=null, classList=''}){
        const btn = document.createElement('button');
        btn.textContent = textContent;
        btn.classList = classList;
        if(onClick){
            btn.addEventListener('click', ()=> onClick());
        }
        return btn;    
    },
    createHeading({size = 1, textContent ='', classList =''}){
        if(size<1 || size >6) return null;
        const heading = document.createElement(`h${size}`);
        heading.classList = classList;
        heading.textContent = textContent;
        return heading;
    },

    createImage({src = '', alt='', classList=''}){
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        img.classList = classList;
        return img;
    },

    createLink({textContent='', href='#', classList=''}){
        const a = document.createElement('a');
        a.textContent = textContent;
        a.href = href;
        a.classList= classList;
        return a;
    },

    createParagraph({textContent ='', classList=''}){
        const p = document.createElement('p');
        p.textContent = textContent;
        p.classList = classList;
        return p;
    },

    createDiv({classList='', textContent=''}){
        const div = document.createElement('div');
        div.classList=classList;
        div.textContent = textContent;
        return div;
    },

    createNav({classList = ''}){
        const nav = document.createElement('nav');
        nav.classList = classList;
        return nav;
    },

    createUl({classList=''}){
        const ul = document.createElement('ul');
        ul.classList='';
        return ul;
    },

    createLi({textContent='', classList=''}){
        const li = document.createElement('li');
        li.textContent = textContent;
        li.classList = classList;
        return li;
    },

    createLine({classList=''}){
        const line = document.createElement('hr');
        line.classList = classList;
        return line;
    },

    createI({classList='', textContent=''}){
        const i = document.createElement('i');
        i.classList = classList;
        i.textContent = textContent;
        return i;
    },

    createB({classList='', textContent=''}){
        const b = document.createElement('b');
        b.classList = classList;
        b.textContent = textContent;
        return b;
    },

    createFormTag({classList=''}){
        const form = document.createElement('form');
        form.classList = classList;
        return form;
    },

    createInputTag({type="text", id="", name="", value='', required= false, placeholder=''}){
        const input = document.createElement('input');
        input.type=type;
        input.setAttribute("id", id);
        input.name = name;
        input.value = value;
        input.placeholder = placeholder;
        if(required === true){
            input.setAttribute("required", "");
        }
        return input;
    },

    createLabel({textContent='', labelFor=''}){
        const label = document.createElement('label');
        label.textContent = textContent;
        label.setAttribute('for', labelFor);
        return label;
    },

    createTextarea({name='', id='', placeholder=''}){
        const textarea = document.createElement('textarea');
        textarea.name = name;
        textarea.id = id;
        textarea.placeholder = placeholder;
        return placeholder;
    }
}

export default elements;
