import Modal from "../../../components/ui/Modal";
import CreateClassFrom from "./CreateClassForm";
import type { CreateClassModalProps } from "../../../types/class.types";

const ClassModal = ({ onClose, isOpen, onRefetch }: CreateClassModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Class" mode="create">
      <CreateClassFrom onSuccess={onClose} onRefetch={onRefetch} />
    </Modal>
  );
};

export default ClassModal;
