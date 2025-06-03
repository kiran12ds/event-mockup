// src/components/CanvasEditor.jsx
import React, { useRef, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Transformer, Group, Text } from 'react-konva';
import useImage from '../hooks/useImage';
import PNG_ASSETS from '../assets/pngAssets';
import BACKGROUNDS from '../assets/backgrounds';
import '../styles/CanvasEditor.css';

const DraggableImage = ({ src, id, onSelect, isSelected, onDelete }) => {
  const [image] = useImage(src);
  const shapeRef = useRef();
  const trRef = useRef();
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 120, height: 80 });

  React.useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  if (!image) return null;

  return (
    <Group
      draggable
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={(e) => {
        setPosition({ x: e.target.x(), y: e.target.y() });
      }}
      x={position.x}
      y={position.y}
    >
      <KonvaImage
        image={image}
        ref={shapeRef}
        width={size.width}
        height={size.height}
        onTransformEnd={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          setSize({
            width: Math.max(50, node.width() * scaleX),
            height: Math.max(30, node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <>
          <Transformer ref={trRef} />
          <Text
            text="🗑️"
            fontSize={18}
            fill="red"
            x={size.width - 10}
            y={-30}
            onClick={onDelete}
          />
        </>
      )}
    </Group>
  );
};

const CanvasEditor = () => {
  const stageRef = useRef();
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [roomBg, setRoomBg] = useState(BACKGROUNDS[0].src);
  const [customBg, setCustomBg] = useState(null);

  const addElement = (src) => {
    const newElement = {
      id: Date.now().toString(),
      src
    };
    setElements((prev) => [...prev, newElement]);
    setSelectedId(newElement.id);
  };

  const handleDeleteElement = () => {
    if (selectedId) {
      setElements((prev) => prev.filter((el) => el.id !== selectedId));
      setSelectedId(null);
    }
  };

  const handleRoomChange = (e) => {
    setCustomBg(null);
    const selected = BACKGROUNDS.find(bg => bg.value === e.target.value);
    setRoomBg(selected ? selected.src : BACKGROUNDS[0].src);
  };

  const handleUploadBackground = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomBg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveCustomBg = () => {
    setCustomBg(null);
    setRoomBg(BACKGROUNDS[0].src);
  };

  const [bgImage] = useImage(customBg || roomBg);

  const handleDownload = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement('a');
    link.download = 'event-mockup.png';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="editor-container">
      <div className="editor-sidebar">
        <h2 className="editor-title">Decor Items</h2>

        <div className="item-preview">
          <p className="item-label">🎀 Pink Garland</p>
          <img
            src={PNG_ASSETS.pinkBalloonGarland}
            alt="Pink Balloon Garland"
            className="item-image"
            onClick={() => addElement(PNG_ASSETS.pinkBalloonGarland)}
          />
        </div>

        <div className="item-preview">
          <p className="item-label">🎂 Cake Topper</p>
          <img
            src={PNG_ASSETS.cakeTopper}
            alt="Cake Topper"
            className="item-image"
            onClick={() => addElement(PNG_ASSETS.cakeTopper)}
          />
        </div>

        <div className="item-preview">
          <p className="item-label">🌸 Wedding Arch</p>
          <img
            src={PNG_ASSETS.weddingArch}
            alt="Wedding Arch"
            className="item-image"
            onClick={() => addElement(PNG_ASSETS.weddingArch)}
          />
        </div>

        <button onClick={handleDeleteElement} className="btn-delete">
          🗑️ Delete Selected Item
        </button>

        <button onClick={handleDownload} className="btn-download">
          💾 Download Design
        </button>

        <h3 className="editor-subtitle">Choose Room Background</h3>
        <select onChange={handleRoomChange} className="dropdown">
          {BACKGROUNDS.map(bg => (
            <option key={bg.value} value={bg.value}>{bg.label}</option>
          ))}
        </select>

        <label className="upload-label">Upload Your Own Background</label>
        <input type="file" accept="image/*" onChange={handleUploadBackground} className="upload-input" />
        {customBg && (
          <button onClick={handleRemoveCustomBg} className="btn-remove">
            ❌ Remove Uploaded Background
          </button>
        )}
      </div>

      <div className="editor-canvas">
        <Stage
          width={window.innerWidth * 0.75}
          height={window.innerHeight - 40}
          ref={stageRef}
          className="canvas-stage"
          onMouseDown={(e) => {
            if (e.target === e.target.getStage()) setSelectedId(null);
          }}
        >
          <Layer>
            {bgImage && (
              <KonvaImage
                image={bgImage}
                x={0}
                y={0}
                width={window.innerWidth * 0.75}
                height={window.innerHeight - 40}
              />
            )}
            {elements.map((el) => (
              <DraggableImage
                key={el.id}
                id={el.id}
                src={el.src}
                isSelected={el.id === selectedId}
                onSelect={() => setSelectedId(el.id)}
                onDelete={() => {
                  setElements((prev) => prev.filter((item) => item.id !== el.id));
                  setSelectedId(null);
                }}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default CanvasEditor;
