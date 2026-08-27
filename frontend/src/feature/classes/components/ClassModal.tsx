import Modal from "../../../components/ui/Modal";
import CreateClassFrom from "./CreateClassForm";
import type { CreateClassModalProps } from "../../../types/class.types";

const ClassModal = ({ onClose, isOpen, onSuccess }: CreateClassModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Class" mode="create">
      <CreateClassFrom onSuccess={onSuccess} onClose={onClose} />
    </Modal>
  );
};

export default ClassModal;
