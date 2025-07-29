import { createSignal, onMount, Component } from 'solid-js';
import "./Slider.css";

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

const Slider: Component<SliderProps> = (props) => {
  const [isDragging, setIsDragging] = createSignal(false);
  const [thumbPosition, setThumbPosition] = createSignal(0);
  let trackRef: HTMLDivElement | undefined;

  // Initialize thumb position based on initial value
  onMount(() => {
    const percentage = ((props.value - props.min) / (props.max - props.min)) * 100;
    setThumbPosition(percentage);
  });

  // Handle mouse down to start dragging
  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle mouse move to update thumb position
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging() && trackRef) {
      const rect = trackRef.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      const clampedPercentage = Math.max(0, Math.min(100, percentage));
      setThumbPosition(clampedPercentage);
      const newValue = props.min + (clampedPercentage / 100) * (props.max - props.min);
      const roundedValue = Math.round(newValue / 50000) * 50000;
      props.onChange(roundedValue);
    }
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={trackRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '4px',
        background: '#e0e0e0',
        borderRadius: '2px',
        cursor: 'pointer',
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        style={{
          position: 'absolute',
          left: `${thumbPosition()}%`,
          width: '12px',
          height: '12px',
          background: '#1976d2',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          top: '50%',
        }}
      />
    </div>
  );
};

export default Slider;