import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown, Folder, FileText } from "lucide-react";
import { useState } from "react";
import { PresentationViewer } from "@/components/PresentationViewer";
import { toast as sonnerToast } from "sonner";

interface Slide {
  id: number;
  title: string;
  description: string;
}

interface PresentationFile {
  id: string;
  name: string;
  slides: Slide[];
}

interface ProductCategory {
  id: string;
  name: string;
  files?: PresentationFile[];
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
        files: [
          {
            id: "savings-basic",
            name: "Cuenta de Ahorro Básica.pptx",
            slides: [
              { id: 1, title: "Cuenta de Ahorro Básica - Intro", description: "Presentación de la cuenta básica" },
              { id: 2, title: "Beneficios Cuenta Básica", description: "Principales beneficios y características" },
              { id: 3, title: "Requisitos y Tarifas", description: "Información sobre requisitos y costos" },
            ]
          },
          {
            id: "savings-premium",
            name: "Cuenta de Ahorro Premium.pptx",
            slides: [
              { id: 4, title: "Cuenta Premium - Introducción", description: "Cuenta con beneficios exclusivos" },
              { id: 5, title: "Ventajas Premium", description: "Tasas preferenciales y servicios" },
            ]
          },
        ],
      },
      {
        id: "credit",
        name: "Tarjetas de Crédito",
        files: [
          {
            id: "credit-classic",
            name: "Tarjeta Clásica.pptx",
            slides: [
              { id: 6, title: "Tarjeta Clásica", description: "Presentación de tarjeta clásica" },
              { id: 7, title: "Beneficios Tarjeta Clásica", description: "Puntos y beneficios incluidos" },
            ]
          },
          {
            id: "credit-gold",
            name: "Tarjeta Gold.pptx",
            slides: [
              { id: 8, title: "Tarjeta Gold", description: "Tarjeta con beneficios superiores" },
              { id: 9, title: "Programa de Recompensas", description: "Puntos dobles y beneficios exclusivos" },
              { id: 10, title: "Seguros Incluidos", description: "Coberturas de viaje y compras" },
            ]
          },
        ],
      },
    ],
  },
  {
    id: "investment-funds",
    name: "Fondos de inversión colectiva",
    subcategories: [
      {
        id: "conservative",
        name: "Fondos Conservadores",
        files: [
          {
            id: "conservative-basic",
            name: "Fondo Conservador Básico.pptx",
            slides: [
              { id: 11, title: "Fondo Conservador - Introducción", description: "Inversión de bajo riesgo" },
              { id: 12, title: "Rentabilidad Histórica", description: "Rendimientos y proyecciones" },
              { id: 13, title: "Perfil del Inversionista", description: "¿Para quién es este fondo?" },
            ]
          },
        ],
      },
      {
        id: "moderate",
        name: "Fondos Moderados",
        files: [
          {
            id: "moderate-balanced",
            name: "Fondo Balanceado.pptx",
            slides: [
              { id: 14, title: "Fondo Balanceado", description: "Balance entre riesgo y rentabilidad" },
              { id: 15, title: "Composición del Portafolio", description: "Distribución de activos" },
            ]
          },
        ],
        subcategories: [
          {
            id: "moderate-growth",
            name: "Crecimiento Moderado",
            files: [
              {
                id: "moderate-growth-file",
                name: "Fondo Crecimiento Moderado.pptx",
                slides: [
                  { id: 16, title: "Fondo de Crecimiento", description: "Mayor potencial de rentabilidad" },
                  { id: 17, title: "Estrategia de Inversión", description: "Enfoque en acciones y bonos" },
                ]
              },
            ],
          },
        ],
      },
      {
        id: "aggressive",
        name: "Fondos Agresivos",
        files: [
          {
            id: "aggressive-equity",
            name: "Fondo de Acciones.pptx",
            slides: [
              { id: 18, title: "Fondo de Acciones", description: "Alto potencial de crecimiento" },
              { id: 19, title: "Riesgos y Oportunidades", description: "Volatilidad y rendimientos esperados" },
              { id: 20, title: "Horizonte de Inversión", description: "Inversión a largo plazo" },
            ]
          },
        ],
      },
    ],
  },
];

interface Step5AddProductProps {
  onSlidesAdded?: (slides: Slide[]) => void;
}

