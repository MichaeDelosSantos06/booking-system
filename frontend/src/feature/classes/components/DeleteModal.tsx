import { AlertTriangle, Trash2 } from "lucide-react";

import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";

import type { DeleteClassModal } from "../../../types/class.types";

const DeleteModal = ({ isOpen, onClose, onConfirm }: DeleteClassModal) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Class?">
      <div className="space-y-5">
        {/* Warning */}
        <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50/70 p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
            <AlertTriangle size={18} strokeWidth={2} />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              This action cannot be undone.
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Deleting this class will permanently remove its information from
              FitBook.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2.5 border-t border-slate-200 pt-4">
          <Button
            type="button"
            onClick={onClose}
            className="flex h-10 min-w-[90px] items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={onConfirm}
            className="flex h-10 min-w-[110px] items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md active:scale-[0.98]"
          >
            <Trash2 size={15} strokeWidth={2} />
            Delete Class
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
