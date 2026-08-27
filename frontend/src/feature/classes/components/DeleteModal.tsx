import { AlertTriangle, Trash2 } from "lucide-react";

import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";

import type { DeleteClassModal } from "../../../types/class.types";

const DeleteModal = ({ isOpen, onClose, onConfirm }: DeleteClassModal) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Class?">
      <div className="space-y-4 sm:space-y-5">
        {/* Warning */}
        <div className="flex items-start gap-2.5 rounded-xl border border-red-100 bg-red-50/70 p-3 sm:gap-3 sm:p-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600 sm:h-9 sm:w-9">
            <AlertTriangle
              size={16}
              strokeWidth={2}
              className="sm:h-[18px] sm:w-[18px]"
            />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-800 sm:text-sm">
              This action cannot be undone.
            </p>

            <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs sm:leading-5">
              Deleting this class will permanently remove its information from
              FitBook.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-2 border-t border-slate-200 pt-3 sm:flex-row sm:items-center sm:justify-end sm:gap-2.5 sm:pt-4">
          <Button
            type="button"
            onClick={onClose}
            className="flex h-9 w-full min-w-0 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 sm:h-10 sm:w-auto sm:min-w-[90px] sm:text-sm"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={onConfirm}
            className="flex h-9 w-full min-w-0 items-center justify-center gap-1.5 rounded-lg bg-red-600 px-4 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md active:scale-[0.98] sm:h-10 sm:w-auto sm:min-w-[110px] sm:gap-2 sm:text-sm"
          >
            <Trash2
              size={14}
              strokeWidth={2}
              className="sm:h-[15px] sm:w-[15px]"
            />
            Delete Class
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
