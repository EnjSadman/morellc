import '../styles/main.scss';
import {initialData} from './data/initialData';
import { timerSetter } from './reservationTimer/reservationTimer';

document.addEventListener("DOMContentLoaded", () => timerSetter(initialData.id))

