import Image from "next/image";
import "./modal-styling.css";
import info from "./assets/info.svg";
import close_red from "./assets/close-red.png";
import close_white from "./assets/close-white.png";

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
                <Image src={close_white} className="white" alt=""></Image>
                <Image src={close_red} className="red" alt=""></Image>
              </button>
            </div>
            <div className="error">
              <Image src={info} alt="info-icon" />
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
