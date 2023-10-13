import './AppManu.css';
import NavbarCreateEvent from './components/NavBarCreateEvent';
import CreateEvents from './components/CreateEvents'; 
import ModalWindow from './components/ModalWindow';

function AppManu() {
  return (
    <div className="AppManu">
      <ModalWindow/>
      <div className="background-image"></div>
      <div className="content">
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
