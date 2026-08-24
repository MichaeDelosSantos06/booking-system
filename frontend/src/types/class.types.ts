type ClassCategory =
  "Cardio" | "Strength" | "Flexibility" | "Combat" | "GroupFitness";

type ClassDifficulty = "Beginner" | "Intermediate" | "Advance";

type ClassStatus = "Active" | "Inactive";

export interface CreateClassFormData {
  className: string;
  description: string;
  category: ClassCategory;
  difficulty: ClassDifficulty;
  duration: number;
  trainerId: number;
  imageUrl?: FileList;
  status: ClassStatus;
}

export interface ClassResponseDto {
  id: number;
  className: string;
  description: string;
  category: ClassCategory;
  difficulty: ClassDifficulty;
  duration: number;
  trainerId: number;
  imageUrl?: string;
  status: ClassStatus;
  trainer: {
    name: string;
  };
}

export interface CreateClassFormProps {
  onSuccess: () => void;
  onRefetch(): Promise<void>;
}

export interface CreateClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefetch: () => Promise<void>;
}

export interface ClassTableProps {
  classes: ClassResponseDto[];
  loading: boolean;
  onDelete: (id: number) => void;
  onEdit: (data: ClassResponseDto) => void;
  pagination: Pagination;
  onPageChange: (page: number) => void;
}

export interface DeleteClassModal {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  editData: ClassResponseDto | null;
  onSuccess: () => Promise<void>;
  onEdit: (data: ClassResponseDto) => void;
}

export interface EditClassFormProps {
  onSuccess: () => Promise<void>;
  editData: ClassResponseDto | null;
  onEdit: (data: ClassResponseDto) => void;
  onClose: () => void;
}

export interface GetClassesParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ClassListResponseDto {
  class: ClassResponseDto[];
  pagination: Pagination;
}
