export function initialize(pages) {
    const sectionDiv = document.querySelector('.sections');
    const nav = document.querySelector('nav');
    nav.addEventListener('click', onClick);

    function onClick(ev) {
        ev.preventDefault();
        let target = ev.target;
        if (target.tagName == 'IMG') {
          target = ev.target.parentNode  
        }
        if ( target.tagName == 'A') {
            const url = new URL(target.href);
            goTo(url.pathname)
        }
    }
    
    const context = {
        showSection,
        goTo
    }
    return context;
    
    function showSection(section) {
        sectionDiv.replaceChildren(section);
        sectionDiv.style.display = 'block'
    };
    function goTo(name) {
        const handler = pages[name];
        if (typeof handler == 'function') {
            handler(context)
        }
    };
}