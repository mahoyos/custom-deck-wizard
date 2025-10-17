import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight, FileText, GripVertical } from "lucide-react";
import slidePreview from "@/assets/slide-preview.jpg";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Slide {
  id: number;
  title: string;
  description: string;
}

interface PresentationViewerProps {
  slides: Slide[];
  selectedSlides?: number[];
  onSlideToggle?: (id: number) => void;
  onSlidesReorder?: (newSlides: Slide[]) => void;
  mode?: "delete" | "add" | "view"; // delete = marcar para eliminar, add = marcar para agregar, view = solo visualizar
  title: string;
  subtitle: string;
}

interface SortableThumbnailProps {
  slide: Slide;
  index: number;
  isSelected: boolean;
  isCurrent: boolean;
  mode: "delete" | "add" | "view";
  onClick: () => void;
}

const SortableThumbnail = ({ slide, index, isSelected, isCurrent, mode, onClick }: SortableThumbnailProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: slide.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`aspect-video rounded border-2 transition-all p-2 ${
        isCurrent 
          ? 'border-primary ring-2 ring-primary/20' 
          : isSelected
            ? mode === "delete"
              ? 'border-destructive bg-destructive/10'
              : 'border-primary bg-primary/10'
            : 'border-border hover:border-primary/50'
      }`}
    >
      <div className="relative w-full h-full">
        <button
          onClick={onClick}
          className="w-full h-full flex flex-col items-center justify-center bg-secondary rounded"
        >
          <FileText className={`w-6 h-6 mb-1 ${
            isCurrent ? 'text-primary' : 'text-muted-foreground'
          }`} />
          <span className="text-xs font-medium">{index + 1}</span>
        </button>
        <div
          {...attributes}
          {...listeners}
          className="absolute top-0 right-0 p-1 cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};

export const PresentationViewer = ({
  slides: initialSlides,
  selectedSlides = [],
  onSlideToggle,
  onSlidesReorder,
  mode = "view",
  title,
  subtitle,
}: PresentationViewerProps) => {
  const [slides, setSlides] = useState(initialSlides);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Sync slides with prop changes
  useEffect(() => {
    setSlides(initialSlides);
  }, [initialSlides]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = slides.findIndex((s) => s.id === active.id);
      const newIndex = slides.findIndex((s) => s.id === over.id);
      
      const newSlides = arrayMove(slides, oldIndex, newIndex);
      setSlides(newSlides);
      onSlidesReorder?.(newSlides);
      
      // Update current slide index if the current slide was moved
      if (oldIndex === currentSlideIndex) {
        setCurrentSlideIndex(newIndex);
      } else if (oldIndex < currentSlideIndex && newIndex >= currentSlideIndex) {
        setCurrentSlideIndex(currentSlideIndex - 1);
      } else if (oldIndex > currentSlideIndex && newIndex <= currentSlideIndex) {
        setCurrentSlideIndex(currentSlideIndex + 1);
      }
    }
  };

  const currentSlide = slides[currentSlideIndex];
  const isCurrentSelected = selectedSlides.includes(currentSlide.id);

  const handlePrevious = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>

      <Card className="p-6">
        {/* Slide Preview */}
        <div className="aspect-video bg-muted rounded-lg mb-6 overflow-hidden border-2 border-border">
          <img 
            src={slidePreview} 
            alt={currentSlide.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Slide Info */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {currentSlide.title}
              </h3>
              <p className="text-muted-foreground">{currentSlide.description}</p>
            </div>
            {mode !== "view" && (
              <div className="flex items-center gap-3 ml-4">
                <label 
                  className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border-2 transition-all ${
                    isCurrentSelected 
                      ? mode === "delete" 
                        ? 'bg-destructive/10 border-destructive' 
                        : 'bg-primary/10 border-primary'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Checkbox
                    checked={isCurrentSelected}
                    onCheckedChange={() => onSlideToggle?.(currentSlide.id)}
                    className={
                      mode === "delete" 
                        ? "data-[state=checked]:bg-destructive data-[state=checked]:border-destructive"
                        : "data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    }
                  />
                  <span className="font-medium text-sm">
                    {mode === "delete" ? "Eliminar" : "Agregar"}
                  </span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSlideIndex === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Slide {currentSlideIndex + 1} de {slides.length}
            </span>
            {selectedSlides.length > 0 && (
              <>
                <span className="text-muted-foreground">•</span>
                <span className={`text-sm font-medium ${
                  mode === "delete" ? "text-destructive" : "text-primary"
                }`}>
                  {selectedSlides.length} {mode === "delete" ? "para eliminar" : "para agregar"}
                </span>
              </>
            )}
          </div>

          <Button
            variant="outline"
            onClick={handleNext}
            disabled={currentSlideIndex === slides.length - 1}
            className="gap-2"
          >
            Siguiente
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Thumbnail Navigation */}
        <div className="mt-6 pt-6 border-t border-border">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={slides.map(s => s.id)}
              strategy={horizontalListSortingStrategy}
            >
              <div className="grid grid-cols-6 gap-2">
                {slides.map((slide, index) => {
                  const isSelected = selectedSlides.includes(slide.id);
                  const isCurrent = index === currentSlideIndex;
                  
                  return (
                    <SortableThumbnail
                      key={slide.id}
                      slide={slide}
                      index={index}
                      isSelected={isSelected}
                      isCurrent={isCurrent}
                      mode={mode}
                      onClick={() => setCurrentSlideIndex(index)}
                    />
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </Card>
    </div>
  );
};
