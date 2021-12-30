import Navigo from 'navigo'; // When using ES modules.
const router = new Navigo('/');


router.on('/home', function () {
    // do something
    console.log('succes');
});