import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown, Folder, FileText, Eye, Plus } from "lucide-react";
import { useState } from "react";
import slidePreview from "@/assets/slide-preview.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { PresentationViewer } from "@/components/PresentationViewer";
import { toast as sonnerToast } from "sonner";

interface ProductCategory {
  id: string;
  name: string;
  slides?: { id: number; title: string }[];
  subcategories?: ProductCategory[];
}

const mockCategories: ProductCategory[] = [
  {
    id: "banking",
    name: "Productos Bancarios",
    subcategories: [
      {
        id: "savings",
        name: "Cuentas de Ahorro",
        slides: [
          { id: 1, title: "Cuenta de Ahorro Básica" },
          { id: 2, title: "Cuenta de Ahorro Premium" },
          { id: 3, title: "Cuenta de Ahorro Infantil" },
        ],
      },
      {
        id: "credit",
        name: "Tarjetas de Crédito",
        slides: [
          { id: 4, title: "Tarjeta Clásica" },
          { id: 5, title: "Tarjeta Gold" },
          { id: 6, title: "Tarjeta Platinum" },
        ],
      },
    ],
  },
  {
    id: "insurance",
    name: "Seguros",
    subcategories: [
      {
        id: "life",
        name: "Seguros de Vida",
        slides: [
          { id: 7, title: "Seguro de Vida Básico" },
          { id: 8, title: "Seguro de Vida Familiar" },
        ],
      },
      {
        id: "health",
        name: "Seguros de Salud",
        slides: [
          { id: 9, title: "Plan Básico de Salud" },
          { id: 10, title: "Plan Premium de Salud" },
        ],
      },
    ],
  },
];

export const Step5AddProduct = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedSlides, setSelectedSlides] = useState<number[]>([]);
  const [selectedSlidesForPreview, setSelectedSlidesForPreview] = useState<number[]>([]);
  const [previewSlide, setPreviewSlide] = useState<{ id: number; title: string } | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const { toast } = useToast();

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleSlide = (id: number) => {
    setSelectedSlides(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const addSlideFromPreview = (id: number, title: string) => {
    if (!selectedSlides.includes(id)) {
      setSelectedSlides(prev => [...prev, id]);
      sonnerToast.success(`"${title}" agregado a la presentación`);
    }
    setPreviewSlide(null);
  };

  const toggleSlideInPreview = (id: number) => {
    setSelectedSlidesForPreview(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const getAllSlidesFromCategory = (category: ProductCategory): { id: number; title: string }[] => {
    const slides = category.slides || [];
    const subSlides = category.subcategories?.flatMap(sub => getAllSlidesFromCategory(sub)) || [];
    return [...slides, ...subSlides];
  };

  const renderCategory = (category: ProductCategory, level: number = 0) => {
    const isExpanded = expandedCategories.includes(category.id);
    const hasSubcategories = category.subcategories && category.subcategories.length > 0;

    return (
      <div key={category.id} className="animate-in fade-in slide-in-from-left-2 duration-300">
        <div
          className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors hover:bg-slide-hover ${
            level > 0 ? 'ml-6' : ''
          }`}
          onClick={() => hasSubcategories && toggleCategory(category.id)}
        >
          {hasSubcategories && (
            isExpanded ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )
          )}
          <Folder className={`w-5 h-5 ${isExpanded ? 'text-primary' : 'text-muted-foreground'}`} />
          <span className="font-medium text-foreground">{category.name}</span>
        </div>

        {isExpanded && category.subcategories && (
          <div className="mt-2">
            {category.subcategories.map(sub => renderCategory(sub, level + 1))}
          </div>
        )}

        {isExpanded && category.slides && (
          <div className="mt-2 ml-6 space-y-2">
            {category.slides.map(slide => (
              <Card
                key={slide.id}
                className={`p-3 transition-all border-2 ${
                  selectedSlides.includes(slide.id)
                    ? 'border-primary bg-primary/5'
                    : 'border-slide-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1">
                    <Checkbox
                      checked={selectedSlides.includes(slide.id)}
                      onCheckedChange={() => toggleSlide(slide.id)}
                      className="cursor-pointer"
                    />
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-sm">{slide.title}</span>
                  </div>
                  <button
                    onClick={() => setPreviewSlide(slide)}
                    className="p-1 hover:bg-primary/10 rounded transition-colors"
                  >
                    <Eye className="w-4 h-4 text-primary" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Preview mode - show selected slides in PresentationViewer
  if (previewMode && selectedSlides.length > 0) {
    const selectedSlideDetails = mockCategories.flatMap(cat => 
      getAllSlidesFromCategory(cat).filter(s => selectedSlides.includes(s.id))
    ).map(slide => ({
      ...slide,
      description: `Slide de producto: ${slide.title}`
    }));

    return (
      <div className="space-y-6">
        <PresentationViewer
          slides={selectedSlideDetails}
          selectedSlides={selectedSlidesForPreview}
          onSlideToggle={toggleSlideInPreview}
          mode="add"
          title="Vista Previa - Productos Seleccionados"
          subtitle="Navega por los productos que has seleccionado. Puedes desmarcar los que no deseas agregar."
        />
        <div className="max-w-6xl mx-auto px-4">
          <Button variant="outline" onClick={() => setPreviewMode(false)}>
            Volver al Catálogo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Adicionar Productos
        </h2>
        <p className="text-muted-foreground">
          Explora las categorías y selecciona los slides de productos que deseas agregar.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Folder className="w-5 h-5" />
            Catálogo de Productos
          </h3>
          <div className="space-y-2">
            {mockCategories.map(category => renderCategory(category))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-4">
            Slides Seleccionados
          </h3>
          {selectedSlides.length > 0 ? (
            <div className="space-y-3">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <span className="text-3xl font-bold text-primary">{selectedSlides.length}</span>
                <p className="text-sm text-muted-foreground mt-1">
                  slide(s) seleccionado(s)
                </p>
              </div>
              <Button 
                className="w-full" 
                onClick={() => {
                  setSelectedSlidesForPreview([...selectedSlides]);
                  setPreviewMode(true);
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                Previsualizar Selección
              </Button>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No hay slides seleccionados</p>
            </div>
          )}
        </Card>
      </div>

      <Dialog open={!!previewSlide} onOpenChange={() => setPreviewSlide(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{previewSlide?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <img 
              src={slidePreview} 
              alt={previewSlide?.title} 
              className="w-full rounded-lg border-2 border-border"
            />
          </div>
          <DialogFooter>
            <Button
              onClick={() => previewSlide && addSlideFromPreview(previewSlide.id, previewSlide.title)}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Añadir este slide
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