export const Step5AddProduct = ({ onSlidesAdded }: Step5AddProductProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedSlides, setSelectedSlides] = useState<number[]>([]);
  const [selectedSlidesForPreview, setSelectedSlidesForPreview] = useState<number[]>([]);
  const [selectedFile, setSelectedFile] = useState<PresentationFile | null>(null);

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleSlideInPreview = (id: number) => {
    setSelectedSlidesForPreview(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleFileClick = (file: PresentationFile) => {
    setSelectedFile(file);
    // Initialize with already selected slides from this file
    const fileSlideIds = file.slides.map(s => s.id);
    const alreadySelected = fileSlideIds.filter(id => selectedSlides.includes(id));
    setSelectedSlidesForPreview(alreadySelected);
  };

  const handleAddAll = () => {
    if (!selectedFile) return;
    const allSlideIds = selectedFile.slides.map(s => s.id);
    setSelectedSlidesForPreview(allSlideIds);
    sonnerToast.success(`${allSlideIds.length} slide(s) seleccionado(s)`);
  };

  const confirmSelection = () => {
    if (!selectedFile) return;
    
    // Get the newly added slides (not previously selected)
    const previouslySelected = selectedSlides.filter(id => 
      selectedFile.slides.some(s => s.id === id)
    );
    const newlyAddedIds = selectedSlidesForPreview.filter(id => !previouslySelected.includes(id));
    const newlyAddedSlides = selectedFile.slides.filter(s => newlyAddedIds.includes(s.id));
    
    // Add the selected slides from preview to the main selection
    setSelectedSlides(prev => {
      const newSlides = [...prev];
      selectedSlidesForPreview.forEach(id => {
        if (!newSlides.includes(id)) {
          newSlides.push(id);
        }
      });
      // Remove slides that were deselected
      return newSlides.filter(id => 
        !selectedFile.slides.some(s => s.id === id) || selectedSlidesForPreview.includes(id)
      );
    });
    
    if (newlyAddedSlides.length > 0) {
      onSlidesAdded?.(newlyAddedSlides);
    }
    
    sonnerToast.success(`${selectedSlidesForPreview.length} slide(s) agregado(s)`);
    setSelectedFile(null);
  };

  const renderCategory = (category: ProductCategory, level: number = 0) => {
    const isExpanded = expandedCategories.includes(category.id);
    const hasSubcategoriesOrFiles = (category.subcategories && category.subcategories.length > 0) || (category.files && category.files.length > 0);

    return (
      <div key={category.id} className="animate-in fade-in slide-in-from-left-2 duration-300">
        <div
          className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors hover:bg-secondary ${
            level > 0 ? 'ml-6' : ''
          }`}
          onClick={() => hasSubcategoriesOrFiles && toggleCategory(category.id)}
        >
          {hasSubcategoriesOrFiles && (
            isExpanded ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )
          )}
          <Folder className={`w-5 h-5 ${isExpanded ? 'text-primary' : 'text-muted-foreground'}`} />
          <span className="font-medium text-foreground">{category.name}</span>
        </div>

        {isExpanded && (
          <div className="mt-2 ml-6 space-y-2">
            {/* Render subcategories */}
            {category.subcategories && category.subcategories.map(sub => renderCategory(sub, level + 1))}
            
            {/* Render files */}
            {category.files && category.files.map(file => {
              const fileSlideIds = file.slides.map(s => s.id);
              const hasSelectedSlides = fileSlideIds.some(id => selectedSlides.includes(id));
              
              return (
                <Card
                  key={file.id}
                  className={`p-3 transition-all border-2 cursor-pointer ${
                    hasSelectedSlides
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleFileClick(file)}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{file.name}</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {file.slides.length} slide(s)
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // Show file preview when a file is selected
  if (selectedFile) {
    return (
      <div className="space-y-6">
        <PresentationViewer
          slides={selectedFile.slides}
          selectedSlides={selectedSlidesForPreview}
          onSlideToggle={toggleSlideInPreview}
          mode="add"
          title={`Vista Previa - ${selectedFile.name}`}
          subtitle="Navega por la presentación y selecciona los slides que deseas agregar."
        />
        <div className="max-w-6xl mx-auto px-4 flex gap-3">
          <Button variant="outline" onClick={() => setSelectedFile(null)}>
            Volver al Catálogo
          </Button>
          <Button variant="outline" onClick={handleAddAll}>
            Seleccionar Todo
          </Button>
          <Button onClick={confirmSelection}>
            Confirmar Selección ({selectedSlidesForPreview.length} slides)
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

        <Card className="p-6 h-fit sticky top-4">
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
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No hay slides seleccionados</p>
            </div>
          )}
        </Card>
      </div>

    </div>
  );
};
