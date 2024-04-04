import { useState } from 'react';
import Link from 'next/link';
import tshirts from '../data/tshirts.json';

export default function Home() {
  const [query, setQuery] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');

  const filteredTshirts = tshirts.filter(tshirt =>
    tshirt.name.toLowerCase().includes(query.toLowerCase()) &&
    (!price || tshirt.price <= parseFloat(price)) &&
    (!size || tshirt.sizes.includes(size)) &&
    (!color || tshirt.colors.map(c => c.toLowerCase()).includes(color.toLowerCase()))
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Search by Name */}
          <input
            type="text"
            placeholder="Search by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded text-gray-700"
          />
          {/* Filter by Price */}
          <input
            type="number"
            placeholder="Max price..."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded text-gray-700"
          />
          {/* Filter by Size */}
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded text-gray-700"
          >
            <option value="">All sizes</option>
            {['S', 'M', 'L', 'XL'].map((sz) => (
              <option key={sz} value={sz}>{sz}</option>
            ))}
          </select>
          {/* Filter by Color */}
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded text-gray-700"
          >
            <option value="">All colors</option>
            {['red', 'blue', 'green', 'black', 'white'].map((clr) => (
              <option key={clr} value={clr}>{clr}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredTshirts.map((tshirt) => (
            <div key={tshirt.id} className="flex flex-col items-center justify-center p-4 border bg-white rounded-lg shadow aspect-square">
              <div className="text-6xl">{tshirt.emoji}</div>
              <h2 className="mt-2 text-lg font-bold text-gray-800 truncate w-full text-center">{tshirt.name}</h2>
              <p className="text-gray-900">${tshirt.price}</p>
              <Link href={`/tshirts/${tshirt.id}`} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
