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
  onSuccess: () => Promise<void>;
  onClose: () => void;
}

export interface CreateClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
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
}

export interface EditClassFormProps {
  onSuccess: () => Promise<void>;
  editData: ClassResponseDto | null;
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

export const categoryConfig = [
  {
    value: "GroupFitness",
    label: "Group Fitness",
    className: "bg-blue-100 text-blue-700",
  },
  { value: "Cardio", label: "Cardio", className: "bg-red-100 text-red-700" },
  {
    value: "Strength",
    label: "Strength",
    className: "bg-orange-100 text-orange-700",
  },
  {
    value: "Flexibility",
    label: "Flexibility",
    className: "bg-green-100 text-green-700",
  },
  {
    value: "Combat",
    label: "Combat",
    className: "bg-purple-100 text-purple-700",
  },
] satisfies {
  value: ClassCategory;
  label: string;
  className: string;
}[];

export const difficultyConfig = [
  {
    value: "Beginner",
    label: "Beginner",
    className: "bg-green-100 text-green-500",
  },
  {
    value: "Intermediate",
    label: "Intermediate",
    className: "bg-orange-100 text-orange-500",
  },
  {
    value: "Advance",
    label: "Advance",
    className: "bg-red-100 text-red-500",
  },
] satisfies {
  value: ClassDifficulty;
  label: string;
  className: string;
}[];
