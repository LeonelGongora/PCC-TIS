import './AppManu.css';
import NavbarCreateEvent from './components/NavBarCreateEvent';
import CreateEvents from './components/CreateEvents'; 

function AppManu() {
  return (
    <div className="AppManu">
      <div className="background-image"></div> {/* Componente de fondo */}
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
