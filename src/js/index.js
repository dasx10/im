addEventListener('click', function (event) {
    if (/\/[a-z]{0,}.html$|^\/$/.test(event.target.pathname)) {
        event.preventDefault();
        console.dir(event.target);
    }
});