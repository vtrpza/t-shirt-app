import { useState } from 'react';
import { useRouter } from 'next/router';
import tshirts from '../../data/tshirts.json'; 
export default function TshirtDetails() {
  const router = useRouter();
  const { id } = router.query;
  const tshirt = tshirts.find((t) => t.id === id);

  // Initialize state for selected size and color
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  if (!tshirt) {
    return (
      <div className="flex flex-col items-start justify-center min-h-screen bg-gray-50">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="mb-4">
          <button onClick={handleGoBack} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition ease-in-out duration-150">
            ← Go Back
          </button>
        </div>
      <div className="w-full max-w-xl p-4 bg-white rounded-lg shadow">
        <div className="text-start text-6xl mb-4">{tshirt.emoji}</div>
        <h1 className="text-xl font-bold text-start">{tshirt.name}</h1>
        <p className="text-gray-900 text-start">${tshirt.price}</p>
        <p className="mb-4 text-start">{tshirt.description}</p>
        <div>
          <label htmlFor="size-select" className="block font-medium text-start">Size</label>
          <select id="size-select" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="p-2 border border-gray-300 rounded mx-auto mb-4">
            <option value="">Select a size</option>
            {tshirt.sizes.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="color-select" className="block font-medium text-start">Color</label>
          <select id="color-select" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} className="p-2 border border-gray-300 rounded mx-auto">
            <option value="">Select a color</option>
            {tshirt.colors.map((color) => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
