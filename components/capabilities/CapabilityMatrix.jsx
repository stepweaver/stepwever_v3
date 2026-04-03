import CapabilityCard from './CapabilityCard';

export default function CapabilityMatrix({ capabilities }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4'>
      {capabilities.map((capability) => (
        <CapabilityCard key={capability.key} capability={capability} />
      ))}
    </div>
  );
}
