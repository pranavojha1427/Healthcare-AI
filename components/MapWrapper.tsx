import dynamic from 'next/dynamic';

const GeospatialMap = dynamic(() => import('./GeospatialMap'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-100">Loading Map...</div>
});

export default GeospatialMap;
