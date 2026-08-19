import Modal from "../../../components/ui/Modal";
import CreateClassFrom from "./CreateClassForm";
import type { CreateClassModalProps } from "../../../types/class.types";

const ClassModal = ({ onClose, isOpen }: CreateClassModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Class">
      <CreateClassFrom onSuccess={onClose} />
    </Modal>
  );
};

export default ClassModal;
