import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ProgressBar";
import { Step1Welcome } from "@/components/steps/Step1Welcome";
import { Step2BasePresentation } from "@/components/steps/Step2BasePresentation";
import { Step3Identifications } from "@/components/steps/Step3Identifications";
import { Step4Review } from "@/components/steps/Step4Review";
import { Step5AddProduct } from "@/components/steps/Step5AddProduct";
import { Step5AddSlide } from "@/components/steps/Step5AddSlide";
import { Step6Consolidate } from "@/components/steps/Step6Consolidate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ClientType = "new" | "existing" | null;
type Step5Mode = "review" | "addProduct" | "addSlide";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [clientType, setClientType] = useState<ClientType>(null);
  const [step5Mode, setStep5Mode] = useState<Step5Mode>("review");
  const { toast } = useToast();

  const totalSteps = 6;

  const handleClientTypeSelection = (type: "new" | "existing") => {
    setClientType(type);
    setCurrentStep(2);
  };

  const handleNext = () => {
    // Skip step 3 if client is new
    if (currentStep === 2 && clientType === "new") {
      setCurrentStep(4);
    } else if (currentStep === 4 && step5Mode !== "review") {
      // If in add product or add slide mode, stay on step 5
      setCurrentStep(5);
    } else if (currentStep === 5 && step5Mode !== "review") {
      // After adding products or slides, go back to step 4
      setStep5Mode("review");
      setCurrentStep(4);
    } else if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    // If in step 5 add modes, go back to step 4
    if (currentStep === 5 && step5Mode !== "review") {
      setStep5Mode("review");
      setCurrentStep(4);
      return;
    }

    // Skip step 3 if going back and client is new
    if (currentStep === 4 && clientType === "new") {
      setCurrentStep(2);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAddProduct = () => {
    setStep5Mode("addProduct");
    setCurrentStep(5);
  };

  const handleAddSlide = () => {
    setStep5Mode("addSlide");
    setCurrentStep(5);
  };

  const handleConsolidate = () => {
    toast({
      title: "¡Presentación Consolidada!",
      description: "Tu presentación ha sido generada exitosamente.",
    });
    
    // Reset to initial state
    setTimeout(() => {
      setCurrentStep(1);
      setClientType(null);
      setStep5Mode("review");
    }, 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Welcome onSelectClientType={handleClientTypeSelection} />;
      case 2:
        return <Step2BasePresentation clientType={clientType!} />;
      case 3:
        return <Step3Identifications />;
      case 4:
        return <Step4Review onAddProduct={handleAddProduct} onAddSlide={handleAddSlide} />;
      case 5:
        if (step5Mode === "addProduct") {
          return <Step5AddProduct />;
        } else if (step5Mode === "addSlide") {
          return <Step5AddSlide />;
        }
        return <Step4Review onAddProduct={handleAddProduct} onAddSlide={handleAddSlide} />;
      case 6:
        return <Step6Consolidate onConsolidate={handleConsolidate} />;
      default:
        return null;
    }
  };

  const showNavigation = currentStep > 1;
  const showPrevious = currentStep > 1;
  const showNext = currentStep < totalSteps && currentStep !== 1;

  return (
    <div className="min-h-screen bg-background">
      {currentStep > 1 && (
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      )}

      <main className="pb-24">
        {renderStep()}
      </main>

      {showNavigation && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div>
              {showPrevious && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handlePrevious}
                  className="gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Anterior
                </Button>
              )}
            </div>

            <div className="text-sm text-muted-foreground font-medium">
              Paso {currentStep} de {totalSteps}
            </div>

            <div>
              {showNext && (
                <Button
                  size="lg"
                  onClick={handleNext}
                  className="gap-2"
                >
                  Siguiente
                  <ChevronRight className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
