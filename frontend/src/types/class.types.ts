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
}

export interface CreateClassModalProps {
  isOpen: boolean;
  onClose: () => void;
}
