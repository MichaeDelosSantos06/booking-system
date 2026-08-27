import type { CreateTrainerFormData } from "../schema/trainer.schema";

// TYPES
type Specialization =
  | "Yoga"
  | "Strengthtraining"
  | "Cardio"
  | "Boxing"
  | "ZumbaDance"
  | "HIIT"
  | "Pilates"
  | "CrossFit";

export type Status = "Active" | "Inactive";

// INTERFACES
export interface CreateTrainerDto {
  name: string;
  email: string;
  contact: string;
  experience: number;
  specialization: Specialization;
  status: Status;
}

export interface TrainerResponseDto extends CreateTrainerFormData {
  id: number;
}

export interface TrainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

export interface EditModalProps {
  isOpen: boolean;
  editData: TrainerResponseDto | null;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

export interface TrainerCardProps {
  trainer: TrainerResponseDto[];
  onEdit: (data: TrainerResponseDto) => void;
  deactivate: (id: number) => Promise<void>;
  activate: (id: number) => Promise<void>;
}

// UI CONFIGURATION
export const statusUiConfig = [
  {
    value: "Active",
    label: "Active",
    className: "bg-green-100 text-green-600",
  },
  {
    value: "Inactive",
    label: "Inactive",
    className: "bg-gray-100 text-gray-600",
  },
] satisfies {
  value: Status;
  label: string;
  className: string;
}[];
