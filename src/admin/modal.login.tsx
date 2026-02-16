import { handleLogout } from "../Controllers/LoginController";

type ModalLoginProps = {
  opened: boolean;
  setOpened: (value: boolean) => void;
};

export default function ModalLogin({ opened, setOpened }: ModalLoginProps) {
  if (!opened) return null; 

  return (
    <div className="absolute w-full h-full modal-bg">
      <div className="m-auto w-80 p-10 mr-0 flex gap-4">
        <button onClick={handleLogout}>Logout</button>
        <button onClick={() => setOpened(false)}>Close</button>
      </div>
    </div>
  );
}
