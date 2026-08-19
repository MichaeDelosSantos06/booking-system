type TrainerStatus = "Active" | "Inactive";
type TrainerSpecialization =
  | "Yoga"
  | "Strength Training"
  | "Cardio"
  | "Boxing"
  | "Zumba & Dance"
  | "HIIT"
  | "Pilates"
  | "Cross Fit";

export interface CreateTrainerDto {
  id: number;
  name: string;
  email: string;
  contct: string;
  experience: number;
  specialization: TrainerSpecialization;
  status: TrainerStatus;
}
