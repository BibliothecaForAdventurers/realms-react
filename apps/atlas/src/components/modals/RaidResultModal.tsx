import { RaidResults } from '@/components/tables/RaidResults';

export const RaidResultModal = ({ defendId, tx }) => {
  return (
    <div className="flex flex-wrap px-4 bg-gray/800">
      <RaidResults defendId={defendId} tx={tx} />
    </div>
  );
};
