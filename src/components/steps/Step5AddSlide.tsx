import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Slide {
  id: number;
  title: string;
  description: string;
}

interface Step5AddSlideProps {
  onSlidesAdded?: (slides: Slide[]) => void;
}

export const Step5AddSlide = ({ onSlidesAdded }: Step5AddSlideProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [nextSlideId, setNextSlideId] = useState(1000); // Start custom slides at 1000 to avoid conflicts
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageFiles = Array.from(files).filter(file => 
        file.type.startsWith('image/')
      );
      
      if (imageFiles.length > 0) {
        setUploadedFiles(prev => [...prev, ...imageFiles]);
        
        // Create slide objects for the new files
        const newSlides: Slide[] = imageFiles.map((file, index) => ({
          id: nextSlideId + index,
          title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
          description: "Slide personalizado"
        }));
        
        setNextSlideId(prev => prev + imageFiles.length);
        onSlidesAdded?.(newSlides);
        
        toast({
          title: "Archivos cargados",
          description: `Se cargaron ${imageFiles.length} imagen(es) correctamente.`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Por favor, selecciona solo archivos de imagen.",
        });
      }
    }
  };

  const removeFile = (index: number) => {
    const removedFile = uploadedFiles[index];
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    
    // Remove the corresponding slide
    const slideToRemove: Slide = {
      id: 1000 + index, // This is a simplified approach
      title: removedFile.name.replace(/\.[^/.]+$/, ""),
      description: "Slide personalizado"
    };
    onSlidesAdded?.([slideToRemove].map(s => ({ ...s, id: -s.id }))); // Negative ID to indicate removal
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Adicionar Slides Personalizados
        </h2>
        <p className="text-muted-foreground">
          Carga tus propias imágenes para incluir slides completamente personalizados. Estos slides se integrarán en tu presentación final junto con el contenido seleccionado.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-8">
          <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Arrastra archivos aquí o haz clic para seleccionar
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Sube imágenes de alta calidad en formato JPG, PNG, GIF o SVG. Cada imagen se convertirá en un slide individual.
              </p>
              <Button size="lg">
                Seleccionar Archivos
              </Button>
            </label>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-4">
            Archivos Cargados
          </h3>
          {uploadedFiles.length > 0 ? (
            <div className="space-y-2">
              <div className="text-center p-4 bg-primary/10 rounded-lg mb-4">
                <span className="text-3xl font-bold text-primary">{uploadedFiles.length}</span>
                <p className="text-sm text-muted-foreground mt-1">
                  archivo(s) cargado(s)
                </p>
              </div>
              <div className="max-h-[400px] overflow-y-auto space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-secondary rounded-lg hover:bg-slide-hover transition-colors"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <ImageIcon className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm truncate">{file.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No hay archivos cargados</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
