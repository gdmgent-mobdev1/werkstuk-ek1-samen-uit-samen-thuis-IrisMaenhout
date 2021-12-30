import Navigo from 'navigo'; // When using ES modules.
const router = new Navigo('/');




const Router = {
    router: null,
    getRouter(){
        if(!this.router){
            const rootUrl = `${window.location.protocol}//${window.location.host}`;
            console.log(rootUrl);
            this.router = new Navigo(rootUrl, false);
        }

        return this.router;
    }
}

export default Router;