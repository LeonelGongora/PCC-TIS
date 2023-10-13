import './AppManu.css';
import NavbarCreateEvent from './components/NavBarCreateEvent';
import CreateEvents from './components/CreateEvents'; 
import ModalWindow from './components/ModalWindow';

function AppManu() {
  return (
    <div className="AppManu">
      <div className="background-image"></div>
      <div className="content">
        <ModalWindow/>
        <div className='navegacion'>
          <NavbarCreateEvent/>          
        </div>
        <div className='contenido'>
          <CreateEvents />
        </div>
      </div>
    </div>
  );
}
export default AppManu;
