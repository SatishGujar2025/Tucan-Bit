import { FC } from 'react';
import { PzButton } from './PzButton';
import { IMAGES } from '../../constants/image';

type PzErrorPopupProps = {
  cost: number;
  setShowFundsErrorPopup: (arg: boolean) => void;
};

export const PzErrorPopup: FC<PzErrorPopupProps> = ({
  setShowFundsErrorPopup,
  cost,
}) => (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div
      className="rounded-xl bg-black/90 p-6 w-full max-w-xs mx-auto"
      style={{
        backgroundImage: `url(${IMAGES.ECLIPSE_BG})`,
      }}
    >
      <p className="text-red-400 my-4">
        Insufficient bucks. You need {cost} bucks to purchase.
      </p>
      <PzButton
        type="secondary"
        text="Cancel"
        onClick={() => setShowFundsErrorPopup(false)}
      />
    </div>
  </div>
);
