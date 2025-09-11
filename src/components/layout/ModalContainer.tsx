import React from "react";
import LoginModal from "../modals/LoginModal";
import SignInModal from "../modals/SignInModal";
import OTPPopup from "../modals/OTPModal";
import PasswordResetModal from "../modals/PasswordResetModal";
import DepositModal from "../modals/DepositModal";
import VisaPaymentModal from "../modals/VisaPaymentModal";
import WalletConnectModal from "../modals/WalletConnectModal";
import VerificationModal from "../modals/VerificationModal";
import GameLaunchModal from "../modals/GameLaunchModal";

interface ModalContainerProps {
  modalView: string | null;
  closeModal: () => void;
  openModal: (modal: string) => void;
  gameUrl: string | null;
  closeGame: () => void;
  handleShowVerification: () => void;
  handleShowSignIn: () => void;
  handleShowOtp: () => void;
  handleShowPasswordReset: () => void;
  handleLoginComplete: (userProfile?: any) => Promise<void>;
}

const ModalContainer: React.FC<ModalContainerProps> = ({
  modalView,
  closeModal,
  openModal,
  gameUrl,
  closeGame,
  handleShowVerification,
  handleShowSignIn,
  handleShowOtp,
  handleShowPasswordReset,
  handleLoginComplete,
}) => {
  return (
    <>
      {modalView === "login" && (
        <LoginModal
          onClose={closeModal}
          onShowVerification={handleShowVerification}
          onShowSignIn={handleShowSignIn}
          onShowWalletConnect={() => openModal("walletConnect")}
        />
      )}
      {modalView === "signin" && (
        <SignInModal
          onClose={closeModal}
          onShowVerification={handleShowVerification}
          onShowPasswordReset={handleShowPasswordReset}
        />
      )}
      {modalView === "verification" && (
        <VerificationModal
          onClose={closeModal}
          onVerificationComplete={handleShowOtp}
          onBack={() => openModal("login")}
        />
      )}
      {modalView === "otp" && (
        <OTPPopup onClose={closeModal} onLoginSuccess={handleLoginComplete} />
      )}
      {modalView === "passwordReset" && (
        <PasswordResetModal
          onClose={closeModal}
          onBackToLogin={handleShowSignIn}
        />
      )}
      {modalView === "gameLaunch" && gameUrl && (
        <GameLaunchModal src={gameUrl} onClose={closeGame} />
      )}
      {modalView === "deposit" && (
        <DepositModal
          onClose={closeModal}
          onVisaClick={() => openModal("visa")}
        />
      )}
      {modalView === "visa" && (
        <VisaPaymentModal onClose={() => openModal("deposit")} />
      )}
      {modalView === "walletConnect" && <WalletConnectModal />}
    </>
  );
};

export default ModalContainer;