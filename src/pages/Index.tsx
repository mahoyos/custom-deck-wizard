import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ProgressBar";
import { UserHeader } from "@/components/UserHeader";
import { Step1Welcome } from "@/components/steps/Step1Welcome";
import { Step2ClientName } from "@/components/steps/Step2ClientName";
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
  const [clientName, setClientName] = useState("");
  const [step5Mode, setStep5Mode] = useState<Step5Mode>("review");
  const [identifications, setIdentifications] = useState<string[]>([]);
  const [reportGenerated, setReportGenerated] = useState(false);
  const { toast } = useToast();

  const totalSteps = 6;

  const handleClientTypeSelection = (type: "new" | "existing") => {
    setClientType(type);
    setCurrentStep(2);
  };

  const handleNext = () => {
    // Validate client name in step 2
    if (currentStep === 2) {
      if (!clientName.trim()) {
        toast({
          title: "Nombre requerido",
          description: "Debes ingresar el nombre del cliente para continuar.",
          variant: "destructive",
        });
        return;
      }
    }

    // Validate identifications for existing clients in step 4
    if (currentStep === 4 && clientType === "existing") {
      if (identifications.length === 0) {
        toast({
          title: "Documentos requeridos",
          description: "Debes ingresar al menos un documento de identificación para continuar.",
          variant: "destructive",
        });
        return;
      }
      if (!reportGenerated) {
        toast({
          title: "Reporte no generado",
          description: "Debes confirmar las identificaciones y generar el reporte de desempeño antes de continuar.",
          variant: "destructive",
        });
        return;
      }
    }

    // Skip step 4 (identifications) if client is new
    if (currentStep === 3 && clientType === "new") {
      setCurrentStep(5);
    } else if (currentStep === 5 && step5Mode !== "review") {
      // After adding products or slides, go back to review mode
      setStep5Mode("review");
    } else if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    // If in add modes in step 5, go back to review mode
    if (currentStep === 5 && step5Mode !== "review") {
      setStep5Mode("review");
      return;
    }

    // Skip step 4 (identifications) if going back and client is new
    if (currentStep === 5 && clientType === "new") {
      setCurrentStep(3);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAddProduct = () => {
    setStep5Mode("addProduct");
  };

  const handleAddSlide = () => {
    setStep5Mode("addSlide");
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
      setClientName("");
      setStep5Mode("review");
      setIdentifications([]);
      setReportGenerated(false);
    }, 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Welcome onSelectClientType={handleClientTypeSelection} />;
      case 2:
        return (
          <Step2ClientName 
            clientType={clientType!} 
            clientName={clientName}
            onClientNameChange={setClientName}
          />
        );
      case 3:
        return <Step2BasePresentation clientType={clientType!} />;
      case 4:
        return (
          <Step3Identifications 
            onIdentificationsChange={setIdentifications} 
            onConfirmGeneration={setReportGenerated}
          />
        );
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
      <UserHeader />
      
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
