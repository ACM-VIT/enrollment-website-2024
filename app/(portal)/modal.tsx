import "../../public/info.svg";
import "../../public/close-red.png";
import "../../public/close-white.png";
import "./modal-styling.css";

interface ModalType {
  // children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function Modal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay" onClick={props.toggle}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="title">
              <span>Visual Studio Code</span>
              <button className="exit-button" onClick={props.toggle}>
                <img src="../../public/close-white.png" className="white"/>
                <img src="../../public/close-red.png" className="red"/>
              </button>
            </div>
            <div className="error">
              <img src="../../public/info.svg" alt="info-icon" />
              404 ERROR
            </div>
            <div className="details">
              The requested URL / was not found on this server.
            </div>
            <div className="okay-button">
              <button onClick={props.toggle}>OK</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
