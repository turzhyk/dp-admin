import { handleLogout } from "../Controllers/LoginController";

type ModalLoginProps = {
  opened: boolean;
  setOpened: (value: boolean) => void;
};

export default function ModalLogin({ opened, setOpened }: ModalLoginProps) {
  if (!opened) return null; 

  return (
    <div className="absolute top-10 w-full h-full">
      <div className="m-auto w-80 p-10 mr-0 flex gap-4">
        <button onClick={handleLogout}>Logout</button>
        <button onClick={() => setOpened(false)}>Close</button>
      </div>
    </div>
  );
}
