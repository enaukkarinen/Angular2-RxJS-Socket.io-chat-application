
import {home} from './components/home/home'


var x = new home();

document.getElementById("title").innerHTML = "Changed innerHTML";


console.log('app loaded');


export default function ensio() {
    return "ensio!";
}