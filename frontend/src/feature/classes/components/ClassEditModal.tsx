import Modal from "../../../components/ui/Modal";
import EditClassForm from "./EditClassForm";
import type { EditModalProps } from "../../../types/class.types";

const EditModal = ({
  isOpen,
  onClose,
  editData,
  onSuccess,
}: EditModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Class" mode={"edit"}>
      <EditClassForm
        editData={editData}
        onSuccess={onSuccess}

        onClose={onClose}
      />
    </Modal>
  );
};

export default EditModal;
