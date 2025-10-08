import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = [
  "Inicio",
  "Presentación Base",
  "Identificaciones",
  "Revisión",
  "Personalización",
  "Consolidar"
];

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  return (
    <div className="w-full bg-card shadow-sm py-6 px-8 border-b border-border">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between relative">
          {/* Progress line */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-progress-bg -z-10">
            <div
              className="h-full bg-progress-fill transition-all duration-500 ease-out"
              style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            />
          </div>

          {/* Steps */}
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
            const isComplete = step < currentStep;
            const isActive = step === currentStep;
            const isFuture = step > currentStep;

            return (
              <div key={step} className="flex flex-col items-center gap-2 bg-background px-2">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    isComplete && "bg-step-complete border-step-complete text-white",
                    isActive && "bg-step-active border-step-active text-white scale-110 shadow-lg",
                    isFuture && "bg-step-inactive border-step-inactive text-muted-foreground"
                  )}
                >
                  {isComplete ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium text-center whitespace-nowrap transition-colors",
                    isActive && "text-foreground font-semibold",
                    !isActive && "text-muted-foreground"
                  )}
                >
                  {stepLabels[step - 1]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
